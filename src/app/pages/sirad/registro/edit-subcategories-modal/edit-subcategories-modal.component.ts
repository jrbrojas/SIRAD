import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

export interface keyWords {
  name: string;
}

export class FichaEvaluacionPreguntas {
  numId: number = 0;
  numIdTipoRespuesta: number = 0;
  txtPregunta: string = '';
}

export class FichaEvaluacionDetalleInstitucionesParticipantes {
  numId: number = 0;
  txtNombreInstitucion: string = '';
}

export class FichaEvaluacionSegmentos {
  numId: number = 0;
  txtTituloSegmento: string = '';
  fichaEvaluacionDetalleSegmentos: FichaEvaluacionDetalleSegmentos[] = [];
}

export class FichaEvaluacionDetalleSegmentos {
  numId: number = 0;
  numIdTipoRespuesta: number = 0;
  txtPregunta: string = '';
  numRespuesta: number = 0;
  txtObservacion: string = '';
  fichaEvaluacionDetalleSegmentosOpcionesRespuestas: FichaEvaluacionDetalleSegmentosOpcionesRespuestas[] = [];
}

export class FichaEvaluacionDetalleSegmentosOpcionesRespuestas {
  numId: number = 0;
  txtOpcionRespuesta: string = '';
}

export class FichaEvaluacion {
  numId: number = 0;
  txtTitulo: string = '';
  //txtNombreDireccion: string = '';
  //numIdEntidadSector: number = 0;
  //txtEscalaPonderaciones: string = '';
  //numCantidadParticipantesEntidad: number = 0;
  //numCantidadParticipantesGrupoTrabajo: number = 0;
  //numCantidadParticipantes: number = 0;
  //numCantidadInstituciones: number = 0;
  fichaEvaluacionDetalleInstitucionesParticipantes: FichaEvaluacionDetalleInstitucionesParticipantes[] = [];
  fichaEvaluacionSegmentos: FichaEvaluacionSegmentos[] = [];
  fichaEvaluacionPreguntasInicio: FichaEvaluacionPreguntas[] = [];
  fichaEvaluacionPreguntasFin: FichaEvaluacionPreguntas[] = [];
}

@Component({
  selector: 'app-edit-subcategories-modal',
  templateUrl: './edit-subcategories-modal.component.html',
  styleUrls: ['./edit-subcategories-modal.component.scss']
})
export class EditSubcategoriesModalComponent implements OnInit {

  formFichaEvaluacion: FichaEvaluacion = new FichaEvaluacion();


  dataTipoRespuesta = [
    {
      numId: 1,
      txtNombre: 'Numero'
    }, 
    {
      numId: 2,
      txtNombre: 'Texto Corto'
    },
    {
      numId: 3,
      txtNombre: 'Texto Largo'
    },
    {
      numId: 4,
      txtNombre: 'Selección Unica'
    },
    {
      numId: 5,
      txtNombre: 'Selección Multiple'
    }
  ];

  constructor(
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalService.dismissAll()
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keyWords: keyWords[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.keyWords.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: keyWords): void {
    const index = this.keyWords.indexOf(fruit);

    if (index >= 0) {
      this.keyWords.splice(index, 1);
    }
  }

  ngAgregarSegmento(){
    this.formFichaEvaluacion.fichaEvaluacionSegmentos.push({
      numId: 0,
      txtTituloSegmento: '',
      fichaEvaluacionDetalleSegmentos: []
    })
  }

  ngEliminarItem(item: any, index: number) {
    Swal.fire({
      title: '¿Esta seguro de eliminar el item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        item.splice(index, 1);
        Swal.fire(
          'Eliminado!',
          'Eliminado correctamente.',
          'success'
        )
      }
    })
  }

  ngAgregarDetalleSegmento(item: FichaEvaluacionSegmentos) {
    item.fichaEvaluacionDetalleSegmentos.push({
      numId: 0,
      numIdTipoRespuesta: 0,
      txtPregunta: '',
      numRespuesta: 0,
      txtObservacion: '',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: []
    })
  }

  ngAgregarSegmentoOpcionesRespuesta(item: FichaEvaluacionDetalleSegmentosOpcionesRespuestas[]) {
    item.push( {
      numId: 0,
      txtOpcionRespuesta: ''
    });
  }

}
