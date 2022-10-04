import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Infraestructura } from 'src/app/shared/models/preliminar.model';

@Component({
  selector: 'app-agregar-servicio-infraestructura',
  templateUrl: './agregar-servicio-infraestructura.component.html',
  styleUrls: ['./agregar-servicio-infraestructura.component.scss']
})
export class AgregarServicioInfraestructuraComponent implements OnInit {
  public data2 = {
    establecimiento: "",
    idFuncionamiento: 0,
    funcionamiento: "",
    idCondicion: 0,
    condicion: "",
    justificacionDanio: "",
    observacion: "",
    danioMaterial: {
      id: 1
    }
  }
  public data: FormGroup;

  public maestrasFuncionamiento: any
  public maestrasCondicion: any
  public infraestructura: any
  public showLoader: boolean = false;
  public status: number = 0
  public id: any
  public idDanioMaterial: any

  @Input() parametros: any;
  constructor(public activeModal: NgbActiveModal,
    private preliminarService: PreliminarService,
    private alertService: AlertService,
    private fb: FormBuilder) {
    this.data = this.fb.group({
      establecimiento: [],
      idFuncionamiento: [],
      funcionamiento: [],
      idCondicion: [],
      condicion: [],
      justificacionDanio: [],
      observacion: [],
    })
    //traer infraestructura
    this.getMaestraFuncionamiento()
    this.getMaestraCondicion()

  }


  ngOnInit(): void {
    this.status = this.parametros.status;
    this.idDanioMaterial = this.parametros.idDanioMaterial;
    if (this.status == 1) {
      this.id = this.parametros.id;
      this.getInfraestructuraById(this.id)
    }

  }

  getMaestraFuncionamiento() {
    this.preliminarService.getMaestraFuncionamiento().subscribe(
      response => {
        this.maestrasFuncionamiento = response
      }
    )
  }
  getMaestraCondicion() {
    this.preliminarService.getMaestraCondicion().subscribe(
      response => {
        this.maestrasCondicion = response
      }
    )
  }

  getInfraestructuraById(id: number) {
    this.preliminarService.getInfraestructuraById(id).subscribe(
      response => {
        this.data.controls['establecimiento'].setValue(response.establecimiento)
        this.data.controls['idFuncionamiento'].setValue(response.idFuncionamiento)
        this.data.controls['funcionamiento'].setValue(response.funcionamiento)
        this.data.controls['idCondicion'].setValue(response.idCondicion)
        this.data.controls['condicion'].setValue(response.condicion)
        this.data.controls['justificacionDanio'].setValue(response.justificacionDanio)
        this.data.controls['observacion'].setValue(response.observacion)

      }
    )
  }

  addData() {
    let dataAux: Infraestructura = {}
    dataAux.establecimiento = this.data.value.establecimiento,
      dataAux.idFuncionamiento = this.data.value.idFuncionamiento,
      dataAux.funcionamiento = this.data.value.funcionamiento,
      dataAux.idCondicion = this.data.value.idCondicion,
      dataAux.condicion = this.data.value.condicion,
      dataAux.justificacionDanio = this.data.value.justificacionDanio,
      dataAux.observacion = this.data.value.observacion,
      dataAux.danioMaterial = {
        id: this.idDanioMaterial
      }
    if (this.status == 1) {
      dataAux.id = this.id
    }
    
    this.alertService.questionAlertConfirm(
      '¿Está seguro de guardar?',
      '',
      'Si, Guardar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.createInfraestructura(dataAux).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.closeModal()
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  getSelectFuncionamiento(event: any) {
    this.data.controls['funcionamiento'].setValue(event.descripcion)
  }

  getSelectCondicion(event: any) {
    this.data.controls['condicion'].setValue(event.descripcion)
  }
  closeModal() {
    this.activeModal.close();
  }
}
