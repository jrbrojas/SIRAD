import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservacionComponent } from '../../observacion/observacion.component';
import { Emergency, Solicitudes } from 'src/app/shared/models/emergency.model';
import { Formulario } from 'src/app/shared/models/formulario.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { Empadronamiento } from 'src/app/shared/models/empadronamiento.model';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { Preliminar } from 'src/app/shared/models/preliminar.model';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { EmergencyService } from 'src/app/shared/services/emergency.service';
@Component({
  selector: 'app-modal-solicitud-cierre',
  templateUrl: './modal-solicitud-cierre.component.html',
  styleUrls: ['./modal-solicitud-cierre.component.scss'],
})
export class ModalSolicitudCierreComponent implements OnInit {
  public revisarModal: boolean = false;
  public aprobarModal: boolean = false;
  public observarModal: boolean = false;
  public dataObservacion: FormGroup;
  public counter: number = 0;
  public isId: any;
  public emergencieSelected: any;
  public type: number = 0;
  public typeForm1: number = 0;
  public typeForm2: number = 0;
  public status: number = 0;
  public idEmergenciaa: number = 0;
  public tipoFormulario: string = '';
  public id: any;
  public formularios: any
  public PERMISOS = PERMISOS;
  public titulo = "Seleccione una opcion:"

  @Input() idEmergencia: any;
  @Input() idSolicitud: any;
  constructor(
    public modalservice: NgbModal,
    public form2aService: Form2aService,
    private formularioService: FormularioService,
    private alert: AlertService,
    public activemodal: NgbActiveModal,
    private fb: FormBuilder,
    private params: ActivatedRoute,
    private router: Router,
    public emergencyService: EmergencyService,
    public preliminarService: PreliminarService,
    public authService: AuthService
  ) {
    this.dataObservacion = this.fb.group({
      estado: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log('solicitud', this.idSolicitud);
    console.log('emergencia', this.idEmergencia);
  }

  getDetailsEmergency() {
    this.emergencyService
      .getEmergencyById(this.idEmergencia)
      .subscribe((res) => {
        this.id = res.id;
      });
  }

  observar() {
    this.getFormularios()
    this.aprobarModal = false;
    this.observarModal = true;
    this.titulo = "Observación - Solicitud de Cierre"
  }

  aprobar() {
    this.observarModal = false;
    this.aprobarModal = true;
    this.titulo = "Aprobación - Solicitud de Cierre"
  }

  revisarForm() {
    var type = '';
    var typeResult = '';
    var statusFinal = 0;
    var id = this.id;
    if (this.observarModal) {
      this.dataObservacion.value.estado = 4;
      this.dataObservacion.value.nota = this.dataObservacion.value.motivo
      type = 'observar';
      typeResult = 'observar';
    }
    if (this.aprobarModal) {
      this.dataObservacion.value.estado = 3;
      type = 'aprobar';
      typeResult = 'aprobada';
    }
    let mensaje = ""
    if(this.observarModal) mensaje = this.getMensajeFormularios()
    this.alert
      .questionAlertConfirm(
        '¿Está seguro de ' + type + '?',
        mensaje,
        'Si, ' + type,
        TYPE_ALERT.QUESTION
      )
      .then((result) => {
        if (result.value) {
          const dataU: Solicitudes = {}
          dataU.id_solicitud = this.idSolicitud
          dataU.id_emergencia = this.idEmergencia
          dataU.estado = this.dataObservacion.value.estado
          if (this.aprobarModal) dataU.motivo = this.dataObservacion.value.motivo
          if (this.observarModal) dataU.nota = this.dataObservacion.value.motivo
          console.log("data", dataU);
          this.emergencyService
            .updateSolicitudesEmergencia(dataU)
            .subscribe((res: any) => {
              this.alert.toastSuccess(`${res.message}`);
              if (dataU.estado == 3)
                this.updateEmergencia()
              if (this.observarModal)
                this.setStatusFormularios()
              this.closeModal();
            });
        } else {
          this.emergencyService.showLoader = false;
          this.closeModal();
        }
      });
  }

  updateEmergencia() {
    let dataEmergencie: Emergency = {
      id: this.idEmergencia,
      estadoEmergencia: 2
    }
    this.emergencyService
      .createEmergency(dataEmergencie)
      .subscribe((res: any) => {
      });
  }
  onKey(event: any) {
    this.counter = event.target.value.length;
  }

  closeModal() {
    this.activemodal.close();
  }

  getFormularios() {
    const d = {
      idEmergencia: this.idEmergencia,
      cantidadRegistro: 100,
      numeroPagina: 1,
    };
    console.log("asdasd", d);

    this.formularioService.getFormularios(d).subscribe((res: any) => {
      this.formularios = res.formularios;
      this.formularios.map((x: any) => {
        x.selected = false
      })
      console.log("adsdas", this.formularios);

    });
  }

  changeStatus(e: any) {
    this.formularios[e].selected = !this.formularios[e].selected
    console.log("cambio", this.formularios);
  }

  getMensajeFormularios() {
    let mensaje = ""
    let c = 0
    this.formularios.map((x: any) => {
      if (x.selected) c++
    })
    if (c != 0) mensaje = `Se habilitarán ${c} formularios, para su edición`
    return mensaje
  }

  setStatusFormularios() {
    this.formularios.forEach((e: any) => {
      if (e.selected) {
        if (e.tipoFormulario == "EVALUACION-RAPIDA") {
          const dataU: Formulario = {
            id: e.id,
            estado_formulario: 5,
            nota: this.dataObservacion.value.motivo,
          }
          this.formularioService.updateFormularios(dataU).subscribe((res: any) => {
            this.alert.toastSuccess(`Formulario editado con éxito`);
            this.closeModal()
          });
        }
        if (e.tipoFormulario == "EMPADRONAMIENTO") {
          const dataU: Empadronamiento = {
            id: e.id,
            estado_formulario: 5,
            nota: this.dataObservacion.value.motivo,
          }
          this.form2aService.updateEmpadronamiento(dataU).subscribe((res: any) => {
            this.alert.toastSuccess(`Formulario editado con éxito`);
            this.closeModal()
          });
        }
        if (e.tipoFormulario == "PRELIMINAR") {
          const dataU: Preliminar = {
            id: e.id,
            estado_formulario: 5,
            nota: this.dataObservacion.value.motivo,
          }
          this.preliminarService.updateFormularios(dataU).subscribe((res: any) => {
            this.alert.toastSuccess(`Formulario editado con éxito`);
            this.closeModal()
          });
        }
      }
    });
  }
}
