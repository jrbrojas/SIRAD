import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DanioMaterial, Infraestructura } from 'src/app/shared/models/preliminar.model';

@Component({
  selector: 'app-agregar-danio-instalacion-vehiculo',
  templateUrl: './agregar-danio-instalacion-vehiculo.component.html',
  styleUrls: ['./agregar-danio-instalacion-vehiculo.component.scss']
})
export class AgregarDanioInstalacionVehiculoComponent implements OnInit {
  
  public data: FormGroup;

  public tipoVehiculo: any
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
      idTipoInstalacion: ['', Validators.required],
      instalacion:[],
      entidad: [],
      cantidadDestruida: [],
      cantidadInhabitableInoperativo: [],
      cantidadAfectada: [],
      observacion: [],
    })
    
  }


  ngOnInit(): void {
    this.status = this.parametros.status;
    this.idDanioMaterial = this.parametros.idDanioMaterial;
    if (this.status == 1) {
      this.id = this.parametros.id;
      this.getTipoinstalacionById(this.id)
    }
    this.getMaestraFuncionamiento();
  }

  getMaestraFuncionamiento() {
    this.preliminarService.getMaestraTipoVehiculo().subscribe(
      response => {
        this.tipoVehiculo = response
        console.log(this.tipoVehiculo);
      }
    )
  }

  getTipoinstalacionById(id: number) {
    this.preliminarService.getDanioMaterialById(id).subscribe(
      response => {
        this.data.controls['idTipoInstalacion'].setValue(response.idTipoInstalacion)
        this.data.controls['instalacion'].setValue(response.instalacion)
        this.data.controls['entidad'].setValue(response.entidad)
        this.data.controls['cantidadDestruida'].setValue(response.cantidadDestruida)
        this.data.controls['cantidadInhabitableInoperativo'].setValue(response.cantidadInhabitableInoperativo)
        this.data.controls['cantidadAfectada'].setValue(response.cantidadAfectada)
        this.data.controls['observacion'].setValue(response.observacion)

      }
    )
  }

  addData() {
    let dataAux : DanioMaterial = { }
      dataAux.idTipoInstalacion = this.data.value.idTipoInstalacion,
      dataAux.instalacion = this.data.value.instalacion,
      dataAux.entidad= this.data.value.entidad,
      dataAux.cantidadDestruida= this.data.value.cantidadDestruida,
      dataAux.cantidadInhabitableInoperativo= this.data.value.cantidadInhabitableInoperativo,
      dataAux.cantidadAfectada= this.data.value.cantidadAfectada,
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
          this.preliminarService.createDanioMaterial(dataAux).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.closeModal()
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  getSelectTipoInstalacion(event :any){
    this.data.controls['instalacion'].setValue(event.descripcion)
  }

  closeModal() {
    this.activeModal.close();
  }
}
