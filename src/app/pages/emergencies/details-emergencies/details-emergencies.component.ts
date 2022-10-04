import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { TYPE_ALERT } from '../../../shared/services/config';
import { EmergencyService } from '../../../shared/services/emergency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Emergency, EmergencyRecord } from '../../../shared/models/emergency.model';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';

@Component({
  selector: 'app-details-emergencies',
  templateUrl: './details-emergencies.component.html',
  styleUrls: ['./details-emergencies.component.scss']
})
export class DetailsEmergenciesComponent implements OnInit {

  public minDate!: any;
  public maxDate!: any;
  public isShowButton: boolean = false;
  private isId!: any;
  public detailsEmergency!: any;
  public isShowInputUpdate: boolean = false;
  public codeSinpad: any;

  public updateFormEmergency: FormGroup;
  public selecttipoPeligro: any;
  public selectGrupoPeligro: any;
  public selectUbigeo: any;
  public desPeligro: string = '';
  public desGrupo: string = '';
  public desUbigeo: string = '';
  public name: string = '';
  public fechaHoraFormateada: string = '';

  public fechaAumentada : any

  public PERMISOS = PERMISOS;

  //guardar codigo sinpad
  public codigoSinpad_1: any
  public dataRecord: any;
  public usuarioCreador: any
  public dataRecordSize: number = 0
  public cantidadRecord : number = 0;

