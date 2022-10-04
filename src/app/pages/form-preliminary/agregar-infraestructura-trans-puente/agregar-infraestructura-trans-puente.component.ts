import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfraestructuraTransMaritimo } from 'src/app/shared/models/preliminar.model';


@Component({
  selector: 'app-agregar-infraestructura-trans-puente',
  templateUrl: './agregar-infraestructura-trans-puente.component.html',
  styleUrls: ['./agregar-infraestructura-trans-puente.component.scss']
})
export class AgregarInfraestructuraTransPuenteComponent implements OnInit {

  public data: FormGroup;

  public maestrasInfraestructura : any
  public infraestructura : any
  public showLoader: boolean = false;
  public status : number = 0
  public id : any
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
      cantidadInhabitable: [],
      ubicacion: [],
      observacion: []
    })
    this.getMaestraInfraestructura()  
  }

  
  ngOnInit(): void {    
    this.status = this.parametros.status;
    if(this.status == 1){
      this.id = this.parametros.id;
      this.getInfraestructuraById(this.id)       
    }
    this.idDanioMaterial = this.parametros.idDanioMaterial;
    
  }

  detalles(){
    
  }
  getMaestraInfraestructura(){
    this.preliminarService.getMaestraTipoInfraestructura().subscribe(
      response => {
        this.maestrasInfraestructura = response
        
      }
    )
  }

  getInfraestructuraById(id : number){
    this.preliminarService.getInfraestructuraByIdTransMaritimo(id).subscribe(
      response => {
        //this.data = response
        this.data.controls['idTipoInfraestructura'].setValue(response.idTipoInfraestructura)
        this.data.controls['tipoInfraestructura'].setValue(response.tipoInfraestructura)
        this.data.controls['cantidadDestruido'].setValue(response.cantidadDestruido)
        this.data.controls['cantidadAfectado'].setValue(response.cantidadAfectado)
        this.data.controls['cantidadInhabitable'].setValue(response.cantidadInhabitable)
        this.data.controls['ubicacion'].setValue(response.ubicacion)
        this.data.controls['observacion'].setValue(response.observacion)
      }
    )
  }

  addData(){
    let dataAux : InfraestructuraTransMaritimo = { }
      dataAux.idTipoInfraestructura = this.data.value.idTipoInfraestructura,
      dataAux.tipoInfraestructura = this.data.value.tipoInfraestructura,
      dataAux.cantidadDestruido= this.data.value.cantidadDestruido,
      dataAux.cantidadAfectado= this.data.value.cantidadAfectado,
      dataAux.cantidadInhabitable= this.data.value.cantidadInhabitable,
      dataAux.ubicacion= this.data.value.ubicacion,
      dataAux.observacion=this.data.value.observacion,
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
          this.preliminarService.createInfraestructuraTransMaritimo(dataAux).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.closeModal()
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  getMaestraNivelEducativoDescripcion(descripcion:string){
    var id = 0
    this.maestrasInfraestructura.forEach((e : any) => {
      if(e.descripcion == descripcion) id = e.id
    });
    return id
  }

  getSelectPeligro(event :any){
    this.data.controls['tipoInfraestructura'].setValue(event.descripcion)      
  }
  closeModal() {
    this.activeModal.close();
  }
}


