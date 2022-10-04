import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Coordinacion, DanioVidaSalud, FilePreliminar, Observacion, Peligro, Preliminar, Recomendacion } from 'src/app/shared/models/preliminar.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { AgregarDanioInstalacionVehiculoComponent } from '../agregar-danio-instalacion-vehiculo/agregar-danio-instalacion-vehiculo.component';
import { AgregarInfraestructuraEducativaComponent } from '../agregar-infraestructura-educativa/agregar-infraestructura-educativa.component';
import { AgregarInfraestructuraTransPuenteComponent } from '../agregar-infraestructura-trans-puente/agregar-infraestructura-trans-puente.component';
import { AgregarInfraestructuraTransporteComponent } from '../agregar-infraestructura-transporte/agregar-infraestructura-transporte.component';
import { AgregarInsfraestructuraCulturalComponent } from '../agregar-insfraestructura-cultural/agregar-insfraestructura-cultural.component';
import { AgregarInsfrasServicBasicosComponent } from '../agregar-insfras-servic-basicos/agregar-insfras-servic-basicos.component';
import { AgregarLesionadosComponent } from '../agregar-lesionados/agregar-lesionados.component';
import { AgregarLocalsPublicosComponent } from '../agregar-locals-publicos/agregar-locals-publicos.component';
import { AgregarNecesidadAgropecuariosComponent } from '../agregar-necesidad-agropecuarios/agregar-necesidad-agropecuarios.component';
import { AgregarNecesidadAtencionComponent } from '../agregar-necesidad-atencion/agregar-necesidad-atencion.component';
import { AgregarNecesidadesPriorAsistComponent } from '../agregar-necesidades-prior-asist/agregar-necesidades-prior-asist.component';
import { AgregarNecesidadesRecursosComponent } from '../agregar-necesidades-recursos/agregar-necesidades-recursos.component';
import { AgregarPersonalPrimRespComponent } from '../agregar-personal-prim-resp/agregar-personal-prim-resp.component';
import { AgregarServicioInfraestructuraComponent } from '../agregar-servicio-infraestructura/agregar-servicio-infraestructura.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpHeaders } from '@angular/common/http';
import { FileService } from 'src/app/shared/services/file.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { AgregarInfraestructuraRiesgoReservaComponent } from '../agregar-infraestructura-riesgo-reserva/agregar-infraestructura-riesgo-reserva.component';
import { AgregarInfraestructuraRiesgoDefensaComponent } from '../agregar-infraestructura-riesgo-defensa/agregar-infraestructura-riesgo-defensa.component';
import { EmergencyService } from 'src/app/shared/services/emergency.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-crear-informacion-general',
  templateUrl: './crear-informacion-general.component.html',
  styleUrls: ['./crear-informacion-general.component.scss']
})
export class CrearInformacionGeneralComponent implements OnInit {

  public formCrearInfoGeneral: FormGroup;
  public formCrearPeligro: FormGroup;

  public listarTransporte: any;
  public listarTipoVehiculo: any;

  //(Daniel Vallejos)
  public infraestructura: any
  public infraestructuraEducativa: any
  public infraestructuraTransMaritimo: any
  public infraestructuraLocalReserva: any
  public infraestructuraServicioPublico: any
  //para cantidad de HeridosLesionados
  public listHeridosLesionLeve : number = 0;
  public listHeridosLesionModerado : number = 0;
  public listHeridosLesionGrave : number = 0;
  public listHeridosLesionTotal : number = 0;

  public listHeridosTratamientoLocal : number = 0;
  public listHeridosTratamientoExterno : number = 0;
  public listHeridosTratamientoTotal : number = 0;

  public listHeridosDesplazamiento : any;
  public listTPeligroSecundarioER : any

  //Sebastian
  public daniomaterial: any
  public TransporteTerrestre: any
  public InfraestructuraRiesgo: any
  public InfraestructuraPublicos: any
  codigoSinpad: any
  detailEmergencyById: any

  tabId: string = 'caracterOne';
  idPreliminar: any;
  idDanioVidaSalud: any;
  lesionados: any;
  personal: any;
  dataPreliminar: any;
  notFoundData: boolean = false;
  notFoundData2: boolean = false;
  coordinacion: any;
  observacion: any;
  recomendacion: any;
  necesidades: any;
  necesidadesRecurso: any;
  necesidadSalud: any;
  necesidadAgropecuarios: any;
  accionesPrioritarias: any;
  idEmergencia: any;
  isEdit : any

