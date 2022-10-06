import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public dataSubCategories : Array<any> = []
  public updateFormSubCategories : FormGroup;

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
    private modalService : NgbModal,
    private fb : FormBuilder
  ) { 

    this.updateFormSubCategories = this.fb.group({
      codCategory : ['', [Validators.required]],
      codSubCategory : ['', [Validators.required]],
      nameSubCategory : ['', [Validators.required]],
      keyWords : ['' ,[Validators.required]],
      keyWordsGeo : ['', [Validators.required]],
      summary : ['', [Validators.required]],
      infoExtended : ['', [Validators.required]],
      infoDate : ['', [Validators.required]],
      updateDateFinal : ['', [Validators.required]],
      dataSource : ['', [Validators.required]],
      generalManager : ['', [Validators.required]],
      reponsibleInfoLayer : ['', [Validators.required]],
      contactDataSource : ['', [Validators.required]],
      typeGeo : ['', [Validators.required]],
      systemCoord : ['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.dataSubCategories.push({
      codCategory : 'C0001',
      codSubCategory : 'SB0001',
      nameSubCategory : 'Plantas de Agua Potable',
      keyWords : ['Agua Potable'],
      keyWordsGeo : 'Lima/Callao',
      summary : `Descripción básica de las plantas de producción de agua potable en términos de producción y de tipo de instalaciones, reservorios etc…`,
      infoExtended : `Proyecto “Elaboración de un Sistema de Información Geográfico y Análisis de Recursos Esenciales para la Respuesta y Recuperación Temprana ante la Ocurrencia de un sismo y/o Tsunami en el Área Metropolitana de Lima y Callao” (Proyecto SIRAD Convocatoria PNUD/SDP-052/2009 / 22 de abril - 15 febrero 2011).
      Practicas de Jérémy Guilbaud, estudiante ingeniero de la Escuela Nacional de Ciencias Geográficas de Francia.
      `,
      infoDate : '2010',
      updateDateFinal : '2010-07-26',
      dataSource : 'Sedapal',
      generalManager : `Roberto D'Ercole (IRD)`,
      responsibleInfoLayer : 'Pascale Mertzger(IRD)',
      contactDataSource: ['Pierre Vernier', 'Pauline Gluski', 'Jeremy Guilbaud'],
      typeGeo : 'Punto',
      systemCoord: 'EPSG: 32718 - WGS 84 UTM zona 18 sur'

    },
    {
      codCategory : 'C0001',
      codSubCategory : 'SB0002',
      nameSubCategory : 'Pozos',
      keyWords : ['Agua Potable', 'Pozos'],
      keyWordsGeo : 'Lima/Callao',
      summary : `Ubicación y descripción de los pozos administrados por SEDAPAL con elementos técnicos y operacionales relativos a pozos y bombas`,
      infoExtended : `Proyecto “Elaboración de un Sistema de Información Geográfico y Análisis de Recursos Esenciales para la Respuesta y Recuperación Temprana ante la Ocurrencia de un sismo y/o Tsunami en el Área Metropolitana de Lima y Callao” (Proyecto SIRAD Convocatoria PNUD/SDP-052/2009 / 22 de abril - 15 febrero 2011).
      Practicas de Jérémy Guilbaud, estudiante ingeniero de la Escuela Nacional de Ciencias Geográficas de Francia.
      .
      `,
      infoDate : '2010',
      updateDateFinal : '2010-10-08',
      dataSource : 'Sedapal',
      generalManager : `Roberto D'Ercole (IRD)`,
      responsibleInfoLayer : 'Pascale Mertzger(IRD)',
      contactDataSource: ['Pierre Vernier', 'Pauline Gluski', 'Jeremy Guilbaud'],
      typeGeo : 'Punto',
      systemCoord: 'EPSG: 32718 - WGS 84 UTM zona 18 sur'
    })

    this.getDetailsSubCategory();


  }

  getDetailsSubCategory(){
    this.updateFormSubCategories.controls['nameSubCategory'].setValue(this.dataSubCategories[0].nameSubCategory)
    this.updateFormSubCategories.controls['keyWords'].setValue(this.dataSubCategories[0].keyWords)
    this.updateFormSubCategories.controls['keyWordsGeo'].setValue(this.dataSubCategories[0].keyWordsGeo)
    this.updateFormSubCategories.controls['summary'].setValue(this.dataSubCategories[0].summary)
    this.updateFormSubCategories.controls['infoExtended'].setValue(this.dataSubCategories[0].infoExtended)
    this.updateFormSubCategories.controls['infoDate'].setValue(this.dataSubCategories[0].infoDate)
    this.updateFormSubCategories.controls['updateDateFinal'].setValue(this.dataSubCategories[0].updateDateFinal)
    this.updateFormSubCategories.controls['dataSource'].setValue(this.dataSubCategories[0].dataSource)
    this.updateFormSubCategories.controls['generalManager'].setValue(this.dataSubCategories[0].generalManager)
    this.updateFormSubCategories.controls['responsibleInfoLayer'].setValue(this.dataSubCategories[0].responsibleInfoLayer)
    this.updateFormSubCategories.controls['contactDataSource'].setValue(this.dataSubCategories[0].contactDataSource)
    this.updateFormSubCategories.controls['typeGeo'].setValue(this.dataSubCategories[0].typeGeo)
    this.updateFormSubCategories.controls['systemCoord'].setValue(this.dataSubCategories[0].systemCoord)
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
