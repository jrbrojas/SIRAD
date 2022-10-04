import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ArticuloAtendido, Recursos } from 'src/app/shared/models/emergency.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { EmergencyAtentionService } from 'src/app/shared/services/emergency-atention.service';
import { RecursosService } from 'src/app/shared/services/recursos.service';
import { ModalArticlesComponent } from '../modal-articles/modal-articles.component';

@Component({
  selector: 'app-modal-article-care',
  templateUrl: './modal-article-care.component.html',
  styleUrls: ['./modal-article-care.component.scss']
})
export class ModalArticleCareComponent implements OnInit {

  @Input() public id_articulo_emergencia //identificador de articulo por atender
  @Input() public tipo_recurso
  @Input() public cantidad
  @Input() public id_recurso_atendido
  @Input() public tipo_recurso_atendido
  @Input() public cantidad_atendido
  @Input() public codigo_sinpad
  @Input() public id_tipo_recurso
  @Input() public parametros

  public arr_recursos : any;
  public recursos : any;
  public comboRecursos : any ;
  public viewEditRecursoAtendido : FormGroup;
  public codArticle = '';
  constructor(
    private fb : FormBuilder,
    private recursosService : RecursosService,
    private modalService : NgbModal,
    private alertService : AlertService,
    private emergencyAtentionService : EmergencyAtentionService
  ) { 
    this.viewEditRecursoAtendido = this.fb.group({
      recurso : [[Validators.required]],
      cantidadAtendido : ['', [Validators.required]]
    })
  }

  ngOnInit(): void {    
    this.listArticles(this.id_tipo_recurso)   
  }

  closeModal() {
    this.modalService.dismissAll();
    this.viewArticles(this.codigo_sinpad)
  }

  obtenerCode(event){
    this.getCodeArticle(this.id_tipo_recurso, event)
  }
  
  getCodeArticle(id, desc_articulo){
    this.recursosService.listarRecursos(id).subscribe(
      data => {
       
        data.forEach(element => {
          if(element.desc_articulo === desc_articulo){
            this.codArticle = element.id_articulo
          }
        })        
      }
    )
  }


  addEditArticleAtention(){ 
    if(this.parametros.general.ultimo < this.viewEditRecursoAtendido.value.cantidadAtendido){
      this.alertService.toastError(
        `Cantidad maximo a asignar: ${this.parametros.general.ultimo}`,
        `Error`
      )
    }
    else{
      const data : ArticuloAtendido ={
        tipo_recurso : this.viewEditRecursoAtendido.value.recurso,
        cantidad : this.viewEditRecursoAtendido.value.cantidadAtendido,
        codigo_sinpad : this.codigo_sinpad,
        fecha_hora_registro : moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
        id_tipo_recurso : this.codArticle,
        habilitado : 1,
        id_articulo_emergencia : this.id_articulo_emergencia
  
      }
      this.alertService.questionAlertConfirm(
        '¿Está seguro de agregar este articulo atendido?',
        '',
        'Si, Crear',
        TYPE_ALERT.QUESTION
      ).then(
        (result) => {
          if(result.value){
            this.emergencyAtentionService.agregarRecursoAtendido(data).subscribe(
              response => {
                this.closeModal()
                this.viewArticles(data.codigo_sinpad)
              }
            )
          }
        }
      )
    }
  }





  listArticles(id){
    this.recursosService.listarRecursos(id).subscribe(
      data => {
        let x : Array<any> = [];        
        data.forEach(element =>{
         x.push(element.desc_articulo)
        }) 
        this.recursos = x
      }
    )

  }

  viewArticles(codigo_sinpad){
    const modalRef = this.modalService.open(ModalArticlesComponent, {
      size : 'xl',
      ariaLabelledBy : 'modal',
      centered : false,
      windowClass : 'modal',
      backdrop : 'static'
    })

    modalRef.componentInstance.codigo_sinpad = codigo_sinpad;
  }




}
