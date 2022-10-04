import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TYPE_ALERT } from '../../../shared/services/config';
import { AlertService } from '../../../shared/services/alert.service';
import { EmergencyService } from '../../../shared/services/emergency.service';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { UsuarioService } from '../../../shared/services/usuario.service'
import { ObservacionComponent } from '../observacion/observacion.component';
import { Emergency, EmergencyRecord } from 'src/app/shared/models/emergency.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconsComponent } from '../../../shared/components/feather-icons/feather-icons.component';
import { CloseEmergencyComponent } from '../close-emergency/close-emergency.component';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import { RecuperacionEmergenciesModalComponent } from './recuperacion-emergencies-modal/recuperacion-emergencies-modal.component';

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
  
};

@Component({
  selector: 'app-recuperacion-emergencies',
  templateUrl: './recuperacion-emergencies.component.html',
  styleUrls: ['./recuperacion-emergencies.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class RecuperacionEmergenciesComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  fechaInicioRes: any;
  fechFinRes: any;
  // datos geopoliticos
  public codRegionGeopol: string;
  public codProvinciaGeopol: string;
  public codDistritoGeopol: string;

  public showEntries: FormGroup;
  public emergencies: any;
  public pages: number = 1;
  public src!: string;
  public start!: string;
  public end!: string;
  public total: number = 0;
  public loading: boolean = false;
  public isShowSearch: boolean = false;

  public PERMISOS = PERMISOS;

  public cantidadItemsForm: number = 10;
  public paginaActalForm: number = 1;
  public estadoEmergencia: number = 1;
  public cantidadPaginasForm: number = 1;
  public cantidadTotalRegistrosBusqueda: number = 0;
  public value = '';
  public value1 = '';
  public value2 = '';

  public selectRegion: any;
  public selectProvincia: any;
  public selectDistrito: any;
  public descripcionRegion: string = '';
  public descripcionProvincia: string = '';
  public descripcionDistrito: string = '';
  public nombresApellidosUser: any;
  seguridadControl: number = 0;

  public regionByStorage: "";
  public provinciaByStorage: "";
  public distritoByStorage: "";
  public useStorageRegion: boolean = false;
  public useStorageProvince: boolean = false;
  public useStorageDistrict: boolean = false;

  //variables usadas para desarrollar emergencias_record
  user: any

  //agregadas por DV para filtrar estado de formulario
  public statusForm = [
    {id:"0",descripcion:"ELIMINADO"},
    {id:"2",descripcion:"CERRADO"},
  ]


  constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private emergencyService: EmergencyService,
    public usuarioService: UsuarioService,
    public authService: AuthService,
    public modalservice: NgbModal,
    public formularioService : FormularioService
  ) {
    this.nombresApellidosUser = localStorage.getItem('nombresApellidos')
    this.showEntries = this.fb.group({
      textoBusqueda: [null],
      codRegion: [null],
      codProvincia: [null],
      codDistrito: [null],
      fechaInicio: [null],
      fechaFin: [null],
      estadoEmergencia: [null],
      habilitado: [null],
      nota: [null],
      cantidadRegistro: [this.cantidadItemsForm]
    });
    console.log("estado",this.showEntries);
    

    //const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date();

    this.searchEmergency();

    this.user = localStorage.getItem('userData'); //obtener id de usuario

  }

  ngOnInit(): void {
    this.showEntries.controls['estadoEmergencia'].setValue("2")
    // obtencion de datos geopoliticos
    const datoGeoPolitico = localStorage.getItem('datoGeoPolitico');
    const nivel = JSON.parse(datoGeoPolitico).nivel;
    this.setUbigeosGeopolitico(nivel, datoGeoPolitico);

    this.getGeopolitico();
    this.paginateEmergency(1);
    this.getRegion();
  }

  getStatusEmergencies(e : any){
    this.showEntries.controls['estadoEmergencia'].setValue(e.value)    
    this.paginateEmergency(1)
    
  }

  limpiarFecha() {
    this.showEntries.get('fechaInicio')?.reset();
    this.showEntries.get('fechaFin')?.reset();
  }


  getGeopolitico() {
    const datoGeoPolitico: any = localStorage.getItem('datoGeoPolitico')
    const nivel = JSON.parse(datoGeoPolitico).nivel;
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
    if(this.codRegionGeopol != null) {
      this.useStorageRegion = true;
    } 
    if(this.codProvinciaGeopol != null) {
      this.useStorageProvince = true
    }
    if(this.codDistritoGeopol != null) {
      this.useStorageDistrict = true
    } 
  }

  searchEmergency() {

    this.showEntries.valueChanges.subscribe(data => {
      this.paginaActalForm = 1;
      if (!this.useStorageRegion){
        this.codRegionGeopol = data.codRegion;
      }
      if (!this.useStorageProvince){
        this.codProvinciaGeopol = data.codProvincia;
      }
      if (!this.useStorageDistrict){
        this.codDistritoGeopol = data.codDistrito;
      }
      const d = {
        textoBusqueda: data.textoBusqueda,
        codRegion: this.codRegionGeopol,
        codProvincia: this.codProvinciaGeopol,
        codDistrito: this.codDistritoGeopol,
        fechaInicio: data.fechaInicio != null ? moment(data.fechaInicio).format('DD/MM/YYYY') : null,
        fechaFin: data.fechaFin != null ? moment(data.fechaFin).format('DD/MM/YYYY') : null,
        estadoEmergencia: data.estadoEmergencia,
        cantidadRegistro: data.cantidadRegistro,
        numeroPagina: this.paginaActalForm
      }
      console.log(d);
      
      if(this.showEntries.value.estadoEmergencia == "0"){
        this.emergencyService.getEmergenciesElininadas(d).subscribe((res: any) => {
          this.emergencies = res.emergencias;
          this.cantidadTotalRegistrosBusqueda = res.cantidad;
          this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda, this.cantidadItemsForm);
          this.getGeopolitico();
        })
      }
      if(this.showEntries.value.estadoEmergencia == "2"){
        this.emergencyService.getEmergencies(d).subscribe((res: any) => {
          this.emergencies = res.emergencias;
          this.cantidadTotalRegistrosBusqueda = res.cantidad;
          this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda, this.cantidadItemsForm);
          this.getGeopolitico();
        })
      }
    });

  }

  showEntriesChange(e: any) {
    console.log("asdasdasd");
    
    this.cantidadItemsForm = e.target.value;
    this.paginaActalForm = 1;
    this.searchEmergency();
    this.getGeopolitico();
  }

  paginateEmergency(page: number) {
    this.paginaActalForm = page;

    const startDate = this.showEntries.value.fechaInicio != null ?
      moment(this.showEntries.value.fechaInicio).format('DD/MM/YYYY') : null;

    const endDate = this.showEntries.value.fechaInicio != null ?
      moment(this.showEntries.value.fechaFin).format('DD/MM/YYYY') : null;

    const d = {
      textoBusqueda: this.showEntries.value.textoBusqueda,
      codRegion: this.codRegionGeopol,
      codProvincia: this.codProvinciaGeopol,
      codDistrito: this.codDistritoGeopol,
      fechaInicio: startDate,
      fechaFin: endDate,
      estadoEmergencia: this.showEntries.value.estadoEmergencia,
      cantidadRegistro: this.showEntries.value.cantidadRegistro,
      numeroPagina: this.paginaActalForm
    }

    if(this.showEntries.value.estadoEmergencia == "0"){
      this.emergencyService.getEmergenciesElininadas(d).subscribe((res: any) => {
        this.emergencies = res.emergencias;
        this.cantidadTotalRegistrosBusqueda = res.cantidad;
        this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda, this.cantidadItemsForm);
        this.getGeopolitico();
      })
    }
    if(this.showEntries.value.estadoEmergencia == "2"){
      this.emergencyService.getEmergencies(d).subscribe((res: any) => {
        this.emergencies = res.emergencias;
        this.cantidadTotalRegistrosBusqueda = res.cantidad;
        this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda, this.cantidadItemsForm);
        this.getGeopolitico();
      })
    }
  }

  navigateForms(id: number, codigoSinpad: number) {
    this.router.navigate([`/quick-evaluation/list/${id},${codigoSinpad}`]).then(() => { });
  }

  atentionEmergency(codigoSinpad: string) {    
    this.router.navigate([`/emergencias/emergency-care/${codigoSinpad}`]).then(() => { });

  }

  detailEmergency(codigoSinpad: number) {
    this.router.navigate([`/emergencias/details/${codigoSinpad}`]).then(() => { });
  }

  //Solicitar Cierre Emergencia
  changeEmergencia(id: number,codigoSinpad : number) {
    const modalref = this.modalservice.open(RecuperacionEmergenciesModalComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static'
    });

    modalref.componentInstance.idEmergencia = id
    modalref.componentInstance.tipo = this.showEntries.value.estadoEmergencia
    modalref.componentInstance.codigoSinpad = codigoSinpad

    modalref.result.then((res) => {
      this.paginateEmergency(1);
    }, (reason) => {
      this.paginateEmergency(1);
    })
  }

  //guardar historial
  createEmergenciesRecord(codigoSinpad: any) {
    const data: EmergencyRecord = {
      modificadoPor: JSON.parse(this.user).username,
      nombresApellidosModificadoPor: JSON.parse(this.nombresApellidosUser),
      fechaHoraModificacion: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      tipoModificacion: "Eliminacion",
      cambios: 'Emergencia eliminada',
      codigoSinpad: codigoSinpad
    }
    // console.log('ESTE ES EL RECORD', data )
    // console.log('CodigoSinPad Record', codigoSinpad);

    this.emergencyService.createEmergencyRecord(data).subscribe((res: any) => {
      // console.log('data', data)
      // console.log(res.post)
    });
  }

  calculatePageCount(cantRegistros: number, numPaginasBusqueda: number) {
    return Math.round(cantRegistros / numPaginasBusqueda);
  }

  showAdvancedSearch() {
    this.isShowSearch = !this.isShowSearch;
  }

  getRegion() {
    const data: any = localStorage.getItem('datoGeoPolitico')
    const region = JSON.parse(data).codigoRegion;
    const nivel = JSON.parse(data).nivel;
    this.usuarioService.getRegion().subscribe(rows => {
      switch (nivel) {
        case 1:
          this.selectRegion = rows;
          break;
        case 2:
          this.selectRegion = rows.filter((obj) => {
            return obj.codRegion === region;
          });
          break;
        case 3:
          this.selectRegion = rows.filter((obj) => {
            return obj.codRegion === region;
          });
          break;
        case 4:
          this.selectRegion = rows.filter((obj) => {
            return obj.codRegion === region;
          });
          break;

      }
    })
  }

  

  //Region
  /*getRegion() {
    this.usuarioService.getRegion().subscribe(rows => {
      console.log("Regiones: ", rows)
      this.selectRegion = rows;
    })
  }*/

  getSelectRegion(event: any) {
    this.getProvincia(event.codRegion);
    //this.showEntries.controls['descRegion'].setValue(event.descripcion);
  }

  //Provincia
  getProvincia(codRegion: string) {
    const data: any = localStorage.getItem('datoGeoPolitico')
    const provincia = JSON.parse(data).codigoRegionProvincia;
    const nivel = JSON.parse(data).nivel;
    this.usuarioService.getProvincia(codRegion).subscribe(rows => {
      switch (nivel) {
        case 1:
          this.selectProvincia = rows;
          break;
        case 2:
          this.selectProvincia = rows;
          break;
        case 3:
          this.selectProvincia = rows.filter((obj) => {
            return obj.codProvincia === provincia;
          });
          break;
        case 4:
          this.selectProvincia = rows.filter((obj) => {
            return obj.codProvincia === provincia;
          });
          break;
      }
      //this.selectProvincia = rows;
      this.showEntries.controls['codProvincia'].reset();
    })
  }

  getSelectProvincia(event: any) {
    //this.descripcionProvincia = event.descripcion;
    this.getDistrito(event.codProvincia);
  }

  //Distrito
  getDistrito(codRegionProv: string) {
    const data: any = localStorage.getItem('datoGeoPolitico');
    const distrito = JSON.parse(data).codigoRegionDistrito;
    const nivel = JSON.parse(data).nivel;
    this.usuarioService.getDistrito(codRegionProv).subscribe(rows => {
      switch (nivel) {
        case 1:
          this.selectDistrito = rows;
          break;
        case 2:
          this.selectDistrito = rows;
          break;
        case 3:
          this.selectDistrito = rows;
          break;
        case 4:
          this.selectDistrito = rows.filter((obj) => {
            return obj.codDistrito === distrito;
          });
          break;
      }
      //this.showEntries.controls['codDistrito'].reset();
    })
  }

  getSelectDistrito(event: any) {
    //this.showEntries.controls['codProvincia'].reset();
    //this.descripcionDistrito = event.descripcion;
  }

  sendForm(id: any) {
    const dataU: Emergency = {
      id,
      estadoEmergencia: 2,
    }
    this.alert.questionAlertConfirm('¿Está seguro de enviar?', '', 'Si, enviar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.emergencyService.updateEmergency(dataU).subscribe((res: any) => {
            this.alert.toastSuccess(`${res.message}`);
          });
        }
      }
    );
  }

  //--
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

  validarGeoPolitico() {

    // so move; es 2
    //this.getRegion();

  }

}
