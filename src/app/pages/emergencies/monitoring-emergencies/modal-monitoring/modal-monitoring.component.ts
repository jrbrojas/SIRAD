import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservacionComponent } from '../../observacion/observacion.component';
import { AtencionEmergencia, Emergency } from 'src/app/shared/models/emergency.model';
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
import { EmergencyCareComponent } from '../../emergency-care/emergency-care.component';
import { EmergencyAtentionService } from 'src/app/shared/services/emergency-atention.service';

@Component({
  selector: 'app-modal-monitoring',
  templateUrl: './modal-monitoring.component.html',
  styleUrls: ['./modal-monitoring.component.scss']
})
export class ModalMonitoringComponent implements OnInit {

  public revisarModal: boolean = false;
  public aprobarModal: boolean = false;
  public observarModal: boolean = false;
  public dataObservacion: FormGroup;
  public counter: number = 0;
  public isId: any
  public emergencieSelected: any
  public type: number = 0
  public typeForm1: number = 0
  public typeForm2: number = 0
  public status: number = 0
  public idEmergencia: number = 0
  public tipoFormulario: string = ""
  public revisarAll: boolean = false
  public noobservar : string = "activando"
  public siobservar : string = "activando"

  public PERMISOS = PERMISOS;

  @Input() modalFormulario: any;
  constructor(
    public modalservice: NgbModal,
    public form2aService: Form2aService,
    private formularioService: FormularioService,
    private alert: AlertService,
    public activemodal: NgbActiveModal,
    private fb: FormBuilder,
    private params: ActivatedRoute,
    private router: Router,
    public preliminarService: PreliminarService,
    public authService: AuthService,
    private emergencyCareService: EmergencyAtentionService,
  ) {
    this.dataObservacion = this.fb.group({
      estado: ['', [Validators.required]],
      nota: ['', [Validators.required]],
    });
    console.log("permisos", this.PERMISOS);


  }

  ngOnInit(): void {
    this.isId = this.modalFormulario.id;
    this.status = this.modalFormulario.status;
    this.idEmergencia = this.modalFormulario.idEmergencia
    this.tipoFormulario = this.modalFormulario.tipoFormulario
    console.log("permiso", this.authService.validarPermisos([PERMISOS.REVISAR_ATENCION_EMERGENCIA]));
    console.log("tipoFormulario", this.tipoFormulario);
    if (this.status == 1) {
      this.emergencieSelected = this.modalFormulario.dataEmergencia;
      this.typeForm2 = this.modalFormulario.typeForm2;
      this.validateRevisar()
      console.log("selected", this.emergencieSelected);

    }
    if (this.status == 0) {
      this.typeForm1 = this.modalFormulario.type;
      console.log("typeForm1", this.typeForm1);
    }

    /* if (this.status == 2) {
      this.type = this.modalFormulario.type;
    } */
  }

  validateRevisar() {
    let ER = false
    let EM = false
    let PR = false
    let ERC = 0
    let EMC = 0
    let PRC = 0
    let seleccionados = 0
    this.emergencieSelected.formularios.map((x: any) => {
      if (x.tipoFormulario == "EVALUACION-RAPIDA") { ER = true; ERC++ }
      if (x.tipoFormulario == "EMPADRONAMIENTO") { EM = true; EMC++ }
      if (x.tipoFormulario == "PRELIMINAR") { PR = true; PRC++ }
      if (x.selected) seleccionados++
    })    
    let AT = false
    let ATC = 0
    this.emergencieSelected.atenciones.map((x: any) => {
      if (x.tipoFormulario == "ATENCIÓN") { AT = true; ATC++ }
      if (x.selected) seleccionados++
    })
    let c = 0
    if (ER && this.authService.validarPermisos([PERMISOS.REVISAR_EVALUACION_RAPIDA])) c+=ERC
    if (EM && this.authService.validarPermisos([PERMISOS.REVISAR_EMP_FAMILIAR])) c+=EMC
    if (PR && this.authService.validarPermisos([PERMISOS.REVISAR_PRELIMINAR])) c+=PRC
    if (AT && this.authService.validarPermisos([PERMISOS.REVISAR_ATENCION_EMERGENCIA ])) c+=ATC

    if (c == seleccionados)
      this.revisarAll = true
  }

  RevisarAprobarObservar(id: number) {
    const modalref = this.modalservice.open(ObservacionComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static'
    });

    modalref.componentInstance.idEmergencia = id

