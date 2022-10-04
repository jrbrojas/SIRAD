import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import * as moment from 'moment';
import { TYPE_ALERT } from '../../../shared/services/config';
import { SolicitudUsuario } from '../../../shared/models/usuario.model';
import { AnyMxRecord } from 'dns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSolicitudUsuarioComponent } from '../modal-solicitud-usuario/modal-solicitud-usuario.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

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
  selector: 'app-list-solicitud-creacion-usuario',
  templateUrl: './list-solicitud-creacion-usuario.component.html',
  styleUrls: ['./list-solicitud-creacion-usuario.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class ListSolicitudCreacionUsuarioComponent implements OnInit {

  public solicitudUser: any;
  public showEntries: FormGroup;
  public cantidadItemsForm: number = 10;
  public paginaActalForm: number = 1;
  public cantidadPaginasForm: number = 1;
  public cantidadTotalRegistrosBusqueda: number = 0;
  public loading: boolean = false;
  public value = '';
  public idSolicitud: any;
  public detailsSolicitudUsuario!: any;
  public isShowButton: boolean = false;
  public resEliminar: any;

  constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    public usuarioService: UsuarioService,
    public authService: AuthService,
    private alertService: AlertService,
    private params: ActivatedRoute,
    private modalService: NgbModal,
  ) {
    this.showEntries = this.fb.group({
      parBusqueda: [null],
      fechaInicio: [null],
      fechaFin: [null],
      cantRegistro: [this.cantidadItemsForm]
    });
    this.searchSolicitudUsuario();
  }

  ngOnInit(): void {
    this.paginateSolicitudUsuario(1);
  }

  limpiarFecha() {
    this.showEntries.get('fechaInicio')?.reset();
    this.showEntries.get('fechaFin')?.reset();
  }

  searchSolicitudUsuario() {
    this.showEntries.valueChanges.subscribe(data => {
      this.paginaActalForm = 1;
      const d = {
        parBusqueda: data.parBusqueda,
        fechaInicio: data.fechaInicio != null ? moment(data.fechaInicio).format('DD/MM/YYYY') : null,
        fechaFin: data.fechaFin != null ? moment(data.fechaFin).format('DD/MM/YYYY') : null,
        cantRegistro: parseInt(data.cantRegistro),
        numPagina: this.paginaActalForm
      }
      this.usuarioService.getUsuarioSolicitudListar(d).subscribe((res: any) => {
        this.cantidadTotalRegistrosBusqueda = res.cantRegistros;
        this.solicitudUser = res.listaSolicitud;
        console.log("Solicitudes: ", res.listaSolicitud)
        this.paginaActalForm = 1;
        this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda, this.cantidadItemsForm);

      })
    });
  }

  calculatePageCount(cantRegistros: number, numPaginasBusqueda: number) {
    return Math.round(cantRegistros / numPaginasBusqueda);
  }

  showEntriesChange(e: any) {
    this.cantidadItemsForm = e.target.value;
    this.paginaActalForm = 1;
    this.searchSolicitudUsuario();
  }

  AprobarSolicitud(id: number) {

    this.alertService.questionAlertConfirm(
      '¿Est&aacute;s seguro de aprobar la solicitud de creaci&oacute;n de usuario?',
      '',
      'S&iacute;, Aprobar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.usuarioService.getAprobarSolicitudUsuario(id).subscribe((res: any) => {
            console.log("res,", res)
            this.alertService.toastSuccess('Solicitud de Aprobado Correctamente');
            this.router.navigate(['/seguridad/solicitud-creacion-credenciales']).then(() => { });
            this.paginateSolicitudUsuario(1);
            this.usuarioService.showLoader = false;
          })
        } else {
          this.usuarioService.showLoader = false;
        }
      }
    );
  }

  paginateSolicitudUsuario(page: number) {
    this.paginaActalForm = page;

    const startDate = this.showEntries.value.fechaInicio != null ?
      moment(this.showEntries.value.fechaInicio).format('DD/MM/YYYY') : null;

    const endDate = this.showEntries.value.fechaInicio != null ?
      moment(this.showEntries.value.fechaFin).format('DD/MM/YYYY') : null;

    const d = {
      parBusqueda: this.showEntries.value.parBusqueda,
      fechaInicio: startDate,
      fechaFin: endDate,
      cantRegistro: this.showEntries.value.cantRegistro,
      numPagina: this.paginaActalForm
    }

    this.usuarioService.getUsuarioSolicitudListar(d).subscribe((res: any) => {
      this.solicitudUser = res.listaSolicitud;
      this.cantidadTotalRegistrosBusqueda = res.cantRegistros;
      this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda, this.cantidadItemsForm);
    })
  }

  createSolicitudUsuarios() {
    this.router.navigate(['/seguridad/solicitud-creacion-credenciales/create-solicitud-creacion-usuario']).then(() => { });
  }

  detailSolicitudUsuario(id: number) {
    this.router.navigate([`seguridad/solicitud-creacion-credenciales/details-solicitud-creacion-usuario/${id}`]).then(() => { });
  }

  setvalue() {
    var nivel
    var valor
    nivel = this.showEntries.value.nivel


    if (nivel == '1') {

      valor = this.showEntries.value.codRegion = ""
      this.showEntries.value.codProvincia = ""
      this.showEntries.value.codDistrito = ""



    } else if (nivel == '2') {
      this.showEntries.value.codProvincia = ""
      this.showEntries.value.codDistrito = ""
    } else if (nivel == '3') {
      this.showEntries.value.codDistrito = ""
    }

  }

  aprobarObservarSolicitud(id: any) {
    const modalRef = this.modalService.open(ModalSolicitudUsuarioComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static'
    });
    modalRef.componentInstance.idSolicitud = id;
    modalRef.result.then((res) => {
      this.paginateSolicitudUsuario(1);
    }, (reason) => {
      this.paginateSolicitudUsuario(1);
    })
  }

  eliminarSolicitur(id: any) {
    this.alertService.questionAlertConfirm(
      '¿Est&aacute;s seguro de eliminar la solicitud creaci&oacute;n?',
      '',
      'S&iacute;, Aprobar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.usuarioService.getEliminarSolicitudUsuario(id).subscribe((res: any) => {
            this.resEliminar = res
            this.alertService.toastSuccess('Solicitud Credenciales eliminado Correctamente');
            this.router.navigate(['/seguridad/solicitud-creacion-credenciales']).then(() => { });
            this.paginateSolicitudUsuario(1);
            this.usuarioService.showLoader = false;
          })
          if (this.resEliminar == 0) {
            console.log("No se ha podido eliminar el registro")
          } else {
            console.log("El registro ha sido eliminado")
          }
        } else {
          this.usuarioService.showLoader = false;
        }
      }
    );
    this.usuarioService.getEliminarSolicitudUsuario(id).subscribe(
      (res: any) => {
        this.resEliminar = res
        console.log("Eliminar: ",res);
        this.paginateSolicitudUsuario(1);
      })
    if (this.resEliminar == 0) {
      console.log("No se ha podido eliminar el registro")
    } else {
      console.log("El registro ha sido eliminado")
    }
  }

}



