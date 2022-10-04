import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { EmergencyService } from 'src/app/shared/services/emergency.service';
import { Emergency, EmergencyRecord } from 'src/app/shared/models/emergency.model';
import * as moment from 'moment';
import { pipe } from 'rxjs';
import { Distrito } from '../../../shared/models/usuario.model';

@Component({
  selector: 'app-add-emergency',
  templateUrl: './add-emergency.component.html',
  styleUrls: ['./add-emergency.component.scss']
})
export class AddEmergencyComponent implements OnInit {

  public createEmergency: FormGroup;
  public selectTipoPeligro: any;
  public selectGrupoPeligro: any;
  public selectUbigeo: any;
  public desPeligro: string = '';
  public idGroup: any = '';
  public desUbigeo: string = '';
  public counter: number = 0;
  public user: any;
  public nombresApellidosUser: any;
  public tipoModificacion = 'Creacion';
  public dateLimitMin: Date
  public dateLimitMax: Date

  // datos geopoliticos
  public codRegionGeopol: string;
  public codProvinciaGeopol: string;
  public codDistritoGeopol: string;

  public regionByStorage: "";
  public provinciaByStorage: "";
  public distritoByStorage: "";
  public useStorageRegion: boolean = false;
  public useStorageProvince: boolean = false;
  public useStorageDistrict: boolean = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private alertService: AlertService,
    public emergencyService: EmergencyService
  ) {
    //this.dateLimit = moment(new Date()).subtract(2,'days').format('DD/MM/YYYY HH:mm:ss')
    this.dateLimitMin = new Date()
    this.dateLimitMax = new Date()
    this.dateLimitMin.setDate(this.dateLimitMin.getDate() - 2);
    this.nombresApellidosUser = localStorage.getItem('nombresApellidos');
    this.user = localStorage.getItem('userData');
    this.createEmergency = this.fb.group({
      codigoUbigeo: ['', [Validators.required]],
      fechaHoraEvento: ['', [Validators.required]],
      descripcionEvento: ['', [Validators.required]],
      idTipoPeligro: ['',[Validators.required]],
      grupoPeligro: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const datoGeoPolitico = localStorage.getItem('datoGeoPolitico');
    const nivel = JSON.parse(datoGeoPolitico).nivel;
    this.setUbigeosGeopolitico(nivel, datoGeoPolitico);
    //this.validarGeoPolitico();

    this.getPeligros();
    this.getUbigeos();
  }

  createEmergencies() {
    const data: Emergency = {
      idTipoPeligro: this.createEmergency.value.idTipoPeligro,
      tipoPeligro: this.desPeligro,
      idGrupoPeligro: this.idGroup,
      grupoPeligro: this.createEmergency.value.grupoPeligro,
      codigoUbigeo: this.createEmergency.value.codigoUbigeo,
      descripcionUbigeo: this.desUbigeo,
      fechaHoraEvento: this.createEmergency.value.fechaHoraEvento,
      descripcionEvento: this.createEmergency.value.descripcionEvento,
      habilitado: 1,
      idRegistradoPor: JSON.parse(this.user).username,
      registradoPor: JSON.parse(this.nombresApellidosUser),
      //fechaHoraRegistrado: Date(), // year incompleto
      idRevisadoPor: null,
      revisadoPor: null,
      fechaHoraRevisado: null,
      idAprobadoPor: null,
      aprobadoPor: null,
      fechaHoraAprobado: null,
      asignado: null,
      estado: null
    }
   
    //return
    this.alertService.questionAlertConfirm(
      '¿Est&aacute;s Seguro de Crear la Emergencia?',
      '',
      'S&iacute;, Crear',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.emergencyService.createEmergency(data).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.router.navigate(['/emergencias']).then(() => { });
            this.alertService.confirmAlert(`C&oacute;digo Sinpad <br><b style="font-size: 60px">${res.post.codigoSinpad}</b>`, TYPE_ALERT.SUCCESS);
            //recien agregado
            let codigoSinpad = res.post.codigoSinpad;
            this.createEmergenciesRecord(codigoSinpad)
            this.emergencyService.showLoader = false;
          });
        } else {
          this.emergencyService.showLoader = false;
        }
      }
    );
  }

  createEmergenciesRecord(codigoSinpad: any) {
    const data: EmergencyRecord = {
      modificadoPor: JSON.parse(this.user).username,
      nombresApellidosModificadoPor: JSON.parse(this.nombresApellidosUser),
      fechaHoraModificacion: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      tipoModificacion: this.tipoModificacion,
      cambios: 'Emergencia creada',
      codigoSinpad: codigoSinpad
    }


    this.emergencyService.createEmergencyRecord(data).subscribe((res: any) => {

    });
  }

  getPeligros() {
    this.emergencyService.getTipoPeligro().subscribe((rows: any) => {
      console.log("Tipo Peligro: ",rows)
      this.selectTipoPeligro = rows;
      console.log("test",this.selectTipoPeligro);
      
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

  cancelProject() {
    this.createEmergency.reset();
    this.emergencyService.showLoader = false;
    this.router.navigate(['/emergencias']).then(r => r);
  }

  /*--------------------------------------------------*/
  getSelectPeligro(event: any) {
    console.log("Grupo Peligro: ",event)
    this.desPeligro = event.tipoPeligro;
    const code = event.idGrupoPeligro;
    this.emergencyService.getGrupoPeligro(code).subscribe((res: any) => {
      console.log("Grupo Peligro: ",res)
      this.getSelectPeligroGroup(res.id);
      this.createEmergency.patchValue({
        grupoPeligro: res.grupoPeligro
      })
    })
  }

  getSelectPeligroGroup(id: any) {
    this.idGroup = id;
  }

  getSelectUbigeo(event: any) {
    this.desUbigeo = event.ubigeo;
  }

  onKey(event: any) {
    this.counter = event.target.value.length;
  }

  setUbigeosGeopolitico(nivel: any, datoGeoPolitico: any) {
    switch (nivel) {
      case 1:
        this.codRegionGeopol = null;
        this.codProvinciaGeopol = null;
        this.codDistritoGeopol = null;
        break;
      case 2:
        this.codRegionGeopol = JSON.parse(datoGeoPolitico).codigoRegion;
        this.codProvinciaGeopol = null;
        this.codDistritoGeopol = null;
        break;
      case 3:
        this.codRegionGeopol = JSON.parse(datoGeoPolitico).codigoRegion;
        this.codProvinciaGeopol = JSON.parse(datoGeoPolitico).codigoRegionProvincia;
        this.codDistritoGeopol = null;
        break;
      case 4:
        this.codRegionGeopol = JSON.parse(datoGeoPolitico).codigoRegion;
        this.codProvinciaGeopol = JSON.parse(datoGeoPolitico).codigoRegionProvincia;
        this.codDistritoGeopol = JSON.parse(datoGeoPolitico).codigoRegionDistrito;
        break;

    }
    //this.getRegion();
  }
}
