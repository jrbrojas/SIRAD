import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import Swal from 'sweetalert2';

export interface keyWords {
  name: string;
}

interface Options {
  value: string;
  viewValue: string;
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

@Component({
  selector: 'app-add-subcategories-modal',
  templateUrl: './add-subcategories-modal.component.html',
  styleUrls: ['./add-subcategories-modal.component.scss']
})

export class AddSubcategoriesModalComponent implements OnInit {

  atributosItem: FichaEvaluacionSegmentos = new FichaEvaluacionSegmentos();
  formFichaEvaluacion: FichaEvaluacion = new FichaEvaluacion();

  options: Options[] = [
    {value: '1', viewValue: 'Si'},
    {value: '2', viewValue: 'No'},
  ];

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
    this.atributosItem.fichaEvaluacionDetalleSegmentos.push({
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'Departamento',
      numRespuesta: 1,
      txtObservacion: 'Nombre del Departamento',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'Provincia',
      numRespuesta: 1,
      txtObservacion: 'Nombre de la Provincia',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'Distrito',
      numRespuesta: 1,
      txtObservacion: 'Nombre del Distrito',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'Nombre',
      numRespuesta: 1,
      txtObservacion: 'Nombre del Recurso',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    })
  }

  closeModal(){
    this.modalService.dismissAll()
    
  }

  
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keyWords: keyWords[] = [];

  addOnBlur1 = true;
  readonly separatorKeysCodes1 = [ENTER, COMMA] as const;
  keyWords1: keyWords[] = [];

  addOnBlur2 = true;
  readonly separatorKeysCodes2 = [ENTER, COMMA] as const;
  keyWords2: keyWords[] = [];
  
  addOnBlur3 = true;
  readonly separatorKeysCodes3 = [ENTER, COMMA] as const;
  keyWords3: keyWords[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keyWords.push({name: value});
    }
    event.chipInput!.clear();
  }

  add1(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keyWords1.push({name: value});
    }
    event.chipInput!.clear();
  }

  add2(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keyWords2.push({name: value});
    }
    event.chipInput!.clear();
  }

  add3(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keyWords3.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(fruit: keyWords): void {
    const index = this.keyWords.indexOf(fruit);
    if (index >= 0) {
      this.keyWords.splice(index, 1);
    }
  }

  remove1(fruit: keyWords): void {
    const index = this.keyWords1.indexOf(fruit);
    if (index >= 0) {
      this.keyWords1.splice(index, 1);
    }
  }

  remove2(fruit: keyWords): void {
    const index = this.keyWords2.indexOf(fruit);
    if (index >= 0) {
      this.keyWords2.splice(index, 1);
    }
  }
  remove3(fruit: keyWords): void {
    const index = this.keyWords3.indexOf(fruit);
    if (index >= 0) {
      this.keyWords3.splice(index, 1);
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
        item.fichaEvaluacionDetalleSegmentos.splice(index, 1);
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
  // ngAgregarDetalleSegmento(item: FichaEvaluacionSegmentos) {
  //   item.fichaEvaluacionDetalleSegmentos.push({
  //     numId: 0,
  //     numIdTipoRespuesta: 0,
  //     txtPregunta: '',
  //     numRespuesta: 0,
  //     txtObservacion: '',
  //     fichaEvaluacionDetalleSegmentosOpcionesRespuestas: []
  //   })
  // }

  ngAgregarSegmentoOpcionesRespuesta(item: FichaEvaluacionDetalleSegmentosOpcionesRespuestas[]) {
    item.push( {
      numId: 0,
      txtOpcionRespuesta: ''
    });
  }

}
