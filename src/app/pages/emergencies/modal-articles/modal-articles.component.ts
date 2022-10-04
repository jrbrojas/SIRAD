import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { elementAt } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { EmergencyAtentionService } from 'src/app/shared/services/emergency-atention.service';
import { ModalArticleCareComponent } from '../modal-article-care/modal-article-care.component';

@Component({
  selector: 'app-modal-articles',
  templateUrl: './modal-articles.component.html',
  styleUrls: ['./modal-articles.component.scss']
})
export class ModalArticlesComponent implements OnInit {

  @Input() public codigo_sinpad;
  public arr_articulosAtencion: Array<any> = []
  public dataArticulos: any

  constructor(
    private modalService: NgbModal,
    private emergencyAtentionService: EmergencyAtentionService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.getAllArticles(this.codigo_sinpad);

  }


  closeModal() {
    this.modalService.dismissAll();
  }

  getAllArticles(codigo_sinpad) {
    this.arr_articulosAtencion = [];
    this.emergencyAtentionService.obtenerArticulosAtencion(codigo_sinpad).subscribe(
      data => {
        data.forEach(element => {
          this.arr_articulosAtencion.push(element)
        })


        let result = []
        let distintos = [...new Set(this.arr_articulosAtencion.map(x => x.TIPO_RECURSO))]
        distintos.forEach((d: any) => {
          let array1 = {
            "general": [],
            "especifica": [],
          }

          let inicio = true
          let contador = 0
          let sum = 0;
          this.arr_articulosAtencion.forEach((e: any) => {
            if (e.TIPO_RECURSO == d) {
              
              if (inicio) {
                let aux = {
                  "TIPO_RECURSO": e.TIPO_RECURSO,
                  "CANTIDAD": e.CANTIDAD,
                  "ID_ARTICULO_EMERGENCIA": e.ID_ARTICULO_EMERGENCIA,
                  "CODIGO_SINPAD": e.CODIGO_SINPAD,
                }
                
                array1.general.push(aux)
                inicio = false
              }
              sum += e.CANTIDAD_ATENDIDO

              let aux2 = {
                "ID_TIPO_RECURSO_ATENDIDO": e.ID_TIPO_RECURSO_ATENDIDO,
                "TIPO_RECURSO_ATENDIDO": e.TIPO_RECURSO_ATENDIDO,
                "CANTIDAD_ATENDIDO": e.CANTIDAD_ATENDIDO,
                "ID_TIPO_RECURSO": e.ID_TIPO_RECURSO,
                "END": false,
                "TOTAL": sum,
              }
              array1.especifica.push(aux2)
            }
            contador++
          });
          result.push(array1)
        });
        result.forEach((r: any) => {
          r.general = r.general[0]
          let cantidadDeEspecificas = r.especifica.length
          r.especifica[cantidadDeEspecificas-1].END = true
        });
        this.dataArticulos = result
      }
    )

  }

  getCantidad(total : number, contador : number, especifica : any,general : any){
    let resultado = 0
    if(contador == 0){
      resultado = total - especifica[0].CANTIDAD_ATENDIDO
    } 
    else{
      let suma = 0
      for(let i = 0; i <= contador; i++ ){
        suma += especifica[i].CANTIDAD_ATENDIDO
      }
      resultado = total - suma;
    }    
    general.ultimo = resultado
    
    return resultado
  }


  deleteArticleAtention(id_articulo_emergencia) {
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar el articulo de la atencion?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {

        if (result.value) {

          this.emergencyAtentionService.eliminarArticuloAtencion(id_articulo_emergencia).subscribe(
            response => {
              this.ngOnInit()
            }
          )
        } else {

        }
      }
    )
  }

  addEmergencyArticleAtention(general,especifico) {
    this.closeModal();
    const modalRef = this.modalService.open(ModalArticleCareComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static'
    })

    modalRef.componentInstance.id_articulo_emergencia = general.ID_ARTICULO_EMERGENCIA; //Identificador de articulo por atender
    modalRef.componentInstance.tipo_recurso = general.TIPO_RECURSO;
    modalRef.componentInstance.cantidad = general.CANTIDAD;
    modalRef.componentInstance.id_recurso_atendido = especifico.ID_TIPO_RECURSO_ATENDIDO;
    modalRef.componentInstance.tipo_recurso_atendido = especifico.TIPO_RECURSO_ATENDIDO;
    modalRef.componentInstance.cantidad_atendido = especifico.CANTIDAD_ATENDIDO;
    modalRef.componentInstance.codigo_sinpad = general.CODIGO_SINPAD;
    modalRef.componentInstance.id_tipo_recurso = especifico.ID_TIPO_RECURSO;
    modalRef.componentInstance.parametros = {
      "general" : general,
      "especifico" : especifico
    }
    
    modalRef.result.then((res) => {
      this.getAllArticles(this.codigo_sinpad)
    }, (reason) =>{
      this.getAllArticles(this.codigo_sinpad)
    })
    


  }


}
