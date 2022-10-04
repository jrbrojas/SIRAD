import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { InfraestructuraEducativa } from 'src/app/shared/models/preliminar.model';

@Component({
  selector: 'app-agregar-infraestructura-educativa',
  templateUrl: './agregar-infraestructura-educativa.component.html',
  styleUrls: ['./agregar-infraestructura-educativa.component.scss']
})
export class AgregarInfraestructuraEducativaComponent implements OnInit {

  public data2 = {
    nombreInstitucion: "",
    totalAula: 0,
    cantidadDestruida: 0,
    cantidadInhabitable: 0,
    cantidadAfectada: 0,
    idSituacionCercoPerimetrico: 1,
    situacionCercoPerimetrico: "",
    idNivelEducativo: 0,
    nivelEducativo: "",
    danioMaterial: {
      id: 1
    }
  }

  public data: FormGroup;

  public maestrasCercoPerimetro: any
  public maestrasNivelEducativo: any
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
      nombreInstitucion: [],
      totalAula: [],
      cantidadDestruida: [],
      cantidadInhabitable: [],
      cantidadAfectada: [],
      idSituacionCercoPerimetrico: [],
      situacionCercoPerimetrico: [],
      idNivelEducativo: [],
      nivelEducativo: [],
    })
    //traer infraestructura
    this.getMaestraCercoPerimetro()
    this.getMaestraNivelEducativo()
  }


  ngOnInit(): void {
    this.status = this.parametros.status;
    this.idDanioMaterial = this.parametros.idDanioMaterial;
    if (this.status == 1) {
      this.id = this.parametros.id;
      this.getInfraestructuraById(this.id)
    }

  }

  getMaestraCercoPerimetro() {
    this.preliminarService.getMaestraCercoPerimetro().subscribe(
      response => {
        this.maestrasCercoPerimetro = response
      }
    )
  }
  getMaestraNivelEducativo() {
    this.preliminarService.getMaestraNivelEducativo().subscribe(
      response => {
        this.maestrasNivelEducativo = response
      }
    )
  }

  getInfraestructuraById(id: number) {
    this.preliminarService.getInfraestructuraByIdEducativa(id).subscribe(
      response => {
        this.data.controls['nombreInstitucion'].setValue(response.nombreInstitucion)
        this.data.controls['totalAula'].setValue(response.totalAula)
        this.data.controls['cantidadDestruida'].setValue(response.cantidadDestruida)
        this.data.controls['cantidadInhabitable'].setValue(response.cantidadInhabitable)
        this.data.controls['cantidadAfectada'].setValue(response.cantidadAfectada)
        this.data.controls['idSituacionCercoPerimetrico'].setValue(response.idSituacionCercoPerimetrico)
        this.data.controls['situacionCercoPerimetrico'].setValue(response.situacionCercoPerimetrico)
        this.data.controls['idNivelEducativo'].setValue(response.idNivelEducativo)
        this.data.controls['nivelEducativo'].setValue(response.nivelEducativo)
      }
    )
  }

  addData() {
    let dataAux : InfraestructuraEducativa = { }
      dataAux.nombreInstitucion = this.data.value.nombreInstitucion,
      dataAux.totalAula = this.data.value.totalAula,
      dataAux.cantidadDestruida = this.data.value.cantidadDestruida,
      dataAux.cantidadInhabitable= this.data.value.cantidadInhabitable,
      dataAux.cantidadAfectada= this.data.value.cantidadAfectada,
      dataAux.idSituacionCercoPerimetrico= this.data.value.idSituacionCercoPerimetrico,
      dataAux.situacionCercoPerimetrico= this.data.value.situacionCercoPerimetrico,
      dataAux.idNivelEducativo=this.data.value.idNivelEducativo,
      dataAux.nivelEducativo=this.data.value.nivelEducativo,
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
          this.preliminarService.createInfraestructuraEducativa(dataAux).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.closeModal()
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  getSelectPerimetro(event :any){
    this.data.controls['situacionCercoPerimetrico'].setValue(event.descripcion)      
  }
  getSelectNivelEducativo(event :any){
    this.data.controls['nivelEducativo'].setValue(event.descripcion)      
  }

  closeModal() {
    this.activeModal.close();
  }

  test() {

  }
}