  //variables usadas para emergencia_record
  public dataEmergenciaOld: any
  user: any
  public nombresApellidosModificadoPor : any;
  public fechaHoraCreacion : any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private params: ActivatedRoute,
    private alert: AlertService,
    private emergencyService: EmergencyService,
    public authService:  AuthService
  ) {


    this.updateFormEmergency = this.fb.group({
      id: ['', [Validators.required]],
      codeSinpad: ['', [Validators.required]],
      codigoUbigeo: ['', [Validators.required]],
      fechaHoraEvento: ['', [Validators.required]],
      fechaHoraRegistrado: ['', [Validators.required]],
      descripcionEvento: ['', [Validators.required]],
      idTipoPeligro: ['', [Validators.required]],
      idGrupoPeligro: ['', [Validators.required]],
      grupoPeligro: ['', [Validators.required]],
      tipoPeligro: ['', [Validators.required]],
      descripcionUbigeo: ['', [Validators.required]],
    });

    let fechaInicio = new Date();
    let fi = fechaInicio.getFullYear() + '-' + ('0' + (fechaInicio.getMonth() + 1)).slice(-2) + '-' + ('0' + (fechaInicio.getDate() - 2)).slice(-2) + 'T' + ('0' + fechaInicio.getHours()).slice(-2) + ':' + ('0' + fechaInicio.getMinutes()).slice(-2);
    this.minDate = moment(new Date(fi)).format('YYYY-MM-DDTHH:mm');
  

    let fechaFin = new Date();
    this.maxDate = moment(new Date(fechaFin)).format('YYYY-MM-DDTHH:mm');
    this.user = localStorage.getItem('userData'); //obtener id de usuario
    this.nombresApellidosModificadoPor = localStorage.getItem('nombresApellidos');
  }

  ngOnInit(): void {
    this.isId = this.params.snapshot.paramMap.get('id');
    this.getDetailsEmergency();
    this.getPhenomenons();
    this.getUbigeos();
  }


  cancel() {
    this.router.navigate(['/emergencias']).then(() => { });
  }

  getDetailsEmergency() {
    this.emergencyService.getEmergencyById(this.isId).subscribe(res => {
      this.codigoSinpad_1 = res.codigoSinpad
      this.detailsEmergency = res;
      this.fechaHoraCreacion = moment(res.fechaHoraRegistrado).format('DD/MM/YYYY HH:mm') ;
      let fechaHoraEventoBD = new Date(res.fechaHoraEvento);
      this.fechaAumentada = new Date(fechaHoraEventoBD.setHours(fechaHoraEventoBD.getHours()));
      this.fechaHoraFormateada = moment(this.fechaAumentada).format('DD/MM/YYYY HH:mm');
      this.updateFormEmergency.controls['fechaHoraEvento'].setValue(moment(this.fechaAumentada).format('YYYY-DD-MMTHH:mm'));
      this.updateFormEmergency.controls['codigoUbigeo'].setValue(res.codigoUbigeo);
      this.updateFormEmergency.controls['id'].setValue(res.id);
      this.updateFormEmergency.controls['codeSinpad'].setValue(res.codigoSinpad);
      this.updateFormEmergency.controls['descripcionEvento'].setValue(res.descripcionEvento);
      this.updateFormEmergency.controls['fechaHoraRegistrado'].setValue(moment(res.fechaHoraRegistrado).format('YYYY-MM-DDTHH:mm'));
      this.updateFormEmergency.controls['idTipoPeligro'].setValue(res.idTipoPeligro);
      this.updateFormEmergency.controls['tipoPeligro'].setValue(res.tipoPeligro);
      this.updateFormEmergency.controls['descripcionUbigeo'].setValue(res.descripcionUbigeo);
      this.updateFormEmergency.controls['idGrupoPeligro'].setValue(res.idGrupoPeligro);
      this.updateFormEmergency.controls['grupoPeligro'].setValue(res.grupoPeligro);
      this.getEmergenciasRecord(); //obtener informacion del historial de la db emergencia_record
      this.dataEmergenciaOld = this.detailsEmergency
      console.log("Emergencias: ",res)
    });
    
    /* this.getEmergenciasRecord(response.codigoSinpad); */
  }

  //para traer el ultimo registro de la tabla emegencias_record por codigoSinpad
  getEmergenciasRecord() {
    //llamar al backEnd
    this.emergencyService.getEmergenciesRecord(this.codigoSinpad_1).subscribe(
      response => {

        //obtener ultimo valor
        this.dataRecordSize = response.length
        this.dataRecord = response
        function ordenar_id(a : any , b : any){
          if(a.id > b.id){
            return -1
          }
          if (a.id < b.id){
            return 1
          }
          return 0
        }

        this.dataRecord.sort(ordenar_id);
        this.usuarioCreador = response[response.length - 1]
        this.dataRecord = response[0]
        this.cantidadRecord = response.length;
      }
    )

  }

  showUpdateForm() {
    this.isShowButton = true;
    this.isShowInputUpdate = true;  
    console.log(this.updateFormEmergency.value.fechaHoraEvento);
      
    this.updateFormEmergency.controls['fechaHoraEvento'].setValue(moment(this.fechaAumentada).format('YYYY-MM-DDTHH:mm'));
    console.log(this.updateFormEmergency.value.fechaHoraEvento);

    //this.updateFormEmergency.controls['fechaHoraEvento'].setValue(moment(this.updateFormEmergency.value.fechaHoraEvento).format('YYYY-DD-MMTHH:mm')); 
  }

  reverseForm() {
    this.isShowButton = false;
    this.isShowInputUpdate = false;
  }

  updateEmergency() {
  
    const dataU: Emergency = {
      id: this.updateFormEmergency.value.id,
      codigoSinpad: this.updateFormEmergency.value.codeSinpad,
      idTipoPeligro: this.updateFormEmergency.value.idTipoPeligro,
      tipoPeligro: this.updateFormEmergency.value.tipoPeligro,
      idGrupoPeligro: this.updateFormEmergency.value.idGrupoPeligro,
      grupoPeligro: this.updateFormEmergency.value.groupPeligro,
      codigoUbigeo: this.updateFormEmergency.value.codigoUbigeo,
      descripcionUbigeo: this.updateFormEmergency.value.descripcionUbigeo,
      fechaHoraEvento: this.updateFormEmergency.value.fechaHoraEvento,
      descripcionEvento: this.updateFormEmergency.value.descripcionEvento,
      habilitado: 1,
      //fechaHoraRegistrado: moment(this.updateFormEmergency.value.fechaHoraRegistrado).format('DD-MM-YYYY HH:mm:ss'),
    }
    this.dataEmergenciaOld.fechaHoraEvento = (this.dataEmergenciaOld.fechaHoraEvento).slice(0, 16);
    var cambios = ""
    if (this.updateFormEmergency.value.tipoPeligro != this.dataEmergenciaOld.tipoPeligro)
      cambios += ` ,Tipo Peligro: Ahora .- ${this.updateFormEmergency.value.tipoPeligro}, Antes .- ${this.dataEmergenciaOld.tipoPeligro}`
    if (this.updateFormEmergency.value.grupoPeligro != this.dataEmergenciaOld.grupoPeligro)
      cambios += ` ,Grupo Peligro: Ahora .- ${this.updateFormEmergency.value.grupoPeligro}, Antes .- ${this.dataEmergenciaOld.grupoPeligro}`
    if (this.updateFormEmergency.value.descripcionUbigeo != this.dataEmergenciaOld.descripcionUbigeo)
      cambios += ` ,Descripcion Ubigeo: Ahora .- ${this.updateFormEmergency.value.descripcionUbigeo}, Antes .- ${this.dataEmergenciaOld.descripcionUbigeo}`
    if (this.updateFormEmergency.value.fechaHoraEvento != this.dataEmergenciaOld.fechaHoraEvento)
      cambios += ` ,Fecha/Hora Evento: Ahora .- ${this.updateFormEmergency.value.fechaHoraEvento}, Antes .- ${this.dataEmergenciaOld.fechaHoraEvento}`
    if (this.updateFormEmergency.value.descripcionEvento != this.dataEmergenciaOld.descripcionEvento)
      cambios += ` ,Descripcion Evento: Ahora .- ${this.updateFormEmergency.value.descripcionEvento}, Antes .- ${this.dataEmergenciaOld.descripcionEvento}`

  

    //return
    this.alert.questionAlertConfirm(
      '¿Est&aacute;s Seguro de Actualizar la Emergencia?',
      '',
      'S&iacute;, Actualizar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.emergencyService.updateEmergency(dataU).subscribe((res: any) => {
            this.alert.toastSuccess(`${res.message}`);
            this.router.navigate([`/emergencias`]).then(() => { });
            this.isShowButton = false;
            this.isShowInputUpdate = false;
            if (cambios != "")
              this.createEmergenciesRecord(dataU.codigoSinpad, 1, cambios)
              this.getDetailsEmergency();
          });
        }
      }
    );
  }

  deleteEmergency() {
    this.alert.questionAlertConfirm('¿Est&aacute;s Seguro de Eliminar?', 'No volverás a Visualizar está; Emergencia', 'S&iacute;, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.emergencyService.deleteEmergency(this.isId).subscribe((res: any) => {
            this.alert.toastSuccess(`${res.message}`);
            this.createEmergenciesRecord(this.codigoSinpad_1, 2, "Emergencia eliminada")
            this.router.navigate([`/emergencias`]).then(() => { });
          });
        }
      }
    );
  }

  //guardar historial
  createEmergenciesRecord(codigoSinpad: any, tipo: number, cambios: string) {
    cambios = cambios.slice(2)
    var tipoModificacion = ""
    if (tipo == 1)
      tipoModificacion = "Edicion"
    else
      tipoModificacion = "Eliminacion"
    const data: EmergencyRecord = {
      modificadoPor: JSON.parse(this.user).username,
      nombresApellidosModificadoPor: JSON.parse(this.nombresApellidosModificadoPor),
      fechaHoraModificacion: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      tipoModificacion: tipoModificacion,
      cambios: cambios,
      codigoSinpad: codigoSinpad
    }

    this.emergencyService.createEmergencyRecord(data).subscribe((res: any) => {
    });
  }

  getPhenomenons() {
    this.emergencyService.getTipoPeligro().subscribe((rows: any) => {
      this.selecttipoPeligro = rows;

    });
  }

  getUbigeos() {
    const datoGeoPolitico = localStorage.getItem('datoGeoPolitico');
    const region = JSON.parse(datoGeoPolitico).desRegion;
    const provincia = JSON.parse(datoGeoPolitico).desProvincia;
    const distrito = JSON.parse(datoGeoPolitico).desDistrito;
    this.emergencyService.getUbigeos().subscribe(rows => {
      if(region != " " && provincia == " " && distrito == " ") this.selectUbigeo = this.getRegion(rows,region)
      if(provincia != " " && distrito == " ") this.selectUbigeo = this.getProvincia(rows,provincia)
      if(distrito != " ") this.selectUbigeo = this.getDIstrito(rows,distrito)
      if(region == null && provincia == null && distrito == null) this.selectUbigeo = rows
    })
  }
  
  getRegion(rows,region){
    let aux = []
    rows.forEach((e: any) => {
      let ubicacion = e.ubigeo.split("-")
      if (region == ubicacion[0])
        aux.push(e)
    });    
    return aux
  }

  getProvincia(rows,provinciia){
    let aux = []
    rows.forEach((e: any) => {
      let ubicacion = e.ubigeo.split("-")
      if (provinciia == ubicacion[1])
        aux.push(e)
    });
    return aux
  }

  getDIstrito(rows,distrito){
    let aux = []
    rows.forEach((e: any) => {
      let ubicacion = e.ubigeo.split("-")
      if (distrito == ubicacion[2])
        aux.push(e)
    });
    return aux
  }
  /*--------------------------------------*/
  getSelectPeligro(event: any) {
    this.updateFormEmergency.controls['tipoPeligro'].setValue(event.tipoPeligro);
    const code = event.idGrupoPeligro;
    this.emergencyService.getGrupoPeligro(code).subscribe((res: any) => {
      this.updateFormEmergency.patchValue({
        grupoPeligro: res.grupoPeligro
      })
    });
  }

  getSelectUbigeo(event: any) {
    this.updateFormEmergency.value.descripcionUbigeo =  event.ubigeo;
  }

  //para ir al componente de record emergencia
  recordEmergence(id: number,codigoSinpad : number) {
    this.router.navigate([`/emergencias/record/${id},${codigoSinpad}`]).then(() => { });
  }

  updateDate(){   
    console.log(this.updateFormEmergency.value.fechaHoraEvento);
    //this.updateFormEmergency.controls['fechaHoraEvento'].setValue(moment(this.updateFormEmergency.value.fechaHoraEvento).format('YYYY-DD-MMTHH:mm'));    
    
    console.log(this.updateFormEmergency.value.fechaHoraEvento);
  }

}
