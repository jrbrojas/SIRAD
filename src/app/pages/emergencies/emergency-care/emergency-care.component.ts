import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmergencyAtentionService } from 'src/app/shared/services/emergency-atention.service';
import { ModalArticlesComponent } from '../modal-articles/modal-articles.component';
import { ModalEmergencyCareComponent } from '../modal-emergency-care/modal-emergency-care.component';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { EmergencyService } from 'src/app/shared/services/emergency.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { AtencionEmergencia } from 'src/app/shared/models/emergency.model';
@Component({
  selector: 'app-emergency-care',
  templateUrl: './emergency-care.component.html',
  styleUrls: ['./emergency-care.component.scss']
})
export class EmergencyCareComponent implements OnInit {
  public codigoSinpad! : any;
  public atention_arr : Array<any> = [];
  public downloadURI : '';
  public url;
  public page : number = 0
  public emergenciaTotal : any;
  public PERMISOS = PERMISOS;
  constructor(
    private modalService: NgbModal,
    private params : ActivatedRoute,
    private emergencyCareService : EmergencyAtentionService,
    private alertService : AlertService,
    private emergencyService : EmergencyService,
    public authService: AuthService,
    private alert : AlertService
    ) { 
      this.url = `${environment.urlApiV1EmergencyAtention}/obtener_archivo/`
    }

  ngOnInit(): void {  
    this.codigoSinpad = this.params.snapshot.paramMap.get('id') 
     
    this.getDetailsEmergency()
  }
  message : string;

  getDetailsEmergency() {
    this.emergencyService.getEmergencyById(this.codigoSinpad).subscribe(res => {
      this.emergenciaTotal = res
      this.getAllAtentions(res.codigoSinpad) 
      console.log("emergencia",this.emergenciaTotal);
      
    });
    /* this.getEmergenciasRecord(response.codigoSinpad); */
  }

  addEmergencyCare() {
    const modalRef = this.modalService.open(ModalEmergencyCareComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });

    modalRef.componentInstance.codigoSinpad = this.emergenciaTotal.codigoSinpad;
    modalRef.componentInstance.dateValidator = this.emergenciaTotal.fechaHoraEvento;
    
    modalRef.componentInstance.fromEditParentFamily = {
     
    }
    modalRef.result.then((res) => {
      this.getDetailsEmergency()
    }, (reason) => {
      this.getDetailsEmergency()
    })
    
  }

  editViewEmergencyCare(item){    
    const modalRef = this.modalService.open(ModalEmergencyCareComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    })

    modalRef.componentInstance.id = item.id;
    modalRef.componentInstance.ubigeo_almacen = item.ubigeo_almacen;
    modalRef.componentInstance.nombre_almacen = item.nombre_almacen;
    modalRef.componentInstance.fecha_atencion = item.fecha_atencion;
    modalRef.componentInstance.descripcion = item.descripcion;
    modalRef.componentInstance.archivo = item.archivo;
    modalRef.componentInstance.dateValidator = this.emergenciaTotal.fechaHoraEvento;

    modalRef.result.then((res) => {
      this.getDetailsEmergency()
    }, (reason) => {
      this.getDetailsEmergency()
    })
  }

  addArticles(codigo_sinpad) {
    const modalRef = this.modalService.open(ModalArticlesComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });

    modalRef.componentInstance.codigo_sinpad = codigo_sinpad;

    modalRef.componentInstance.fromEditParentFamily = {
      //idFamilia: id,
      //idEmpadrona: this.idEmp
    }
    modalRef.result.then((res) => {
      //this.getFamilyGroup(this.idEmp);
    }, (reason) => {
      //this.getFamilyGroup(this.idEmp);
    })
  }

  getAllAtentions(codigoSinpad){
    this.atention_arr = [];
    this.emergencyCareService.obtenerAtenciones(codigoSinpad).subscribe(
      response => {
        response.forEach(element => {
          if(element.habilitado === 1){
            this.atention_arr.push(element)
          }
          
          
          function ordenar_fecha(a : any , b : any){
            if(a.fecha_atencion > b.fecha_atencion){
              return -1
            }
            if (a.fecha_atencion < b.fecha_atencion){
              return 1
            }
            return 0
          }
  
          this.atention_arr.sort(ordenar_fecha);
          this.createIndexAtention(this.atention_arr.length)
        })
      }
    )
    
  }

  createIndexAtention(tamanio : number){
    let index = tamanio
    this.atention_arr.forEach(async (element) => {
      element.index = index
      await index--;
    })    
  }

  deleteAtention(id : string){
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar la atencion?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {

        if(result.value){
          
          this.emergencyCareService.eliminarAtencion(id).subscribe(
            response => {
              this.ngOnInit()
            }
          )         
        }else{

        }
      }
    )

    
  }


  //agregado por Daniel Vallejos
  changeStatus(id:string, sinpad : number){
    console.log("id",id);
    console.log("sinpad",sinpad);
    this.alert.questionAlertConfirm('¿Está seguro de enviar?', '', 'Si, enviar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          const data : AtencionEmergencia = {
            id : id,
            estado : 2
          }
          this.emergencyCareService.guardarAtencionEmergenciaUpdate(data).subscribe((res: any) => {
            this.alert.toastSuccess(`Formulario enviado con éxito`);
            this.getDetailsEmergency()
          });
        }
        else {
          this.emergencyCareService.showLoader = false;
        }

      }
    ); 
    
  }
  
}
