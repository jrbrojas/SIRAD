import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-simulaciones-ficha-evaluacion',
  templateUrl: './simulaciones-ficha-evaluacion.component.html',
  styleUrls: ['./simulaciones-ficha-evaluacion.component.scss']
})
export class SimulacionesFichaEvaluacionComponent implements OnInit {

  dataFichasEvaluacion = [];

  constructor(
    private _router: Router
  ) {
    for (let a = 0; a < 10; a++) {
      this.dataFichasEvaluacion.push(
        {
          numId: (a + 1),
          txtNombre: 'Ficha Evaluación ' + (a + 1),
          bolEstado: 'Pendiente'
        }
      );
    }
    this.dataFichasEvaluacion
   }

  ngOnInit(): void {
  }

  add(){
    this._router.navigate(['/simulaciones/ficha-evaluacion-detalle']).then(() => { });
  }

  async ngAsignarEvento(item: any) {
    const { value: fruit } = await Swal.fire({
      title: 'Seleccionar Evento',
      input: 'select',
      inputOptions: {
        'evento_1': 'Evento 1',
        'evento_2': 'Evento 2',
        'evento_3': 'Evento 3',
        'evento_4': 'Evento 4',
        'evento_5': 'Evento 5',
        'evento_6': 'Evento 6'
      },
      inputPlaceholder: 'Seleccionar Evento',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          resolve('');
        })
      }
    })
    
    if (fruit) {
      item.bolEstado = `Asignado al evento: ${fruit}`;
      Swal.fire(`Asignado al evento: ${fruit}`)
    }
  }
}
