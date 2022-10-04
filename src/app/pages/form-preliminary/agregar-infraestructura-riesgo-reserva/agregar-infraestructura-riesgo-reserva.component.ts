import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { InfraestructuraReserva, InfraestructuraServiciosBasicos } from 'src/app/shared/models/preliminar.model';

@Component({
  selector: 'app-agregar-infraestructura-riesgo-reserva',
  templateUrl: './agregar-infraestructura-riesgo-reserva.component.html',
  styleUrls: ['./agregar-infraestructura-riesgo-reserva.component.scss']
})
export class AgregarInfraestructuraRiesgoReservaComponent implements OnInit {

  public maestrasInfraestructura : any
  public data: FormGroup;
  public sino = [
    {"id":1 , "descripcion": "SI"},
    {"id":2 , "descripcion": "NO"}
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
      cantidadDestruido: [],
      cantidadAfectado: [],
      ubicacion: [],
    })
    this.getMaestraInfraestructura()
  }


  ngOnInit(): void {
    this.status = this.parametros.status;
    this.idDanioMaterial = this.parametros.idDanioMaterial;
    if (this.status == 1) {
      this.id = this.parametros.id;
      this.getInfraestructuraById(this.id)
    }

  }

  getMaestraInfraestructura(){
    this.preliminarService.getMaestraTipoInfraestructura().subscribe(
      response => {
        this.maestrasInfraestructura = response
        
      }
    )
  }

  getInfraestructuraById(id: number) {
    this.preliminarService.getInfraestructuraByIdReserva(id).subscribe(
      response => {
        this.data.controls['idTipoInfraestructura'].setValue(response.idTipoInfraestructura)
        this.data.controls['tipoInfraestructura'].setValue(response.tipoInfraestructura)
        this.data.controls['ubicacion'].setValue(response.ubicacion)
        this.data.controls['cantidadDestruido'].setValue(response.cantidadDestruido)
        this.data.controls['cantidadAfectado'].setValue(response.cantidadAfectado)
      }
    )
  }

  addData() {
    let dataAux : InfraestructuraReserva = { }
      dataAux.idTipoInfraestructura = this.data.value.idTipoInfraestructura,
      dataAux.tipoInfraestructura = this.data.value.tipoInfraestructura,
      dataAux.ubicacion= this.data.value.ubicacion,
      dataAux.cantidadDestruido= this.data.value.cantidadDestruido,
      dataAux.cantidadAfectado= this.data.value.cantidadAfectado,
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
          this.preliminarService.createInfraestructuraReserva(dataAux).subscribe((res: any) => {
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
