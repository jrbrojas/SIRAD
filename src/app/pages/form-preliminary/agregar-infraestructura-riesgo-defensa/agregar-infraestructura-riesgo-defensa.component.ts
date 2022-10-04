import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Infraestructura, InfraestructuraRiesgo, InfraestructuraTransMaritimo } from 'src/app/shared/models/preliminar.model';

@Component({
  selector: 'app-agregar-infraestructura-riesgo-defensa',
  templateUrl: './agregar-infraestructura-riesgo-defensa.component.html',
  styleUrls: ['./agregar-infraestructura-riesgo-defensa.component.scss']
})
export class AgregarInfraestructuraRiesgoDefensaComponent implements OnInit {

  public data: FormGroup;

  public maestrasTransPuente: any
  public infraestructura: any
  public showLoader: boolean = false;
  public status: number = 0
  public id: any
  public idDanioMaterial: any

  @Input() parametros: any;
  constructor(
    public activeModal: NgbActiveModal,
    private preliminarService: PreliminarService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {
    this.data = this.fb.group({
      idTipoInfraestructura: [],
      tipoInfraestructura: [],
      cantidadDestruido: [],
      cantidadAfectado: [],
      cantidadTramo: [],
      ubicacion: [],
    })
    this.getMaestraInfraestructuraRiesgo()
    this.getInfraestructuraById(this.id)
  }


  ngOnInit(): void {
    this.status = this.parametros.status;
    this.idDanioMaterial = this.parametros.idDanioMaterial;
    if (this.status == 1) {
      this.id = this.parametros.id;
      this.getInfraestructuraById(this.id)
    }
  }

  getMaestraInfraestructuraRiesgo() {
    this.preliminarService.getMaestraInfraestructuraRiesgo().subscribe(
      response => {
        this.maestrasTransPuente = response
      }
    )
  }

  getInfraestructuraById(id: number) {
    this.preliminarService.getInfraestructuraRiesgoById(id).subscribe(
      response => {
        this.data.controls['idTipoInfraestructura'].setValue(response.idTipoInfraestructura)
        this.data.controls['tipoInfraestructura'].setValue(response.tipoInfraestructura)
        this.data.controls['cantidadDestruido'].setValue(response.cantidadDestruido)
        this.data.controls['cantidadAfectado'].setValue(response.cantidadAfectado)
        this.data.controls['cantidadTramo'].setValue(response.cantidadTramo)
        this.data.controls['ubicacion'].setValue(response.ubicacion)

      }
    )
  }

  addData() {
    let dataAux : InfraestructuraRiesgo = { }
    dataAux.idTipoInfraestructura = this.data.value.idTipoInfraestructura,
    dataAux.tipoInfraestructura = this.data.value.tipoInfraestructura,
    dataAux.cantidadDestruido= this.data.value.cantidadDestruido,
    dataAux.cantidadAfectado= this.data.value.cantidadAfectado,
    dataAux.cantidadTramo= this.data.value.cantidadTramo,
    dataAux.ubicacion= this.data.value.ubicacion,
    dataAux.danioMaterial= {
      id : this.idDanioMaterial
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
          this.preliminarService.createInfraestructuraRiesgo(dataAux).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.closeModal()
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  getSelectTipoInfraestructura(event: any) {
    this.data.controls['tipoInfraestructura'].setValue(event.descripcion)
  }

  closeModal() {
    this.activeModal.close();
  }

}
