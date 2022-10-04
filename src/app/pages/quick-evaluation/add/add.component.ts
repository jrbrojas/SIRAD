import { Component, OnInit } from '@angular/core';
import { GeoJSON } from "geojson";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuickEvaluationService } from 'src/app/shared/services/quickevaluation.service';
import { EmergencyService } from 'src/app/shared/services/emergency.service';
import { GeoQuickEvaluation, QuickEvaluation, QuickEvaluationDto } from 'src/app/shared/models/quickevaluation-model';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { eTypeAction } from 'src/app/shared/models/geometria.model';
import { FileService } from 'src/app/shared/services/file.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import html2canvas from 'html2canvas';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddQuickEvaluationComponent implements OnInit {

  public createEvaluation: FormGroup;
  public selectTipoPeligro: any;
  public selectTipoPeligro2: any;
  public selectTipoPeligro2Aux: any;
  public getPopulatedCenter: any;
  public selectUbigeo: any;
  public disabledTabString: string = 'disabled';
  public disabledTab: boolean = false;
  //isDisabled: boolean = true;
  public lifeHealth: any;
  public basicServices: any;
  public infrastructures: any;
  public livelihoods: any;
  public needs: any;
  public kindPlaces: any;
  public specificPlaces: any;
  //fileLoad: any

  //Canvas create image
  imgcreada = false;
  imagenCreada: any;
  imgIndeci: any;
  imgEdan: any;

  public PERMISOS = PERMISOS;

  codeSinpad: any;
  public counter: number = 0;
  public counter1: number = 0;
  public counter2: number = 0;
  public counter3: number = 0;

  public otherActivities: any;
  public otherNeeds: any;
  public taskTodo: any;
  public idEmergency: any;
  public idEvaluation!: number;

  //public geoQuickEvaluation: GeoQuickEvaluation = {};
  public wrapGeometria: any = {};
  public typeAction: eTypeAction = eTypeAction.insert;
  public idMapa: string = "mapEvaluacion";
  public currentTab: string;
  public valor: number = 0;
  public listarTransporte: any

  tabId: string = 'general';

  constructor(
    private _fb: FormBuilder,
    private toaster: AlertService,
    private route: Router,
    public quickEvalService: QuickEvaluationService,
    private emergencyService: EmergencyService,
    private params: ActivatedRoute,
    private http: HttpClient,
    private fileService: FileService,
    public authService: AuthService,
    private alertService: AlertService,
    private preliminarService: PreliminarService
  ) {
    this.createEvaluation = this._fb.group({
      idEmergencia: [''],
      tipoFormulario: ['EVALUACION-RAPIDA'],
      numeroFormulario: ['', [Validators.required]],
      codigoUbigeo: ['', [Validators.required]],
      descripcionUbigeo: ['', [Validators.required]],
      codigoUbigeoCentroPoblado: ['', [Validators.required]],
      centroPoblado: ['', [Validators.required]],
      fechaHoraEvento: ['', [Validators.required]],
      idTipoLugar: ['', [Validators.required]],
      tipoLugar: [null],
      descripcionLugar: [null],
      idLugarEspecifico: ['', [Validators.required]],
      lugarEspecifico: [null],
      descripcionLugarEspecifico: [null],
      referencia: [''],
      medioTransporte: [''],
      idMedioTransporte: [''],
      idTipoPeligro: [''],
      tipoPeligro: [''],
      idGrupoPeligro: [''],
      grupoPeligro: [''],
      habilitado: [''],
      idRegistradoPor: [1],
      registradoPor: ['lperez'],
      fechaHoraRegistrado: [''],
      idRevisadoPor: [null],
      revisadoPor: [null],
      fechaHoraRevisado: [null],
      idAprobadoPor: [null],
      aprobadoPor: [null],
      fechaHoraAprobado: [null],
      file: [null],
      files: this._fb.array([]),
      lesionados: [0],
      //cantidadLesionados: new FormControl({value: 0}),
      cantidadLesionados: [0],
      atrapados: [0],
      cantidadAtrapados: [0],
      aislados: [0],
      cantidadAislados: [0],
      desaparecidos: [0],
      cantidadDesaparecidos: [0],
      fallecidos: [0],
      cantidadFallecidos: [0],

      agua: [0],
      desague: [0],
      energiaElectrica: [0],
      telefono: [0],
      gas: [0],

      vivienda: [0],
      carretera: [0],
      puente: [0],
      establecimientoSalud: [0],

      ganaderia: [0],
      agricultura: [0],
      comercio: [0],
      turismo: [0],
      pesca: [0],

      busquedaRescate: [0],
      evacuacion: [0],
      atencionSalud: [0],
      equipoEdan: [0],
      medidaControl: [0],
      observacion: [null],

      bienAyudaHumanitaria: [0],
      maquinariaPesada: [0],
      asistenciaTecnica: [0],
      observacion1: [null],

      rescatePersonaAtrapada: [0],
      busquedaDesaparecido: [0],
      atencionPreHospitalaria: [0],
      evacuacionHerido: [0],
      evacuacionDamnificado: [0],
      evacuacionPoblacionRiesgo: [0],
      atencionLesionado: [0],
      asistenciaTechoTemporal: [0],
      asistenciaRopaAbrigo: [0],
      asistenciaAlimentaria: [0],
      provisionAguaSegura: [0],
      rehabilitacionServicio: [0],
      evaluadorEdan: [0],
      rehabilitacionVia: [0],
      equipoComunicacion: [0],
      remocionEscombio: [0],
      instalacionAlbergue: [0],
      instalacionLetrina: [0],
      disposicionDesechoSolido: [0],
      hospitalCampaniaEmt: [0],
      gestionRestoHumano: [0],
      seguridad: [0],
      evaluacionRiesgo: [0],
      utensilioMenaje: [0],
      herramienta: [0],
      maquinariaPesada1: [0],

      carpa: [0],
      capa: [0],
      frazada: [0],
      alimentoFrio: [0],
      alimentoCrudo: [0],
      utensilioMenaje2: [0],
      herramienta2: [0],
      equipo: [0],
      equipoBusquedaRescate: [0],
      medicoBrigadaSalud: [0],
      atencionPreHospitalaria2: [0],
      evacuacionHerido2: [0],
      bombero: [0],
      equipoComunicacion2: [0],
      ingenieroArquitecto: [0],
      maquinariaPesada2: [0],
      cisterna: [0],

      idTipoPeligroSecundario: [''],
      tipoPeligroSecundario: ['']
    });
  }

  ngOnInit(): void {
    console.log("sadasdsadsda");

    this.idEmergency = this.params.snapshot.paramMap.get('id');
    this.getOtherActivities();
    this.getExternalSupportNeeds();
    this.getOtherNeeds();
    this.getTaskToDo();
    this.getBasicServices();
    this.getInfrastructures();
    this.getLivelihoods();
    this.getKindPlaces();
    this.getSpecificPlaces();
    this.getDetailEmergency();
    this.getPeligros2()
    this.getListViaTransport()
    this.quickEvalService.getLifeHealth().subscribe(res => {
      this.lifeHealth = res;
    })
    UtilsService.getImageDataUrlFromLocalPath('./assets/images/indeci.png').then(result => this.imgIndeci = result);
    UtilsService.getImageDataUrlFromLocalPath('./assets/images/edan.jpg').then(result => this.imgEdan = result);
  }

  get files() {
    return <FormArray>this.createEvaluation.get('files');
  }

  search(value: string) {
    let filter = value;
    return this.getPopulatedCenter.filter((option: any) => option.descripcion.includes(filter));
  }

  tabChange(event: string) {
    console.log("event", event);
    if (event == "resumen") {
      this.EvalucaionRapida()
      event = "files"
    }

    let flagError: boolean = false

    if (this.currentTab == "general") {
      if (
        this.createEvaluation.controls['numeroFormulario'].valid &&
        this.createEvaluation.controls['codigoUbigeoCentroPoblado'].valid &&
        this.createEvaluation.controls['idTipoLugar'].valid &&
        this.createEvaluation.controls['idLugarEspecifico'].valid)
        flagError = true
    }
    if (this.currentTab == "mapa") {
      flagError = true
    }
    if (this.currentTab == "damage") {
      flagError = true
    }
    if (this.currentTab == "actions") {
      flagError = true
    }
    if (this.currentTab == "files") {
      flagError = true
    }

    if (flagError) {
      this.tabId = event;
    }

    this.currentTab = this.tabId
    if (event == 'damage') {
      html2canvas(document.querySelector("#mapaImagen")).then(canvas => {
        this.imagenCreada = canvas.toDataURL();
      });
      this.imgcreada = true;
    }
  }

  addFile(rFile: any) {
    const group = this._fb.group({
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
    return this.createEvaluation.value.files[index].nombre
  }


  onDragOver(event: any) {
    event.preventDefault();
  }

  // From drag and onChange
  onDropSuccess(event: any) {
    event.preventDefault();
    this.onFileChange(event.dataTransfer.files);    // notice the "dataTransfer" used instead of "target"
  }

  // From attachment link
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
        this.toaster.toastSuccess(`${res.message}`);
        this.addFile(res.rFile);
      });
    });

  }

  // TODO: Delete element of table
  delete(index: any): void {
    const file = this.createEvaluation.value.files[index]
    this.fileService.removeFile(file.archivo, file.ruta).subscribe((res: any) => {
      this.toaster.toastSuccess(`${res.message}`);
      this.files.removeAt(index)
    });
  }

  // TODO: Update description of file
  updateChangeFile(index: number, description: any) {
    this.createEvaluation.value.files[index].description = description
  }

  createEval() {
    let quickEvaluation: QuickEvaluation = {
      idEmergencia: this.idEmergency,
      tipoFormulario: this.createEvaluation.value.tipoFormulario,
      numeroFormulario: this.createEvaluation.value.numeroFormulario,
      codigoUbigeo: this.createEvaluation.value.codigoUbigeo,
      descripcionUbigeo: this.createEvaluation.value.descripcionUbigeo,
      codigoUbigeoCentroPoblado: this.createEvaluation.value.codigoUbigeoCentroPoblado,
      centroPoblado: this.createEvaluation.value.centroPoblado,
      fechaHoraEvento: moment(this.createEvaluation.value.fechaHoraEvento).format('YYYY-MM-DD HH:mm:ss'),
      idTipoLugar: this.createEvaluation.value.idTipoLugar,
      tipoLugar: this.createEvaluation.value.tipoLugar,
      descripcionLugar: this.createEvaluation.value.descripcionLugar,
      idLugarEspecifico: this.createEvaluation.value.idLugarEspecifico,
      lugarEspecifico: this.createEvaluation.value.lugarEspecifico,
      descripcionLugarEspecifico: this.createEvaluation.value.descripcionLugarEspecifico,
      referencia: this.createEvaluation.value.referencia,
      medioTransporte: this.createEvaluation.value.medioTransporte,
      idMedioTransporte: this.createEvaluation.value.idMedioTransporte,
      idTipoPeligro: this.createEvaluation.value.idTipoPeligro,
      tipoPeligro: this.createEvaluation.value.tipoPeligro,
      idTipoPeligroSecundario: this.createEvaluation.value.idTipoPeligroSecundario,
      tipoPeligroSecundario: this.createEvaluation.value.tipoPeligroSecundario,
      idGrupoPeligro: this.createEvaluation.value.idGrupoPeligro,
      grupoPeligro: this.createEvaluation.value.grupoPeligro,
      habilitado: 1,
      idRegistradoPor: 0,
      registradoPor: 'lperez',
      fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      idRevisadoPor: null,
      revisadoPor: null,
      fechaHoraRevisado: null,
      idAprobadoPor: JSON.parse(localStorage.getItem('userData')).id,
      aprobadoPor: JSON.parse(localStorage.getItem('userData')).username,
      fechaHoraAprobado: null,

      danioVidaSalud: {
        lesionados: this.createEvaluation.value.lesionados != 1 ? 0 : 1,
        cantidadLesionados: this.createEvaluation.value.cantidadLesionados != null ? this.createEvaluation.value.cantidadLesionados : 1,
        atrapados: this.createEvaluation.value.atrapados != 1 ? 0 : 1,
        cantidadAtrapados: this.createEvaluation.value.cantidadAtrapados != null ? this.createEvaluation.value.cantidadAtrapados : 1,
        aislados: this.createEvaluation.value.aislados != 1 ? 0 : 1,
        cantidadAislados: this.createEvaluation.value.cantidadAislados != null ? this.createEvaluation.value.cantidadAislados : 1,
        desaparecidos: this.createEvaluation.value.desaparecidos != 1 ? 0 : 1,
        cantidadDesaparecidos: this.createEvaluation.value.cantidadDesaparecidos != null ? this.createEvaluation.value.cantidadDesaparecidos : 1,
        fallecidos: this.createEvaluation.value.fallecidos != 1 ? 0 : 1,
        cantidadFallecidos: this.createEvaluation.value.cantidadFallecidos != null ? this.createEvaluation.value.cantidadFallecidos : 1,
      },
      danioServicioBasico: {
        agua: this.createEvaluation.value.agua != 1 ? 0 : 1,
        desague: this.createEvaluation.value.desague != 1 ? 0 : 1,
        energiaElectrica: this.createEvaluation.value.energiaElectrica != 1 ? 0 : 1,
        telefono: this.createEvaluation.value.telefono != 1 ? 0 : 1,
        gas: this.createEvaluation.value.gas != 1 ? 0 : 1
      },
      danioInfraestructura: {
        vivienda: this.createEvaluation.value.vivienda != 1 ? 0 : 1,
        carretera: this.createEvaluation.value.carretera != 1 ? 0 : 1,
        puente: this.createEvaluation.value.puente != 1 ? 0 : 1,
        establecimientoSalud: this.createEvaluation.value.establecimientoSalud != 1 ? 0 : 1
      },
      danioMedioVida: {
        ganaderia: this.createEvaluation.value.ganaderia != 1 ? 0 : 1,
        agricultura: this.createEvaluation.value.agricultura != 1 ? 0 : 1,
        comercio: this.createEvaluation.value.comercio != 1 ? 0 : 1,
        turismo: this.createEvaluation.value.turismo != 1 ? 0 : 1,
        pesca: this.createEvaluation.value.pesca != 1 ? 0 : 1
      },
      actividad: {
        busquedaRescate: this.createEvaluation.value.busquedaRescate != 1 ? 0 : 1,
        evacuacion: this.createEvaluation.value.evacuacion != 1 ? 0 : 1,
        atencionSalud: this.createEvaluation.value.atencionSalud != 1 ? 0 : 1,
        equipoEdan: this.createEvaluation.value.equipoEdan != 1 ? 0 : 1,
        medidaControl: this.createEvaluation.value.medidaControl != 1 ? 0 : 1,
        observacion: this.createEvaluation.value.observacion
      },
      necesidad: {
        bienAyudaHumanitaria: this.createEvaluation.value.bienAyudaHumanitaria != 1 ? 0 : 1,
        maquinariaPesada: this.createEvaluation.value.maquinariaPesada != 1 ? 0 : 1,
        asistenciaTecnica: this.createEvaluation.value.asistenciaTecnica != 1 ? 0 : 1,
        observacion: this.createEvaluation.value.observacion1
      },
      otraActividad: {
        rescatePersonaAtrapada: this.createEvaluation.value.rescatePersonaAtrapada != 1 ? 0 : 1,
        busquedaDesaparecido: this.createEvaluation.value.busquedaDesaparecido != 1 ? 0 : 1,
        atencionPreHospitalaria: this.createEvaluation.value.atencionPreHospitalaria != 1 ? 0 : 1,
        evacuacionHerido: this.createEvaluation.value.evacuacionHerido != 1 ? 0 : 1,
        evacuacionDamnificado: this.createEvaluation.value.evacuacionDamnificado != 1 ? 0 : 1,
        evacuacionPoblacionRiesgo: this.createEvaluation.value.evacuacionPoblacionRiesgo != 1 ? 0 : 1,
        atencionLesionado: this.createEvaluation.value.atencionLesionado != 1 ? 0 : 1,
        asistenciaTechoTemporal: this.createEvaluation.value.asistenciaTechoTemporal != 1 ? 0 : 1,
        asistenciaRopaAbrigo: this.createEvaluation.value.asistenciaRopaAbrigo != 1 ? 0 : 1,
        asistenciaAlimentaria: this.createEvaluation.value.asistenciaAlimentaria != 1 ? 0 : 1,
        provisionAguaSegura: this.createEvaluation.value.provisionAguaSegura != 1 ? 0 : 1,
        rehabilitacionServicio: this.createEvaluation.value.rehabilitacionServicio != 1 ? 0 : 1,
        evaluadorEdan: this.createEvaluation.value.evaluadorEdan != 1 ? 0 : 1,
        rehabilitacionVia: this.createEvaluation.value.rehabilitacionVia != 1 ? 0 : 1,
        equipoComunicacion: this.createEvaluation.value.equipoComunicacion != 1 ? 0 : 1,
        remocionEscombio: this.createEvaluation.value.remocionEscombio != 1 ? 0 : 1,
        instalacionAlbergue: this.createEvaluation.value.instalacionAlbergue != 1 ? 0 : 1,
        instalacionLetrina: this.createEvaluation.value.instalacionLetrina != 1 ? 0 : 1,
        disposicionDesechoSolido: this.createEvaluation.value.disposicionDesechoSolido != 1 ? 0 : 1,
        hospitalCampaniaEmt: this.createEvaluation.value.hospitalCampaniaEmt != 1 ? 0 : 1,
        gestionRestoHumano: this.createEvaluation.value.gestionRestoHumano != 1 ? 0 : 1,
        seguridad: this.createEvaluation.value.seguridad != 1 ? 0 : 1,
        evaluacionRiesgo: this.createEvaluation.value.evaluacionRiesgo != 1 ? 0 : 1,
        utensilioMenaje: this.createEvaluation.value.utensilioMenaje != 1 ? 0 : 1,
        herramienta: this.createEvaluation.value.herramienta != 1 ? 0 : 1,
        maquinariaPesada: this.createEvaluation.value.maquinariaPesada1 != 1 ? 0 : 1
      },
      otraNecesidad: {
        carpa: this.createEvaluation.value.carpa != 1 ? 0 : 1,
        capa: this.createEvaluation.value.capa != 1 ? 0 : 1,
        frazada: this.createEvaluation.value.frazada != 1 ? 0 : 1,
        alimentoFrio: this.createEvaluation.value.alimentoFrio != 1 ? 0 : 1,
        alimentoCrudo: this.createEvaluation.value.alimentoCrudo != 1 ? 0 : 1,
        utensilioMenaje: this.createEvaluation.value.utensilioMenaje2 != 1 ? 0 : 1,
        herramienta: this.createEvaluation.value.herramienta2 != 1 ? 0 : 1,
        equipo: this.createEvaluation.value.equipo != 1 ? 0 : 1,
        equipoBusquedaRescate: this.createEvaluation.value.equipoBusquedaRescate != 1 ? 0 : 1,
        medicoBrigadaSalud: this.createEvaluation.value.medicoBrigadaSalud != 1 ? 0 : 1,
        atencionPreHospitalaria: this.createEvaluation.value.atencionPreHospitalaria2 != 1 ? 0 : 1,
        evacuacionHerido: this.createEvaluation.value.evacuacionHerido2 != 1 ? 0 : 1,
        bombero: this.createEvaluation.value.bombero != 1 ? 0 : 1,
        equipoComunicacion: this.createEvaluation.value.equipoComunicacion2 != 1 ? 0 : 1,
        ingenieroArquitecto: this.createEvaluation.value.ingenieroArquitecto != 1 ? 0 : 1,
        maquinariaPesada: this.createEvaluation.value.maquinariaPesada2 != 1 ? 0 : 1,
        cisterna: this.createEvaluation.value.cisterna != 1 ? 0 : 1
      },
      archivos: this.files.value,
      estado_formulario: 1,
      nota: null
    }

    let geometry: GeoQuickEvaluation = {
      id: null!,
      idEvaluacionRapida: null!,
      geometria: this.wrapGeometria.geometria as any
    }

    const quickevaluationDto: QuickEvaluationDto = {
      evaluacionRapida: quickEvaluation,
      geometria: geometry
    }

    //let json = JSON.stringify(quickevaluationDto)

    if (quickevaluationDto.geometria.geometria == undefined) {
      this.alertService.toastError("Mapa no llenado", "Debes llenar el mapa")
    }
    else {
      this.toaster.questionAlertConfirm('¿Está seguro de guardar?', '', 'Si, Guardar', TYPE_ALERT.QUESTION).then(
        (result) => {
          if (result.value) {
            this.quickEvalService.createEvaluation(quickevaluationDto).subscribe((res: any) => {
              this.toaster.toastSuccess(`${res.message}`);
              this.route.navigate([`/quick-evaluation/list/${this.idEmergency},${this.codeSinpad}`]).then(() => { });
            });
          }
        }
      );
    }
  }

  getPopulated(event: any) {
    this.createEvaluation.controls['codigoUbigeoCentroPoblado'].setValue(event.value);
    this.createEvaluation.controls['centroPoblado'].setValue(event.triggerValue);
  }

  getBasicServices() {
    this.quickEvalService.getBasicServices().subscribe(res => {
      this.basicServices = res;
    });
  }

  getInfrastructures() {
    this.quickEvalService.getInfrastructure().subscribe(res => {
      this.infrastructures = res;
    });
  }

  getLivelihoods() {
    this.quickEvalService.getLivelihoods().subscribe(res => {
      this.livelihoods = res;
    });
  }

  getOtherActivities() {
    this.quickEvalService.getOtherActivities().subscribe(res => {
      this.otherActivities = res;
    });
  }

  getExternalSupportNeeds() {
    this.quickEvalService.getNeedsSupport().subscribe(res => {
      this.needs = res;
    });
  }

  getOtherNeeds() {
    this.quickEvalService.getOtherNeeds().subscribe(res => {
      this.otherNeeds = res;
    });
  }

  getTaskToDo() {
    this.quickEvalService.getTaskTodo().subscribe(res => {
      this.taskTodo = res;
    });
  }

  getKindPlaces() {
    this.quickEvalService.getKindPlaces().subscribe(res => {
      this.kindPlaces = res;
    });
  }

  getListViaTransport() {
    this.preliminarService.getMaeTipoVehiculo().subscribe(res => {
      this.listarTransporte = res;
      console.log("medioT", this.listarTransporte);

    })
  }

  getSpecificPlaces() {
    this.quickEvalService.getSpecificPlaces().subscribe(res => {
      this.specificPlaces = res;
    });
  }

  changeSpecificPlaces(event: any) {
    this.createEvaluation.controls['idLugarEspecifico'].setValue(event.value);
    this.createEvaluation.controls['lugarEspecifico'].setValue(event.triggerValue);
    if (event.triggerValue === "NINGUNO") {
      this.createEvaluation.controls['descripcionLugarEspecifico'].disable();
      this.createEvaluation.controls['descripcionLugarEspecifico'].reset('');
    } else {
      this.createEvaluation.controls['descripcionLugarEspecifico'].enable();
    }
  }

  //TODO: Change values barrios sector urba
  changeKindPlaces(event: any) {
    this.createEvaluation.controls['idTipoLugar'].setValue(event.value);
    this.createEvaluation.controls['tipoLugar'].setValue(event.triggerValue);
    if (event.triggerValue === "NINGUNO") {
      this.createEvaluation.controls['descripcionLugar'].disable();
      this.createEvaluation.controls['descripcionLugar'].reset('');
    } else {
      this.createEvaluation.controls['descripcionLugar'].enable();
    }
  }


  getDetailEmergency() {
    this.emergencyService.getEmergencyById(this.idEmergency).subscribe(res => {
      console.log("Detalles de Emergencias: ",res)
      this.codeSinpad = res.codigoSinpad;
      this.createEvaluation.controls['grupoPeligro'].setValue(res.grupoPeligro);
      this.createEvaluation.controls['tipoPeligro'].setValue(res.tipoPeligro);
      this.createEvaluation.controls['descripcionUbigeo'].setValue(res.descripcionUbigeo);
      this.createEvaluation.controls['fechaHoraEvento'].setValue(moment(res.fechaHoraEvento).format('YYYY-MM-DDTHH:mm'));
      this.createEvaluation.controls['codigoUbigeo'].setValue(res.codigoUbigeo);
      this.createEvaluation.controls['idGrupoPeligro'].setValue(res.idGrupoPeligro);
      this.createEvaluation.controls['idTipoPeligro'].setValue(res.idTipoPeligro);
      this.quickEvalService.getPopulatedCenter(res.codigoUbigeo).subscribe((res: any) => {
        this.getPopulatedCenter = res;
      })
    });
  }

  onKey(event: any) {
    this.counter = event.target.value.length;
  }
  onKey1(event: any) {
    this.counter1 = event.target.value.length;
  }

  onKey2(event: any) {
    this.counter2 = event.target.value.length;
  }
  onKey3(event: any) {
    this.counter3 = event.target.value.length;
  }

  verValor() {
  }

  habilitar(val: any, data: any) {
    if (!val.target.checked) {
      this.createEvaluation.controls[data.formQuantity].disable();
      this.createEvaluation.controls[data.formQuantity].reset(0);
    } else {
      this.createEvaluation.controls[data.formQuantity].enable();
      this.createEvaluation.controls[data.formQuantity].reset(1);
    }
  }

  //agregado por Daniel Vallejos para traer el grupo de peligro 2
  getPeligros2() {
    this.emergencyService.getTipoPeligro().subscribe((rows: any) => {
      this.selectTipoPeligro2 = rows;
      this.selectTipoPeligro2Aux = rows

    });
  }

  getSelectPeligro2(event: any) {
    this.createEvaluation.controls['idTipoPeligroSecundario'].setValue(event.value)
    this.createEvaluation.controls['tipoPeligroSecundario'].setValue(event.triggerValue)

  }

  onKeyPS(event: any) {
    this.selectTipoPeligro2 = this.selectTipoPeligro2Aux
    console.log("lo", event.value);
    this.searchPS(event.value)
    this.selectTipoPeligro2 = this.searchPS(event.value);
  }

  searchPS(value: string) {
    let filter = value.toLowerCase();
    console.log("ja", filter);

    return this.selectTipoPeligro2.filter(option =>
      option.tipoPeligro.toLowerCase().startsWith(filter)
    );

  }

  changeMedioTransporte(event: any) {
    console.log("event", event.triggerValue);

    this.createEvaluation.controls['idMedioTransporte'].setValue(event.value)
    this.createEvaluation.controls['medioTransporte'].setValue(event.triggerValue)
    console.log(this.createEvaluation.value)

  }

  crearImagen() {
    html2canvas(document.querySelector("#mapaImagen")).then(canvas => {
      this.imagenCreada = canvas.toDataURL();
    });
    this.imgcreada = true;
    //UtilsService.getImageDataUrlFromLocalPath(this.imagenCreada).then(result => this.imagePdf = result);
  }

  /* openPdf() {
    let quickEvaluation: QuickEvaluation = {
      idEmergencia: this.idEmergency,
      tipoFormulario: this.createEvaluation.value.tipoFormulario,
      numeroFormulario: this.createEvaluation.value.numeroFormulario,
      codigoUbigeo: this.createEvaluation.value.codigoUbigeo,
      descripcionUbigeo: this.createEvaluation.value.descripcionUbigeo,
      codigoUbigeoCentroPoblado: this.createEvaluation.value.codigoUbigeoCentroPoblado,
      centroPoblado: this.createEvaluation.value.centroPoblado,
      fechaHoraEvento: moment(this.createEvaluation.value.fechaHoraEvento).format('YYYY-MM-DD HH:mm:ss'),
      idTipoLugar: this.createEvaluation.value.idTipoLugar,
      tipoLugar: this.createEvaluation.value.tipoLugar,
      descripcionLugar: this.createEvaluation.value.descripcionLugar,
      idLugarEspecifico: this.createEvaluation.value.idLugarEspecifico,
      lugarEspecifico: this.createEvaluation.value.lugarEspecifico,
      descripcionLugarEspecifico: this.createEvaluation.value.descripcionLugarEspecifico,
      referencia: this.createEvaluation.value.referencia,
      medioTransporte: this.createEvaluation.value.medioTransporte,
      idTipoPeligro: this.createEvaluation.value.idTipoPeligro,
      tipoPeligro: this.createEvaluation.value.tipoPeligro,
      idGrupoPeligro: this.createEvaluation.value.idGrupoPeligro,
      grupoPeligro: this.createEvaluation.value.grupoPeligro,
      habilitado: 1,
      idRegistradoPor: 0,
      registradoPor: 'lperez',
      fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      idRevisadoPor: null,
      revisadoPor: null,
      fechaHoraRevisado: null,
      idAprobadoPor: null,
      aprobadoPor: null,
      fechaHoraAprobado: null,
      danioVidaSalud: {
        lesionados: this.createEvaluation.value.lesionados != 1 ? 0 : 1,
        cantidadLesionados: this.createEvaluation.value.cantidadLesionados != null ? this.createEvaluation.value.cantidadLesionados : 0,
        atrapados: this.createEvaluation.value.atrapados != 1 ? 0 : 1,
        cantidadAtrapados: this.createEvaluation.value.cantidadAtrapados != null ? this.createEvaluation.value.cantidadAtrapados : 0,
        aislados: this.createEvaluation.value.aislados != 1 ? 0 : 1,
        cantidadAislados: this.createEvaluation.value.cantidadAislados != null ? this.createEvaluation.value.cantidadAislados : 0,
        desaparecidos: this.createEvaluation.value.desaparecidos != 1 ? 0 : 1,
        cantidadDesaparecidos: this.createEvaluation.value.cantidadDesaparecidos != null ? this.createEvaluation.value.cantidadDesaparecidos : 0,
        fallecidos: this.createEvaluation.value.fallecidos != 1 ? 0 : 1,
        cantidadFallecidos: this.createEvaluation.value.cantidadFallecidos != null ? this.createEvaluation.value.cantidadFallecidos : 0,
      },
      danioServicioBasico: {
        agua: this.createEvaluation.value.agua != 1 ? 0 : 1,
        desague: this.createEvaluation.value.desague != 1 ? 0 : 1,
        energiaElectrica: this.createEvaluation.value.energiaElectrica != 1 ? 0 : 1,
        telefono: this.createEvaluation.value.telefono != 1 ? 0 : 1,
        gas: this.createEvaluation.value.gas != 1 ? 0 : 1
      },
      danioInfraestructura: {
        vivienda: this.createEvaluation.value.vivienda != 1 ? 0 : 1,
        carretera: this.createEvaluation.value.carretera != 1 ? 0 : 1,
        puente: this.createEvaluation.value.puente != 1 ? 0 : 1,
        establecimientoSalud: this.createEvaluation.value.establecimientoSalud != 1 ? 0 : 1
      },
      danioMedioVida: {
        ganaderia: this.createEvaluation.value.ganaderia != 1 ? 0 : 1,
        agricultura: this.createEvaluation.value.agricultura != 1 ? 0 : 1,
        comercio: this.createEvaluation.value.comercio != 1 ? 0 : 1,
        turismo: this.createEvaluation.value.turismo != 1 ? 0 : 1,
        pesca: this.createEvaluation.value.pesca != 1 ? 0 : 1
      },
      actividad: {
        busquedaRescate: this.createEvaluation.value.busquedaRescate != 1 ? 0 : 1,
        evacuacion: this.createEvaluation.value.evacuacion != 1 ? 0 : 1,
        atencionSalud: this.createEvaluation.value.atencionSalud != 1 ? 0 : 1,
        equipoEdan: this.createEvaluation.value.equipoEdan != 1 ? 0 : 1,
        medidaControl: this.createEvaluation.value.medidaControl != 1 ? 0 : 1,
        observacion: this.createEvaluation.value.observacion
      },
      necesidad: {
        bienAyudaHumanitaria: this.createEvaluation.value.bienAyudaHumanitaria != 1 ? 0 : 1,
        maquinariaPesada: this.createEvaluation.value.maquinariaPesada != 1 ? 0 : 1,
        asistenciaTecnica: this.createEvaluation.value.asistenciaTecnica != 1 ? 0 : 1,
        observacion: this.createEvaluation.value.observacion1
      },
      otraActividad: {
        rescatePersonaAtrapada: this.createEvaluation.value.rescatePersonaAtrapada != 1 ? 0 : 1,
        busquedaDesaparecido: this.createEvaluation.value.busquedaDesaparecido != 1 ? 0 : 1,
        atencionPreHospitalaria: this.createEvaluation.value.atencionPreHospitalaria != 1 ? 0 : 1,
        evacuacionHerido: this.createEvaluation.value.evacuacionHerido != 1 ? 0 : 1,
        evacuacionDamnificado: this.createEvaluation.value.evacuacionDamnificado != 1 ? 0 : 1,
        evacuacionPoblacionRiesgo: this.createEvaluation.value.evacuacionPoblacionRiesgo != 1 ? 0 : 1,
        atencionLesionado: this.createEvaluation.value.atencionLesionado != 1 ? 0 : 1,
        asistenciaTechoTemporal: this.createEvaluation.value.asistenciaTechoTemporal != 1 ? 0 : 1,
        asistenciaRopaAbrigo: this.createEvaluation.value.asistenciaRopaAbrigo != 1 ? 0 : 1,
        asistenciaAlimentaria: this.createEvaluation.value.asistenciaAlimentaria != 1 ? 0 : 1,
        provisionAguaSegura: this.createEvaluation.value.provisionAguaSegura != 1 ? 0 : 1,
        rehabilitacionServicio: this.createEvaluation.value.rehabilitacionServicio != 1 ? 0 : 1,
        evaluadorEdan: this.createEvaluation.value.evaluadorEdan != 1 ? 0 : 1,
        rehabilitacionVia: this.createEvaluation.value.rehabilitacionVia != 1 ? 0 : 1,
        equipoComunicacion: this.createEvaluation.value.equipoComunicacion != 1 ? 0 : 1,
        remocionEscombio: this.createEvaluation.value.remocionEscombio != 1 ? 0 : 1,
        instalacionAlbergue: this.createEvaluation.value.instalacionAlbergue != 1 ? 0 : 1,
        instalacionLetrina: this.createEvaluation.value.instalacionLetrina != 1 ? 0 : 1,
        disposicionDesechoSolido: this.createEvaluation.value.disposicionDesechoSolido != 1 ? 0 : 1,
        hospitalCampaniaEmt: this.createEvaluation.value.hospitalCampaniaEmt != 1 ? 0 : 1,
        gestionRestoHumano: this.createEvaluation.value.gestionRestoHumano != 1 ? 0 : 1,
        seguridad: this.createEvaluation.value.seguridad != 1 ? 0 : 1,
        evaluacionRiesgo: this.createEvaluation.value.evaluacionRiesgo != 1 ? 0 : 1,
        utensilioMenaje: this.createEvaluation.value.utensilioMenaje != 1 ? 0 : 1,
        herramienta: this.createEvaluation.value.herramienta != 1 ? 0 : 1,
        maquinariaPesada: this.createEvaluation.value.maquinariaPesada1 != 1 ? 0 : 1
      },
      otraNecesidad: {
        carpa: this.createEvaluation.value.carpa != 1 ? 0 : 1,
        capa: this.createEvaluation.value.capa != 1 ? 0 : 1,
        frazada: this.createEvaluation.value.frazada != 1 ? 0 : 1,
        alimentoFrio: this.createEvaluation.value.alimentoFrio != 1 ? 0 : 1,
        alimentoCrudo: this.createEvaluation.value.alimentoCrudo != 1 ? 0 : 1,
        utensilioMenaje: this.createEvaluation.value.utensilioMenaje2 != 1 ? 0 : 1,
        herramienta: this.createEvaluation.value.herramienta2 != 1 ? 0 : 1,
        equipo: this.createEvaluation.value.equipo != 1 ? 0 : 1,
        equipoBusquedaRescate: this.createEvaluation.value.equipoBusquedaRescate != 1 ? 0 : 1,
        medicoBrigadaSalud: this.createEvaluation.value.medicoBrigadaSalud != 1 ? 0 : 1,
        atencionPreHospitalaria: this.createEvaluation.value.atencionPreHospitalaria2 != 1 ? 0 : 1,
        evacuacionHerido: this.createEvaluation.value.evacuacionHerido2 != 1 ? 0 : 1,
        bombero: this.createEvaluation.value.bombero != 1 ? 0 : 1,
        equipoComunicacion: this.createEvaluation.value.equipoComunicacion2 != 1 ? 0 : 1,
        ingenieroArquitecto: this.createEvaluation.value.ingenieroArquitecto != 1 ? 0 : 1,
        maquinariaPesada: this.createEvaluation.value.maquinariaPesada2 != 1 ? 0 : 1,
        cisterna: this.createEvaluation.value.cisterna != 1 ? 0 : 1
      },
      archivos: this.files.value
    }
  
    let geometry: GeoQuickEvaluation = {
      id: null!,
      idEvaluacionRapida: null!,
      geometria: this.wrapGeometria.geometria as any
    }
  
    const quickevaluationDto: QuickEvaluationDto = {
      evaluacionRapida: quickEvaluation,
      geometria: geometry
    }
  
    const res = quickevaluationDto.evaluacionRapida;
  
    const dd: any = {
      footer: function (currentPage: string, pageCount: string) {
        return {
          margin: 10,
          columns: [
            {
              fontSize: 7,
              text: [
                { text: currentPage.toString() + ' de ' + pageCount }
              ],
              alignment: 'center'
            }
          ]
        };
      },
      content: [
        { //logo
  
          columns: [
            {
              image: this.imgEdan,
              width: 100,
              height: 30,
            },
            {
              alignment: 'center',
              width: '*',
              text: ''
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
              text: 'FORMULARIO EVALUACION RAPIDA'
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
              [
                { text: 'EVALUACIÓN NRO', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.numeroFormulario}`, fontSize: 9, bold: false, alignment: 'center' },
                { text: 'CÓDIGO SINPAD', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${this.codeSinpad}`, fontSize: 9, bold: false, alignment: 'center' }
              ],
              [
                { text: 'TIPO DE PELIGRO', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.tipoPeligro}`, fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'GRUPO DE PELIGRO', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.grupoPeligro}`, fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
            ]
          }
        },
        {
          text: '1. INFORMACIÓN GENERAL', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 15]
        },
        {
          table: {
            widths: [100, '*', 100, '*'],
            body: [
              [
                { text: 'UBICACION', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.descripcionUbigeo}`, fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'CENTRO POBLADO', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.centroPoblado}`, fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'FECHA Y HORA EVENTO', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.fechaHoraEvento}`, fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: `${res.tipoLugar}`, fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.descripcionLugar}`, fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: `${res.lugarEspecifico}`, fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.descripcionLugarEspecifico}`, fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'PUNTO DE REFERENCIA', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.referencia}`, fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ],
              [
                { text: 'MEDIO DE TRANSPORTE', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.medioTransporte}`, fontSize: 9, bold: false, colSpan: 3, alignment: 'center' }
              ]
            ]
          }
        },
        {
          text: '2.0 MAPA REFERENCIA', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 15]
        },
        {
          columns: [
            {
              image: this.imagenCreada,
              width: 530,
              height: 230
            }
          ]
        },
        {
          text: '3.0 DAÑOS', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          text: '3.1 Vida y Salud', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 10, 0, 10]
        },
        {
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                { text: 'Titulo ', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Check ', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Cantidad ', fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Lesionados (Heridos) ', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioVidaSalud.lesionados != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
                { text: `${res.danioVidaSalud.cantidadLesionados != 0 ? res.danioVidaSalud.cantidadLesionados : '0'}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Personas Atrapadas ', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioVidaSalud.atrapados != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
                { text: `${res.danioVidaSalud.cantidadAtrapados != 0 ? res.danioVidaSalud.cantidadAtrapados : '0'}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Personas Aisladas ', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioVidaSalud.aislados != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
                { text: `${res.danioVidaSalud.cantidadAislados != 0 ? res.danioVidaSalud.cantidadAislados : '0'}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Desaparecidos', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioVidaSalud.desaparecidos != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
                { text: `${res.danioVidaSalud.cantidadDesaparecidos != 0 ? res.danioVidaSalud.cantidadDesaparecidos : '0'}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Fallecidos ', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioVidaSalud.fallecidos != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
                { text: `${res.danioVidaSalud.cantidadFallecidos != 0 ? res.danioVidaSalud.cantidadFallecidos : '0'}`, fontSize: 9, bold: true, alignment: 'center' },
              ]
            ]
          }
        },
        {
          text: '\n\n\n\n'
        },
        {
          text: '3.2 Servicios Basicos', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 10, 0, 10]
        },
        {
          table: {
            widths: [250, 250],
            body: [
              [
                { text: 'Titulo', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Check', fontSize: 9, bold: true, alignment: 'center' }
              ],
              [
                { text: 'Agua', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioServicioBasico.agua != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Desague', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioServicioBasico.desague != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Energia electrica', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioServicioBasico.energiaElectrica != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Telefono', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioServicioBasico.telefono != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Gas', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioServicioBasico.gas != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ]
            ]
          }
        },
        {
          text: '3.3 Infraestructura', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 10, 0, 10]
        },
        {
          table: {
            widths: [250, 250],
            body: [
              [
                { text: 'Titulo', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Check', fontSize: 9, bold: true, alignment: 'center' }
              ],
              [
                { text: 'Viviendad', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioInfraestructura.vivienda != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Carreteras', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioInfraestructura.carretera != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Puentes', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioInfraestructura.puente != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Establecimiento de salud', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioInfraestructura.establecimientoSalud != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ]
            ]
          }
        },
        {
          text: '3.4 Medios de vida', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 10, 0, 10]
        },
        {
          table: {
            widths: [250, 250],
            body: [
              [
                { text: 'Titulo', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Check', fontSize: 9, bold: true, alignment: 'center' }
              ],
              [
                { text: 'Ganaderia', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioMedioVida.ganaderia != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Agricultura', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioMedioVida.agricultura != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Comercio', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioMedioVida.comercio != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Turismo', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioMedioVida.turismo != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Pesca', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.danioMedioVida.pesca != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
            ]
          }
        },
  
        {
          text: '4.0 ATENCION DE EMERGENCIAS', alignment: 'justify', fontSize: 12, bold: true, margin: [-10, 15, 0, 0]
        },
        {
          text: '4.1 Actividades a realizar', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 10, 0, 10]
        },
        {
          table: {
            widths: [250, 250],
            body: [
              [
                { text: 'Titulo', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Check', fontSize: 9, bold: true, alignment: 'center' }
              ],
              [
                { text: 'Búsqueda y Rescate', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.actividad.busquedaRescate != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Evacuación', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.actividad.evacuacion != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Atención de Salud', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.actividad.atencionSalud != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Equipo EDAN', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.actividad.equipoEdan != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Medidas de Control', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.actividad.medidaControl != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
            ]
          }
        },
        {
          text: '4.2 Necesidades de Apoyo Externo', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 10, 0, 10]
        },
        {
          table: {
            widths: [250, 250],
            body: [
              [
                { text: 'Titulo', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Check', fontSize: 9, bold: true, alignment: 'center' }
              ],
              [
                { text: 'Bienes de Ayuda Humanitaria', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.necesidad.bienAyudaHumanitaria != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Maquinaria Pesada', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.necesidad.maquinariaPesada != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'Asistencia Tecnica', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.necesidad.asistenciaTecnica != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
            ]
          }
        },
        {
          text: '\n\n\n\n\n\n\n\n\n'
        },
        {
          text: '4.3 Otras Actividades', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 10, 0, 10]
        },
        {
          table: {
            widths: [300, '*'],
            body: [
              [
                { text: 'Titulo', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Check', fontSize: 9, bold: true, alignment: 'center' }
              ],
              [
                { text: 'RESCATE DE PERSONAS ATRAPADAS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.rescatePersonaAtrapada != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'BÚSQUEDA DE DESAPARECIDOS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.busquedaDesaparecido != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'ATENCIÓN PRE HOSPITALARIA', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.atencionPreHospitalaria != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'EVACUACIÓN DE HERIDOS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.evacuacionHerido != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'EVACUACIÓN DE DAMNIFICADOS Y AFECTADOS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.evacuacionDamnificado != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'EVACUACIÓN DE POBLACIÓN EN RIESGO', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.evacuacionPoblacionRiesgo != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'ATENCIÓN DE LESIONADOS (HERIDOS)', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.atencionLesionado != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'ASISTENCIA CON TECHO TEMPORAL', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.asistenciaTechoTemporal != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'ASISTENCIA CON ROPA DE ABRIGO', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.asistenciaRopaAbrigo != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'ASISTENCIA ALIMENTARIA', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.asistenciaAlimentaria != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'PROVISIÓN DE AGUA SEGURA', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.provisionAguaSegura != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'REHABILITACIÓN DE SERVICIOS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.rehabilitacionServicio != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'EVALUADORES EDAN', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.evaluadorEdan != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'REHABILITACIÓN DE VÍAS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.rehabilitacionVia != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'EQUIPOS DE COMUNICACIÓN', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.equipoComunicacion != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'REMOCIÓN DE ESCOMBROS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.remocionEscombio != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'INSTALACIÓN DE ALBERGUES', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.instalacionAlbergue != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'INSTALACIÓN DE LETRINAS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.instalacionLetrina != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'DISPOSICIÓN DE DESECHOS SÓLIDOS (BASURA)', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.disposicionDesechoSolido != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'HOSPITAL DE CAMPAÑA / EQUIPOS MÉDICOS DE EMERGENCIA - EMT', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.hospitalCampaniaEmt != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'GESTIÓN DE RESTOS HUMANOS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.gestionRestoHumano != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'SEGURIDAD', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.seguridad != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'EVALUACIÓN DEL RIESGO', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.evaluacionRiesgo != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'UTENSILIOS - MENAJE', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.utensilioMenaje != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'HERRAMIENTAS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.herramienta != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'MAQUINARIA PESADA', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraActividad.maquinariaPesada != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
            ]
          }
        },
        {
          text: '\n'
        },
        {
          table: {
            widths: [150, '*'],
            body: [
              [
                { text: 'OBSERVACIONES DE ACTIVIDADES', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.actividad.observacion}`, fontSize: 9, bold: true, alignment: 'center' },
              ]
            ]
          }
        },
        {
          text: '4.4 Otras Necesidades', alignment: 'justify', fontSize: 12, bold: true, margin: [0, 10, 0, 10]
        },
        {
          table: {
            widths: [300, '*'],
            body: [
              [
                { text: 'Titulo', fontSize: 9, bold: true, alignment: 'center' },
                { text: 'Check', fontSize: 9, bold: true, alignment: 'center' }
              ],
              [
                { text: 'CARPAS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.carpa != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'CAMAS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.capa != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'FRAZADAS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.frazada != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'ALIMENTOS FRIOS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.alimentoFrio != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'ALIMENTOS CRUDOS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.alimentoCrudo != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'UTENSILIOS/MENAJE', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.utensilioMenaje != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'HERRAMIENTAS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.herramienta != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'EQUIPOS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.equipo != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'EQUIPOS DE BÚSQUEDA Y RESCATE', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.equipoBusquedaRescate != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'MÉDICOS / BRIGADAS DE SALUD PROFESIONAL', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.medicoBrigadaSalud != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'ATENCIÓN PRE HOSPITALARIA', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.atencionPreHospitalaria != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'EVACUACIÓN DE HERIDOS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.evacuacionHerido != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'BOMBEROS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.bombero != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'EQUIPO DE COMUNICACION', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.equipoComunicacion != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'INGENIEROS / ARQUITECTOS', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.ingenieroArquitecto != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'MAQUINARIA PESADA', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.maquinariaPesada != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
              [
                { text: 'CISTERNA', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.otraNecesidad.cisterna != 0 ? 'X' : ''}`, fontSize: 9, bold: true, alignment: 'center' },
              ],
            ]
          }
        },
        {
          text: '\n'
        },
        {
          table: {
            widths: [150, '*'],
            body: [
              [
                { text: 'OBSERVACIONES DE NECESIDADES', fontSize: 9, bold: true, alignment: 'left' },
                { text: `${res.necesidad.observacion}`, fontSize: 9, bold: true, alignment: 'center' },
              ]
            ]
          }
        },
        {
          text: '\n\n\n\n\n\n\n'
        },
        {
          columns: [
            '',
            {
              stack: [
                '__________________\nRESPONSABLE'
              ]
            },
            '__________________\nRESPONSABLE',
            ''
          ],
        },
      ]
    }
    pdfMake.createPdf(dd).open()
  } */

  EvalucaionRapida() {    
    let ubicacion = this.createEvaluation.value.descripcionUbigeo.split("-")
    let quickEvaluation: QuickEvaluation = {
      idEmergencia: this.idEmergency,
      tipoFormulario: this.createEvaluation.value.tipoFormulario,
      numeroFormulario: this.createEvaluation.value.numeroFormulario,
      codigoUbigeo: this.createEvaluation.value.codigoUbigeo,
      descripcionUbigeo: this.createEvaluation.value.descripcionUbigeo,
      codigoUbigeoCentroPoblado: this.createEvaluation.value.codigoUbigeoCentroPoblado,
      centroPoblado: this.createEvaluation.value.centroPoblado,
      fechaHoraEvento: moment(this.createEvaluation.value.fechaHoraEvento).format('YYYY-MM-DD HH:mm:ss'),
      idTipoLugar: this.createEvaluation.value.idTipoLugar,
      tipoLugar: this.createEvaluation.value.tipoLugar,
      descripcionLugar: this.createEvaluation.value.descripcionLugar,
      idLugarEspecifico: this.createEvaluation.value.idLugarEspecifico,
      lugarEspecifico: this.createEvaluation.value.lugarEspecifico,
      descripcionLugarEspecifico: this.createEvaluation.value.descripcionLugarEspecifico,
      referencia: this.createEvaluation.value.referencia,
      medioTransporte: this.createEvaluation.value.medioTransporte,
      idTipoPeligro: this.createEvaluation.value.idTipoPeligro,
      tipoPeligro: this.createEvaluation.value.tipoPeligro,
      idGrupoPeligro: this.createEvaluation.value.idGrupoPeligro,
      grupoPeligro: this.createEvaluation.value.grupoPeligro,
      habilitado: 1,
      idRegistradoPor: 0,
      registradoPor: 'lperez',
      fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      idRevisadoPor: null,
      revisadoPor: null,
      fechaHoraRevisado: null,
      idAprobadoPor: null,
      aprobadoPor: null,
      fechaHoraAprobado: null,
      danioVidaSalud: {
        lesionados: this.createEvaluation.value.lesionados != 1 ? 0 : 1,
        cantidadLesionados: this.createEvaluation.value.cantidadLesionados != null ? this.createEvaluation.value.cantidadLesionados : 0,
        atrapados: this.createEvaluation.value.atrapados != 1 ? 0 : 1,
        cantidadAtrapados: this.createEvaluation.value.cantidadAtrapados != null ? this.createEvaluation.value.cantidadAtrapados : 0,
        aislados: this.createEvaluation.value.aislados != 1 ? 0 : 1,
        cantidadAislados: this.createEvaluation.value.cantidadAislados != null ? this.createEvaluation.value.cantidadAislados : 0,
        desaparecidos: this.createEvaluation.value.desaparecidos != 1 ? 0 : 1,
        cantidadDesaparecidos: this.createEvaluation.value.cantidadDesaparecidos != null ? this.createEvaluation.value.cantidadDesaparecidos : 0,
        fallecidos: this.createEvaluation.value.fallecidos != 1 ? 0 : 1,
        cantidadFallecidos: this.createEvaluation.value.cantidadFallecidos != null ? this.createEvaluation.value.cantidadFallecidos : 0,
      },
      danioServicioBasico: {
        agua: this.createEvaluation.value.agua != 1 ? 0 : 1,
        desague: this.createEvaluation.value.desague != 1 ? 0 : 1,
        energiaElectrica: this.createEvaluation.value.energiaElectrica != 1 ? 0 : 1,
        telefono: this.createEvaluation.value.telefono != 1 ? 0 : 1,
        gas: this.createEvaluation.value.gas != 1 ? 0 : 1
      },
      danioInfraestructura: {
        vivienda: this.createEvaluation.value.vivienda != 1 ? 0 : 1,
        carretera: this.createEvaluation.value.carretera != 1 ? 0 : 1,
        puente: this.createEvaluation.value.puente != 1 ? 0 : 1,
        establecimientoSalud: this.createEvaluation.value.establecimientoSalud != 1 ? 0 : 1
      },
      danioMedioVida: {
        ganaderia: this.createEvaluation.value.ganaderia != 1 ? 0 : 1,
        agricultura: this.createEvaluation.value.agricultura != 1 ? 0 : 1,
        comercio: this.createEvaluation.value.comercio != 1 ? 0 : 1,
        turismo: this.createEvaluation.value.turismo != 1 ? 0 : 1,
        pesca: this.createEvaluation.value.pesca != 1 ? 0 : 1
      },
      actividad: {
        busquedaRescate: this.createEvaluation.value.busquedaRescate != 1 ? 0 : 1,
        evacuacion: this.createEvaluation.value.evacuacion != 1 ? 0 : 1,
        atencionSalud: this.createEvaluation.value.atencionSalud != 1 ? 0 : 1,
        equipoEdan: this.createEvaluation.value.equipoEdan != 1 ? 0 : 1,
        medidaControl: this.createEvaluation.value.medidaControl != 1 ? 0 : 1,
        observacion: this.createEvaluation.value.observacion
      },
      necesidad: {
        bienAyudaHumanitaria: this.createEvaluation.value.bienAyudaHumanitaria != 1 ? 0 : 1,
        maquinariaPesada: this.createEvaluation.value.maquinariaPesada != 1 ? 0 : 1,
        asistenciaTecnica: this.createEvaluation.value.asistenciaTecnica != 1 ? 0 : 1,
        observacion: this.createEvaluation.value.observacion1
      },
      otraActividad: {
        rescatePersonaAtrapada: this.createEvaluation.value.rescatePersonaAtrapada != 1 ? 0 : 1,
        busquedaDesaparecido: this.createEvaluation.value.busquedaDesaparecido != 1 ? 0 : 1,
        atencionPreHospitalaria: this.createEvaluation.value.atencionPreHospitalaria != 1 ? 0 : 1,
        evacuacionHerido: this.createEvaluation.value.evacuacionHerido != 1 ? 0 : 1,
        evacuacionDamnificado: this.createEvaluation.value.evacuacionDamnificado != 1 ? 0 : 1,
        evacuacionPoblacionRiesgo: this.createEvaluation.value.evacuacionPoblacionRiesgo != 1 ? 0 : 1,
        atencionLesionado: this.createEvaluation.value.atencionLesionado != 1 ? 0 : 1,
        asistenciaTechoTemporal: this.createEvaluation.value.asistenciaTechoTemporal != 1 ? 0 : 1,
        asistenciaRopaAbrigo: this.createEvaluation.value.asistenciaRopaAbrigo != 1 ? 0 : 1,
        asistenciaAlimentaria: this.createEvaluation.value.asistenciaAlimentaria != 1 ? 0 : 1,
        provisionAguaSegura: this.createEvaluation.value.provisionAguaSegura != 1 ? 0 : 1,
        rehabilitacionServicio: this.createEvaluation.value.rehabilitacionServicio != 1 ? 0 : 1,
        evaluadorEdan: this.createEvaluation.value.evaluadorEdan != 1 ? 0 : 1,
        rehabilitacionVia: this.createEvaluation.value.rehabilitacionVia != 1 ? 0 : 1,
        equipoComunicacion: this.createEvaluation.value.equipoComunicacion != 1 ? 0 : 1,
        remocionEscombio: this.createEvaluation.value.remocionEscombio != 1 ? 0 : 1,
        instalacionAlbergue: this.createEvaluation.value.instalacionAlbergue != 1 ? 0 : 1,
        instalacionLetrina: this.createEvaluation.value.instalacionLetrina != 1 ? 0 : 1,
        disposicionDesechoSolido: this.createEvaluation.value.disposicionDesechoSolido != 1 ? 0 : 1,
        hospitalCampaniaEmt: this.createEvaluation.value.hospitalCampaniaEmt != 1 ? 0 : 1,
        gestionRestoHumano: this.createEvaluation.value.gestionRestoHumano != 1 ? 0 : 1,
        seguridad: this.createEvaluation.value.seguridad != 1 ? 0 : 1,
        evaluacionRiesgo: this.createEvaluation.value.evaluacionRiesgo != 1 ? 0 : 1,
        utensilioMenaje: this.createEvaluation.value.utensilioMenaje != 1 ? 0 : 1,
        herramienta: this.createEvaluation.value.herramienta != 1 ? 0 : 1,
        maquinariaPesada: this.createEvaluation.value.maquinariaPesada1 != 1 ? 0 : 1
      },
      otraNecesidad: {
        carpa: this.createEvaluation.value.carpa != 1 ? 0 : 1,
        capa: this.createEvaluation.value.capa != 1 ? 0 : 1,
        frazada: this.createEvaluation.value.frazada != 1 ? 0 : 1,
        alimentoFrio: this.createEvaluation.value.alimentoFrio != 1 ? 0 : 1,
        alimentoCrudo: this.createEvaluation.value.alimentoCrudo != 1 ? 0 : 1,
        utensilioMenaje: this.createEvaluation.value.utensilioMenaje2 != 1 ? 0 : 1,
        herramienta: this.createEvaluation.value.herramienta2 != 1 ? 0 : 1,
        equipo: this.createEvaluation.value.equipo != 1 ? 0 : 1,
        equipoBusquedaRescate: this.createEvaluation.value.equipoBusquedaRescate != 1 ? 0 : 1,
        medicoBrigadaSalud: this.createEvaluation.value.medicoBrigadaSalud != 1 ? 0 : 1,
        atencionPreHospitalaria: this.createEvaluation.value.atencionPreHospitalaria2 != 1 ? 0 : 1,
        evacuacionHerido: this.createEvaluation.value.evacuacionHerido2 != 1 ? 0 : 1,
        bombero: this.createEvaluation.value.bombero != 1 ? 0 : 1,
        equipoComunicacion: this.createEvaluation.value.equipoComunicacion2 != 1 ? 0 : 1,
        ingenieroArquitecto: this.createEvaluation.value.ingenieroArquitecto != 1 ? 0 : 1,
        maquinariaPesada: this.createEvaluation.value.maquinariaPesada2 != 1 ? 0 : 1,
        cisterna: this.createEvaluation.value.cisterna != 1 ? 0 : 1
      },
      archivos: this.files.value
    }

    let geometry: GeoQuickEvaluation = {
      id: null!,
      idEvaluacionRapida: null!,
      geometria: this.wrapGeometria.geometria as any
    }

    const quickevaluationDto: QuickEvaluationDto = {
      evaluacionRapida: quickEvaluation,
      geometria: geometry
    }

    const res = quickevaluationDto.evaluacionRapida;
    let fechavento = res.fechaHoraEvento.split(" ")
    console.log("res",res);
    

    var data: any = {
      pageOrientation: 'landscape',
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
              fontSize: 9,
              width: '*',
              bold : true,
              color: '#1363DF',
              text: `FORMULARIO 1: EVALUACIÓN RÁPIDA\nN° ${quickEvaluation.numeroFormulario}`
            },
            {
              alignment: 'center',
              width: 80,
              fontSize: 9,
              text: [
                { text: '    Departamento   \n', background: '#C1D8AE' },
                { text: `${ubicacion[0]}`, alignment: 'center' },
              ]
            },
            {
              alignment: 'center',
              width: 80,
              fontSize: 9,
              text: [
                { text: '    Código Sinpad    \n', background: '#C1D8AE' },
                { text: `${this.codeSinpad}`, alignment: 'center' },
              ]
            },
          ],

        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Informacion General', fontSize: 7, bold: true, alignment: 'left', colSpan: 20, }
              ],
            ]
          },
          layout: {
            fillColor: '#FFCD9C'
          }
        },
        {
          table: {
            widths: [12, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', 12, '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: '\nI-1', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Tipo de Peligro', fontSize: 7, bold: true, alignment: 'center', colSpan: 11, fillColor: '#FFCD9C' }, '', '', '', '', '', '', '', '', '', '',
                { text: '\nI-2', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Fecha de ocurrencia', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCD9C' }, '', '',
                { text: 'Hora de ocurrencia estimada', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
              ],
              [
                { text: '', fontSize: 7, bold: true, alignment: 'center', colSpan: 1 },
                { text: `${res.tipoPeligro}`, fontSize: 7, bold: true, alignment: 'center', colSpan: 11 }, '', '', '', '', '', '', '', '', '', '',
                { text: '', fontSize: 7, bold: true, alignment: 'center', colSpan: 1 },
                { text: `${fechavento[0]}`, fontSize: 7, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: `${fechavento[1]}`, fontSize: 7, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
            ]
          }
        },
        {
          table: {
            widths: [12, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: '\nI-3', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Provincia', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
                { text: 'Distrito', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
                { text: 'Localidad', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCD9C' }, '', '',
                { text: 'Barrio/Sector/Urbanización', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
                { text: 'Centro Poblado-Caserío/Anexo', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
              ],
              [
                { text: '', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: `${ubicacion[1]}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: `${ubicacion[2]}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: `${res.centroPoblado}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: `${res.descripcionLugar}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: `${res.descripcionLugarEspecifico}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
            ]
          }
        },
        {
          table: {
            widths: [12, '*', '*', '*', '*', '*', '*', '*', '*', '*', 12, '*', '*', '*', '*', 12, '*', '*', '*', '*'],
            body: [
              [
                { text: '\nI-4', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Punto de referencia par allegar a la localidad afectada(Adjuntar croquis a mano alzada del acceso a la zona de emergencia)', fontSize: 7, bold: true, alignment: 'center', colSpan: 9, fillColor: '#FFCD9C' }, '', '', '', '', '', '', '', '',
                { text: '\nI-5', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Medio de transporte sugerido', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
                { text: '\nI-6', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Altura (m.s.n.m)', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
              ],
              [
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: `${res.referencia}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 9 }, '', '', '', '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: `${res.medioTransporte}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
            ]
          }
        },
        {
          table: {
            widths: [12, 100, 15, 15, 12, 12, 17, 14, '*', '*', 30, 30, '*', '*', 60, 12, '*', '*', '*', '*'],
            body: [
              [
                { text: 'II. Daños', fontSize: 7, bold: true, alignment: 'center', colSpan: 7, fillColor: '#FFCDDD' }, '', '', '', '', '', '',
                { text: '\n\nI-7', fontSize: 7, bold: true, alignment: 'center', rowSpan: 3, colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'Coordenadas Geográficas', fontSize: 7, bold: true, alignment: 'center', colSpan: 7, fillColor: '#FFCD9C' }, '', '', '', '', '', '',
                { text: '\n\nI-8', fontSize: 7, bold: true, alignment: 'center', rowSpan: 3, colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'Coordenadas UTM', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', ''
              ],
              [
                { text: 'Código', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCDDD' }, '', '',
                { text: 'Total', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCDDD' }, '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: '\nLatitud', fontSize: 7, bold: true, alignment: 'center', rowSpan: 2, colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', rowSpan: 2, colSpan: 2 }, '',
                { text: '\nLongitud', fontSize: 7, bold: true, alignment: 'center', rowSpan: 2, colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', rowSpan: 2, colSpan: 1 },
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: '', fontSize: 7, bold: false, alignment: 'center', rowSpan: 2, colSpan: 4, fillColor: '#FFCD9C' }, '', '', ''
              ],
              [
                { text: 'Vida y Salud', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCDDD' }, '', '',
                { text: 'No', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Si', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Cantidad', fontSize: 7, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCDDD' }, '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 4 }, '', '', ''
              ],
              [
                { text: '1', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Lesionados(Heridos)', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioVidaSalud.cantidadLesionados == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioVidaSalud.cantidadLesionados != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioVidaSalud.cantidadLesionados}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 2 }, '',
                { text: 'III. Acciones inmediaras para la atención de emergencia (Marcar con X)', fontSize: 7, bold: true, alignment: 'center', colSpan: 13, fillColor: '#B4E3EF' }, '', '', '', '', '', '', '', '', '', '', '', ''
              ],
              [
                { text: '2', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Personas atrapadas', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioVidaSalud.cantidadAtrapados == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioVidaSalud.cantidadAtrapados != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioVidaSalud.cantidadAtrapados}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 2 }, '',
                { text: 'III-1. Actividades a realizar', fontSize: 7, bold: true, alignment: 'center', colSpan: 6, fillColor: '#B4E3EF' }, '', '', '', '', '',
                { text: 'III-2. Necesidades de apoyo externo', fontSize: 7, bold: true, alignment: 'center', colSpan: 7, fillColor: '#B4E3EF' }, '', '', '', '', '', ''
              ],
              [
                { text: '3', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Personas aisladas', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioVidaSalud.cantidadAislados == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioVidaSalud.cantidadAislados != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioVidaSalud.cantidadAislados}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 2 }, '',
                { text: `1. Búsqueda y Rescate ( ${res.actividad.busquedaRescate != 0 ? 'X' : ''} )\n\n2. Evacuación ( ${res.actividad.evacuacion != 0 ? 'X' : ''})\n\n3. Atención de Salud ( ${res.actividad.atencionSalud != 0 ? 'X' : ''} )\n\n4. Equipo EDAN ( ${res.actividad.equipoEdan != 0 ? 'X' : ''} )\n\n5. Medidas de Control ( ${res.actividad.medidaControl != 0 ? 'X' : ''} )\n\n6. Otros(Detallar):`, fontSize: 7, bold: false, alignment: 'left', colSpan: 6, rowSpan: 9 }, '', '', '', '', '',
                { text: `1. Bienes de Ayuda humanitaria ( ${res.necesidad.bienAyudaHumanitaria != 0 ? 'X' : ''} )\n\n2. Maquinaria Pesada ( ${res.necesidad.maquinariaPesada != 0 ? 'X' : ''} )\n\n3. Asistencia Técnica ( ${res.necesidad.asistenciaTecnica != 0 ? 'X' : ''} )\n\n4. Otros(Detallar):`, fontSize: 7, bold: false, alignment: 'left', colSpan: 7, rowSpan: 9 }, '', '', '', '', '', ''
              ],
              [
                { text: '4', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Desaparecidos', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioVidaSalud.cantidadDesaparecidos == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioVidaSalud.cantidadDesaparecidos != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioVidaSalud.cantidadDesaparecidos}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 7, bold: false, alignment: 'left', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'left', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '5', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Fallecidos', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioVidaSalud.cantidadFallecidos == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioVidaSalud.cantidadFallecidos != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioVidaSalud.cantidadFallecidos}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 2 }, '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: 'Servicios Básicos', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCDDD' }, '', '',
                { text: 'No', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Si', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCDDD' }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '6', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Agua', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioServicioBasico.agua == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioServicioBasico.agua != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '7', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Desagüe', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioServicioBasico.desague == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioServicioBasico.desague != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '8', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Energía Eléctrica', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioServicioBasico.energiaElectrica == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioServicioBasico.energiaElectrica != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '9', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Telefonía', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioServicioBasico.telefono == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioServicioBasico.telefono != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '10', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Gas', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioServicioBasico.gas == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioServicioBasico.gas != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: 'Infraestructura', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCDDD' }, '', '',
                { text: 'No', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Si', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCDDD' }, '', '',
                { text: `Observaciones: \n ${res.actividad.observacion != null ? res.actividad.observacion : "" }`, fontSize: 7, bold: false, alignment: 'left', colSpan: 6, rowSpan: 7 }, '', '', '', '', '',
                { text: `Observaciones: \n ${res.necesidad.observacion != null ? res.actividad.observacion : ""}`, fontSize: 7, bold: false, alignment: 'left', colSpan: 7, rowSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '11', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Viviendas', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioInfraestructura.vivienda == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioInfraestructura.vivienda != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '12', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Carreteras', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioInfraestructura.carretera == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioInfraestructura.carretera != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '13', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Puentes', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioInfraestructura.puente == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioInfraestructura.puente != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '14', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Estab. de Salud', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${res.danioInfraestructura.establecimientoSalud == 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${res.danioInfraestructura.establecimientoSalud != 0 ? 'X' : ''}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: 'Medios de Vida', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCDDD' }, '', '',
                { text: 'No', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Si', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCDDD' }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '15', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: `${this.setMediosDeVida(res.danioMedioVida.agricultura,res.danioMedioVida.comercio,res.danioMedioVida.ganaderia,res.danioMedioVida.pesca,res.danioMedioVida.turismo).text}`, fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: `${this.setMediosDeVida(res.danioMedioVida.agricultura,res.danioMedioVida.comercio,res.danioMedioVida.ganaderia,res.danioMedioVida.pesca,res.danioMedioVida.turismo).no}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: `${this.setMediosDeVida(res.danioMedioVida.agricultura,res.danioMedioVida.comercio,res.danioMedioVida.ganaderia,res.danioMedioVida.pesca,res.danioMedioVida.turismo).si}`, fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              /* [
                { text: 'Otros', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCDDD' }, '', '',
                { text: 'No', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Si', fontSize: 7, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCDDD' }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ],
              [
                { text: '16', fontSize: 7, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCDDD' },
                { text: 'Especificar', fontSize: 7, bold: true, alignment: 'left', colSpan: 2 }, '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 1 },
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 7 }, '', '', '', '', '', ''
              ], */
            ]
          }
        },
        {
          text: '\n'
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Nombres y apellidos y DNI del(la) Evaluador(a)/Firma', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#F6EDC1' }, '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 6 }, '', '', '', '', '',
              ],
              [
                { text: 'Teléfono de contacto:', fontSize: 7, bold: true, alignment: 'center', colSpan: 4, fillColor: '#F6EDC1' }, '', '', '',
                { text: '', fontSize: 7, bold: false, alignment: 'center', colSpan: 4, }, '', '', '',
                { text: 'COE - recibido por (Firma y Post firma/DNI)', fontSize: 7, bold: true, alignment: 'center', colSpan: 6, fillColor: '#F6EDC1' }, '', '', '', '', '',
                { text: 'Autoridad de Gobierno Regional / Gobierno local', fontSize: 7, bold: true, alignment: 'center', colSpan: 6, fillColor: '#F6EDC1' }, '', '', '', '', '',
              ],
            ]
          }
        },
        {
          text: '(i)Luego de llenar el FOrmulario entregar a la Oficina De Defensa Civil para su procesamiento en el COE. (ii) LAs personas y funcionarios que ingresen información falsa en este y otros formularios EDAN - PERÚ, serán sancionados de acuerdo a lo dispuesto en el Artículo 20 de la ley N° 29664 y la Ley N° 17444, Ley del Procedimiento Administrativo General',
          fontSize: 4.8,
          alignment: 'justified'
        },
        this.setMapa()
      ]

    }
    pdfMake.createPdf(data).open()
  }

  setMapa(){    
    let retorno = []
    if(this.imagenCreada != undefined)
      retorno = [
        {
          text: '\n\n2.0 MAPA REFERENCIA', 
          alignment: 'justify', 
          fontSize: 12, bold: 
          true, margin: [-10, 15, 0, 15]      
        },
        {
          columns: [
            {
              image: this.imagenCreada,
              width: 750,
              height: 300
            }
          ]
        },
      ]
    else 
    retorno = [
      {
        text: '\n\n2.0 MAPA NO ENCONTRADO', 
        alignment: 'justify', 
        fontSize: 12, bold: 
        true, margin: [-10, 15, 0, 15]      
      }
    ]
    console.log("dsa",retorno);
    
    return retorno
  }

  setMediosDeVida(agricultura: number, comercio: number
    , ganaderia: number, pesca: number, turismo: number) {
    let response = {
      "text": "",
      "si": "",
      "no": ""
    }
    let sino: boolean = false
    if (agricultura != 0) {
      response.text += "Agricultura"
      sino = true
    }
    if (comercio != 0) {
      if(response.text != "") response.text += ", "
      response.text += "Comercio"
      sino = true
    }
    if (ganaderia != 0) {
      if(response.text != "") response.text += ", "
      response.text += "Ganadería"
      sino = true
    }
    if (pesca != 0) {
      if(response.text != "") response.text += ", "
      response.text += "Pesca"
      sino = true
    }
    if (turismo != 0) {
      if(response.text != "") response.text += ", "
      response.text += "Turismo"
      sino = true
    }
    if(sino) response.si = "X"
    else response.no = "X"
    return response
  }

  

  back() {
    this.route.navigate([`/quick-evaluation/list/${this.idEmergency}`]).then(() => { });
  }
}