  public PERMISOS = PERMISOS;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private alertService: AlertService,
    private preliminarService: PreliminarService,
    private params: ActivatedRoute,
    private route: Router,
    private fileService: FileService,
    public authService: AuthService,
    private emergencyService: EmergencyService
  ) {
    this.formCrearInfoGeneral = this.fb.group({
      id: [],
      condicionClimatica: [''],
      idViaTransporte: [''],
      viaTransporte: [''],
      idTipoVehiculo: [''],
      tipoVehiculo: [''],
      lugarPartida: [''],
      tiempoEstimadoLlegada: [''],
      rutaPrincipal: [''],
      rutaAlterna: [''],
      file: [null],
      files: this.fb.array([])
    });

    this.formCrearPeligro = this.fb.group({
      peligroSecundario: [],
      peligroNaturalHumana: []
    })

  }

  ngOnInit(): void {
    this.getListViaTransport();
    this.getListTipoVehiculo();
    this.idPreliminar = this.params.snapshot.paramMap.get('idPreliminar');
    let words = this.params.snapshot.paramMap.get('idEmergencia').split(",")    
    this.idEmergencia = words[0];
    this.isEdit = words[1];
    console.log("dasdas",this.idEmergencia);
    console.log("isEdit",this.isEdit);
    
    this.getDetailsEmergency();
    this.getDetailPreliminar(this.idPreliminar);
    this.listarAccionesPrioritarias();
    this.getHeridosLesion()
    this.getHeridosTratamiento()
    this.getHeridosDesplazamiento()
    this.getTPeligroSecundarioERapida()
  }

  //agregado por DV para traer la cantidad de lesionados
  getHeridosLesion() {
    this.preliminarService.getHeridosLesion(this.idEmergencia).subscribe(
      response => {
        response.forEach((e:any) => {
          this.listHeridosLesionLeve += e.cantidadLeve
          this.listHeridosLesionModerado += e.cantidadModerado
          this.listHeridosLesionGrave += e.cantidadGrave
          this.listHeridosTratamientoTotal += e.total
        });         
      }
    )
  }
  getHeridosTratamiento() {
    this.preliminarService.getHeridosTratamiento(this.idEmergencia).subscribe(
      response => {
        response.forEach((e:any) => {
          this.listHeridosTratamientoLocal += e.cantidadTratamientoLocal
          this.listHeridosTratamientoExterno += e.cantidadNecesidadEvacuacion
          this.listHeridosLesionTotal += e.total
        });         
      }
    )
  }
  getHeridosDesplazamiento() {        
    this.preliminarService.getHeridosDesplazamiento(this.idEmergencia).subscribe(      
      response => {
        this.listHeridosDesplazamiento = response       
      }
    )
  }

  getTPeligroSecundarioERapida() {
    this.preliminarService.getPeligroSecundarioEvaluacionRapida(this.idEmergencia).subscribe(
      response => {
        this.listTPeligroSecundarioER = response
        console.log("Peligro Secundario ER",this.listTPeligroSecundarioER);        
      }
    )
  }

  getDetailsEmergency() {
    this.emergencyService.getEmergencyById(this.idEmergencia).subscribe(res => {
      this.codigoSinpad = res.codigoSinpad
      this.detailEmergencyById = res
      console.log("emergencia", this.detailEmergencyById);

    });
  }

  // archivo
  get files() {
    return <FormArray>this.formCrearInfoGeneral.get('files');
  }

  addFile(rFile: any) {
    const group = this.fb.group({
      ruta: rFile.path,
      nombre: rFile.name,
      archivo: rFile.file,
      descripcion: '',
      tamanio: rFile.size,
      tipo: rFile.type
    });
    this.files.push(group);
  }

  getNameFile(index: any) {
    return this.formCrearInfoGeneral.value.files[index].nombre
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDropSuccess(event: any) {
    event.preventDefault();
    this.onFileChange(event.dataTransfer.files);    // notice the "dataTransfer" used instead of "target"
  }

  onChange(event: any) {
    this.onFileChange(event.target.files);    // "target" is correct here
  }

  private onFileChange(files: File[]) {
    if (!files) {
      return;
    }
    const fileListAsArray = Array.from(files)
    fileListAsArray.forEach((file: any) => {
      let myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      myFormData.append('file', file);

      this.fileService.createFile(myFormData).subscribe((res: any) => {
        this.alertService.toastSuccess(`${res.message}`);
        this.addFile(res.rFile);
      });
    });

  }

  delete(index: any): void {
    const file = this.formCrearInfoGeneral.value.files[index]
    this.fileService.removeFile(file.archivo, file.ruta).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.files.removeAt(index)
    });
  }

  displayFiles(files: FilePreliminar[]): void {
    for (let file of files) {
      const group = this.fb.group({
        id: file.id,
        ruta: file.ruta,
        nombre: file.nombre,
        archivo: file.archivo,
        descripcion: file.descripcion,
        tamanio: file.tamanio,
        tipo: file.tipo
      });
      this.files.push(group);
    }
  }


  /*=============================================== LISTADO DE MAESTRAS ================================================*/
  getListViaTransport() {
    this.preliminarService.getMaeViaTransporte().subscribe(res => {
      this.listarTransporte = res;
    })
  }

  getListTipoVehiculo() {
    this.preliminarService.getMaeTipoVehiculo().subscribe(res => {
      this.listarTipoVehiculo = res;
    })
  }

  getDetailPreliminar(id: number) {
    this.preliminarService.getDetailPreliminar(id).subscribe((res: Preliminar) => {
      this.formCrearInfoGeneral.controls['condicionClimatica'].setValue(res.condicionClimatica);
      this.formCrearInfoGeneral.controls['idViaTransporte'].setValue(res.idViaTransporte);
      this.formCrearInfoGeneral.controls['lugarPartida'].setValue(res.lugarPartida);
      this.formCrearInfoGeneral.controls['rutaPrincipal'].setValue(res.rutaPrincipal);
      this.formCrearInfoGeneral.controls['idTipoVehiculo'].setValue(res.idTipoVehiculo);
      this.formCrearInfoGeneral.controls['tiempoEstimadoLlegada'].setValue(res.tiempoEstimadoLlegada);
      this.formCrearInfoGeneral.controls['rutaAlterna'].setValue(res.rutaAlterna);
      this.formCrearInfoGeneral.controls['viaTransporte'].setValue(res.viaTransporte);
      this.formCrearInfoGeneral.controls['tipoVehiculo'].setValue(res.tipoVehiculo);

      this.formCrearPeligro.controls['peligroSecundario'].setValue(res.peligro?.peligroSecundario);
      this.formCrearPeligro.controls['peligroNaturalHumana'].setValue(res.peligro?.peligroNaturalHumana);

      this.coordinacion = res.coordinacion?.coordinacion
      this.observacion = res.conclusionObservacion?.conclusionObservacion
      this.recomendacion = res.recomendacion?.recomendacion

      this.dataPreliminar = res;
      this.idDanioVidaSalud = res.danioVidaSalud?.id;
      this.getAllLesionados(this.idDanioVidaSalud);
      this.getAllPersonal(this.idDanioVidaSalud);
      this.listarNecesidades(res.analisisNecesidad?.id);
      this.listarNecesidadRecurso(res.analisisNecesidad?.id);
      this.listarNecesidadSalud(res.analisisNecesidad?.id);
      this.listarAgropecuario(res.analisisNecesidad?.id);
      this.getServiciosInfraestructura(res.danioMaterial?.id);
      this.getServiciosInfraestructuraEducativa(res.danioMaterial?.id);
      this.getServiciosInfraestructuraTransMaritimo(res.danioMaterial?.id);
      this.getServiciosInfraestructuraReserva(res.danioMaterial?.id);
      this.getServiciosInfraestructuraServiciosBasicos(res.danioMaterial?.id);
      this.getDanioVehiculo(res.danioMaterial?.id);
      this.getServiciosInfraestructuraTransporte(res.danioMaterial?.id);
      this.getInfrestructuraRiesgoDefensa(res.danioMaterial?.id);
      this.getLocalesPublicos(res.danioMaterial?.id);
    })
  }

  tabChange(event: string) {
    this.tabId = event;
    window.scrollTo(0, 0);
    const data: Preliminar = {
      id: this.dataPreliminar?.id
    }
    if(this.isEdit == 1) data.estado_formulario = 1
    this.preliminarService.crearInformGeneral(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
    });
  }

  /** ========================================  */
  crearInfoGeneral() {
    const data: Preliminar = {
      id: this.dataPreliminar?.id,
      idEmergencia: this.dataPreliminar.idEmergencia,
      tipoFormulario: this.dataPreliminar.tipoFormulario,
      idResponsable: this.dataPreliminar.idResponsable,
      responsable: this.dataPreliminar.responsable,
      dni: this.dataPreliminar.dni,
      cargo: this.dataPreliminar.cargo,
      institucion: this.dataPreliminar.institucion,
      condicionClimatica: this.formCrearInfoGeneral.value.condicionClimatica,
      idViaTransporte: Number(this.formCrearInfoGeneral.value.idViaTransporte),
      viaTransporte: this.formCrearInfoGeneral.value.viaTransporte,
      idTipoVehiculo: Number(this.formCrearInfoGeneral.value.idTipoVehiculo),
      tipoVehiculo: this.formCrearInfoGeneral.value.tipoVehiculo,
      lugarPartida: this.formCrearInfoGeneral.value.lugarPartida,
      tiempoEstimadoLlegada: this.formCrearInfoGeneral.value.tiempoEstimadoLlegada,
      rutaPrincipal: this.formCrearInfoGeneral.value.rutaPrincipal,
      rutaAlterna: this.formCrearInfoGeneral.value.rutaAlterna,
      habilitado: this.dataPreliminar.habilitado,
      idRegistradoPor: this.dataPreliminar.idRegistradoPor,
      registradoPor: this.dataPreliminar.registradoPor,
      fechaHoraRegistrado: this.dataPreliminar.fechaHoraRegistrado,
      idRevisadoPor: this.dataPreliminar.idRevisadoPor,
      revisadoPor: this.dataPreliminar.revisadoPor,
      fechaHoraRevisado: this.dataPreliminar.fechaHoraRevisado,
      idAprobadoPor: this.dataPreliminar.idAprobadoPor,
      aprobadoPor: this.dataPreliminar.aprobadoPor,
      fechaHoraAprobado: this.dataPreliminar.fechaHoraAprobado,
    }
    if(this.isEdit == 1) data.estado_formulario = 1
    this.preliminarService.crearInformGeneral(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.tabChange('caracterOne');
    });
  }

  crearPeligros() {
    const data: Peligro = {
      id: this.dataPreliminar?.peligro.id,
      peligroNaturalHumana: this.formCrearPeligro.value.peligroNaturalHumana,
      peligroSecundario: this.formCrearPeligro.value.peligroSecundario,
    }

    this.preliminarService.crearInPeligro(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.tabChange('health');
    });
  }

  crearCoordinacion(ev: any) {
    const data: Coordinacion = {
      id: this.dataPreliminar.coordinacion.id,
      coordinacion: ev.target.value,
      preliminar: {
        id: this.idPreliminar
      }
    }

    this.preliminarService.crearCoordinacion(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
    });
  }

  crearObservacion(ev: any) {
    const data: Observacion = {
      id: this.dataPreliminar.conclusionObservacion.id,
      conclusionObservacion: ev.target.value,
      preliminar: {
        id: this.idPreliminar
      }
    }

    this.preliminarService.crearObservacion(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
    });
  }

  crearRecomendacion(ev: any) {
    const data: Recomendacion = {
      id: this.dataPreliminar.recomendacion.id,
      recomendacion: ev.target.value,
      preliminar: {
        id: this.idPreliminar
      }
    }

    this.preliminarService.crearRecomendacion(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
    });
  }

  /**OnChanges */

  changeViaTransporte(event: any) {
    const select = event.target;
    const val = select.options[select.selectedIndex].getAttribute('name');
    this.formCrearInfoGeneral.controls['viaTransporte'].setValue(val);
  }

  changeTipoVehiculo(event: any) {
    const select = event.target;
    const val = select.options[select.selectedIndex].getAttribute('name');
    this.formCrearInfoGeneral.controls['tipoVehiculo'].setValue(val);
  }

  /*================================== LISTADO MAESTRAS ======================================= */
  getAllLesionados(id: number) {
    this.preliminarService.getAllLesionados(id).subscribe(res => {
      if (!res.length) {
        this.notFoundData = true;
      } else {
        this.lesionados = res;
      }
    })
  }

  getAllPersonal(id: number) {
    this.preliminarService.getAllPersonal(id).subscribe(res => {
      if (!res.length) {
        this.notFoundData2 = true;
      } else {
        this.personal = res;
      }
    })
  }

  listarNecesidades(idAnalisiNec: any) {
    this.preliminarService.getAnalisisNecesidades(idAnalisiNec, 1).subscribe(res => {
      this.necesidades = res;
    })
  }

  listarNecesidadRecurso(idAnalisiNec: any) {
    this.preliminarService.getAnalisisNecesidades(idAnalisiNec, 2).subscribe(res => {
      this.necesidadesRecurso = res;
    })
  }

  listarNecesidadSalud(idAnalisiNec: any) {
    this.preliminarService.getAnalisisNecesidades(idAnalisiNec, 3).subscribe(res => {
      this.necesidadSalud = res;
    })
  }

  listarAgropecuario(idAnalisiNec: any) {
    this.preliminarService.getAnalisisNecesidades(idAnalisiNec, 4).subscribe(res => {
      this.necesidadAgropecuarios = res;
    })
  }

  listarAccionesPrioritarias() {
    this.preliminarService.getAccionesPrioritarias().subscribe(res => {
      this.accionesPrioritarias = res;
    })
  }

  eliminarNecesidad(id: number) {
    this.alertService.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar este registro', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.preliminarService.eliminarAnalisisNecesidad(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.listarNecesidades(this.dataPreliminar.analisisNecesidad.id);
            this.listarNecesidadRecurso(this.dataPreliminar.analisisNecesidad.id);
          });
        }
      }
    );
  }

  editarLesionado(id: number) {
    const modalRef = this.modalService.open(AgregarLesionadosComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.dataEditar = {
      idLesionado: id,
      idDanioVidaSalud: this.idDanioVidaSalud,
      status: 0
    }
    modalRef.result.then((res) => {
      this.getAllLesionados(this.idDanioVidaSalud);
    }, (reason) => {
      this.getAllLesionados(this.idDanioVidaSalud);
    })
  }

  eliminarLesionado(id: number) {
    this.alertService.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar esta emergencia', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.preliminarService.eliminarLesionado(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getAllLesionados(this.idDanioVidaSalud);
          });
        }
      }
    );
  }

  agregarLesionados() {
    const modalRef = this.modalService.open(AgregarLesionadosComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.idDanioVidaSalud = this.idDanioVidaSalud;
    modalRef.result.then((res) => {
      this.getAllLesionados(this.idDanioVidaSalud);
    }, (reason) => {
      this.getAllLesionados(this.idDanioVidaSalud);
    })
  }

  agregarPersPrimRes() {
    const modalRef = this.modalService.open(AgregarPersonalPrimRespComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.idDanioVidaSalud = this.idDanioVidaSalud;  
    modalRef.componentInstance.status = 1  
    modalRef.result.then((res) => {
      this.getAllPersonal(this.idDanioVidaSalud);
    }, (reason) => {
      this.getAllPersonal(this.idDanioVidaSalud);
    })
  }

  editPersonal(id: number) {
    const modalRef = this.modalService.open(AgregarPersonalPrimRespComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.idDanioVidaSalud = this.idDanioVidaSalud
    modalRef.componentInstance.idPersonall = id
    modalRef.componentInstance.status = 0
    modalRef.result.then((res) => {
      this.getAllPersonal(this.idDanioVidaSalud);
    }, (reason) => {
      this.getAllPersonal(this.idDanioVidaSalud);
    })
  }

  eliminarPersonal(id: number) {
    this.alertService.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar este registro', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.preliminarService.eliminarPersonal(id).subscribe(res => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getAllPersonal(this.idDanioVidaSalud);
          });
        }
      }
    );
  }

  agregarInsfraestructuraEdu() {
    const modalRef = this.modalService.open(AgregarInfraestructuraEducativaComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    //modalRef.componentInstance.fromParentIdEmp = this.idEmp;
    modalRef.result.then((res) => {
      //this.getFamilyGroup(this.idEmp);
    }, (reason) => {
      //this.getFamilyGroup(this.idEmp);
    })
  }


  agregarInfraestructuraCultural() {
    const modalRef = this.modalService.open(AgregarInsfraestructuraCulturalComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    //modalRef.componentInstance.fromParentIdEmp = this.idEmp;
    modalRef.result.then((res) => {
      //this.getFamilyGroup(this.idEmp);
    }, (reason) => {
      //this.getFamilyGroup(this.idEmp);
    })
  }

  agregarNecesidadesPrioritaarias() {
    const modalRef = this.modalService.open(AgregarNecesidadesPriorAsistComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromNecesidad = this.dataPreliminar.analisisNecesidad.id;
    modalRef.result.then((res) => {
      this.listarNecesidades(this.dataPreliminar.analisisNecesidad.id);
    }, (reason) => {
      this.listarNecesidades(this.dataPreliminar.analisisNecesidad.id);
    })
  }

  editarNecesidad(id: number) {
    const modalRef = this.modalService.open(AgregarNecesidadesPriorAsistComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromNecesidadEdit = {
      idAnalisisNecesidad: this.dataPreliminar.analisisNecesidad.id,
      idNecesidad: id,
      status: 0
    }
    modalRef.result.then((res) => {
      this.listarNecesidades(this.dataPreliminar.analisisNecesidad.id);
    }, (reason) => {
      this.listarNecesidades(this.dataPreliminar.analisisNecesidad.id);
    })
  }

  agregarNecesidadesRecursos() {
    const modalRef = this.modalService.open(AgregarNecesidadesRecursosComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromNecesidad = this.dataPreliminar.analisisNecesidad.id;
    modalRef.result.then((res) => {
      this.listarNecesidadRecurso(this.dataPreliminar.analisisNecesidad.id);
    }, (reason) => {
      this.listarNecesidadRecurso(this.dataPreliminar.analisisNecesidad.id);
    })
  }

  editarNecesidadesRecursos(id: number) {
    const modalRef = this.modalService.open(AgregarNecesidadesRecursosComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromNecesidadEdit = {
      idAnalisisNecesidad: this.dataPreliminar.analisisNecesidad.id,
      idNecesidad: id,
      status: 0
    }
    modalRef.result.then((res) => {
      this.listarNecesidadRecurso(this.dataPreliminar.analisisNecesidad.id);
    }, (reason) => {
      this.listarNecesidadRecurso(this.dataPreliminar.analisisNecesidad.id);
    })
  }

  agregarNecesidadAtencion() {
    const modalRef = this.modalService.open(AgregarNecesidadAtencionComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromNecesidad = this.dataPreliminar.analisisNecesidad.id;
    modalRef.result.then((res) => {
      this.listarNecesidadSalud(this.dataPreliminar.analisisNecesidad.id);
    }, (reason) => {
      this.listarNecesidadSalud(this.dataPreliminar.analisisNecesidad.id);
    })
  }

  editarNecesidadSalud(id: number) {
    const modalRef = this.modalService.open(AgregarNecesidadAtencionComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromNecesidadEdit = {
      idAnalisisNecesidad: this.dataPreliminar.analisisNecesidad.id,
      idNecesidad: id,
      status: 0
    }
    modalRef.result.then((res) => {
      this.listarNecesidadSalud(this.dataPreliminar.analisisNecesidad.id);
    }, (reason) => {
      this.listarNecesidadSalud(this.dataPreliminar.analisisNecesidad.id);
    })
  }

  agregarNecesidadAgropecuarios() {
    const modalRef = this.modalService.open(AgregarNecesidadAgropecuariosComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromNecesidad = this.dataPreliminar.analisisNecesidad.id;
    modalRef.result.then((res) => {
      this.listarAgropecuario(this.dataPreliminar.analisisNecesidad.id);
    }, (reason) => {
      this.listarAgropecuario(this.dataPreliminar.analisisNecesidad.id);
    })
  }

  editarNecesidadAgropecuario(id: number) {
    const modalRef = this.modalService.open(AgregarNecesidadAgropecuariosComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromNecesidadEdit = {
      idAnalisisNecesidad: this.dataPreliminar.analisisNecesidad.id,
      idNecesidad: id,
      status: 0
    }
    modalRef.result.then((res) => {
      this.listarAgropecuario(this.dataPreliminar.analisisNecesidad.id);
    }, (reason) => {
      this.listarAgropecuario(this.dataPreliminar.analisisNecesidad.id);
    })
  }


  //Daniel Vallejos
  getServiciosInfraestructura(idDanioMaterial: any) {
    this.preliminarService.getInfraestructura(idDanioMaterial).subscribe(
      response => {
        //obtener ultimo valor
        this.infraestructura = response

      }
    )
  }
  agregarServiciosInfraestructura() {
    const modalRef = this.modalService.open(AgregarServicioInfraestructuraComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      idDanioMaterial: this.dataPreliminar.danioMaterial.id,
      status: 0,
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructura(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructura(this.dataPreliminar.danioMaterial.id)
    })
  }

  deleteServiciosInfraestructura(id: number) {
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.deleteInfraestructuraById(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getServiciosInfraestructura(this.dataPreliminar.danioMaterial.id)
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  editServicioInfraestructura(id: number) {
    const modalRef = this.modalService.open(AgregarServicioInfraestructuraComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      id: id,
      status: 1,
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructura(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructura(this.dataPreliminar.danioMaterial.id)
    })
  }


  getServiciosInfraestructuraEducativa(id: any) {
    this.preliminarService.getInfraestructuraEducativa(id).subscribe(
      response => {
        //obtener ultimo valor
        this.infraestructuraEducativa = response
      }
    )
  }

  agregarServiciosInfraestructuraEducativa() {
    const modalRef = this.modalService.open(AgregarInfraestructuraEducativaComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      idDanioMaterial: this.dataPreliminar.danioMaterial.id,
      status: 0
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructuraEducativa(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructuraEducativa(this.dataPreliminar.danioMaterial.id)
    })
  }

  editServicioInfraestructuraEducativa(id: number) {
    const modalRef = this.modalService.open(AgregarInfraestructuraEducativaComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      id: id,
      status: 1,
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructuraEducativa(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructuraEducativa(this.dataPreliminar.danioMaterial.id)
    })
  }

  deleteServiciosInfraestructuraEducativa(id: number) {
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.deleteInfraestructuraByIdEducativa(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getServiciosInfraestructuraEducativa(this.dataPreliminar.danioMaterial.id)
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  getServiciosInfraestructuraTransMaritimo(id: any) {
    this.preliminarService.getInfraestructuraTransMaritimo(id).subscribe(
      response => {
        //obtener ultimo valor
        this.infraestructuraTransMaritimo = response

      }
    )
  }

  agregarInfrestructuraTransMaritimo() {
    const modalRef = this.modalService.open(AgregarInfraestructuraTransPuenteComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      idDanioMaterial: this.dataPreliminar.danioMaterial.id,
      status: 0
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructuraTransMaritimo(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructuraTransMaritimo(this.dataPreliminar.danioMaterial.id)
    })
  }

  editServicioInfraestructuraTransMaritimo(id: number) {
    const modalRef = this.modalService.open(AgregarInfraestructuraTransPuenteComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      id: id,
      status: 1
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructuraTransMaritimo(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructuraTransMaritimo(this.dataPreliminar.danioMaterial.id)
    })
  }

  deleteServiciosInfraestructuraTransMaritimo(id: number) {
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.deleteInfraestructuraByIdTransMaritimo(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getServiciosInfraestructuraTransMaritimo(this.dataPreliminar.danioMaterial.id)
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  getServiciosInfraestructuraReserva(id: any) {
    this.preliminarService.getInfraestructuraReserva(id).subscribe(
      response => {
        //obtener ultimo valor
        this.infraestructuraLocalReserva = response

      }
    )
  }

  agregarInfrestructuraReserva() {
    const modalRef = this.modalService.open(AgregarInfraestructuraRiesgoReservaComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      idDanioMaterial: this.dataPreliminar.danioMaterial.id,
      status: 0
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructuraReserva(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructuraReserva(this.dataPreliminar.danioMaterial.id)
    })
  }

  editServicioInfraestructuraReserva(id: number) {
    const modalRef = this.modalService.open(AgregarInfraestructuraRiesgoReservaComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      id: id,
      status: 1
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructuraReserva(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructuraReserva(this.dataPreliminar.danioMaterial.id)
    })
  }

  deleteServiciosInfraestructuraReserva(id: number) {
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.deleteInfraestructuraByIdReserva(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getServiciosInfraestructuraReserva(this.dataPreliminar.danioMaterial.id)
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  getServiciosInfraestructuraServiciosBasicos(id: any) {
    this.preliminarService.getInfraestructuraServicioPublico(id).subscribe(
      response => {
        //obtener ultimo valor
        this.infraestructuraServicioPublico = response

      }
    )
  }

  setServiciosInfraestructuraServiciosBasicos(id: number) {
    if (id == 1) return "Si"
    else return "No"
  }

  agregarInfrestructuraServiciosBasicos() {
    const modalRef = this.modalService.open(AgregarInsfrasServicBasicosComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      idDanioMaterial: this.dataPreliminar.danioMaterial.id,
      status: 0
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructuraServiciosBasicos(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructuraServiciosBasicos(this.dataPreliminar.danioMaterial.id)
    })
  }

  editServicioInfraestructuraServiciosBasicos(id: number) {
    const modalRef = this.modalService.open(AgregarInsfrasServicBasicosComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      id: id,
      status: 1
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructuraServiciosBasicos(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructuraServiciosBasicos(this.dataPreliminar.danioMaterial.id)
    })
  }

  deleteServiciosInfraestructuraServiciosBasicos(id: number) {
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.deleteInfraestructuraByIdServicioPublico(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getServiciosInfraestructuraServiciosBasicos(this.dataPreliminar.danioMaterial.id)
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }


  //sebastian
  getDanioVehiculo(id: any) {
    this.preliminarService.getMaestraDanioMaterial(id).subscribe(
      response => {
        //obtener ultimo valor
        this.daniomaterial = response

      }
    )
  }

  agregarDanioVehiculo() {
    const modalRef = this.modalService.open(AgregarDanioInstalacionVehiculoComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      idDanioMaterial: this.dataPreliminar.danioMaterial.id,
      status: 1,
    }
    modalRef.result.then((res) => {
      this.getDanioVehiculo(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getDanioVehiculo(this.dataPreliminar.danioMaterial.id);
    })

  }

  deleteDanioVehiculo(id: number) {
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.deleteDanioMaterialById(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getDanioVehiculo(this.dataPreliminar.danioMaterial.id)
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  editDanioVehiculo(id: number) {
    const modalRef = this.modalService.open(AgregarDanioInstalacionVehiculoComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      id: id,
      status: 1,
    }
    modalRef.result.then((res) => {
      this.getDanioVehiculo(this.dataPreliminar.danioMaterial.id);
    }, (reason) => {
      this.getDanioVehiculo(this.dataPreliminar.danioMaterial.id);
    })
  }

  getServiciosInfraestructuraTransporte(id: any) {
    this.preliminarService.getTransporteTerrestre(id).subscribe(
      response => {
        //obtener ultimo valor
        this.TransporteTerrestre = response

      }
    )
  }

  agregarInfraestructuraTransporte() {
    const modalRef = this.modalService.open(AgregarInfraestructuraTransporteComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      idDanioMaterial: this.dataPreliminar.danioMaterial.id,
      status: 1,
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructuraTransporte(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructuraTransporte(this.dataPreliminar.danioMaterial.id)
    })
  }

  deleteServiciosInfraestructuraTransporte(id: number) {
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.deleteTransporteTerrestreById(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getServiciosInfraestructuraTransporte(this.dataPreliminar.danioMaterial.id)
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  editServicioInfraestructuraTransporte(id: number) {
    const modalRef = this.modalService.open(AgregarInfraestructuraTransporteComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      id: id,
      status: 1,
    }
    modalRef.result.then((res) => {
      this.getServiciosInfraestructuraTransporte(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getServiciosInfraestructuraTransporte(this.dataPreliminar.danioMaterial.id)
    })
  }

  getInfrestructuraRiesgoDefensa(id: any) {
    this.preliminarService.getInfraestructuraRiesgo(id).subscribe(
      response => {
        //obtener ultimo valor
        this.InfraestructuraRiesgo = response

      }
    )
  }

  agregarInfrestructuraRiesgoDefensa() {
    const modalRef = this.modalService.open(AgregarInfraestructuraRiesgoDefensaComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      idDanioMaterial: this.dataPreliminar.danioMaterial.id,
      status: 1,
    }
    modalRef.result.then((res) => {
      this.getInfrestructuraRiesgoDefensa(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getInfrestructuraRiesgoDefensa(this.dataPreliminar.danioMaterial.id)
    })
  }

  editServicioInfraestructuraRiesgoDefensa(id: number) {
    const modalRef = this.modalService.open(AgregarInfraestructuraRiesgoDefensaComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      id: id,
      status: 1,
    }
    modalRef.result.then((res) => {
      this.getInfrestructuraRiesgoDefensa(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getInfrestructuraRiesgoDefensa(this.dataPreliminar.danioMaterial.id)
    })
  }

  deleteServiciosInfraestructuraRiesgoDefensa(id: number) {
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.deleteInfraestructuraRiesgoById(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getInfrestructuraRiesgoDefensa(this.dataPreliminar.danioMaterial.id)
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }

  getLocalesPublicos(id: any) {
    this.preliminarService.getLocalesPublicos(id).subscribe(
      response => {
        //obtener ultimo valor
        this.InfraestructuraPublicos = response
      }
    )
  }

  agregarLocalesPublicos() {
    const modalRef = this.modalService.open(AgregarLocalsPublicosComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      idDanioMaterial: this.dataPreliminar.danioMaterial.id,
      status: 1,
    }
    modalRef.result.then((res) => {
      this.getLocalesPublicos(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getLocalesPublicos(this.dataPreliminar.danioMaterial.id)
    })
  }

  editLocalesPublicos(id: number) {
    const modalRef = this.modalService.open(AgregarLocalsPublicosComponent, {
      size: 'lg',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.parametros = {
      id: id,
      status: 1,
    }
    modalRef.result.then((res) => {
      this.getLocalesPublicos(this.dataPreliminar.danioMaterial.id)
    }, (reason) => {
      this.getLocalesPublicos(this.dataPreliminar.danioMaterial.id)
    })
  }

  deleteLocalesPublicos(id: number) {
    this.alertService.questionAlertConfirm(
      '¿Está seguro de eliminar?',
      '',
      'Si, Eliminar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.preliminarService.deleteLocalesPublicosById(id).subscribe((res: any) => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getLocalesPublicos(this.dataPreliminar.danioMaterial.id)
          });
        } else {
          this.preliminarService.showLoader = false;
        }
      }
    );
  }


  updateFiles() {
    const preliminarArchivo: any = {
      id: this.dataPreliminar?.id,
      archivos: this.files.value
    }

    this.preliminarService.crearInformGeneral(preliminarArchivo).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
    });

    this.route.navigate([`/quick-evaluation/list/${this.idEmergencia}`]).then(() => { });

  }

  updateFiles1() {
    console.log("jajaj ", `/quick-evaluation/list/${this.idEmergencia}`);

    this.route.navigate([`/quick-evaluation/list/${this.idEmergencia}`]).then(() => { });
  }

  openPdf() {

    const dd: any = {
      content: [
        { //logo

          columns: [
            {
              image: 'data:image/jpeg;base64,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',
              width: 100,
              height: 30,
            },
            {
              alignment: 'center',
              width: '*',
              text: ''
            },
            {
              image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQUAAABMCAIAAADr1DXWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVDMjlEN0E3MjcwMTFFODgyMzZCM0M0RDMzNTU4RkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVDMjlEN0I3MjcwMTFFODgyMzZCM0M0RDMzNTU4RkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRUMyOUQ3ODcyNzAxMUU4ODIzNkIzQzREMzM1NThGRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRUMyOUQ3OTcyNzAxMUU4ODIzNkIzQzREMzM1NThGRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PukMgSEAACIxSURBVHja7D0HWFTH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',

              width: 100,
              height: 30,
            },
          ],

        },
        {
          columns: [
            {
              alignment: 'center',
              width: 100,
              text: ''
            },
            {
              alignment: 'center',
              width: '*',
              text: 'FORMULARIO EDAN PERÚ'
            },
            {
              alignment: 'center',
              width: 100,
              text: ''
            },
          ],

        },

        //informacion general
        {
          text: '\n'
        },
        {
          table: {
            widths: [100, '*', 100, '*'],
            body: [
              [{ text: 'EVALUACIÓN NRO', fontSize: 9, bold: true, alignment: 'left' },
              { text: '001', fontSize: 9, bold: false, alignment: 'center' },
              { text: 'CÓDIGO SINPAD', fontSize: 9, bold: true, alignment: 'left' },
              { text: `${this.codigoSinpad}`, fontSize: 9, bold: false, alignment: 'center' }
              ],
              [
                { text: 'TIPO DE PELIGRO', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${this.detailEmergencyById.tipoPeligro}`, fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
            ]
          }
        },
        {
          text: '1. INFORMACIÓN GENERAL', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          table: {
            widths: [100, '*', 100, '*'],
            body: [
              [{ text: '1.1 Fecha', fontSize: 9, bold: true, alignment: 'left' },
              { text: '', fontSize: 9, bold: false, alignment: 'center' },
              { text: '1.2 Hora', fontSize: 9, bold: true, alignment: 'left' },
              { text: '', fontSize: 9, bold: false, alignment: 'center' }
              ],
              [
                { text: '1.3 Responsable', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'Dni', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, alignment: 'center' },
                { text: 'Cargo', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, alignment: 'center' }
              ],
              [
                { text: 'Institucion', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: '1.4 Zona Afectada', fontSize: 9, bold: true, colSpan: 4, alignment: 'left' }
              ],
              [
                { text: 'Ubicacion', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: '1.5 Condiciones climaticas de la zona afectada para la asistencia en el momento del reporte', fontSize: 9, bold: true, colSpan: 4, alignment: 'left' }
              ],
              [
                { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", fontSize: 9, bold: false, colSpan: 4, alignment: 'left' }
              ],
              [
                { text: "1.6 Ruta de acceso sugerida para llegar a la zona afectada", fontSize: 9, bold: true, colSpan: 4, alignment: 'left' }
              ],
              [
                { text: 'Via de transporte', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'Tiempo estimado de llegada', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'Tipo de vehículo', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'Ruta principal', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'Lugar de partida', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'Ruta alterna', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
            ]
          }
        },
        {
          text: '2.0 CARACTERÍSTICAS DEL PELIGRO DE ORIGEN NATURAL O INDUCIDO POR LA ACCIÓN HUMANA', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          table: {
            widths: [100, '*', 100, '*'],
            body: [
              [{ text: 'Numero', fontSize: 9, bold: true, alignment: 'left' },
              { text: '', fontSize: 9, bold: false, alignment: 'center' },
              { text: 'Tipo formulario', fontSize: 9, bold: true, alignment: 'left' },
              { text: '', fontSize: 9, bold: false, alignment: 'center' }
              ],
              [{ text: 'Fecha Ocurrencia', fontSize: 9, bold: true, alignment: 'left' },
              { text: '', fontSize: 9, bold: false, alignment: 'center' },
              { text: 'Tipo peligro', fontSize: 9, bold: true, alignment: 'left' },
              { text: '', fontSize: 9, bold: false, alignment: 'center' }
              ],
              [
                { text: 'Ubicacion', fontSize: 9, bold: true, alignment: 'left' },
                { text: '', fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'Peligros secundarios generados', fontSize: 9, bold: true, colSpan: 4, alignment: 'center' }
              ],
              [
                { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", fontSize: 9, bold: false, colSpan: 4, alignment: 'left' }
              ],
              [
                { text: 'Descripción del peligro de origen natural o inducido por la acción humana', fontSize: 9, bold: true, colSpan: 4, alignment: 'center' }
              ],
              [
                { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", fontSize: 9, bold: false, colSpan: 4, alignment: 'left' }
              ],
            ]
          }
        },
        {
          text: '3.0 DAÑOS A LA VIDA Y A LA SALUD DE LA PERSONA', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          text: '3.1 Población (damnificada y afectada) con respecto al daño en las viviendas', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*',],
            body: [
              [
                { text: 'Número de Familias ', fontSize: 9, bold: true, alignment: 'center', colSpan: 5 }, '', '', '', '',
                { text: 'Número de Personas ', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
              [
                { text: 'Localidad ', fontSize: 9, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: 'Afecta', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Damnifica', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Afecta', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Damnifica', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Total de daños por vivienda:', fontSize: 9, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Total de daños por Medios de Vida:', fontSize: 9, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Total General:', fontSize: 9, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
              ],
            ]
          }
        },
        {
          text: '\n\n'
        },
        {
          text: '3.2 Grupos Etarios y Condición', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: '\nCondición', fontSize: 9, bold: true, alignment: 'center', colSpan: 2, rowSpan: 2 }, '',
                { text: 'Menor de 1 año', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '1 a 4 años', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '5 a 9 años', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '10 a 14 años', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '15 a 17 años', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '18 a 49 años', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '50 a 59 años', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Mayor de 60 años', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Gestantes', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
              ],
              [
                { text: '', colSpan: 2 }, '',
                { text: 'M', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'F', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'M', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'F', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'M', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'F', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'M', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'F', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'M', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'F', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'M', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'F', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'M', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'F', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'M', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'F', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'F', colSpan: 2, bold: true, alignment: 'center' }, '',

              ]
            ]
          }
        },
        {
          text: '3.3 Lesionados (Heridos)', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Lugar de atención', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Graves', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Moderado', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Leve', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Evacuacion', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: 'Fuente', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
              [
                { text: 'Datos', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '1', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '1', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
            ]
          }
        },
        {
          text: '3.4 Fallecidos', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Apellidos y nombres', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Edad', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Sexo', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Lugar de fallecimiento ', fontSize: 9, bold: true, alignment: 'center', colSpan: 5 }, '', '', '', '',
                { text: 'Con tratamiento local ', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
              [
                { text: 'Datos', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 5 }, '', '', '', '',
                { text: '1', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
            ]
          }
        },
        {
          text: '3.5 Desaparecidos', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Apellidos y nombres', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Edad', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Sexo', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Lugar / Dirección donde desapareció ', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
              ],
              [
                { text: 'Datos', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '3.6 Personal de Primera Respuesta Afectado (Salud, Bomberos, Brigadistas)', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Potencial humano', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Total personal', fontSize: 9, bold: true, alignment: 'center', colSpan: 2, rowSpan: 2 }, '',
                { text: 'Daños a la salud', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Desapare-\ncidos', fontSize: 9, bold: true, alignment: 'center', colSpan: 2, rowSpan: 2 }, '',
                { text: 'Observaciones', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, rowSpan: 2 }, '', '', '',
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Lesionado', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Fallecido', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
              ]
            ]
          }
        },
        {
          text: '4.0 DAÑOS MATERIALES', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          text: '4.1 A las viviendas (EN BASE AL TIPO DE MATERIAL PREDOMINANTE EN LAS PAREDES DE LA VIVIENDA)', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Tipo', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Destruida', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Inhabitable', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Afectada', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
              [
                { text: 'Datos', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
            ]
          }
        },
        {
          text: '4.2 A los servicios / Infraestructura de Salud de la localidad', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Establecimiento de Salud (Nombre por el que se le conoce) ', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Condición', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: 'Funciona', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '¿Porque?', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Observación', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
              [
                { text: 'Datos', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
            ]
          }
        },
        {
          text: '4.3 Daños a Instalaciones y Vehículos de Primera Respuesta', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Entidad', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Destru.', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Inhabita.', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Afectada', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Vehículos', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Operati.', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Inopera.', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
              ],
            ]
          }
        },
        {
          text: '4.4 A la Infraestructura Educativa', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Nombre de la Institución Educativa (II.EE.)', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Total aulas', fontSize: 9, bold: true, alignment: 'center', colSpan: 2, rowSpan: 2 }, '',
                { text: 'Daños (Número de Aulas)', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: 'Tipo de Nivel Educativo / Privado o Nacional ', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, rowSpan: 2 }, '', '', '',
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Destru.', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Inhabita.', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Afectada', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
              [
                { text: 'Datos', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
            ]
          }
        },
        {
          text: '4.5 A la Infraestructura de Transporte', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          text: '4.5.1: Daños en carreteras, vías férreas y otros', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Tipo de Vías de Comunicación', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Daños (condición)', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Cantidad de tramos', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, rowSpan: 2 }, '', '', ''
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Destruidos', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Afectados', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', ''
              ],
              [
                { text: 'Datos', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', ''
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '1', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', ''
              ],
              [
                { text: 'UBICACIÓN', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 12 }, '', '', '', '', '', '', '', '', '', '', ''
              ],
              [
                { text: 'OBSERVACION', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 12 }, '', '', '', '', '', '', '', '', '', '', ''
              ],
            ]
          }
        },
        {
          text: '\n\n\n4.5.2: Daños en puentes, puertos y otros', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Tipo de Infraestructura', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Daños (cantidad)', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Ubicación', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, rowSpan: 2 }, '', '', '',
                { text: 'Observaciones', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, rowSpan: 2 }, '', '', ''
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Destru', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Afecta', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', ''
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', ''
              ]
            ]
          }
        },
        {
          text: '4.6 A la Infraestructura de Riego', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          text: '4.6.1 Daños en canales, defensa ribereña y otros', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Tipo de Infraestructura', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Daños (condición)', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Cant. Tramos', fontSize: 9, bold: true, alignment: 'center', colSpan: 2, rowSpan: 2 }, '',
                { text: 'Ubicación (Indicar Progresiva)', fontSize: 9, bold: true, alignment: 'center', colSpan: 6, rowSpan: 2 }, '', '', '', '', ''
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Destru', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Afecta', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', ''
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', ''
              ],
            ]
          }
        },
        {
          text: '4.6.2 Daños a las bocatomas, reservorios y otros', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Tipo de Infraestructura', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Daños (condicion)', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Ubicación', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', ''
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Destru', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Afecta', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '4.7 A los Locales Públicos', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Locales Públicos', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Daños (condicion)', fontSize: 9, bold: true, alignment: 'center', colSpan: 12 }, '', '', '', '', '', '', '', '', '', '', ''
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Destru', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Inhabi', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Afecta', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
            ]
          }
        },
        {
          text: '4.8 A la Infraestructura de Servicios Básicos', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Locales Públicos', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Cuenta con Servicio?', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, rowSpan: 2 }, '', '', '',
                { text: 'Sin servicio', fontSize: 9, bold: true, alignment: 'center', colSpan: 2, rowSpan: 2 }, '',
                { text: 'Daños (cantidad)', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Destruidos', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: 'Afectados', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '-', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
            ]
          }
        },
        {
          text: '4.9 A otros Servicios Básicos', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Tipo de Infraestructura', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Cuenta con Servicio?', fontSize: 9, bold: true, alignment: 'center', colSpan: 2 }, '',
                { text: 'Sin servicio (%)', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: 'Observación', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', ''
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '0', fontSize: 9, bold: true, alignment: 'center' },
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', ''
              ],
            ]
          }
        },
        {
          text: '5.0 DAÑOS A SECTORES DIVERSOS', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          text: '5.1 A la Producción Agrícola', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          text: '5.1.1 Cultivos', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Tipo', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Daños (Has)', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: 'Lugar', fontSize: 9, bold: true, alignment: 'center', colSpan: 3, rowSpan: 2 }, '', '',
                { text: 'Variedad de cultivo', fontSize: 9, bold: true, alignment: 'center', colSpan: 3, rowSpan: 2 }, '', '',
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Perdidas', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: 'Afectadas', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
              ],
            ]
          }
        },
        {
          text: '5.1.2 Apicultura', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Tipo', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Daños (unidades)', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: 'Lugar', fontSize: 9, bold: true, alignment: 'center', colSpan: 6, rowSpan: 2 }, '', '', '', '', ''
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Perdidas', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: 'Afectadas', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '5.1.3 Pesca', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Tipo', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Daños (unidades)', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: 'Lugar', fontSize: 9, bold: true, alignment: 'center', colSpan: 6, rowSpan: 2 }, '', '', '', '', ''
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Perdidas', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: 'Afectadas', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '5.2. A la Producción Pecuaria', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Especie', fontSize: 9, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2 }, '', '', '', '', '', '', '',
                { text: 'Daños (unidades)', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: 'Lugar', fontSize: 9, bold: true, alignment: 'center', colSpan: 6, rowSpan: 2 }, '', '', '', '', ''
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'Perdidas', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: 'Afectadas', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '\n5.3 Medios de Vida', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Detallar comentarios a los Medios de Vida', fontSize: 9, bold: true, alignment: 'left', colSpan: 20 }
              ],
              [
                { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book", fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }
              ],
            ]
          }
        },
        {
          text: '5.3.1. Total Daños por Medios de Vida', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Tipo de Actividad ', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'N° Familias Afectadas', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: 'N° Personas Afectadas', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', ''
              ],
              [
                { text: 'Total', fontSize: 9, bold: true, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '0', fontSize: 9, bold: true, alignment: 'center', colSpan: 6 }, '', '', '', '', ''
              ]
            ]
          }
        },
        {
          text: '6.0 ANÁLISIS DE NECESIDADES', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          text: '6.1 Acciones Prioritarias:', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Acción', fontSize: 9, bold: true, alignment: 'left', colSpan: 20 }
              ],
              [
                { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book", fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }
              ],
            ]
          }
        },
        {
          text: '6.2 Necesidades Prioritarias de Asistencia Humanitaria', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        }, {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'TECHO', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '', margin: [0, 10, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'ABRIGO', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '', margin: [0, 10, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'ALIMENTOS', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '', margin: [0, 10, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'UTENSILLOS', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '6.3 Necesidades de Recursos Materiales y/o Equipos para Servicios Comunales', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        }, {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'HERRAMIENTAS', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '', margin: [0, 10, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'EQUIPOS', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '', margin: [0, 10, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'MAQUINARIA', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '', margin: [0, 10, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'LETRINAS', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '', margin: [0, 10, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'OTROS MATERIALES', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '6.4 Necesidades para la Atención de Salud', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'POTENCIAL HUMANO', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '', margin: [0, 10, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'MEDICINAS', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '', margin: [0, 10, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'EQUIPOS', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '6.5 Necesidades para la atención agropecuaria', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 5, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'INSUMOS', fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Necesidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "Cantidad", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: "Dato", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
                { text: "0", fontSize: 9, bold: true, alignment: 'center', colSpan: 10 }, '', '', '', '', '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '7.0 COORDINACIONES PARA EL LEVANTAMIENTO DE INFORMACIÓN', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book", fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }
              ],
            ]
          }
        },
        {
          text: '8.0 CONCLUSIONES Y OBSERVACIONES GENERALES', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book", fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }
              ],
            ]
          }
        },
        {
          text: '9.0 RECOMENDACIONES FINALES', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book", fontSize: 9, bold: true, alignment: 'center', colSpan: 20 }
              ],
            ]
          }
        },
        {
          text: 'Archivos Adjuntos:', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          ul: [
            'Archivo 1',
            'Archivo 2',
            'Archivo 3'
          ]
        },



      ]

    }
    pdfMake.createPdf(dd).open()
  }
}
