import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  cat : categoria[] = [];
  catBu : categoria[] = [];
  subcatBu : categoria[] = [];
  subcat : categoria[] = [];
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
  

  constructor(private _formBuilder: FormBuilder, private _router: Router, private alert: AlertService, private modalService: NgbModal) { }



  ngOnInit(): void {
    this.inicializar()
  }

  inicializar(){
    let data : categoria 
    data = {id:1,desc:"ABASTECIMIENTO DE AGUA"}; this.cat.push(data)
    let data2 : categoria
    data2 = {id:1,desc:"Plantas de Agua Potable"}; this.subcat.push(data)
    data2 = {id:1,desc:"Red primaria de agua potable"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Pozos"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Reservorios"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Bombas y cámaras de rebombeo"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Surtidores"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Sectores de abastecimiento de agua potable"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Zonas CCSS Sedapal"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Mantenimiento de la red de agua potable"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Proveedores de material de mantenimiento"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Camiones Cisternas"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Empresas de bebidas embotelladas"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Empresas de bombas de agua"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Empresas de Cloro"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Empresas de recipientes de Agua"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Datos agua del INEI"}; this.subcat.push(data2)

    data = {id:2,desc:"ABASTECIMIENTO DE ALIMENTOS"}; this.cat.push(data)
    data2 = {id:2,desc:"Sedes de instituciones de ayuda alimentaria"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Mercados mayoristas"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Mercados de distribución"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Supermercados"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Centros de acopio"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Proveedores de alimentos"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Almacenes nacionales e internacionales de ayuda alimenticia"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Almacenes de fábricas de alimentos"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Plataformas Logísticas"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Vías de acceso a los mercados mayoristas"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Área agrícola"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Flujos al Mercado de Frutas"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Flujos al Mercado de la Parada"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Flujos al Mercado de Santa Anita"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Garitas"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Centros de atención residencial del INABIF"}; this.subcat.push(data2)

    data  = {id:3,desc:"ABASTECIMIENTO DE ENERGÍA"}; this.cat.push(data)
    data2 = {id:3,desc:"Terminales"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Refinerías"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Empresas distribuidoras de combustible"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Estaciones de servicio de Lima y Callao"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Centros de venta de gas"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Plantas envasadoras de GLP"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Locales de venta de GLP"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Gaseoducto Lima-Pisco"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Estación city gate"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Hidroeléctricas"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Líneas eléctricas"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Grandes consumidores de energía"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Empresas con generadores"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Empresas con tanques de gasolina"}; this.subcat.push(data2)

    data  = {id:4,desc:"ATENCIÓN MÉDICA"}; this.cat.push(data)
    data2 = {id:4,desc:"Centro de decisión"}; this.subcat.push(data2)
    data2 = {id:4,desc:"Establecimientos de salud"}; this.subcat.push(data2)
    data2 = {id:4,desc:"Áreas de expansión"}; this.subcat.push(data2)
    data2 = {id:4,desc:"Almacenes de insumos médicos y medicamentos"}; this.subcat.push(data2)
    data2 = {id:4,desc:"Bancos de sangre"}; this.subcat.push(data2)
    data2 = {id:4,desc:"Hospitales de campaña"}; this.subcat.push(data2)
    data2 = {id:4,desc:"Ambulancias"}; this.subcat.push(data2)

    data  = {id:5,desc:"TRANSPORTE Y VIALIDAD"}; this.cat.push(data)
    data2 = {id:5,desc:"Red vial general"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Red vial principal"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Puentes"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Pasos a desnivel"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Puentes Peatonales"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Terminales terrestres"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Velocidad promedio de ejes viales - sentido entrante"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Velocidad promedio de ejes viales - sentido saliente"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Rutas de transporte público"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Origen de desplazamientos por distrito de destino"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Destino de desplazamientos por distrito de origen"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Empresas de transporte público"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Empresas de camiones de carga"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Vías de evacuación"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Aeropuertos"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Helipuertos"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Empresas de helicópteros"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Terminal marítimo del Callao"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Puertos y muelles"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Mantenimiento de red vial"}; this.subcat.push(data2)

    data  = {id:6,desc:"ACCESIBILIDAD"}; this.cat.push(data)
    data2 = {id:6,desc:"Zonas de accesibilidad"}; this.subcat.push(data2)
    data2 = {id:6,desc:"Puntos de congestión"}; this.subcat.push(data2)

    data  = {id:7,desc:"TELECOMUNICACIONES"}; this.cat.push(data)
    data2 = {id:7,desc:"Estudios de radio"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Estudios de televisión"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Plantas de Emisoras de radio"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Plantas de televisión"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Empresas de servicio por satélites"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Radios de bomberos y telecomunicación de emergencia"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Radios en establecimientos de salud y telecomunicación de emergencia"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Radioaficionados"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Estaciones base de telefonía móvil"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Central de conmutación de telefonía fija"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Central de conmutación de telefonía móvil"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Nodos de fibra óptica"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Estaciones HUB"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Empresas de servicio VSAT"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Radios de emergencia de INDECI y de Defensa Civil - Serenazgo"}; this.subcat.push(data2)
    data2 = {id:7,desc:""}; this.subcat.push(data2)

    data  = {id:8,desc:"CENTROS DE DECISIÓN E INTERVENCIÓN"}; this.cat.push(data)
    data2 = {id:8,desc:"Gobierno nacional, Ministerios e INDECI"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Fuerzas Armadas"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Policía Nacional del Perú"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Gobiernos regionales y locales"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Cuerpo General de Bombero Voluntario del Perú"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Actores de la ayuda humanitaria"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Grupos de búsqueda y rescate"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Embajadas"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Organismos Científicos"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Empresas de maquinaria para remoción de escombros"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Almacenes de ayuda nacional e internacional"}; this.subcat.push(data2)

    data  = {id:9,desc:"ÁREAS POTENCIALES PARA ALBERGUES"}; this.cat.push(data)
    data2 = {id:9,desc:"Áreas potenciales para albergues en campamentos"}; this.subcat.push(data2)
    data2 = {id:9,desc:"Empresas productoras y/o distribuidoras de carpas"}; this.subcat.push(data2)
    data2 = {id:9,desc:"Empresas productoras y/o distribuidoras de módulos de vivienda"}; this.subcat.push(data2)
    data2 = {id:9,desc:"Empresas productoras y/o distribuidoras de letrinas"}; this.subcat.push(data2)
    data2 = {id:9,desc:"Empresas productoras y/o distribuidoras de cal"}; this.subcat.push(data2)

    data  = {id:10,desc:"ÁREAS POTENCIALES PARA ESCOMBRERAS"}; this.cat.push(data)
    data2 = {id:10,desc:"Escombreras para periodo de emergencia"}; this.subcat.push(data2)

    data  = {id:11,desc:"ÁREAS ECONÓMICAS"}; this.cat.push(data)
    data2 = {id:11,desc:"Datos económicos del INEI por distrito"}; this.subcat.push(data2)
    data2 = {id:11,desc:"Datos económicos del INEI por manzana"}; this.subcat.push(data2)
    data2 = {id:11,desc:"Zonificación urbana del Instituto Metropolitano de Planificación"}; this.subcat.push(data2)

    data  = {id:12,desc:"VULNERABILIDAD DE LA POBLACIÓN"}; this.cat.push(data)
    data2 = {id:12,desc:"Vulnerabilidad de la población por manzana"}; this.subcat.push(data2)
    data2 = {id:12,desc:"Vulnerabilidad de la población por distritos"}; this.subcat.push(data2)
    data2 = {id:12,desc:"Vulnerabilidad de la población por manzana"}; this.subcat.push(data2)

    data  = {id:13,desc:"PELIGRO SÍSMICO"}; this.cat.push(data)
    data2 = {id:13,desc:"Zonificación sísmica de Lima metropolitana"}; this.subcat.push(data2)
    data2 = {id:13,desc:"Zonificación sísmica de 7 Distritos de Lima"}; this.subcat.push(data2)

    data  = {id:14,desc:"PELIGRO DE  TSUNAMI"}; this.cat.push(data)
    data2 = {id:14,desc:"Límite de inundación por tsunami magnitud 8.5 Mw"}; this.subcat.push(data2)
    data2 = {id:14,desc:"Límite de inundación por tsunami magnitud 9 Mw"}; this.subcat.push(data2)

    data  = {id:15,desc:"DATOS DE BASE"}; this.cat.push(data)
    data2 = {id:15,desc:"Distritos de Lima y Callao"}; this.subcat.push(data2)
    data2 = {id:15,desc:"Límite provincial de Lima y Callao"}; this.subcat.push(data2)
    data2 = {id:15,desc:"Mar"}; this.subcat.push(data2)
    data2 = {id:15,desc:"Ríos de Lima y Callao"}; this.subcat.push(data2)
    data2 = {id:15,desc:"Zona urbana de Lima y Callao"}; this.subcat.push(data2)

    this.catBu = this.cat
    this.subcatBu = this.subcat

  }

  ngCancelar() {
    this.alert.toastSuccess(`Recurso cancelado`);
    this._router.navigate(['/sirad/registro/recursos']).then(() => { });
  }

  ngGuardar() {
    this.alert.toastSuccess(`Recurso Guardado con exito`);
    this._router.navigate(['/sirad/registro/recursos']).then(() => { });
  }

  changeCat(event: any) {
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
    
    
  }

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
