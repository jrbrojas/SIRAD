import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { InfraestructuraServiciosBasicos } from 'src/app/shared/models/preliminar.model';

@Component({
  selector: 'app-agregar-insfras-servic-basicos',
  templateUrl: './agregar-insfras-servic-basicos.component.html',
  styleUrls: ['./agregar-insfras-servic-basicos.component.scss']
})
export class AgregarInsfrasServicBasicosComponent implements OnInit {

  
  public data: FormGroup;
  public sino = [
    {"id":1 , "descripcion": "SI"},
    {"id":0 , "descripcion": "NO"}
  ]

  public conSinServicio = ""

  public maestrasServiciosPublicos: any
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
      idTipoInfraestructura: [],
      tipoInfraestructura: [],
      indTieneServicio: [],
      porcentajeSinServicio: [],
      cantidadDestruido: [],
      cantidadAfectado: [],
      observacion: [],
    })
    this.getMaestraServiciosPublicos()
  }


  ngOnInit(): void {
    this.status = this.parametros.status;
    this.idDanioMaterial = this.parametros.idDanioMaterial;
    if (this.status == 1) {
      this.id = this.parametros.id;
      this.getInfraestructuraById(this.id)
    }

  }

  getMaestraServiciosPublicos() {
    this.preliminarService.getMaestraTipoServiciosPublicos().subscribe(
      response => {
        this.maestrasServiciosPublicos = response
      }
    )
  }

  getInfraestructuraById(id: number) {
    this.preliminarService.getInfraestructuraByIdServicioPublico(id).subscribe(
      response => {
        this.data.controls['idTipoInfraestructura'].setValue(response.idTipoInfraestructura)
        this.data.controls['tipoInfraestructura'].setValue(response.tipoInfraestructura)
        this.data.controls['indTieneServicio'].setValue(response.indTieneServicio)
        this.data.controls['porcentajeSinServicio'].setValue(response.porcentajeSinServicio)
        this.data.controls['cantidadDestruido'].setValue(response.cantidadDestruido)
        this.data.controls['cantidadAfectado'].setValue(response.cantidadAfectado)
        this.data.controls['observacion'].setValue(response.observacion)
      }
    )
  }

  addData() {
    let dataAux : InfraestructuraServiciosBasicos = { }
      dataAux.idTipoInfraestructura = this.data.value.idTipoInfraestructura,
      dataAux.tipoInfraestructura = this.data.value.tipoInfraestructura,
      dataAux.indTieneServicio= this.data.value.indTieneServicio,
      dataAux.porcentajeSinServicio= this.data.value.porcentajeSinServicio,
      dataAux.cantidadDestruido= this.data.value.cantidadDestruido,
      dataAux.cantidadAfectado= this.data.value.cantidadAfectado,
      dataAux.observacion=this.data.value.observacion,
      dataAux.danioMaterial= {
        id: this.idDanioMaterial
      }
    if(this.status == 1){
      dataAux.id=this.id
    }
    this.alertService.questionAlertConfirm(
      '¿Está seguro de guardar?',
      '',
      'Si, Guardar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.createInfraestructuraServicioPublico(dataAux).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.closeModal()
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  getSelectInfra(event :any){
    this.data.controls['tipoInfraestructura'].setValue(event.descripcion)      
  }

  
  closeModal() {
    this.activeModal.close();
  }
}
