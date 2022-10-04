import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { InfraestructuraReserva, InfraestructuraServiciosBasicos, LocalPublico } from 'src/app/shared/models/preliminar.model';
@Component({
  selector: 'app-agregar-locals-publicos',
  templateUrl: './agregar-locals-publicos.component.html',
  styleUrls: ['./agregar-locals-publicos.component.scss']
})
export class AgregarLocalsPublicosComponent implements OnInit {

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
      idTipoLocalPublico: [],
      tipoLocalPublico: [],
      cantidadDestruido: [],
      cantidadAfectado: [],
      cantidadInhabitable: [],
    })
    
  }


  ngOnInit(): void {
    this.status = this.parametros.status;
    this.idDanioMaterial = this.parametros.idDanioMaterial;
    if (this.status == 1) {
      this.id = this.parametros.id;
      this.getInfraestructuraById(this.id)
    }
    this.getMaestraLocalesPublicos()
  }

  getMaestraLocalesPublicos(){
    this.preliminarService.getMaestraLocalesPublicos().subscribe(
      response => {
        this.maestrasInfraestructura = response
        
      }
    )
  }

  getInfraestructuraById(id: number) {
    this.preliminarService.getLocalesPublicosById(id).subscribe(
      response => {
        this.data.controls['idTipoLocalPublico'].setValue(response.idTipoLocalPublico)
        this.data.controls['tipoLocalPublico'].setValue(response.tipoLocalPublico)
        this.data.controls['cantidadDestruido'].setValue(response.cantidadDestruido)
        this.data.controls['cantidadAfectado'].setValue(response.cantidadAfectado)
        this.data.controls['cantidadInhabitable'].setValue(response.cantidadInhabitable)
      }
    )
  }

  addData() {
    let dataAux :  LocalPublico= { }
      dataAux.idTipoLocalPublico = this.data.value.idTipoLocalPublico,
      dataAux.tipoLocalPublico = this.data.value.tipoLocalPublico,
      dataAux.cantidadDestruido= this.data.value.cantidadDestruido,
      dataAux.cantidadAfectado= this.data.value.cantidadAfectado,
      dataAux.cantidadInhabitable= this.data.value.cantidadInhabitable,
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
          this.preliminarService.createLocalesPublicos(dataAux).subscribe((res: any) => {
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
    this.data.controls['tipoLocalPublico'].setValue(event.descripcion)      
  }

  
  closeModal() {
    this.activeModal.close();
  }
}
