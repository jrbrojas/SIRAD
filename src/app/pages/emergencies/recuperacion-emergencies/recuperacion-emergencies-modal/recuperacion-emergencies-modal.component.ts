import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ObservacionComponent } from '../../observacion/observacion.component';
import { Emergency, EmergencyRecord, Solicitudes } from 'src/app/shared/models/emergency.model';
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
import * as moment from 'moment';

@Component({
  selector: 'app-recuperacion-emergencies-modal',
  templateUrl: './recuperacion-emergencies-modal.component.html',
  styleUrls: ['./recuperacion-emergencies-modal.component.scss']
})
export class RecuperacionEmergenciesModalComponent implements OnInit {


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
  public titulo = "TItulo"

  @Input() idEmergencia: any;
  @Input() codigoSinpad: any;
  @Input() tipo: any;
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
    public authService: AuthService,
    public alertService : AlertService
  ) {
    this.dataObservacion = this.fb.group({
      estado: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log('emergencia', this.idEmergencia);
    console.log('tipo', this.tipo);
    if(this.tipo == 0)
    this.titulo = "Habilitar la emergencia con el codigo Sinpad : "+this.codigoSinpad
    if(this.tipo == 2)
    this.titulo = "Abrir la emergencia con el codigo Sinpad : "+this.codigoSinpad
    this.getFormularios()
  }

  revisarForm() {
    let type = ""
    let mensaje = ""
    let encabezado = ""
    let alerta = ""
    let dataE: Emergency = {}
    dataE.id = this.idEmergencia
    mensaje = this.getMensajeFormularios()
    if (this.tipo == 0) {
      dataE.habilitado = 1
      type = "habilitar"
      encabezado = "¿Está seguro de habilitar la eliminacion de la emergencia?"
      alerta = "habilitado con éxito"
    }
    if (this.tipo == 2) {
      dataE.estadoEmergencia = 1
      type = "abrir"
      encabezado = "¿Está seguro de cambiar el estado a ABIERTO de la emergencia?"
      alerta = "abierto con éxito"
    }
    console.log("data", dataE);
    console.log("form", this.formularios);
    this.alert
      .questionAlertConfirm(
        encabezado,
        mensaje,
        'Si, ' + type,
        TYPE_ALERT.QUESTION
      )
      .then((result) => {
        if (result.value) {
          this.emergencyService
            .createEmergency(dataE)
            .subscribe((res: any) => {
              this.setStatusFormularios(this.type)
              this.createEmergenciesRecord(this.codigoSinpad)
              this.router.navigate(['/emergencias/recuperacion-emergencies']).then(() => { });
              this.alertService.confirmAlert(`C&oacute;digo Sinpad ${alerta}<br><b style="font-size: 60px">${this.codigoSinpad}</b>`, TYPE_ALERT.SUCCESS);
            });
        } else {
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
  }

  getMensajeFormularios() {
    let mensaje = ""
    let c = 0
    this.formularios.map((x: any) => {
      if (x.selected) c++
    })
    if (c != 0) mensaje = `Se habilitarán ${c} formularios, los formularios no seleccionados se eliminaran de la emergencia`
    if (c == 0) mensaje += `No ah seleccionado ningun formulario, los formularios no seleccionados se eliminaran de la emergencia`
    return mensaje
  }

  setStatusFormularios(type: number) {
    this.formularios.forEach((e: any) => {
      if (e.tipoFormulario == "EVALUACION-RAPIDA") {
        const dataU: Formulario = {}
        dataU.id = e.id
        dataU.habilitado = 0
        dataU.nota = this.dataObservacion.value.motivo
        if (type == 0 && e.selected) dataU.habilitado = 1
        this.formularioService.updateFormularios(dataU).subscribe((res: any) => {
          this.alert.toastSuccess(`Evaluacion Rapida editado con éxito`);
          this.closeModal()
        });
      }
      if (e.tipoFormulario == "EMPADRONAMIENTO") {
        const dataU: Empadronamiento = {}
        dataU.id = e.id
        dataU.habilitado = 0
        dataU.nota = this.dataObservacion.value.motivo
        if (type == 0 && e.selected) dataU.habilitado = 1
        this.form2aService.updateEmpadronamiento(dataU).subscribe((res: any) => {
          this.alert.toastSuccess(`Empadronamiento editado con éxito`);
          this.closeModal()
        });
      }
      if (e.tipoFormulario == "PRELIMINAR") {
        const dataU: Preliminar = {}
        dataU.id = e.id
        dataU.habilitado = 0
        dataU.nota = this.dataObservacion.value.motivo
        if (type == 0 && e.selected) dataU.habilitado = 1
        this.preliminarService.updateFormularios(dataU).subscribe((res: any) => {
          this.alert.toastSuccess(`Preliminar editado con éxito`);
          this.closeModal()
        });
      }
    });
  }

  createEmergenciesRecord(codigoSinpad: any) {
    let tipoModificacion = ""
    if(this.type == 0) tipoModificacion = "Emergencia habilitada"
    if(this.type == 2) tipoModificacion = "Emergencia abierta"
    let user = localStorage.getItem('userData');
    const data: EmergencyRecord = {
      modificadoPor: JSON.parse(user).username,
      nombresApellidosModificadoPor: JSON.parse(localStorage.getItem('nombresApellidos')),
      fechaHoraModificacion: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      tipoModificacion: tipoModificacion,
      cambios: tipoModificacion+" con el siguente comentario: "+this.dataObservacion.value.motivo,
      codigoSinpad: codigoSinpad
    }
    this.emergencyService.createEmergencyRecord(data).subscribe((res: any) => {

    });
  }

}
