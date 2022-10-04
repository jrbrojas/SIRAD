import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DanioMaterial, TransporteTerrestre } from 'src/app/shared/models/preliminar.model';

@Component({
  selector: 'app-agregar-infraestructura-transporte.component',
  templateUrl: './agregar-infraestructura-transporte.component.html',
  styleUrls: ['./agregar-infraestructura-transporte.component.scss']
})
export class AgregarInfraestructuraTransporteComponent implements OnInit {

  public data: FormGroup;

  public maestrasTipoTransporteTerrestre: any
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
      idTipoVia: [],
      tipoVia: [],
      mlDestruido: [],
      mlAfectado: [],
      cantidadTramo: [],
      ubicacion: [],
      observacion: [],
    })
  }


  ngOnInit(): void {
    this.status = this.parametros.status;
    this.idDanioMaterial = this.parametros.idDanioMaterial;
    if (this.status == 1) {
      this.id = this.parametros.id;
      this.getTipoTransporteTerrestreById(this.id)
    }
    this.getMaestraTipoTransporteTerrestre()
  }

  getMaestraTipoTransporteTerrestre() {
    this.preliminarService.getMaestraTipoVia().subscribe(
      response => {
        this.maestrasTipoTransporteTerrestre = response
      }
    )
  }

  getTipoTransporteTerrestreById(id: number) {
    this.preliminarService.getTransporteTerrestreById(id).subscribe(
      response => {
        this.data.controls['idTipoVia'].setValue(response.idTipoVia)
        this.data.controls['tipoVia'].setValue(response.tipoVia)
        this.data.controls['mlDestruido'].setValue(response.mlDestruido)
        this.data.controls['mlAfectado'].setValue(response.mlAfectado)
        this.data.controls['cantidadTramo'].setValue(response.cantidadTramo)
        this.data.controls['ubicacion'].setValue(response.ubicacion)
        this.data.controls['observacion'].setValue(response.observacion)
      }
    )
  }

  addData() {
    let dataAux : TransporteTerrestre = { }
      dataAux.idTipoVia = this.data.value.idTipoVia,
      dataAux.tipoVia = this.data.value.tipoVia,
      dataAux.mlDestruido= this.data.value.mlDestruido,
      dataAux.mlAfectado= this.data.value.mlAfectado,
      dataAux.cantidadTramo= this.data.value.cantidadTramo,
      dataAux.ubicacion= this.data.value.ubicacion,
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
          this.preliminarService.createTransporteTerrestre(dataAux).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.closeModal()
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );

  }

  getSelectTipoVia(event :any){
    this.data.controls['tipoVia'].setValue(event.descripcion)
  }

  closeModal() {
    this.activeModal.close();
  }
}
