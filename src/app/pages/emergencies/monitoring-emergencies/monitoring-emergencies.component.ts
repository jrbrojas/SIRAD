import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmergencyService } from '../../../shared/services/emergency.service';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import { Emergency } from 'src/app/shared/models/emergency.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { ObservacionComponent } from '../../emergencies/observacion/observacion.component';
import { ModalMonitoringComponent } from './modal-monitoring/modal-monitoring.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Formulario } from 'src/app/shared/models/formulario.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmergencyAtentionService } from 'src/app/shared/services/emergency-atention.service';



@Component({
  selector: 'app-monitoring-emergencies',
  templateUrl: './monitoring-emergencies.component.html',
  styleUrls: ['./monitoring-emergencies.component.scss'],
})
export class MonitoringEmergenciesComponent implements OnInit {

  @Input() public idEmergencia: any;
  //variables utiles
  public emergencies: any;
  public paginaActalForm: number = 1;
  public estadoEmergencia: number = 1;
  public cantidadPaginasForm: number = 1;
  public cantidadTotalRegistrosBusqueda: number = 0;
  public cantidadItemsForm: number = 10;
  public formularios: any;
  public emergenciesAux: any = [];
  public textBotton: string = ""
  public selectedRegional: boolean = false
  public selectedNacional: boolean = false
  public PERMISOS = PERMISOS;
  public atention_arr : Array<any> = [];

  //para filtrar por estados
  public statusTodo: boolean = true
  public statusRevisar: boolean = false
  public statusAprobar: boolean = false
  public statusObservar: boolean = false

  public page : number = 0

  constructor(
    private fb: FormBuilder,
    private emergencyService: EmergencyService,
    private alert: AlertService,
    private formularioService: FormularioService,
    public modalservice: NgbModal,
    private router: Router,
    public authService: AuthService,
    private emergencyCareService : EmergencyAtentionService,
  ) {

    this.ListCodeOfEmergencies();
  }

  ngOnInit(): void { }



  //llamar emergencia
  ListCodeOfEmergencies() {
    const d = {
      textoBusqueda: null,
      estadoEmergencia: 1,
      cantidadRegistro: 100,
      numeroPagina: 1,
    };
    const datoGeoPolitico = localStorage.getItem('datoGeoPolitico');
    const region = JSON.parse(datoGeoPolitico).desRegion;
    const provincia = JSON.parse(datoGeoPolitico).desProvincia;
    const distrito = JSON.parse(datoGeoPolitico).desDistrito;
    this.emergencyService.getEmergencies(d).subscribe((res: any) => {
      this.emergencies = null;
      if(region != " " && provincia == " " && distrito == " ") this.emergencies = this.getRegion(res,region)
      if(region == " " && provincia == " " && distrito == " ") this.emergencies = res.emergencias
      //this.emergencies = res.emergencias;
      console.log("Emergencias: ",res.emergencias)
      this.ListTypeOfFormulario();
      console.log("Emergencias: ",res.emergencias)
    });
  }

  getRegion(res,region){
    let aux = []
    res.emergencias.forEach((e: any) => {
      let ubicacion = e.descripcionUbigeo.split("-")
      if (region == ubicacion[0])
        aux.push(e)
    });  
    console.log("region",region);
    console.log("res",res);
    
    return aux
  }

  getProvincia(res,provinciia){
    let aux = []
    res.emergencias.forEach((e: any) => {
      let ubicacion = e.descripcionUbigeo.split("-")
      if (provinciia == ubicacion[1])
        aux.push(e)
    });
    return aux
  }

  getDIstrito(res,distrito){
    let aux = []
    res.emergencias.forEach((e: any) => {
      let ubicacion = e.descripcionUbigeo.split("-")
      if (distrito == ubicacion[2])
        aux.push(e)
    });
    return aux
  }

  ListTypeOfFormulario() {
    this.emergenciesAux = []
    const d = {
      idEmergencia: 1,
      cantidadRegistro: 100,
      numeroPagina: 1,
    };
    this.emergencies.forEach((element: any) => {
      d.idEmergencia = element.id;
      this.formularioService.getFormularios(d).subscribe((res: any) => {
        if (res.cantidad != 0) {          
          element.formulariosAll = res.formularios
          element.formularios = res.formularios;
          element.formularios.forEach((e: any) => {
            e.selected = true
          });
          this.emergenciesAux.push(element);
        }
        element.selected = false
      });
      this.emergencyCareService.obtenerAtenciones(element.codigoSinpad).subscribe(
        response => {
          let atention_arr2  = [];
          response.forEach((a:any) => {
            a.tipoFormulario = "ATENCIÓN"
            a.selected = true
            if(a.habilitado === 1){
              atention_arr2.push(a)
            }  
          })          
        element.atenciones = atention_arr2
        element.atencionesAll = atention_arr2
        }
      )       
    }); 
       
    this.emergencies = this.emergenciesAux;
  }

