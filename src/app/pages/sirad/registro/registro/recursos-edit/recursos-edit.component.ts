import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { categoria } from '../recursos-add/recursos-add.component';
import { UbicacionComponent } from '../recursos-add/ubicacion/ubicacion.component';

@Component({
  selector: 'app-recursos-edit',
  templateUrl: './recursos-edit.component.html',
  styleUrls: ['./recursos-edit.component.scss']
})
export class RecursosEditComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: [''],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: [''],
  });
  isLinear = false;
  cat = [
    {id:1,desc:"ABASTECIMIENTO DE AGUA"},
    {id:2,desc:"ABASTECIMIENTO DE ALIMENTOS"},
    {id:3,desc:"ABASTECIMIENTO DE ENERGÍA"},
    {id:4,desc:"ATENCIÓN MÉDICA"},
    {id:5,desc:"TRANSPORTE Y VIALIDAD"},
    {id:6,desc:"ACCESIBILIDAD"},
    {id:7,desc:"TELECOMUNICACIONES"},
    {id:8,desc:"CENTROS DE DECISIÓN E INTERVENCIÓN"},
    {id:9,desc:"ÁREAS POTENCIALES PARA ALBERGUES"},
    {id:10,desc:"ÁREAS POTENCIALES PARA ESCOMBRERAS"},
    {id:11,desc:"ÁREAS ECONÓMICAS"},
    {id:12,desc:"VULNERABILIDAD DE LA POBLACIÓN"},
    {id:13,desc:"PELIGRO SÍSMICO"},
    {id:14,desc:"PELIGRO DE  TSUNAMI"},
    {id:15,desc:"DATOS DE BASE"}
  ];
  catBu : categoria[] = [];
  subcatBu : categoria[] = [];
  subcat = [
    {id:1,desc:"Plantas de Agua Potable"},
    {id:1,desc:"Red primaria de agua potable"},
    {id:1,desc:"Pozos"},
    {id:1,desc:"Reservorios"},
    {id:1,desc:"Bombas y cámaras de rebombeo"},
    {id:1,desc:"Surtidores"},
    {id:1,desc:"Sectores de abastecimiento de agua potable"},
    {id:1,desc:"Zonas CCSS Sedapal"},
    {id:1,desc:"Mantenimiento de la red de agua potable"},
    {id:1,desc:"Proveedores de material de mantenimiento"},
    {id:1,desc:"Camiones Cisternas"},
    {id:1,desc:"Empresas de bebidas embotelladas"},
    {id:1,desc:"Empresas de bombas de agua"},
    {id:1,desc:"Empresas de Cloro"},
    {id:1,desc:"Empresas de recipientes de Agua"},
    {id:1,desc:"Datos agua del INEI"},
    {id:2,desc:"Sedes de instituciones de ayuda alimentaria"},
    {id:2,desc:"Mercados mayoristas"},
    {id:2,desc:"Mercados de distribución"},
    {id:2,desc:"Supermercados"},
    {id:2,desc:"Centros de acopio"},
    {id:2,desc:"Proveedores de alimentos"},
    {id:2,desc:"Almacenes nacionales e internacionales de ayuda alimenticia"},
    {id:2,desc:"Almacenes de fábricas de alimentos"},
    {id:2,desc:"Plataformas Logísticas"},
    {id:2,desc:"Vías de acceso a los mercados mayoristas"},
    {id:2,desc:"Área agrícola"},
    {id:2,desc:"Flujos al Mercado de Frutas"},
    {id:2,desc:"Flujos al Mercado de la Parada"},
    {id:2,desc:"Flujos al Mercado de Santa Anita"},
    {id:2,desc:"Garitas"},
    {id:2,desc:"Centros de atención residencial del INABIF"},
    {id:3,desc:"Terminales"},
    {id:3,desc:"Refinerías"},
    {id:3,desc:"Empresas distribuidoras de combustible"},
    {id:3,desc:"Estaciones de servicio de Lima y Callao"},
    {id:3,desc:"Centros de venta de gas"},
    {id:3,desc:"Plantas envasadoras de GLP"},
    {id:3,desc:"Locales de venta de GLP"},
    {id:3,desc:"Gaseoducto Lima-Pisco"},
    {id:3,desc:"Estación city gate"},
    {id:3,desc:"Hidroeléctricas"},
    {id:3,desc:"Líneas eléctricas"},
    {id:3,desc:"Grandes consumidores de energía"},
    {id:3,desc:"Empresas con generadores"},
    {id:3,desc:"Empresas con tanques de gasolina"},
    {id:4,desc:"Centro de decisión"},
    {id:4,desc:"Establecimientos de salud"},
    {id:4,desc:"Áreas de expansión"},
    {id:4,desc:"Almacenes de insumos médicos y medicamentos"},
    {id:4,desc:"Bancos de sangre"},
    {id:4,desc:"Hospitales de campaña"},
    {id:4,desc:"Ambulancias"},
    {id:5,desc:"Red vial general"},
    {id:5,desc:"Red vial principal"},
    {id:5,desc:"Puentes"},
    {id:5,desc:"Pasos a desnivel"},
    {id:5,desc:"Puentes Peatonales"},
    {id:5,desc:"Terminales terrestres"},
    {id:5,desc:"Velocidad promedio de ejes viales - sentido entrante"},
    {id:5,desc:"Velocidad promedio de ejes viales - sentido saliente"},
    {id:5,desc:"Rutas de transporte público"},
    {id:5,desc:"Origen de desplazamientos por distrito de destino"},
    {id:5,desc:"Destino de desplazamientos por distrito de origen"},
    {id:5,desc:"Empresas de transporte público"},
    {id:5,desc:"Empresas de camiones de carga"},
    {id:5,desc:"Vías de evacuación"},
    {id:5,desc:"Aeropuertos"},
    {id:5,desc:"Helipuertos"},
    {id:5,desc:"Empresas de helicópteros"},
    {id:5,desc:"Terminal marítimo del Callao"},
    {id:5,desc:"Puertos y muelles"},
    {id:5,desc:"Mantenimiento de red vial"},
    {id:6,desc:"Zonas de accesibilidad"},
    {id:6,desc:"Puntos de congestión"},
    {id:7,desc:"Estudios de radio"},
    {id:7,desc:"Estudios de televisión"},
    {id:7,desc:"Plantas de Emisoras de radio"},
    {id:7,desc:"Plantas de televisión"},
    {id:7,desc:"Empresas de servicio por satélites"},
    {id:7,desc:"Radios de bomberos y telecomunicación de emergencia"},
    {id:7,desc:"Radios en establecimientos de salud y telecomunicación de emergencia"},
    {id:7,desc:"Radioaficionados"},
    {id:7,desc:"Estaciones base de telefonía móvil"},
    {id:7,desc:"Central de conmutación de telefonía fija"},
    {id:7,desc:"Central de conmutación de telefonía móvil"},
    {id:7,desc:"Nodos de fibra óptica"},
    {id:7,desc:"Estaciones HUB"},
    {id:7,desc:"Empresas de servicio VSAT"},
    {id:7,desc:"Radios de emergencia de INDECI y de Defensa Civil - Serenazgo"},
    {id:7,desc:""},
    {id:8,desc:"Gobierno nacional, Ministerios e INDECI"},
    {id:8,desc:"Fuerzas Armadas"},
    {id:8,desc:"Policía Nacional del Perú"},
    {id:8,desc:"Gobiernos regionales y locales"},
    {id:8,desc:"Cuerpo General de Bombero Voluntario del Perú"},
    {id:8,desc:"Actores de la ayuda humanitaria"},
    {id:8,desc:"Grupos de búsqueda y rescate"},
    {id:8,desc:"Embajadas"},
    {id:8,desc:"Organismos Científicos"},
    {id:8,desc:"Empresas de maquinaria para remoción de escombros"},
    {id:8,desc:"Almacenes de ayuda nacional e internacional"},
    {id:9,desc:"Áreas potenciales para albergues en campamentos"},
    {id:9,desc:"Empresas productoras y/o distribuidoras de carpas"},
    {id:9,desc:"Empresas productoras y/o distribuidoras de módulos de vivienda"},
    {id:9,desc:"Empresas productoras y/o distribuidoras de letrinas"},
    {id:9,desc:"Empresas productoras y/o distribuidoras de cal"},
    {id:10,desc:"Escombreras para periodo de emergencia"},
    {id:11,desc:"Datos económicos del INEI por distrito"},
    {id:11,desc:"Datos económicos del INEI por manzana"},
    {id:11,desc:"Zonificación urbana del Instituto Metropolitano de Planificación"},
    {id:12,desc:"Vulnerabilidad de la población por manzana"},
    {id:12,desc:"Vulnerabilidad de la población por distritos"},
    {id:12,desc:"Vulnerabilidad de la población por manzana"},
    {id:13,desc:"Zonificación sísmica de Lima metropolitana"},
    {id:13,desc:"Zonificación sísmica de 7 Distritos de Lima"},
    {id:14,desc:"Límite de inundación por tsunami magnitud 8.5 Mw"},
    {id:14,desc:"Límite de inundación por tsunami magnitud 9 Mw"},
    {id:15,desc:"Distritos de Lima y Callao"},
    {id:15,desc:"Límite provincial de Lima y Callao"},
    {id:15,desc:"Mar"},
    {id:15,desc:"Ríos de Lima y Callao"},
    {id:15,desc:"Zona urbana de Lima y Callao"},
  ];
  
  tsunami = [
    {
      id: 1,
      estado: "Sismo más probable"
    },
    {
      id: 2,
      estado: "Sismo de tipo 1746"
    },
    {
      id: 3,
      estado: "No expuesto"
    }
  ]

  sismo = [
    {
      id: 1,
      estado: "Peligro bajo"
    },
    {
      id: 2,
      estado: "Peligro relativamente bajo"
    },
    {
      id: 3,
      estado: "Peligro alto"
    },
    {
      id: 4,
      estado: "Peligro muy alto"
    },
    {
      id: 5,
      estado: "Sin información"
    }
  ]

  bomba = [
    {
      id: 1,
      estado: "SU"
    },
    {
      id: 2,
      estado: "TV"
    },
  ]

  dia = [
    {
      id: 1,
      estado: "Regular"
    },
    {
      id: 2,
      estado: "Mala"
    },
    {
      id: 3,
      estado: "Muy mala"
    },
  ]

  noche = [
    {
      id: 1,
      estado: "Muy buena"
    },
    {
      id: 2,
      estado: "Buena"
    },
    {
      id: 3,
      estado: "Regular"
    },
    {
      id: 4,
      estado: "Mala"
    },
    {
      id: 5,
      estado: "Muy mala"
    },
  ]

  esencial = [
    {
      id: 1,
      estado: "Normal"
    },
    {
      id: 2,
      estado: "Específico emergencia"
    },
    {
      id: 3,
      estado: "Apoyo emergencia"
    },
    {
      id: 4,
      estado: "Otros"
    },
  ]

  fuente = [
    {
      id: 1,
      estado: "Equipo de Aguas Subterráneas"
    },
    {
      id: 2,
      estado: "Equipo de Catastro de Redes y Fuentes"
    },
  ]

  observacion = [
    {
      id: 1,
      estado: "Fuera de uso"
    },
    {
      id: 2,
      estado: "Pozo anulado"
    },
    {
      id: 3,
      estado: "Pozo particular"
    },
    {
      id: 4,
      estado: "Reserva"
    },
  ]

  estados = [
    {
      id: 1,
      estado: "Funcionando"
    },
    {
      id: 2,
      estado: "Paralizado por calidad"
    },
    {
      id: 3,
      estado: "En reparación"
    },
    {
      id: 4,
      estado: "Reserva sin equipo"
    },
    {
      id: 5,
      estado: "Reserva equipada - sector uso conjuntivo (Red+Pozos)"
    },
    {
      id: 6,
      estado: "Reserva equipada - sector fuente única (Pozo solo)"
    },
  ]
  categoria: FormGroup; 
  subcategoria: FormGroup; 

  constructor(private _formBuilder: FormBuilder, private _router: Router, private alert: AlertService, private modalService: NgbModal) { }



  ngOnInit(): void {
    this.categoria = this._formBuilder.group({
			categoria: [null, Validators.required]
		});

    const toSelect = this.cat.find(c => c.id == 1);
      this.categoria.get('categoria').setValue(toSelect);

    this.subcategoria = this._formBuilder.group({
      subcategoria: [null, Validators.required]
    });

    const toSelect2 = this.subcat.find(c => c.desc == 'Pozos');
      this.subcategoria.get('subcategoria').setValue(toSelect2);
  }
  

  ngCancelar() {
    this.alert.toastSuccess(`Recurso cancelado`);
    this._router.navigate(['/sirad/registro/recursos']).then(() => { });
  }

  ngGuardar() {
    this.alert.toastSuccess(`Recurso Guardado con exito`);
    this._router.navigate(['/sirad/registro/recursos']).then(() => { });
  }

  /* changeCat(event: any) {
    //this.createFormMv.controls['wayOfLife'].setValue(event.triggerValue);
    console.log("cambio",event.triggerValue);
    console.log("cambio",event.value);
    this.subcat = this.subcatBu
    let bu : categoria[] = [];
    this.subcat.map((x:any)=>{
      if(x.id == event.value)
        bu.push(x)
    })
    this.subcat = bu
    
    
  } */

  onAddUbicacion() {
    const modalRef = this.modalService.open(UbicacionComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static'
    })

  }
  
  changeCatSub(event: any) {
    if(event.triggerValue == "Pozos") this.isLinear = true    
    else this.isLinear = false
  }

  back(type : number){
    let mensaje = "Guardar"
    if(type == 1) mensaje = "Eliminar"
    this.alert.questionAlertConfirm('¿Está seguro de ' + mensaje + '?', '', 'Si, ' + mensaje, TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          console.log("asasdasdasd");
          this._router.navigate(['/sirad/registro/recursos']);
        }
      }
    );
  }
}
