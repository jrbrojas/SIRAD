import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
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
      recurso: 'POZ-001',
      nombre: "Pozos"
    },
    {
      id: 2,
      categoria: "ABASTECIMIENTO DE AGUA",
      recurso: 'APAGP-001',
      nombre: "Red primaria de agua potable"
    },
    {
      id: 3,
      categoria: "ABASTECIMIENTO DE AGUA",
      recurso: 'PAP-001',
      nombre: "Plantas de Agua Potable"
    },
    {
      id: 4,
      categoria: "ABASTECIMIENTO DE AGUA",
      recurso: 'RES-001',
      nombre: "Reservorios"
    },
    {
      id: 5,
      categoria: "ABASTECIMIENTO DE ALIMENTOS",
      recurso: 'RES-002',
      nombre: "Reservorios"
    },
    {
      id: 6,
      categoria: "ABASTECIMIENTO DE ALIMENTOS",
      recurso: 'SIAA-001',
      nombre: "Sedes de instituciones de ayuda alimentaria"
    },
    {
      id: 7,
      categoria: "ABASTECIMIENTO DE ALIMENTOS",
      recurso: 'MEMA-001',
      nombre: "Mercados mayoristas"
    },
    {
      id: 8,
      categoria: "ABASTECIMIENTO DE ENERGÍA",
      recurso: 'TER-001',
      nombre: "Terminales"
    },
    {
      id: 9,
      categoria: "ABASTECIMIENTO DE ENERGÍA",
      recurso: 'REF-001',
      nombre: "Refinerías"
    },
    {
      id: 10,
      categoria: "ATENCIÓN MÉDICA",
      recurso: 'CEAT-001',
      nombre: "Centro de decisión"
    },
    {
      id: 11,
      categoria: "ATENCIÓN MÉDICA",
      recurso: 'ESSA-001',
      nombre: "Establecimientos de salud"
    },
  ]
  constructor(
    private _router: Router,
    private alert: AlertService
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

  editPermission(){
    this._router.navigate(['/sirad/registro/recursos-edit']);
  }

  back(type : number){
    let mensaje = "Guardar"
    if(type == 1) mensaje = "Eliminar"
    this.alert.questionAlertConfirm('¿Está seguro de ' + mensaje + '?', '', 'Si, ' + mensaje, TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          console.log("asasdasdasd");
          this._router.navigate(['/sirad/seguridad/registro/recursos']);
        }
      }
    );
  }
}