  accion(id: number, idEmergencia: number, type: number, tipoFormulario : string) {
    const modalref = this.modalservice.open(ModalMonitoringComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static'
    });
    modalref.componentInstance.modalFormulario = {
      id: id,
      status: 0,
      idEmergencia: idEmergencia,
      type: type,
      tipoFormulario: tipoFormulario
    }

    modalref.result.then((res) => {
      this.ListCodeOfEmergencies();
    }, (reason) => {
      this.ListCodeOfEmergencies();
    })

  }

  revisar(id : number) {
    const modalref = this.modalservice.open(ModalMonitoringComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static'
    });

    var emergenciesSelected: any
    this.emergencies.forEach((e: any) => {
      if (id == e.id) emergenciesSelected = e
    });

    modalref.componentInstance.modalFormulario = {
      id: id,
      dataEmergencia: emergenciesSelected,
      status: 1,
      idEmergencia: id,
      typeForm2: 1
    }

    modalref.result.then((res) => {
      this.ListCodeOfEmergencies();
    }, (reason) => {
      this.ListCodeOfEmergencies();
    })
  }

  //atratar cambio de radioButton
  changeRadio() {
  }

  setStatus(status: number) {
    if (status == 1) return "Por enviar"
    if (status == 2) return "Por revisar"
    if (status == 3) return "Por aprobar"
    if (status == 4) return "Aprobado"
    if (status == 5) return "Observado"
    else return ""
  }

  viewFormulario(tipoFormulario: string, idFormulario: number, idEmergencia : number, codigoSinpad : string) {
    console.log("jaja",tipoFormulario);
    
    switch (tipoFormulario) {
      case 'EVALUACION-RAPIDA':
        //this.authService.validarPermisos([PERMISOS.VER_EVALUACION_RAPIDA]);
        window.open("http://localhost:4200/#/quick-evaluation/details/" + idFormulario+","+codigoSinpad+",0", '_blank')
        break;
      case 'EMPADRONAMIENTO':
        //this.authService.validarPermisos([PERMISOS.VER_EMPADRONAMIENTO_FAMILIAR]);
        //this.router.navigate([`/form-2a/new-edit/${idFormulario}`]).then();
        window.open("http://localhost:4200/#/form-2a/new/"+idEmergencia+"/" + idFormulario+",0", '_blank')
        break;
        case 'PRELIMINAR':
        //this.authService.validarPermisos([PERMISOS.VER_EMPADRONAMIENTO_FAMILIAR]);
        window.open(`http://localhost:4200/#form-preliminary/create-information/${idFormulario}/${idEmergencia},0`, '_blank')
        break;
        case 'ATENCIÓN':
        //this.authService.validarPermisos([PERMISOS.VER_EMPADRONAMIENTO_FAMILIAR]);
        window.open(`http://localhost:4200/#/emergencias/emergency-care/${idEmergencia}`, '_blank')
        break;
      default:
        break;
    }
  }

  //para filtrar por estado
  changeStatus(type : number){
    if(type == 0){
      this.statusTodo = true
      this.statusRevisar = false
      this.statusAprobar = false
      this.statusObservar = false
    }
    if(type == 2){
      this.statusTodo = false
      this.statusRevisar = true
      this.statusAprobar = false
      this.statusObservar = false
    }
    if(type == 3){
      this.statusTodo = false
      this.statusRevisar = false
      this.statusAprobar = true
      this.statusObservar = false
    }
    if(type == 5){
      this.statusTodo = false
      this.statusRevisar = false
      this.statusAprobar = false
      this.statusObservar = true
    }
    if(this.statusTodo == false &&
      this.statusRevisar == false &&
      this.statusAprobar == false &&
      this.statusObservar == false)
      this.statusTodo = true
      this.statusRevisar = false
      this.statusAprobar = false
      this.statusObservar = false
      
    this.filterStatus(type)
  }
  filterStatus(type : number) {  
    
    this.emergencies = this.emergenciesAux
    var BU = this.emergencies
    var emergenciesBU : any = []
    BU.forEach((e : any) => {      
      e.formularios = e.formulariosAll
      e.atenciones = e.atencionesAll
    });
    console.log("inicial",BU);
    
    if(type != 0){    
      if(BU){
        BU.forEach((e : any) => {   
            let temp : any = []
            let contador = 0
            e.formularios.forEach((f : any) => {
              if(f.estado_formulario === type){
                contador++
                temp.push(f)
              }
            });
            e.formularios = temp

            //atenciones
            let temp2 : any = []
            let contador2 = 0
            e.atenciones.forEach((a : any) => {
              if(a.estado == ""+type){
                contador2++
                temp2.push(a)
              }
            });
            e.atenciones = temp2
            if(contador2 != 0 || contador != 0) emergenciesBU.push(e)
          });
      }    
      console.log("result",emergenciesBU);
        
      this.emergencies = emergenciesBU
    }
    
  }
}