    modalref.result.then(rest => {

    }, (reason) => {
      //this.router.navigate([`/emergencies/observacion/${id}`]).then(() => {});
    })
  }

  revisar() {
    this.revisarModal = true
    this.observarModal = false
    this.aprobarModal = false
    this.noobservar = "activando"
    this.siobservar = "desactivando"
  }

  observar() {
    this.revisarModal = false
    this.aprobarModal = false
    this.observarModal = true
    this.noobservar = "desactivando"
    this.siobservar = "activando"
  }

  aprobar() {
    this.revisarModal = false
    this.observarModal = false
    this.aprobarModal = true
    this.noobservar = "activando"
    this.siobservar = "desactivando"
  }

  closeModal() {
    this.activemodal.close();
  }

  revisarForm() {
    var type = ""
    var typeResult = ""
    var statusFinal = 0
    if (this.observarModal) {
      this.dataObservacion.value.estado = 5
      type = "observar"
      typeResult = "observado"
    }
    if (this.revisarModal) {
      this.dataObservacion.value.estado = 3
      type = "revisar"
      typeResult = "revisado"
    }
    if (this.aprobarModal) {
      this.dataObservacion.value.estado = 4
      type = "aprobar"
      typeResult = "aprobado"
    }

    this.alert.questionAlertConfirm('¿Está seguro de ' + type + '?', '', 'Si, ' + type, TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          if (this.status == 1) {
            this.emergencieSelected.formularios.forEach((e: any) => {
              if (e.selected) {
                if (e.tipoFormulario == "EVALUACION-RAPIDA") {
                  const dataU: Formulario = {
                    id: e.id,
                    estado_formulario: this.dataObservacion.value.estado,
                    nota: this.dataObservacion.value.nota,
                  }
                  this.formularioService.updateFormularios(dataU).subscribe((res: any) => {
                    this.alert.toastSuccess(`Formulario ${typeResult} con éxito`);
                    this.closeModal()
                  });
                }
                if (e.tipoFormulario == "EMPADRONAMIENTO") {
                  const dataU: Empadronamiento = {
                    id: e.id,
                    estado_formulario: this.dataObservacion.value.estado,
                    nota: this.dataObservacion.value.nota,
                  }
                  this.form2aService.updateEmpadronamiento(dataU).subscribe((res: any) => {
                    this.alert.toastSuccess(`Formulario ${typeResult} con éxito`);
                    this.closeModal()
                  });
                }
                if (e.tipoFormulario == "PRELIMINAR") {
                  const dataU: Preliminar = {
                    id: e.id,
                    estado_formulario: this.dataObservacion.value.estado,
                    nota: this.dataObservacion.value.nota,
                  }
                  this.preliminarService.updateFormularios(dataU).subscribe((res: any) => {
                    this.alert.toastSuccess(`Formulario ${typeResult} con éxito`);
                    this.closeModal()
                  });
                }
              }
            });
            this.emergencieSelected.atenciones.forEach((e: any) => {
              if (e.selected) {
                if (e.tipoFormulario == "ATENCIÓN") {
                  const data: AtencionEmergencia = {
                    id: e.id,
                    estado: this.dataObservacion.value.estado
                  }
                  this.emergencyCareService.guardarAtencionEmergenciaUpdate(data).subscribe((res: any) => {
                    this.alert.toastSuccess(`Atencion editada con éxito`);
                    this.closeModal()
                  });
                }
              }
            });
          }
          if (this.status == 0) {
            if (this.tipoFormulario == "EVALUACION-RAPIDA") {
              const dataU: Formulario = {
                id: this.isId,
                estado_formulario: this.dataObservacion.value.estado,
                nota: this.dataObservacion.value.nota,
              }
              this.formularioService.updateFormularios(dataU).subscribe((res: any) => {
                this.alert.toastSuccess(`Formulario ${typeResult} con éxito`);
                this.closeModal()
              });
            }
            if (this.tipoFormulario == "EMPADRONAMIENTO") {
              const dataU: Empadronamiento = {
                id: this.isId,
                estado_formulario: this.dataObservacion.value.estado,
                nota: this.dataObservacion.value.nota,
              }
              this.form2aService.updateEmpadronamiento(dataU).subscribe((res: any) => {
                this.alert.toastSuccess(`Formulario ${typeResult} con éxito`);
                this.closeModal()
              });
            }
            if (this.tipoFormulario == "PRELIMINAR") {
              const dataU: Preliminar = {
                id: this.isId,
                estado_formulario: this.dataObservacion.value.estado,
                nota: this.dataObservacion.value.nota,
              }
              this.preliminarService.updateFormularios(dataU).subscribe((res: any) => {
                this.alert.toastSuccess(`Formulario ${typeResult} con éxito`);
                this.closeModal()
              });
            }
            if (this.tipoFormulario == "ATENCIÓN") {
              const data: AtencionEmergencia = {
                id: this.isId,
                estado: this.dataObservacion.value.estado,
              }
              this.emergencyCareService.guardarAtencionEmergenciaUpdate(data).subscribe((res: any) => {
                this.alert.toastSuccess(`Atencion editada con éxito`);
                this.closeModal()
              });
            }
          }
        }/* 
        else {
          this.formularioService.showLoader = false;
          this.closeModal()
        } */

      }
    );
  }

  onKey(event: any) {
    this.counter = event.target.value.length;
  }
}
