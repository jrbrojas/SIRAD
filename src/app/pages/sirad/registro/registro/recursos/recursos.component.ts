import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss']
})
export class RecursosComponent implements OnInit {

  dataFichasEvaluacion = [];
  subcategoria = [
    {
      id: 1,
      categoria: "ABASTECIMIENTO DE AGUA",
      nombre: "Plantas de Agua Potable"
    },
    {
      id: 2,
      categoria: "ABASTECIMIENTO DE AGUA",
      nombre: "Red primaria de agua potable"
    },
    {
      id: 3,
      categoria: "ABASTECIMIENTO DE AGUA",
      nombre: "Pozos"
    },
    {
      id: 4,
      categoria: "ABASTECIMIENTO DE AGUA",
      nombre: "Reservorios"
    },
    {
      id: 5,
      categoria: "ABASTECIMIENTO DE ALIMENTOS",
      nombre: "Reservorios"
    },
    {
      id: 6,
      categoria: "ABASTECIMIENTO DE ALIMENTOS",
      nombre: "Sedes de instituciones de ayuda alimentaria"
    },
    {
      id: 7,
      categoria: "ABASTECIMIENTO DE ALIMENTOS",
      nombre: "Mercados mayoristas"
    },
    {
      id: 8,
      categoria: "ABASTECIMIENTO DE ENERGÍA",
      nombre: "Terminales"
    },
    {
      id: 9,
      categoria: "ABASTECIMIENTO DE ENERGÍA",
      nombre: "Refinerías"
    },
    {
      id: 10,
      categoria: "ATENCIÓN MÉDICA",
      nombre: "Centro de decisión"
    },
    {
      id: 11,
      categoria: "ATENCIÓN MÉDICA",
      nombre: "Establecimientos de salud"
    },
  ]
  constructor(
    private _router: Router
  ) {
    for (let a = 0; a < 4; a++) {
      this.dataFichasEvaluacion.push(
        {
          numId: (a + 1),
          txtNombre: 'Nombre ' + (a + 1),
          bolEstado: 'Pendiente'
        }
      );
    }
    this.dataFichasEvaluacion
   }

  ngOnInit(): void {
  }

  add(){
    this._router.navigate(['/sirad/registro/recursos-add']).then(() => { });
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
