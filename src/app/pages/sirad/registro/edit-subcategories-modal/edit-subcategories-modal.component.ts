import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

export interface Fruit {
  name: string;
}

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

  
  atributosItem: FichaEvaluacionSegmentos = new FichaEvaluacionSegmentos();

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
      keyWords : [],
      keyWordsGeo : 'Lima/Callao',
      summary : `Descripción básica de las plantas de producción de agua potable en términos de producción y de tipo de instalaciones, reservorios etc…`,
      infoExtended : `Proyecto “Elaboración de un Sistema de Información Geográfico y Análisis de Recursos Esenciales para la Respuesta y Recuperación Temprana ante la Ocurrencia de un sismo y/o Tsunami en el Área Metropolitana de Lima y Callao” (Proyecto SIRAD Convocatoria PNUD/SDP-052/2009 / 22 de abril - 15 febrero 2011).
      Practicas de Jérémy Guilbaud, estudiante ingeniero de la Escuela Nacional de Ciencias Geográficas de Francia.
      `,
      infoDate : '2010',
      updateDateFinal : '2010-07-26',
      dataSource : 'Sedapal',
      generalManager : `Roberto D'Ercole (IRD)`,
      responsibleInfoLayer1 : 'Pascale Mertzger(IRD)',
      responsibleInfoLayer2 : 'Pascale Mertzger(IRD)',
      responsibleInfoLayer3 : 'Pascale Mertzger(IRD)',
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
      responsibleInfoLayer1 : 'Pascale Mertzger(IRD)',
      responsibleInfoLayer2 : 'Pascale Mertzger(IRD)',
      responsibleInfoLayer3 : 'Pascale Mertzger(IRD)',
      contactDataSource: ['Pierre Vernier', 'Pauline Gluski', 'Jeremy Guilbaud'],
      typeGeo : 'Punto',
      systemCoord: 'EPSG: 32718 - WGS 84 UTM zona 18 sur'
    })

    //hola mundo

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
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'ID_CCSS',
      numRespuesta: 1,
      txtObservacion: 'Código del centro de servicios del que depende el pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'NOMB_CCSS',
      numRespuesta: 1,
      txtObservacion: 'Nombre del centro de servicios del que depende el pozo)',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'UBIGEO',
      numRespuesta: 1,
      txtObservacion: 'Código del distrito Ejemplo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'NRO_PZ',
      numRespuesta: 1,
      txtObservacion: 'El primer grupo permite calificar la accesibilidad interna y considera la densidad de la red vial, la densidad de la red principal, el porcentaje del territorio de la zona a más de 500m de la red principal, el ancho promedio de las vías y el porcentaje del territorio de la zona ocupando cerros.',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'NOM_PZ',
      numRespuesta: 1,
      txtObservacion: 'Nombre del pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'EST_PZ',
      numRespuesta: 1,
      txtObservacion: 'Estado del pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'ME_MARCA',
      numRespuesta: 1,
      txtObservacion: 'Marca del motor eléctrico del pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'ME_HP',
      numRespuesta: 1,
      txtObservacion: 'Potencia del motor eléctrico del pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'ME_AMP',
      numRespuesta: 1,
      txtObservacion: 'Amperaje del motor eléctrico del pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'ME_VOL',
      numRespuesta: 1,
      txtObservacion: 'Voltaje del motor eléctrico del pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'BO_LGBM',
      numRespuesta: 1,
      txtObservacion: 'Longitud de la bomba en metros',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'BO_TIPO',
      numRespuesta: 1,
      txtObservacion: 'Tipo de bomba utilizada',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'BO_MARCA',
      numRespuesta: 1,
      txtObservacion: 'Marca de la bomba utilizada',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'BO_MODEL',
      numRespuesta: 1,
      txtObservacion: 'Modelo de bomba utilizada',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'PZ_EQUIP',
      numRespuesta: 1,
      txtObservacion: 'Estado del equipamiento del pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'VAL_DIAM',
      numRespuesta: 1,
      txtObservacion: 'Diámetro del la válvula del pozo en pulgadas',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'VAL_VW',
      numRespuesta: 1,
      txtObservacion: 'Vuelta de trabajo de la válvula en vatios',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'VAL_VT',
      numRespuesta: 1,
      txtObservacion: 'Vuelta total de la válvula en vatios',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'CO_NE_M',
      numRespuesta: 1,
      txtObservacion: 'Cota de nivel estático del pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'CO_ND_M',
      numRespuesta: 1,
      txtObservacion: 'Cota de nivel estático del pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'CO_P1_LBS',
      numRespuesta: 1,
      txtObservacion: 'Presión de salida con el número de vueltas de trabajo de la válvula en psi (libras por pulgadas cuadradas)',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'CO_P2_LBS',
      numRespuesta: 1,
      txtObservacion: 'Presión de salida con el número total de vueltas de la válvula en psi (libras por pulgadas cuadradas)',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'CO_Q_LS',
      numRespuesta: 1,
      txtObservacion: 'Caudal del pozo en litros por segundo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'PROF_PZ',
      numRespuesta: 1,
      txtObservacion: 'Profundidad del pozo en metros',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'HRS_DIA',
      numRespuesta: 1,
      txtObservacion: 'Número de horas de funcionamiento del pozo por ',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'DIAS_MES',
      numRespuesta: 1,
      txtObservacion: 'Número de días de funcionamiento del pozo por mes ',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'PROD_MM3',
      numRespuesta: 1,
      txtObservacion: 'Producción total del pozo en miles de metros cúbicos',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'X_UTM',
      numRespuesta: 1,
      txtObservacion: 'Coordenada X del pozo en UTM',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 3,
      txtPregunta: 'Y_UTM',
      numRespuesta: 1,
      txtObservacion: 'Coordenada Y del pozo en UTM',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'OBS',
      numRespuesta: 1,
      txtObservacion: 'Observación sobre el pozo',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'FUENTE',
      numRespuesta: 1,
      txtObservacion: 'Fuente de los datos sobre el pozo en Sedapal',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'ESENCIAL',
      numRespuesta: 1,
      txtObservacion: 'Nivel de esencialidad o de importancia del objeto',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'ACCES_NOC ',
      numRespuesta: 1,
      txtObservacion: 'Valor de la accesibilidad, durante la noche, de la zona en la cual se ubica el objeto. Para definir la accesibilidad de las zonas, se consideran 2 grupos de variables: - Enúmero de entradas y salidas (excluyendo los puentes y pasos a desnivel), y un valor de permeabilidad del perímetro en función de su naturaleza (ninguna permeabilidad para los límites tipo “cerro”, “espacio cerrado” y “mar”; permeabilidad limitada para los límites tipo “río” y “vía a desnivel” en función de la cantidad de puentes por km; el resto no presenta problema de permeabilidad).',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
    }, {
      numId: 1,
      numIdTipoRespuesta: 1,
      txtPregunta: 'ACCES_DIA ',
      numRespuesta: 1,
      txtObservacion: 'Calidad de la accesibilidad, durante el día, de la zona de accesibilidad en la cual se ubica el objeto. La accesibilidad de día ha sido calculada a partir de la accesibilidad de noche, a la cual se ha añadido una variable de congestión vehicular (número de puntos de congestión por kilómetro de vías principales en la zona).',
      fichaEvaluacionDetalleSegmentosOpcionesRespuestas: [],
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
    this.updateFormSubCategories.controls['responsibleInfoLayer1'].setValue(this.dataSubCategories[0].responsibleInfoLayer1)
    this.updateFormSubCategories.controls['responsibleInfoLayer2'].setValue(this.dataSubCategories[0].responsibleInfoLayer2)
    this.updateFormSubCategories.controls['responsibleInfoLayer3'].setValue(this.dataSubCategories[0].responsibleInfoLayer3)
    this.updateFormSubCategories.controls['contactDataSource'].setValue(this.dataSubCategories[0].contactDataSource)
    this.updateFormSubCategories.controls['typeGeo'].setValue(this.dataSubCategories[0].typeGeo)
    this.updateFormSubCategories.controls['systemCoord'].setValue(this.dataSubCategories[0].systemCoord)
  }


  closeModal(){
    this.modalService.dismissAll()
  }


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keyWords: keyWords[] = [{ name: 'Agua Potable' }];

  addOnBlur1 = true;
  readonly separatorKeysCodes1 = [ENTER, COMMA] as const;
  keyWords1: keyWords[] = [{ name: 'Carlos Cabrera' }];

  addOnBlur2 = true;
  readonly separatorKeysCodes2 = [ENTER, COMMA] as const;
  keyWords2: keyWords[] = [{ name: 'Juan Gomez' }];
  
  addOnBlur3 = true;
  readonly separatorKeysCodes3 = [ENTER, COMMA] as const;
  keyWords3: keyWords[] = [{ name: 'Jose Rojas' }];

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
        //item.splice(index, 1);
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

  ngAgregarSegmentoOpcionesRespuesta(item: FichaEvaluacionDetalleSegmentosOpcionesRespuestas[]) {
    item.push( {
      numId: 0,
      txtOpcionRespuesta: ''
    });
  }

}
