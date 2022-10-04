import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TYPE_ALERT } from '../../../shared/services/config';
import { AlertService } from '../../../shared/services/alert.service';
import { EmergencyService } from '../../../shared/services/emergency.service';
import * as moment from 'moment';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { ObservacionComponent } from '../observacion/observacion.component';
import {
  Emergency,
  EmergencyRecord,
  Solicitudes,
} from 'src/app/shared/models/emergency.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconsComponent } from '../../../shared/components/feather-icons/feather-icons.component';
import { CloseEmergencyComponent } from '../close-emergency/close-emergency.component';
import { ModalSolicitudCierreComponent } from './modal-solicitud-cierre/modal-solicitud-cierre.component';

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-solicitud-cierre',
  templateUrl: './solicitud-cierre.component.html',
  styleUrls: ['./solicitud-cierre.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class SolicitudCierreComponent implements OnInit {
  id: string;
  minDate: Date;
  maxDate: Date;
  fechaInicioRes: any;
  fechFinRes: any;

  /* public page : number = 0; */
  public codigoSinpad: string;
  // datos geopoliticos
  public codRegionGeopol: string;
  public codProvinciaGeopol: string;
  public codDistritoGeopol: string;

  public showEntries: FormGroup;
  public solicitudes: any;
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
  public estadoSolicitud: number = 1;
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

  public regionByStorage: '';
  public provinciaByStorage: '';
  public distritoByStorage: '';
  public useStorageRegion: boolean = false;
  public useStorageProvince: boolean = false;
  public useStorageDistrict: boolean = false;

  //variables usadas para desarrollar emergencias_record
  user: any;

  constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private emergencyService: EmergencyService,
    public usuarioService: UsuarioService,
    public authService: AuthService,
    public modalservice: NgbModal
  ) {
    this.showEntries = this.fb.group({
      textoBusqueda: [null],
      cantidadRegistro: [this.cantidadItemsForm],
      fechaSolicitud: [null],
      codigoSinpad: [null],
      motivo: [null],
      estado: [this.estadoSolicitud],
    });

    //const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date();

    //this.searchEmergency();

    this.user = localStorage.getItem('userData'); //obtener id de usuario
  }

  ngOnInit(): void {
    this.paginateEmergency(1);
  }

  solicitudCierre() {
    const modalref = this.modalservice.open(CloseEmergencyComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalref.result.then(
      (res) => {
        this.paginateEmergency2(1);
      },
      (reason) => {
        this.paginateEmergency2(1);
      }
    );

  }

  showEntriesChange(e: any) {
    this.cantidadItemsForm = e.target.value;
    this.paginaActalForm = 1;
    this.paginateEmergency(1);
  }

  getNotUndefinied(text: string) {
    if (text != undefined) return text;
    else return '';
  }

  paginateEmergency(page: number) {
    console.log("page 1");
    
    this.paginaActalForm = page;

    this.showEntries.valueChanges.subscribe(data => {
      this.paginaActalForm = 1;
      const d = {
        textoBusqueda: data.textoBusqueda,
        cantidadRegistro: data.cantidadRegistro,
        numeroPagina: this.paginaActalForm,
      };
      console.log(d);


      this.emergencyService.getSolicitudesEmergencia(d).subscribe((res: any) => {
        this.solicitudes = res.solicitudes;
        this.solicitudes.map((x: any) => {
          //motivo
          x.tamaniomotivo = false;
          x.motivoAux = x.motivo;
          if (x.motivo != null && x.motivo.length > 25) {
            x.tamaniomotivo = true;
            let separado = x.motivo.split(' ');
            x.motivo =
              this.getNotUndefinied(separado[0]) +
              ' ' +
              this.getNotUndefinied(separado[1]) +
              ' ' +
              this.getNotUndefinied(separado[2]) +
              ' ' +
              this.getNotUndefinied(separado[3]) +
              ' ' +
              ' ....';
          }
  
          //nota
          x.tamanionota = false;
          x.notaAux = x.nota;
          if (x.nota != null && x.nota.length > 25) {
            x.tamanionota = true;
            let separado = x.nota.split(' ');
            x.nota =
              this.getNotUndefinied(separado[0]) +
              ' ' +
              this.getNotUndefinied(separado[1]) +
              ' ' +
              this.getNotUndefinied(separado[2]) +
              ' ' +
              this.getNotUndefinied(separado[3]) +
              ' ' +
              ' ....';
          }
        });
        this.cantidadTotalRegistrosBusqueda = res.cantidad;
        this.cantidadPaginasForm = this.calculatePageCount(
          this.cantidadTotalRegistrosBusqueda,
          this.cantidadItemsForm
        );
      });
    });
  }

  paginateEmergency2(page: number) {
    console.log("page 2",page);
    
    this.paginaActalForm = page;
      const d = {
        textoBusqueda: this.showEntries.value.textoBusqueda,
        cantidadRegistro: this.showEntries.value.cantidadRegistro,
        numeroPagina: this.paginaActalForm,
      };
      console.log(d);


      this.emergencyService.getSolicitudesEmergencia(d).subscribe((res: any) => {
        this.solicitudes = res.solicitudes;
        this.solicitudes.map((x: any) => {
          //motivo
          x.tamaniomotivo = false;
          x.motivoAux = x.motivo;
          if (x.motivo != null && x.motivo.length > 25) {
            x.tamaniomotivo = true;
            let separado = x.motivo.split(' ');
            x.motivo =
              this.getNotUndefinied(separado[0]) +
              ' ' +
              this.getNotUndefinied(separado[1]) +
              ' ' +
              this.getNotUndefinied(separado[2]) +
              ' ' +
              this.getNotUndefinied(separado[3]) +
              ' ' +
              ' ....';
          }
  
          //nota
          x.tamanionota = false;
          x.notaAux = x.nota;
          if (x.nota != null && x.nota.length > 25) {
            x.tamanionota = true;
            let separado = x.nota.split(' ');
            x.nota =
              this.getNotUndefinied(separado[0]) +
              ' ' +
              this.getNotUndefinied(separado[1]) +
              ' ' +
              this.getNotUndefinied(separado[2]) +
              ' ' +
              this.getNotUndefinied(separado[3]) +
              ' ' +
              ' ....';
          }
        });
        this.cantidadTotalRegistrosBusqueda = res.cantidad;
        this.cantidadPaginasForm = this.calculatePageCount(
          this.cantidadTotalRegistrosBusqueda,
          this.cantidadItemsForm
        );
      });

  }

  calculatePageCount(cantRegistros: number, numPaginasBusqueda: number) {
    return Math.round(cantRegistros / numPaginasBusqueda);
  }

  accion(id: number,id_emergencia : number) {
    const modalref = this.modalservice.open(ModalSolicitudCierreComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static',
    });

    modalref.componentInstance.idSolicitud = id;
    modalref.componentInstance.idEmergencia = id_emergencia;

    modalref.result.then(
      (res) => {
        this.paginateEmergency2(1);
      },
      (reason) => {
        this.paginateEmergency2(1);
      }
    );
  }

  
}
