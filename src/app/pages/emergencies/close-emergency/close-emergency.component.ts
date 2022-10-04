import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { id } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { Emergency, Solicitudes } from 'src/app/shared/models/emergency.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { EmergencyService } from 'src/app/shared/services/emergency.service';
import { FormularioService } from 'src/app/shared/services/formulario.service';

@Component({
  selector: 'app-close-emergency',
  templateUrl: './close-emergency.component.html',
  styleUrls: ['./close-emergency.component.scss'],
})
export class CloseEmergencyComponent implements OnInit {
  public counter: number = 0;

  public createSolicitud: FormGroup;

  valores: any;
  public changeInicial = false;

  public isShow: boolean = false;

  public value = '';

  public status: number = 0;

  public listEmergencias: any;

  public PERMISOS = PERMISOS;

  public id: any;
  public emergencias: any;
  public loading: boolean = false;
  public page: number = 0;
  public solicitudes: any;

  public tabla: boolean = false;
  public solicitudesAux: any = [];

  public cantidadItemsForm: number = 5;
  public paginaActalForm: number = 1;
  public estadoEmergencia: number = 1;
  public cantidadPaginasForm: number = 1;
  public cantidadTotalRegistrosBusqueda: number = 0;

  @Input() idEmergencia: any;

  public emergenciaList: any;

  constructor(
    public modalservice: NgbModal,
    private alert: AlertService,
    public activemodal: NgbActiveModal,
    private fb: FormBuilder,
    private params: ActivatedRoute,
    private router: Router,
    public emergencieService: EmergencyService,
    public authService: AuthService,
    public formularioService: FormularioService
  ) {
    this.createSolicitud = this.fb.group({
      id_emergencia: [null],
      fechaSolicitud: [null],
      codigoSinpad: [null],
      motivo: [null],
      estado: [null],
      textoBusqueda: [null],
    });
    this.searchEmergency();
  }

  ngOnInit(): void {
    //this.solicitudCierre()
  }

  getDetailsEmergency() {
    this.emergencieService
      .getEmergencyById(this.idEmergencia)
      .subscribe((res) => {
        this.id = res.id;
      });
  }

  closeModal() {
    this.activemodal.close();
  }

  onKey(event: any) {
    this.counter = event.target.value.length;
  }

  getEmergencias() {
    this.isShow = true;
    this.emergencieService
      .getEmergencies(this.idEmergencia)
      .subscribe((res: any) => {
        this.emergenciaList = res;
        if (res.length) {
          console.log('LLego aqui');
          this.emergenciaList.map((e: any) => {
            e.descripcion =
              e.codigoSinpad +
              ' - ' +
              e.tipoPeligro +
              ' - ' +
              e.tipoPeligroSecundario;
          });
        }
      });
  }
  changeRadio() { }

  searchEmergency() {
    this.createSolicitud.valueChanges.subscribe((data) => {
      this.paginaActalForm = 1;
      const d = {
        textoBusqueda: data.textoBusqueda,
        estadoEmergencia: 1,
        cantidadRegistro: this.cantidadItemsForm,
        numeroPagina: this.paginaActalForm,
      };
      console.log('d', d);

      this.emergencieService.getEmergencies(d).subscribe((res: any) => {
        this.cantidadTotalRegistrosBusqueda = res.cantidad;
        this.listEmergencias = res.emergencias;
        this.paginaActalForm = 1;
        this.cantidadPaginasForm = this.calculatePageCount(
          this.cantidadTotalRegistrosBusqueda,
          this.cantidadItemsForm
        );
        console.log('cantidad', this.cantidadPaginasForm);
      });
    });
  }

  paginationEmergency(event: any) {
    console.log('pagee', event);

    this.paginaActalForm = event;
    const d = {
      textoBusqueda: this.createSolicitud.value.textoBusqueda,
      estadoEmergencia: 1,
      cantidadRegistro: this.cantidadItemsForm,
      numeroPagina: this.paginaActalForm,
    };
    console.log('d', d);

    this.emergencieService.getEmergencies(d).subscribe((res: any) => {
      this.cantidadTotalRegistrosBusqueda = res.cantidad;
      this.listEmergencias = res.emergencias;
      this.cantidadPaginasForm = this.calculatePageCount(
        this.cantidadTotalRegistrosBusqueda,
        this.cantidadItemsForm
      );
      console.log('cantidad', this.cantidadPaginasForm);
    });
  }

  calculatePageCount(cantRegistros: number, numPaginasBusqueda: number) {
    return Math.round(cantRegistros / numPaginasBusqueda);
  }

  obtenerValores() {
    this.createSolicitud.valueChanges.subscribe((data) => {
      const d = {
        codigoSinpad: data.codigoSinpad,
        descripcionUbigeo: data.descripcionUbigeo,
        tipoPeligro: data.tipoPeligro,
      };
      this.emergencieService.getEmergencies(d).subscribe((res: any) => {
        console.log('res', res);
        this.listEmergencias = res.emergencias;
        this.listEmergencias.map((x: any) => {
          x.titulo =
            x.codigoSinpad +
            ' - ' +
            x.descripcionUbigeo +
            ' - ' +
            x.tipoPeligro;
        });
      });
    });
  }

  getSelectEmergencia(
    id: number,
    codigoSinpad: number,
    descripcionUbigeo: string,
    tipoPeligro: string
  ) {
    //validar formularios
    const d = {
      idEmergencia: id,
      cantidadRegistro: 100,
      numeroPagina: 1,
    };
    let formularios: any;
    this.formularioService.getFormularios(d).subscribe((res: any) => {
      formularios = res;
      if (formularios.cantidad != 0) {
        let FAprobado: boolean = true;
        formularios.formularios.map((x: any) => {
          if (x.estado_formulario != 4) FAprobado = false;
        });
        if (!FAprobado) {
          //lanzar notificacion
          this.alert.toastError(
            'La emergencia seleccionada no cuenta con todos los formularios aprobados'
          );
        } else {
          //avanzar con el llenado
          this.createSolicitud.controls['codigoSinpad'].setValue(codigoSinpad);
          this.createSolicitud.controls['id_emergencia'].setValue(id);
          this.valores =
            codigoSinpad + ' - ' + descripcionUbigeo + ' - ' + tipoPeligro;
          this.tabla = true;
        }
      } else {
        this.alert.toastError(
          'La emergencia seleccionada no cuenta con formularios'
        );
      }

      console.log('formularios', formularios);
    });
  }

  solicitudCierre() {
    const data: Solicitudes = {
      id_emergencia: this.createSolicitud.value.id_emergencia,
      fechaSolicitud: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      codigoSinpad: this.createSolicitud.value.codigoSinpad,
      motivo: this.createSolicitud.value.motivo,
      estado: 2,
    };
    console.log('data', data);

    this.emergencieService
      .createSolicitudesEmergencia(data)
      .subscribe((res: any) => {
        this.alert.toastSuccess(`${res.message}`);
        this.closeModal();
      });
  }
}
