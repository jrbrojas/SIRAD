import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
export interface categoria {
  id: number;
  desc: string;
}

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CargaMasivaComponent implements OnInit {

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    addRemoveLinks: true,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    acceptedFiles: '.xlsx',
  };

  public config2: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 5,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  public config3: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    acceptedFiles: '.png'
  };
  isLinear = false;
  cat : categoria[] = [];
  catBu : categoria[] = [];
  subcatBu : categoria[] = [];
  subcat : categoria[] = [];
  constructor(
    public alert: AlertService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.inicializar()
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }

  inicializar(){
    let data : categoria 
    data = {id:1,desc:"ABASTECIMIENTO DE AGUA"}; this.cat.push(data)
    let data2 : categoria
    data2 = {id:1,desc:"Plantas de Agua Potable"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Red primaria de agua potable"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Pozos"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Reservorios"}; this.subcat.push(data2)
    data2 = {id:1,desc:"Bombas y c??maras de rebombeo"}; this.subcat.push(data2)
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
    data2 = {id:2,desc:"Mercados de distribuci??n"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Supermercados"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Centros de acopio"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Proveedores de alimentos"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Almacenes nacionales e internacionales de ayuda alimenticia"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Almacenes de f??bricas de alimentos"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Plataformas Log??sticas"}; this.subcat.push(data2)
    data2 = {id:2,desc:"V??as de acceso a los mercados mayoristas"}; this.subcat.push(data2)
    data2 = {id:2,desc:"??rea agr??cola"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Flujos al Mercado de Frutas"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Flujos al Mercado de la Parada"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Flujos al Mercado de Santa Anita"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Garitas"}; this.subcat.push(data2)
    data2 = {id:2,desc:"Centros de atenci??n residencial del INABIF"}; this.subcat.push(data2)

    data  = {id:3,desc:"ABASTECIMIENTO DE ENERG??A"}; this.cat.push(data)
    data2 = {id:3,desc:"Terminales"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Refiner??as"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Empresas distribuidoras de combustible"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Estaciones de servicio de Lima y Callao"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Centros de venta de gas"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Plantas envasadoras de GLP"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Locales de venta de GLP"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Gaseoducto Lima-Pisco"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Estaci??n city gate"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Hidroel??ctricas"}; this.subcat.push(data2)
    data2 = {id:3,desc:"L??neas el??ctricas"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Grandes consumidores de energ??a"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Empresas con generadores"}; this.subcat.push(data2)
    data2 = {id:3,desc:"Empresas con tanques de gasolina"}; this.subcat.push(data2)

    data  = {id:4,desc:"ATENCI??N M??DICA"}; this.cat.push(data)
    data2 = {id:4,desc:"Centro de decisi??n"}; this.subcat.push(data2)
    data2 = {id:4,desc:"Establecimientos de salud"}; this.subcat.push(data2)
    data2 = {id:4,desc:"??reas de expansi??n"}; this.subcat.push(data2)
    data2 = {id:4,desc:"Almacenes de insumos m??dicos y medicamentos"}; this.subcat.push(data2)
    data2 = {id:4,desc:"Bancos de sangre"}; this.subcat.push(data2)
    data2 = {id:4,desc:"Hospitales de campa??a"}; this.subcat.push(data2)
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
    data2 = {id:5,desc:"Rutas de transporte p??blico"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Origen de desplazamientos por distrito de destino"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Destino de desplazamientos por distrito de origen"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Empresas de transporte p??blico"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Empresas de camiones de carga"}; this.subcat.push(data2)
    data2 = {id:5,desc:"V??as de evacuaci??n"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Aeropuertos"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Helipuertos"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Empresas de helic??pteros"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Terminal mar??timo del Callao"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Puertos y muelles"}; this.subcat.push(data2)
    data2 = {id:5,desc:"Mantenimiento de red vial"}; this.subcat.push(data2)

    data  = {id:6,desc:"ACCESIBILIDAD"}; this.cat.push(data)
    data2 = {id:6,desc:"Zonas de accesibilidad"}; this.subcat.push(data2)
    data2 = {id:6,desc:"Puntos de congesti??n"}; this.subcat.push(data2)

    data  = {id:7,desc:"TELECOMUNICACIONES"}; this.cat.push(data)
    data2 = {id:7,desc:"Estudios de radio"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Estudios de televisi??n"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Plantas de Emisoras de radio"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Plantas de televisi??n"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Empresas de servicio por sat??lites"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Radios de bomberos y telecomunicaci??n de emergencia"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Radios en establecimientos de salud y telecomunicaci??n de emergencia"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Radioaficionados"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Estaciones base de telefon??a m??vil"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Central de conmutaci??n de telefon??a fija"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Central de conmutaci??n de telefon??a m??vil"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Nodos de fibra ??ptica"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Estaciones HUB"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Empresas de servicio VSAT"}; this.subcat.push(data2)
    data2 = {id:7,desc:"Radios de emergencia de INDECI y de Defensa Civil - Serenazgo"}; this.subcat.push(data2)
    data2 = {id:7,desc:""}; this.subcat.push(data2)

    data  = {id:8,desc:"CENTROS DE DECISI??N E INTERVENCI??N"}; this.cat.push(data)
    data2 = {id:8,desc:"Gobierno nacional, Ministerios e INDECI"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Fuerzas Armadas"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Polic??a Nacional del Per??"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Gobiernos regionales y locales"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Cuerpo General de Bombero Voluntario del Per??"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Actores de la ayuda humanitaria"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Grupos de b??squeda y rescate"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Embajadas"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Organismos Cient??ficos"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Empresas de maquinaria para remoci??n de escombros"}; this.subcat.push(data2)
    data2 = {id:8,desc:"Almacenes de ayuda nacional e internacional"}; this.subcat.push(data2)

    data  = {id:9,desc:"??REAS POTENCIALES PARA ALBERGUES"}; this.cat.push(data)
    data2 = {id:9,desc:"??reas potenciales para albergues en campamentos"}; this.subcat.push(data2)
    data2 = {id:9,desc:"Empresas productoras y/o distribuidoras de carpas"}; this.subcat.push(data2)
    data2 = {id:9,desc:"Empresas productoras y/o distribuidoras de m??dulos de vivienda"}; this.subcat.push(data2)
    data2 = {id:9,desc:"Empresas productoras y/o distribuidoras de letrinas"}; this.subcat.push(data2)
    data2 = {id:9,desc:"Empresas productoras y/o distribuidoras de cal"}; this.subcat.push(data2)

    data  = {id:10,desc:"??REAS POTENCIALES PARA ESCOMBRERAS"}; this.cat.push(data)
    data2 = {id:10,desc:"Escombreras para periodo de emergencia"}; this.subcat.push(data2)

    data  = {id:11,desc:"??REAS ECON??MICAS"}; this.cat.push(data)
    data2 = {id:11,desc:"Datos econ??micos del INEI por distrito"}; this.subcat.push(data2)
    data2 = {id:11,desc:"Datos econ??micos del INEI por manzana"}; this.subcat.push(data2)
    data2 = {id:11,desc:"Zonificaci??n urbana del Instituto Metropolitano de Planificaci??n"}; this.subcat.push(data2)

    data  = {id:12,desc:"VULNERABILIDAD DE LA POBLACI??N"}; this.cat.push(data)
    data2 = {id:12,desc:"Vulnerabilidad de la poblaci??n por manzana"}; this.subcat.push(data2)
    data2 = {id:12,desc:"Vulnerabilidad de la poblaci??n por distritos"}; this.subcat.push(data2)
    data2 = {id:12,desc:"Vulnerabilidad de la poblaci??n por manzana"}; this.subcat.push(data2)

    data  = {id:13,desc:"PELIGRO S??SMICO"}; this.cat.push(data)
    data2 = {id:13,desc:"Zonificaci??n s??smica de Lima metropolitana"}; this.subcat.push(data2)
    data2 = {id:13,desc:"Zonificaci??n s??smica de 7 Distritos de Lima"}; this.subcat.push(data2)

    data  = {id:14,desc:"PELIGRO DE  TSUNAMI"}; this.cat.push(data)
    data2 = {id:14,desc:"L??mite de inundaci??n por tsunami magnitud 8.5 Mw"}; this.subcat.push(data2)
    data2 = {id:14,desc:"L??mite de inundaci??n por tsunami magnitud 9 Mw"}; this.subcat.push(data2)

    data  = {id:15,desc:"DATOS DE BASE"}; this.cat.push(data)
    data2 = {id:15,desc:"Distritos de Lima y Callao"}; this.subcat.push(data2)
    data2 = {id:15,desc:"L??mite provincial de Lima y Callao"}; this.subcat.push(data2)
    data2 = {id:15,desc:"Mar"}; this.subcat.push(data2)
    data2 = {id:15,desc:"R??os de Lima y Callao"}; this.subcat.push(data2)
    data2 = {id:15,desc:"Zona urbana de Lima y Callao"}; this.subcat.push(data2)

    this.catBu = this.cat
    this.subcatBu = this.subcat

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
  changeCatSub(event: any) {
    if(event.triggerValue == "Pozos"){
      this.isLinear = true 
      window.open("https://docs.google.com/spreadsheets/d/16hs7pbXZBcQ7U6wdDLvgKgePKsEnTQqkdPD1Em6xFLs/edit#gid=0" , '_blank');
    }    
    else this.isLinear = false
  }

  accion(type : number){
    let mensaje = "Reemplazar"
    if(type == 1) mensaje = "Agregar"
    this.alert.questionAlertConfirm('??Est?? seguro de ' + mensaje + '?', '', 'Si, ' + mensaje, TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.router.navigate(['/sirad/registro/carga-masiva']);
          this.alert.toastSuccess('170 registros actualizados correctamente')
        }
      }
    );
  }
}
