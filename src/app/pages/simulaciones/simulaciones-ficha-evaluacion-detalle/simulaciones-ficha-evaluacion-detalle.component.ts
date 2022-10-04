import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  selector: 'app-simulaciones-ficha-evaluacion-detalle',
  templateUrl: './simulaciones-ficha-evaluacion-detalle.component.html',
  styleUrls: ['./simulaciones-ficha-evaluacion-detalle.component.scss']
})
export class SimulacionesFichaEvaluacionDetalleComponent implements OnInit {

  formFichaEvaluacion: FichaEvaluacion = new FichaEvaluacion();

  dataEventoPerfil = [{
      numIdEntidadSector: 1,
      txtPerfilEncargadoNombre: `Camila de la Santísima Trinidad`,
    }, {
      numIdEntidadSector: 2,
      txtPerfilEncargadoNombre: `Juana de la Santísima Cruz`,
    }, {
      numIdEntidadSector: 3,
      txtPerfilEncargadoNombre: `Mónica Patricia de Ávalos Mendoza`,
    }, {
      numIdEntidadSector: 4,
      txtPerfilEncargadoNombre: `Martín Elías de los Ríos Acosta`,
    }, {
      numIdEntidadSector: 5,
      txtPerfilEncargadoNombre: `Valeria Hernández de Vásquez`,
    }, {
      numIdEntidadSector: 6,
      txtPerfilEncargadoNombre: `Rosa María Gómez de Jiménez`,
    }, {
      numIdEntidadSector: 7,
      txtPerfilEncargadoNombre: `Tulia Adriana Meneses de Piedrahíta`,
    }, {
      numIdEntidadSector: 8,
      txtPerfilEncargadoNombre: `Natalia Fernández Vda. de Del Prado`,
    }, {
      numIdEntidadSector: 9,
      txtPerfilEncargadoNombre: `Daniel La Roche Zuluaga`,
    }, {
      numIdEntidadSector: 10,
      txtPerfilEncargadoNombre: `Matías de Greiff Rincón`,
    }
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

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.formFichaEvaluacion.fichaEvaluacionPreguntasInicio.push({
      numId: 0,
      numIdTipoRespuesta: 3,
      txtPregunta: 'Nombre del/a Evaluador/a'
    }, {
      numId: 0,
      numIdTipoRespuesta: 3,
      txtPregunta: 'Dirección/Oficina/Dependencia del/a Evaluador/a'
    }, {
      numId: 0,
      numIdTipoRespuesta: 3,
      txtPregunta: 'Entidad o Sector evaluada/o'
    }, {
      numId: 0,
      numIdTipoRespuesta: 3,
      txtPregunta: 'Escala de Ponderaciones'
    });
    this.formFichaEvaluacion.fichaEvaluacionPreguntasFin.push({
      numId: 0,
      numIdTipoRespuesta: 3,
      txtPregunta: 'Cantidad de participantes de la Entidad o Sector evaluada/o'
    }, {
      numId: 0,
      numIdTipoRespuesta: 3,
      txtPregunta: 'Cantidad de participantes que pertenecen al Grupo de Trabajo de Gestión del Riesgo de Desastres'
    }, {
      numId: 0,
      numIdTipoRespuesta: 3,
      txtPregunta: 'Listar las instituciones que participaron'
    });
  }

  ngAgregarSegmento() {
    this.formFichaEvaluacion.fichaEvaluacionSegmentos.push({
      numId: 0,
      txtTituloSegmento: '',
      fichaEvaluacionDetalleSegmentos: []
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

  ngAgregarPreguntaInicio() {
    this.formFichaEvaluacion.fichaEvaluacionPreguntasInicio.push({
      numId: 0,
      numIdTipoRespuesta: 3,
      txtPregunta: ''
    });
  }

  ngAgregarPreguntaFin() {
    this.formFichaEvaluacion.fichaEvaluacionPreguntasFin.push({
      numId: 0,
      numIdTipoRespuesta: 3,
      txtPregunta: ''
    });
  }

  ngMensajeConfirmacion() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  }

  ngCancelar() {
    this._router.navigate(['/simulaciones/ficha-evaluacion']).then(() => { });
  }

  ngGuardar() {
    console.log(this.formFichaEvaluacion);
  }
}
