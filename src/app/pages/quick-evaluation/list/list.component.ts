import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from "../../../shared/services/alert.service";
import { TYPE_ALERT } from "../../../shared/services/config";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import * as moment from "moment";
import { QuickEvaluationService } from 'src/app/shared/services/quickevaluation.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { Emergency } from 'src/app/shared/models/emergency.model';
import { EmergencyService } from 'src/app/shared/services/emergency.service';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { ObservacionComponent } from '../../emergencies/observacion/observacion.component';
import { ModalMonitoringComponent } from '../../emergencies/monitoring-emergencies/modal-monitoring/modal-monitoring.component';
import { Formulario } from 'src/app/shared/models/formulario.model';
import { Empadronamiento } from 'src/app/shared/models/empadronamiento.model';
import { Preliminar } from 'src/app/shared/models/preliminar.model';

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
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class ListQuickEvaluationComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  fechaInicioRes: any;
  fechFinRes: any;

  public showEntries: FormGroup;
  public formularios: any;
  public idFormulario: any;
  public items: number = 10;
  public pages: number = 1;
  public src!: string;
  public start!: string;
  public end!: string;
  public total: number = 0;
  public loading: boolean = false;
  public flagExistsQuickEvaluation: boolean = false;

  public PERMISOS = PERMISOS;
  public codigoSinpad: any;

  public idEmergenciaForm: any;
  public cantidadItemsForm: number = 10;
  public paginaActalForm: number = 1;
  public cantidadPaginasForm: number = 1;
  public cantidadTotalRegistrosBusqueda: number = 0;
  public value = '';
  public value1 = '';
  public value2 = '';
  // datos geopoliticos
  codRegionGeopol: string;
  codProvinciaGeopol: string;
  codDistritoGeopol: string;

  @ViewChild("addModal") AddModal!: ModalComponent;

  constructor(
    private modalService: NgbModal,
    private emergencyService: EmergencyService,
    private router: Router,
    private params: ActivatedRoute,
    private alert: AlertService,
    private fb: FormBuilder,
    private formularioService: FormularioService,
    private preliminarService: PreliminarService,
    private quickEvaluationService: QuickEvaluationService,
    public form2aService: Form2aService,
    public authService: AuthService
  ) {
    this.showEntries = this.fb.group({
      textoBusqueda: [null],
      fechaInicio: [null],
      fechaFin: [null],
      nota: [null],
      cantidadRegistro: [this.cantidadItemsForm],
    });

    this.idEmergenciaForm = this.params.snapshot.paramMap.get('id');
    const words = this.idEmergenciaForm.split(',');
    this.idEmergenciaForm = words[0]
    this.codigoSinpad = words[1]

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 0, 1);
    this.maxDate = new Date();

  }

  ngOnInit(): void {
    // obtencion de datos geopoliticos
    this.searchFormulario();
    const datoGeoPolitico = localStorage.getItem('datoGeoPolitico');
    const nivel= JSON.parse(datoGeoPolitico).nivel;
    this.setUbigeosGeopolitico(nivel, datoGeoPolitico);
    this.paginateFormulario(1);
    this.searchFormulario();

  }

  asignarFechaFin(event: MatDatepickerInputEvent<Date>): void {
    let value = event.value || '';
    let fechaInicio: Date = new Date(value);
    let fechaFin: Date = new Date(value);
    this.validarFecha(fechaFin).setDate(fechaInicio.getDate() + 90);
    this.showEntries.get('fechaFin')?.setValue(this.validarFecha(fechaFin));
  }

  validarFecha(fechaFin: Date) {
    const fInicio = new Date(); // RECUPERA TU FECHA DE INICIO EN TU FORMULARIO
    let res = new Date(fechaFin);
    res.setDate(res.getDate() + 90);
    if (res >= fInicio) {
      return new Date();
    } else {
      return res;
    }
  }

  limpiarFecha() {
    this.showEntries.get('fechaInicio')?.reset();
    this.showEntries.get('fechaFin')?.reset();
  }

  searchFormulario() {          
      this.paginaActalForm = 1;
        const d = {
          idEmergencia: this.idEmergenciaForm,
          textoBusqueda: this.showEntries.value.textoBusqueda,
          fechaInicio: this.showEntries.value.fechaInicio != null ? moment(this.showEntries.value.fechaInicio).format('DD/MM/YYYY') : null,
          fechaFin: this.showEntries.value.fechaFin != null ? moment(this.showEntries.value.fechaFin).format('DD/MM/YYYY') : null,
          nota: this.showEntries.value.nota,
          cantidadRegistro: this.showEntries.value.cantidadRegistro,
          numeroPagina: this.paginaActalForm = 1
        }

        this.formularioService.getFormularios(d).subscribe((res: any) => {
          res.formularios.map((x:any) =>{
            x.tamanionota = false
            if (x.nota != null && x.nota.length > 25) {
              x.tamanionota = true;
              x.notaAux = x.nota;
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
          })
          
          this.formularios = res.formularios;
          this.cantidadTotalRegistrosBusqueda = res.cantidad;
          this.paginaActalForm = 1;
          this.cantidadPaginasForm = this.calcularCantidadPaginas(this.cantidadTotalRegistrosBusqueda, this.cantidadItemsForm)
          
        console.log("asdasd",this.formularios);
        })
        

  }

  getNotUndefinied(text: string) {
    if (text != undefined) return text;
    else return '';
  }

  showEntriesChange(e: any) {
    this.cantidadItemsForm = e.target.value; // 10 25 50 100
    this.paginaActalForm = 1;
    this.searchFormulario();
  }

  paginateFormulario(page: number) {
    this.formularios = [];
    this.paginaActalForm = page;
    const fechaInicioForm = this.showEntries.value.fechaInicio != null ?
      moment(this.showEntries.value.fechaInicio).format('DD/MM/YYYY') : null;

    const fechaFinForm = this.showEntries.value.fechaFin != null ?
      moment(this.showEntries.value.fechaFin).format('DD/MM/YYYY') : null;

    const d = {
      idEmergencia: this.idEmergenciaForm,
      textoBusqueda: this.showEntries.value.textoBusqueda,
      fechaInicio: fechaInicioForm,
      fechaFin: fechaFinForm,
      nota: this.showEntries.value.nota,
      cantidadRegistro: this.showEntries.value.cantidadRegistro,
      numeroPagina: this.paginaActalForm,
      // codRegion: this.codRegionGeopol,
      // codDepartamento: this.codProvinciaGeopol,
      // codDistrito: this.codDistritoGeopol
    }
    this.formularioService.getFormularios(d).subscribe((res: any) => {
      this.formularios = res.formularios;
      this.cantidadTotalRegistrosBusqueda = res.cantidad;
      this.cantidadPaginasForm = this.calcularCantidadPaginas(this.cantidadTotalRegistrosBusqueda, this.cantidadItemsForm)

    })

  }

  existQuickEvaluation() {
    this.quickEvaluationService.existQuickEvaluation(this.idEmergenciaForm).subscribe((res) => {
      this.flagExistsQuickEvaluation = res == '1';
    })
  }

  changeForms(form: string) {
    switch (form) {
      case 'form2A':
        this.router.navigate([`/form-2a/new/${this.idEmergenciaForm}`]).then(() => {
        });
        this.modalService.dismissAll();
        break;
      case 'quickEvaluation':
        this.router.navigate([`/quick-evaluation/create/${this.idEmergenciaForm}`]).then(() => {
        });
        this.modalService.dismissAll();
        break;
    }
  }

  sendForm() {
    this.alert.questionAlertConfirm('¿Está seguro de enviar?', '', 'Si, enviar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.alert.toastSuccess('Se envio el formulario correctamente');
          this.router.navigate([`/quick-evaluation/details/${this.idFormulario},${this.codigoSinpad}`]).then();
        }
      }
    );
  }

  details(id: number) {
    this.router.navigate([`/quick-evaluation/edit/${id}`]).then(() => {
    });
  }

  detailFormulario(tipoFormulario: string, idFormulario: number) {
    console.log("tipo",tipoFormulario);
    console.log("id",idFormulario);
    
    switch (tipoFormulario) {
      case 'EVALUACION-RAPIDA':
        //this.authService.validarPermisos([PERMISOS.VER_EVALUACION_RAPIDA]);
        this.router.navigate([`/quick-evaluation/details/${idFormulario},${this.codigoSinpad},1`]).then();
        break;
      case 'EMPADRONAMIENTO':
        //this.authService.validarPermisos([PERMISOS.VER_EMPADRONAMIENTO_FAMILIAR]);
        this.router.navigate([`/form-2a/new/${this.idEmergenciaForm}/${idFormulario},1`]).then();

        break;
        case 'PRELIMINAR':
        //this.authService.validarPermisos([PERMISOS.VER_EMPADRONAMIENTO_FAMILIAR]);
        this.router.navigate([`/form-preliminary/create-information/${idFormulario}/${this.idEmergenciaForm},1`]).then();
        break;
      default:
        break;
    }
  }

  deleteFormulario(tipoFormulario: string, id: number) {
    this.alert.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar este formulario', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          if (tipoFormulario === "EVALUACION-RAPIDA") {
            this.quickEvaluationService.deleteQuickEvaluation(id).subscribe((res: any) => {
              this.existQuickEvaluation();
              this.alert.toastSuccess(`${res.message}`);
              this.paginateFormulario(this.paginaActalForm);
              this.existQuickEvaluation();
            })
          }

          if (tipoFormulario === "EMPADRONAMIENTO") {
            this.form2aService.deleteForm2a(id).subscribe(res => {
              this.alert.toastSuccess(`${res.message}`);
              this.paginateFormulario(this.paginaActalForm);
              this.existQuickEvaluation();
            })
          }

          if (tipoFormulario === "PRELIMINAR") {
            this.preliminarService.deletePreliminar(id).subscribe(res => {
              this.alert.toastSuccess(`${res.message}`);
              this.paginateFormulario(this.paginaActalForm);
              this.existQuickEvaluation();
            })
          }

          if (tipoFormulario === "FORMATO2B") {
            //Eliminar form2b
          }

          if (tipoFormulario === "FORMATO3") {
            //Eliminar form3
          }

          //this.paginateFormulario(this.paginaActalForm);
          //this.alert.toastSuccess('Se eliminó el formato correctamente');
        }
      }
    );
  }

  navigateForms(tipoFormulario: string, idFormulario: number) {
    this.idFormulario = idFormulario;
    switch (tipoFormulario) {
      case 'EVALUACION-RAPIDA':
        this.router.navigate([`/quick-evaluation/${idFormulario}`]).then(() => {
        });
        break;
      case 'EMPADRONAMIENTO':
        this.router.navigate([`/form-2a/details/${idFormulario}`]).then(() => {
        });
        break;
      case 'FORMATO-2B':
        this.router.navigate([`/quick-evaluation/${idFormulario}`]).then(() => {
        });
        break;
      case 'FORMATO-3':
        this.router.navigate([`/quick-evaluation/${idFormulario}`]).then(() => {
        });
        break;
      default:
        break;
    }
  }

  createFormulario(content: any) {
    this.modalService.open(content, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static'
    }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  calcularCantidadPaginas(cantRegistros: number, numPaginasBusqueda: number) {
    return Math.round(cantRegistros / numPaginasBusqueda);
  }

  public irAFormato3() {
    this.router.navigate([`/form-preliminary/create/${this.idEmergenciaForm}`]).then(() => { });
    this.modalService.dismissAll();
  }

  public irAFormato2A() {
    this.router.navigate([`/form-2a/new/${this.idEmergenciaForm}/${this.idFormulario}`]).then(() => {
      console.log(this.idFormulario)
    });
    this.modalService.dismissAll();
  }

  public irAFormatoRapido() {
    this.router.navigate([`/quick-evaluation/create/${this.idEmergenciaForm}`]).then(() => {
    });
    this.modalService.dismissAll();
  }

  sendFormulario(id: any) {
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

  revisarFormulario(id: number) {
    const modalref = this.modalService.open(ObservacionComponent, {
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

  /* changeStatus(id: number, status: number) {
    const modalref = this.modalService.open(ModalMonitoringComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static'
    });

    modalref.componentInstance.modalFormulario = {
      id: id,
      type : status,
      status : 2,
      idEmergencia : this.idEmergenciaForm
    }

    modalref.result.then(rest => {

    }, (rest) => {
      this.router.navigate([`/quick-evaluation/list/${this.idEmergenciaForm}`]).then(() => {});
    })
  } */


  enviarForm(id : number, permiso: number) { //para cuando solo se quie
      
    this.alert.questionAlertConfirm('¿Está seguro de enviar?', '', 'Si, enviar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
            if(permiso == 1){
              const dataU: Formulario = {
                id: id,
                estado_formulario: 2,
                nota: "",
              }
              this.formularioService.updateFormularios(dataU).subscribe((res: any) => {
                this.alert.toastSuccess(`Formulario enviado con éxito`);
                this.searchFormulario()
              });
            }
            if(permiso == 2){
              const dataU: Empadronamiento = {
                id: id,
                estado_formulario: 2,
                nota: "",
              }
              this.form2aService.updateEmpadronamiento(dataU).subscribe((res: any) => {
                this.alert.toastSuccess(`Formulario enviado con éxito`);
                this.searchFormulario()
              });
            }

            if (permiso == 3) {
              const dataU: Preliminar = {
                id: id,
                estado_formulario: 2,
                nota: "",
              }
              this.preliminarService.updateFormularios(dataU).subscribe((res: any) => {
                this.alert.toastSuccess(`Formulario enviado con éxito`);
                this.searchFormulario()
              });
            }


        }
        else {
          this.formularioService.showLoader = false;
        }

      }
    ); 
  }

  setUbigeosGeopolitico(nivel:any, datoGeoPolitico:any){
    switch (nivel) {
      case 1:
        this.codRegionGeopol = '';
        this.codProvinciaGeopol = ''
        this.codDistritoGeopol = ''
        break;
      case 2:
        this.codRegionGeopol = JSON.parse(datoGeoPolitico).codigoRegion;
        this.codProvinciaGeopol = '';
        this.codDistritoGeopol = ''
        break;
      case 3:
        this.codRegionGeopol = JSON.parse(datoGeoPolitico).codigoRegion;
        this.codProvinciaGeopol = JSON.parse(datoGeoPolitico).codigoRegionProvincia;
        this.codDistritoGeopol = ''
        break;
      case 4:
        this.codRegionGeopol = JSON.parse(datoGeoPolitico).codigoRegion;
        this.codProvinciaGeopol = JSON.parse(datoGeoPolitico).codigoRegionProvincia;
        this.codDistritoGeopol = JSON.parse(datoGeoPolitico).codigoRegionDistrito;
        break;

    }
  }

}
