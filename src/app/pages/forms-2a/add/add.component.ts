import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { EmergencyService } from 'src/app/shared/services/emergency.service';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { QuickEvaluationService } from 'src/app/shared/services/quickevaluation.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ModalFamilyComponent } from '../modal-family/modal-family.component';
import { ModalCreateVivComponent } from "../modal-create-viv/modal-create-viv.component";
import { TYPE_ALERT } from "../../../shared/services/config";
import { ModalEditVivComponent } from "../modal-edit-viv/modal-edit-viv.component";
import { ModalAffectationComponent } from '../modal-affectation/modal-affectation.component';
import { eTypeAction } from 'src/app/shared/models/geometria.model';
import { FamilyGroupService } from '../../../shared/services/family-group.service';
import { DtoEmpadronamiento, Empadronamiento, GeoFormulario2ab } from '../../../shared/models/empadronamiento.model';
import { ModalIntFamComponent } from "../modal-int-fam/modal-int-fam.component";
import { HttpHeaders } from '@angular/common/http';
import { FileService } from 'src/app/shared/services/file.service';
import { ModalEditFamComponent } from "../modal-edit-fam/modal-edit-fam.component";
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ResumenService } from 'src/app/shared/services/resumen.service';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddForm2AComponent implements OnInit {

  public createForm2A: FormGroup;
  tabId: string = 'general';
  public isHidden: boolean = false;
  public codeSinpad: any;
  public familyGroup: any;
  public idEmpFamily: any;
  public isDisabled: boolean = false;

  public dataForm2b: any;

  public PERMISOS = PERMISOS;

  public idEmergency: any;
  codigoSinpad: any;
  public idEmp: any;
  public idEvaluacionRapida: any;
  public getPopulatedCenter: any;
  public kindPlaces: any;
  public specificPlaces: any;
  public ceilings: any;
  public walls: any;
  public floors: any;
  public viviendas: any;
  public idGeometria: any;

  public isEdit : any

  public boolOp: boolean = false

  public streetData: any = [
    { "id": 1, "descripcion": "CALLE" },
    { "id": 2, "descripcion": "MANZANA" },
    { "id": 3, "descripcion": "NINGUNO" },
  ]

  public geoFormulario2ab: GeoFormulario2ab = {};
  public wrapGeometria: any = {};
  public typeAction: eTypeAction = eTypeAction.insert;
  idMapa: string = "mapEmpadronamiento";
  public currentTab: string;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public router: Router,
    private emergencyService: EmergencyService,
    private formularioService: FormularioService,
    private params: ActivatedRoute,
    private quickEvalService: QuickEvaluationService,
    public form2aService: Form2aService,
    private alertService: AlertService,
    private familyGroupService: FamilyGroupService,
    private fileService: FileService,
    public authService: AuthService,
    private resumenService: ResumenService
  ) {
    this.createForm2A = this.fb.group({
      idEmergency: [],
      idEvaluacionRapida: [],
      tipoFormulario: ['EMPADRONAMIENTO'],
      formNumber: ['', Validators.required],
      groupDanger: ['', [Validators.required]],
      idDangerGroup: [''],
      typeDanger: ['', [Validators.required]],
      idTypeDanger: [],
      datetimeEvent: ['', [Validators.required]],
      datetimeRegistration: ['', [Validators.required]],
      populatedCenter: ['', [Validators.required]],
      namePopulatedCenter: ['', [Validators.required]],
      ubigeoCode: [''],
      ubigeoDesc: [''],
      sectorPlaceName: [''],
      idPeligroSecundario: [],
      peligroSecundario: [''],
      idSectorPlace: [],
      sectorPlaceDesc: [''],
      streetName: [''],
      idStreet: [''],
      streetDesc: [''],
      floorName: [''],
      idSpecificPlace: [''],
      specificPlaceName: [''],
      specificPlaceDesc: [''],
      idEmpadronamiento: [''],
      habilitado: [],
      tieneSalud: [],
      tieneMedioVida: [],
      tieneVivienda: [],
      fechaHoraRegistrado: [],
      file: [null],
      files: this.fb.array([]),
      nota: [],
    });
  }

  ngOnInit(): void {
    this.idEmergency = this.params.snapshot.paramMap.get('idEmergency');  
    let words = this.params.snapshot.paramMap.get('idEmp').split(",")
    this.idEmp = words[0];
    this.isEdit = words[1];
    console.log("isedit",this.isEdit);
    
    /*const words = this.idEmp.split(',');
    this.idEmp = words[0]
    this.idEvaluacionRapida = words[1]*/
    //this.detailsEvaluation();
    //this.getEvaluacionRapida()
    this.getKindPlaces();
    this.getSpecificPlaces();
    this.getFormEmp(this.idEmp);
    this.getFamilyGroup(this.idEmp);
    this.getDetailsEmergency();
  }

  getDetailsEmergency() {
    this.emergencyService.getEmergencyById(this.idEmergency).subscribe(res => {
      this.codeSinpad = res.codigoSinpad
      console.log("codigo Sinpad", this.codeSinpad);
    });
  }

  get files() {
    return <FormArray>this.createForm2A.get('files');
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
    return this.createForm2A.value.files[index].nombre
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  // From drag and drop
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
        this.alertService.toastSuccess(`${res.message}`);
        this.addFile(res.rFile);
      });
    });

  }

  // TODO: Delete element of table
  delete(index: any): void {
    const file = this.createForm2A.value.files[index]
    this.fileService.removeFile(file.archivo, file.ruta).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.files.removeAt(index)
    });
  }

  getFamilyGroup(id: number) {
    const data = {
      idEmpadronamiento: id
    }
    this.familyGroupService.getFamilyGroup(data).subscribe((res: any) => {
      this.familyGroup = res.grupoFamiliarList;
      this.familyGroup.forEach((e: any) => {
        let cantidad = 0
        this.form2aService.getFormFamily(e.id).subscribe((ress: any) => {
          ress.forEach((j: any) => {
            if (j.medioVida == "SI") {
              cantidad++
            }
          });
          e.cantidadMedioDeVida = cantidad
        })

      });

    })
  }

  tabChange(event: string) {
    console.log("event", event);
    if (event == "resumen") {
      this.form2A()
      this.pdfForm2b()
      event = "files"
    }
    let flagError: boolean = true


    if (this.currentTab == "general") {
      if (
        this.createForm2A.controls['formNumber'].valid &&
        this.createForm2A.controls['datetimeRegistration'].valid &&
        this.createForm2A.controls['populatedCenter'].valid &&
        this.createForm2A.controls['namePopulatedCenter'].valid &&
        this.createForm2A.controls['idStreet'].valid &&
        this.createForm2A.controls['floorName'].valid &&
        this.createForm2A.controls['idSpecificPlace'].valid)

        flagError = true
    }
    if (this.currentTab == "mapa") {
      flagError = true
    }
    if (this.currentTab == "damage") {
      flagError = true
    }
    if (this.currentTab == "files") {
      flagError = true
    }

    if (flagError) {
      this.tabId = event;
    }

    this.currentTab = this.tabId
  }

  getFormEmp(id: any) {

    this.form2aService.getByIdForm2a(id).subscribe(res => {

      this.wrapGeometria.geometria = res.geometria.geometria;

      this.createForm2A.controls['idEmergency'].setValue(res.empadronamiento.idEmergencia);
      this.createForm2A.controls['idEvaluacionRapida'].setValue(res.empadronamiento.idEvaluacionRapida);

      this.createForm2A.controls['formNumber'].setValue(res.empadronamiento.numeroFormulario);
      this.createForm2A.controls['datetimeRegistration'].setValue(res.empadronamiento.fechaHoraEmpadronamiento);

      this.createForm2A.controls['idTypeDanger'].setValue(res.empadronamiento.idTipoPeligro);
      this.createForm2A.controls['typeDanger'].setValue(res.empadronamiento.tipoPeligro);

      this.createForm2A.controls['idPeligroSecundario'].setValue(res.empadronamiento.idTipoPeligroSecundario);
      this.createForm2A.controls['peligroSecundario'].setValue(res.empadronamiento.tipoPeligroSecundario);

      this.createForm2A.controls['idDangerGroup'].setValue(res.empadronamiento.idGrupoPeligro);
      this.createForm2A.controls['groupDanger'].setValue(res.empadronamiento.grupoPeligro);

      this.createForm2A.controls['datetimeEvent'].setValue(moment(res.empadronamiento.fechaHoraEvento).format('YYYY-MM-DD HH:mm'));

      this.createForm2A.controls['ubigeoCode'].setValue(res.empadronamiento.codigoUbigeo);
      this.createForm2A.controls['ubigeoDesc'].setValue(res.empadronamiento.descripcionUbigeo);

      this.createForm2A.controls['populatedCenter'].setValue(res.empadronamiento.codigoUbigeoCentroPoblado);
      this.createForm2A.controls['namePopulatedCenter'].setValue(res.empadronamiento.centroPoblado);
      this.createForm2A.controls['idSectorPlace'].setValue(res.empadronamiento.idTipoLugar);
      this.createForm2A.controls['sectorPlaceName'].setValue(res.empadronamiento.tipoLugar);
      this.createForm2A.controls['sectorPlaceDesc'].setValue(res.empadronamiento.descripcionLugar);

      this.createForm2A.controls['idSpecificPlace'].setValue(res.empadronamiento.idLugarEspecifico);
      this.createForm2A.controls['specificPlaceName'].setValue(res.empadronamiento.lugarEspecifico);
      this.createForm2A.controls['specificPlaceDesc'].setValue(res.empadronamiento.descripcionLugarEspecifico);


      this.createForm2A.controls['habilitado'].setValue(res.empadronamiento.habilitado);
      this.createForm2A.controls['tieneSalud'].setValue(res.empadronamiento.tieneSalud);
      this.createForm2A.controls['tieneMedioVida'].setValue(res.empadronamiento.tieneMedioVida);
      this.createForm2A.controls['tieneVivienda'].setValue(res.empadronamiento.tieneVivienda);
      this.createForm2A.controls['fechaHoraRegistrado'].setValue(res.empadronamiento.fechaHoraRegistrado);
      this.createForm2A.controls['idEmergency'].setValue(res.empadronamiento.idEmergencia);
      this.idGeometria = res.geometria.id;


      this.createForm2A.controls['idStreet'].setValue(res.empadronamiento.idTipoLugar2 != "" ? res.empadronamiento.idTipoLugar2.toString() : "");
      console.log("compro", res.empadronamiento.idTipoLugar2.toString());

      this.createForm2A.controls['streetName'].setValue(res.empadronamiento.streetName);
      this.createForm2A.controls['streetDesc'].setValue(res.empadronamiento.descripcionLugar2);
      this.createForm2A.controls['floorName'].setValue(res.empadronamiento.descripcionEdificioPisoDpto);

      console.log("test", this.createForm2A.value);
      console.log("test", res);
      this.dataForm2b = res.empadronamiento;
    })
  }

  tabChangeAndCreate(event: string) {
    this.tabId = event;
    let form: Empadronamiento = {
      id: Number(this.idEmp),
      tieneSalud: this.createForm2A.value.tieneSalud,
      tieneMedioVida: this.createForm2A.value.tieneMedioVida,
      tieneVivienda: this.createForm2A.value.tieneVivienda,
      idEvaluacionRapida: this.createForm2A.value.idEvaluacionRapida,
      idEmergencia: this.createForm2A.value.idEmergency,
      numeroFormulario: this.createForm2A.value.formNumber,
      tipoFormulario: 'EMPADRONAMIENTO',
      codigoUbigeo: this.createForm2A.value.ubigeoCode,
      descripcionUbigeo: this.createForm2A.value.ubigeoDesc,
      codigoUbigeoCentroPoblado: this.createForm2A.value.populatedCenter,
      centroPoblado: this.createForm2A.value.namePopulatedCenter,
      fechaHoraEvento: this.createForm2A.value.datetimeEvent,
      fechaHoraEmpadronamiento: this.createForm2A.value.datetimeRegistration,
      idTipoLugar: this.createForm2A.value.idSectorPlace,
      tipoLugar: this.createForm2A.value.sectorPlaceName,
      descripcionLugar: this.createForm2A.value.sectorPlaceDesc,
      idLugarEspecifico: this.createForm2A.value.idSpecificPlace,
      lugarEspecifico: this.createForm2A.value.specificPlaceName,
      descripcionLugarEspecifico: this.createForm2A.value.specificPlaceDesc,
      idTipoLugar2: this.createForm2A.value.idStreet,
      tipoLugar2: this.createForm2A.value.streetName,
      descripcionLugar2: this.createForm2A.value.streetDesc,
      descripcionEdificioPisoDpto: this.createForm2A.value.floorName,
      idTipoPeligro: this.createForm2A.value.idTypeDanger,
      tipoPeligro: this.createForm2A.value.typeDanger,
      idGrupoPeligro: this.createForm2A.value.idDangerGroup,
      grupoPeligro: this.createForm2A.value.groupDanger,
      idTipoPeligroSecundario: this.createForm2A.value.idTipoPeligroSecundario,
      tipoPeligroSecundario: this.createForm2A.value.tipoPeligroSecundario,
      fechaHoraRegistrado: this.createForm2A.value.fechaHoraRegistrado,
      habilitado: 1,
      idRegistradoPor: 0,// TODO: colocar el id del usuario logeado pero cambiar campo a actualizado por
      registradoPor: 'leo', // TODO: colocar el usuario logeado pero cambiar campo a actualizado por
      idRevisadoPor: null,
      revisadoPor: null,
      fechaHoraRevisado: null,
      idAprobadoPor: null,
      aprobadoPor: null,
      fechaHoraAprobado: null,
      estado_formulario: this.createForm2A.value.estado_formulario,
      nota: this.createForm2A.value.nota,
      archivos: this.files.value
    }
    if(this.isEdit == 1) form.estado_formulario = 1

    let geometry: GeoFormulario2ab = {
      id: this.idGeometria,
      idEmpadronamiento: this.idEmp,
      geometria: this.wrapGeometria.geometria as any
    }

    const dto: DtoEmpadronamiento = {
      empadronamiento: form,
      geometria: geometry
    }
    this.form2aService.createForm2a(dto).subscribe((res: any) => {
      this.geoFormulario2ab = res.post.geometria;
      this.alertService.toastSuccess(`${res.message}`);
      this.isHidden = true;
    });
  }

  getKindPlaces() {
    this.quickEvalService.getKindPlaces().subscribe(res => {
      this.kindPlaces = res;
    });
  }

  getSpecificPlaces() {
    this.quickEvalService.getSpecificPlaces().subscribe(res => {
      this.specificPlaces = res;
    });
  }

  changeSpecificPlaces(event: any) {
    this.createForm2A.controls['idSpecificPlace'].setValue(event.value);
    this.createForm2A.controls['specificPlaceName'].setValue(event.triggerValue);
    if (event.triggerValue === "NINGUNO") {
      this.createForm2A.controls['specificPlaceDesc'].disable();
      this.createForm2A.controls['specificPlaceDesc'].reset('');
    } else {
      this.createForm2A.controls['specificPlaceDesc'].enable();
    }
  }

  changeKindPlaces(event: any) {
    this.createForm2A.controls['idSectorPlace'].setValue(event.value);
    this.createForm2A.controls['sectorPlaceName'].setValue(event.triggerValue);
    if (event.triggerValue === "NINGUNO") {
      this.createForm2A.controls['sectorPlaceDesc'].disable();
      this.createForm2A.controls['sectorPlaceDesc'].reset('');
    } else {
      this.createForm2A.controls['sectorPlaceDesc'].enable();
    }
  }

  getPopulated(event: any) {
    this.createForm2A.controls['populatedCenter'].setValue(event.value);
    this.createForm2A.controls['namePopulatedCenter'].setValue(event.triggerValue);
  }

  changeStreet(event: any) {
    this.createForm2A.controls['idStreet'].setValue(event.value);
    this.createForm2A.controls['streetName'].setValue(event.triggerValue);
    if (event.triggerValue === "NINGUNO") {
      this.createForm2A.controls['streetDesc'].disable();
      this.createForm2A.controls['streetDesc'].reset('');
    } else {
      this.createForm2A.controls['streetDesc'].enable();
    }
  }

  back() {
    this.router.navigate([`/quick-evaluation/list/${this.idEmergency}`]).then(() => { });
  }

  save() {
    this.router.navigate([`/quick-evaluation/list/${this.idEmergency}`]).then(() => { });
  }

  deleteFamily(id: number) {
    this.alertService.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar este registro', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.form2aService.deleteEmpFamily(id).subscribe(res => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getFamilyGroup(this.idEmp);
          })
        }
      }
    );
  }

  showToUpdate(id: number) {
    const modalRef = this.modalService.open(ModalEditFamComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromEditParentFamily = {
      idFamilia: id,
      idEmpadrona: this.idEmp
    }
    modalRef.result.then((res) => {
      this.getFamilyGroup(this.idEmp);
    }, (reason) => {
      this.getFamilyGroup(this.idEmp);
    })
  }



  addAffectation(id: any) {
    const modalRef = this.modalService.open(ModalAffectationComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromIdFamily = {
      idFamily: id,
      idEmp: this.idEmp
    };
    modalRef.result.then((res) => {
      this.getFamilyGroup(this.idEmp);
    }, (reason) => {
      this.getFamilyGroup(this.idEmp);
    })
  }

  addFamily() {
    const modalRef = this.modalService.open(ModalFamilyComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.componentInstance.fromParentIdEmp = this.idEmp;
    modalRef.result.then((res) => {
      this.getFamilyGroup(this.idEmp);
    }, (reason) => {
      this.getFamilyGroup(this.idEmp);
    })
  }

  updateFiles() {
    const data: DtoEmpadronamiento = {
      empadronamiento: {
        id: Number(this.idEmp),
        archivos: this.files.value
      }
    }

    this.form2aService.createForm2a(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.router.navigate([`/quick-evaluation/list/${this.idEmergency}`]).then(() => { });
    });
  }

  updateDate(){   
    console.log("date",this.createForm2A.value.datetimeRegistration);
    
    //this.createForm2A.controls['datetimeRegistration'].setValue(moment(this.createForm2A.value.datetimeRegistration).format('YYYY-DD-MMTHH:mm'));
    
    console.log("date",this.createForm2A.value.datetimeRegistration);    
  }

  form2A() {
    console.log('idxdx', this.idEmp)
    this.resumenService.getResumenEmpadronamiento2a(this.idEmp).subscribe((resumen: any) => {
      console.log(JSON.stringify(resumen));
      if(resumen){
        this.createPdfEmpadronamiento2a(resumen);
      }else{
        this.alertService.toastError(`Error no se pudo cargar el pdf`);
      }

    })
  }


  createPdfEmpadronamiento2a(resumen: any) {
    const cabecera = resumen.cabecera;
    const detalle = resumen.detalle;       
    let dd : any = {
      pageOrientation: 'landscape',
      content: [
        {
          columns: [
            {
              image: 'data:image/jpeg;base64,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',
              width: 100,
              height: 30,
            },
            {
              alignment: 'center',
              fontSize: 14,
              width: '*',
              color: '#0000FA',
              text: 'FORMULARIO DE CAMPO 2A: EMPADRONAMIENTO FAMILIAR\n(Declaración Jurada - Ley 27444 - Ley de Procedimiento Administrativo General)'
            },
          ],

        },
        {
          text: "\n"
        },
        {
          columns: [
            {
              alignment: 'left',
              fontSize: 8,
              width: '*',
              text: `EVALUACIÓN N°: ${cabecera.numeroFormulario}\n\nTipo de Peligro: ${cabecera.tipoPeligro}`
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: `\n\nFecha de Ocurrencia: ${cabecera.fechaOcurrencia}`
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: `\n\nHora de Ocurrencia inmediata: ${cabecera.horaOcurrencia}`
            },
            {
              alignment: 'right',
              fontSize: 8,
              width: '*',
              text: `CÓDIGO SINPAD N°: ${cabecera.codigoSinpad}\n\nFecha de Empadronamiento ${cabecera.fechaEmpadronamiento}`
            },
          ],

        },
        {
          text: "\n"
        },
        {
          columns: [
            {
              alignment: 'left',
              fontSize: 8,
              width: '*',
              text: `Departamento: ${cabecera.departamento}\n\nProvincia ${cabecera.provincia}`
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: `Distrito: ${cabecera.distrito}`
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: `Localidad: ${cabecera.localidad}`
            },
            {
              alignment: 'right',
              fontSize: 8,
              width: '*',
              text: `Hora de Empadronamiento: ${cabecera.horaEmpadronamiento}`
            },
          ],

        },
        {
          text: "\n"
        },
        {
          columns: [
            {
              alignment: 'left',
              fontSize: 8,
              width: '*',
              text: `Barrio/Sector/Urbanizacion: (${cabecera.tipoLugar}) ${cabecera.descripcionLugar == null ?  " " : cabecera.descripcionLugar}`
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: `Calle/Manzana: (${cabecera.tipoLugar2}) ${cabecera.descripcionLugar2}`
            },
            {
              alignment: 'right',
              fontSize: 8,
              width: '*',
              text: `Edificio/Piso/Dpto: ${cabecera.descripcionEdificio}`
            },
          ],

        },
        {
          text: "\n"
        },
        {
          columns: [
            {
              alignment: 'left',
              fontSize: 8,
              width: '*',
              text: `Centro Poblado: ${cabecera.centroPoblado}`
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: `Caserío / Anexo: (${cabecera.lugarEspecifico}) ${cabecera.descripcionLugarEspecifico == null ? " " : cabecera.descripcionLugarEspecifico}`
            },
            {
              alignment: 'right',
              fontSize: 8,
              width: '*',
              text: `Otros Número de hoja: _______ ______`
            },
          ],

        },
        {
          text : "\n"
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', 5, 3, 3, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 5, 1, 1, 1, 1, 1, 9, 9, 7, 7, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'I. INFORMACIÓN GENERAL', fontSize: 6, bold: true, alignment: 'center', colSpan: 14, fillColor: '#C1D8AE' }, '', '', '', '', '', '', '', '', '', '', '', '', '',
                { text: 'II. INFORMACIÓN POR FAMILIA', fontSize: 6, bold: true, alignment: 'center', colSpan: 32, fillColor: '#FFCD9C' }, '', '', '', '', '', '', '', '', '', , '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                { text: 'III. INFORMACIÓN ESPECIAL POR FAMILIA', fontSize: 6, bold: true, alignment: 'center', colSpan: 14, fillColor: '#B4E3EF' }, '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, rowSpan: 3, fillColor: '#C1D8AE' },
                { text: 'Tenencia', fontSize: 6, bold: true, alignment: 'center', colSpan: 4, fillColor: '#C1D8AE' }, '', '', '',
                { text: 'Condi-\nción\nde uso \nde la \nintala\nción', fontSize: 6, bold: true, alignment: 'center', colSpan: 3, fillColor: '#C1D8AE' }, '', '',
                { text: 'Condi-\nción\n de la \nvivienda post \ndesastre', fontSize: 6, bold: true, alignment: 'center', colSpan: 3, fillColor: '#C1D8AE' }, '', '',
                { text: 'Tipo de \nMaterial de \nVivienda\n(Ver tabla \nde refer\nencia)', fontSize: 6, bold: true, alignment: 'center', colSpan: 3, fillColor: '#C1D8AE' }, '', '',

                { text: '\nJEFE(A) DE FAMILIA O \nPERSONA QUE RESPONDE\n(empadronar al total de \nlos mienbros de la familia)', fontSize: 6, bold: true, alignment: 'center', colSpan: 11, fillColor: '#FFCD9C' }, '', '', '', '', '', '', '', '', '', '',
                { text: '\nVIDA Y SALUD\n(indicar con números)', fontSize: 6, bold: true, alignment: 'center', colSpan: 5, fillColor: '#FFCD9C' }, '', '', '', '',
                { text: '\nCONMPOSICIÓN FAMILAIR \nPOR GRUPOS ÉTNICOS / AÑOS\n(indicar con números)', fontSize: 6, bold: true, alignment: 'center', colSpan: 16, fillColor: '#FFCD9C' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',

                { text: '\n\nGRUPOS VULNERABLES', fontSize: 6, bold: true, alignment: 'center', colSpan: 14, fillColor: '#B4E3EF' }, '', '', '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#C1D8AE' },
                { text: 'Propia', fontSize: 6, bold: true, alignment: 'center', colSpan: 4, /* rowSpan: 2, */fillColor: '#C1D8AE' }, '', '', '',
                { text: 'V\nI\nV\nI\nE\nN\nD\nA', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#C1D8AE' },
                { text: 'M\nE\nD\nI\nO\nS\n\n D\nE\n\n V\nD\nD\nA', fontSize: 5, bold: true, alignment: 'center', colSpan: 2, rowSpan: 2, fillColor: '#C1D8AE' }, '',
                { text: 'A\nF\nE\nC\nA\nA\nD\nA', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#C1D8AE' },
                { text: 'I\nN\nH\nA\nB\nI\nT\nA\nB\nL\nE', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#C1D8AE' },
                { text: 'D\nE\nS\nR\nR\nU\nI\nD\nA', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#C1D8AE' },
                { text: 'T\nE\nC\nH\nO', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#C1D8AE' },
                { text: 'P\nA\nR\nE\nD\nE\nS', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#C1D8AE' },
                { text: 'P\nI\nS\nO', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#C1D8AE' },

                { text: '\n\n\nAPELLIDOS, NOMBRES', fontSize: 6, bold: true, alignment: 'center', colSpan: 5, rowSpan: 2, fillColor: '#FFCD9C' }, '', '', '', '',
                { text: 'E\nD\nA\nD\n', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'DOCUMENTO\nDE\nIDENTIDAD', fontSize: 6, bold: true, alignment: 'center', colSpan: 5, fillColor: '#FFCD9C' }, '', '', '', '',
                { text: 'Condición', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: 'Daños\npersonales', fontSize: 6, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCD9C' }, '', '',
                { text: 'Menor a 1', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: '01 a 04', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: '05 a 09', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: '10 a 14', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: '15 a 17', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: '18 a 49', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: '50 a 59', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: '60 a más', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCD9C' }, '',

                { text: 'G\nE\nS\nT\nA\nN\nT\nE\nS\n\nS\nE\nM\nA\nN\nA\nS', fontSize: 5, bold: true, alignment: 'center', colSpan: 4, rowSpan: 2, fillColor: '#B4E3EF' }, '', '', '',
                { text: '\n\nPersonas con discapacidad\n(Especificar el \nNumero de tabla de Referencia)', fontSize: 6, bold: true, alignment: 'center', colSpan: 4, rowSpan: 2, fillColor: '#B4E3EF' }, '', '', '',
                { text: '\n\n\n\nTipo de enfermedad crónica(Especificar el Numeral de la Tabla de refrerencia)', fontSize: 6, bold: true, alignment: 'center', colSpan: 6, rowSpan: 2, fillColor: '#B4E3EF' }, '', '', '','', '',

              ],
              [
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#C1D8AE' },
                { text: '\n\n\n\nSI', fontSize: 6, bold: true, alignment: 'center', colSpan: 2,fillColor: '#C1D8AE' }, '',
                { text: '\n\n\n\nNO', fontSize: 6, bold: true, alignment: 'center', colSpan: 2,fillColor: '#C1D8AE' }, '',
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#C1D8AE' },
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#C1D8AE' }, '',
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#C1D8AE' },
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#C1D8AE' },
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#C1D8AE' },
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#C1D8AE' },
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#C1D8AE' },
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#C1D8AE' },

                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 5, fillColor: '#FFCD9C' }, '', '', '', '',
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: '\n\nTI-\nPO', fontSize: 6, bold: true, alignment: 'center', colSpan: 2, fillColor: '#FFCD9C' }, '',
                { text: '\n\nNUME-\nRO', fontSize: 6, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCD9C' }, '', '',
                { text: 'D\nA\nM\nN\nI\nF\nI\nC\nA\nD\nO', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' }, 
                { text: 'A\nF\nE\nC\nT\nA\nD\nO', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' }, 
                { text: 'L\nE\nS\nI\nO\nN\nO\nN\nA\nD\nO', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' }, 
                { text: 'D\nE\nS\nA\nP\nA\nR\nE\nC\nI\nD\nO', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' }, 
                { text: 'F\nA\nL\nL\nE\nC\nI\nD\nO\n(*)', fontSize: 5, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' }, 
                { text: 'M', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'F', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'M', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'F', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'M', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'F', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'M', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'F', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'M', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'F', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'M', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'F', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'M', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'F', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'M', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'F', fontSize: 6, bold: true, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },

                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 4, fillColor: '#B4E3EF' }, '', '', '',
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 4, fillColor: '#B4E3EF' }, '', '', '',
                { text: '', fontSize: 6, bold: true, alignment: 'center', colSpan: 6, fillColor: '#B4E3EF' }, '', '', '','', '',

              ],

              ...detalle.map((r: any) => {
                return [
                  { text: '*', fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.si == 0 ? '' : r.si}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.no == 0 ? '' : r.no}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.vivienda == 0 ? '' : r.vivienda}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.mediosVida == 0 ? '' : r.mediosVida}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.afectada == 0 ? '' : r.afectada}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.inhabitable == 0 ? '' : r.inhabitable}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.destruida == 0 ? '' : r.destruida}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.techo == 0 ? '' : r.techo}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.pared == 0 ? '' : r.pared}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.piso == 0 ? '' : r.piso}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
  
                  { text: `${r.nombresApellidos}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 5 }, '', '', '', '',
                  { text: `${r.edad}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.tipoDocumento}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.numeroDocumento}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                  { text: `${r.damnificados == 0 ? '' : r.damnificados}`, fontSize: 5, bold: true, alignment: 'center', colSpan: 1 }, 
                  { text: `${r.afectado == 0 ? '' : r.afectado}`, fontSize: 5, bold: true, alignment: 'center', colSpan: 1 }, 
                  { text: `${r.lesionado == 0 ? '' : r.lesionado}`, fontSize: 5, bold: true, alignment: 'center', colSpan: 1 }, 
                  { text: `${r.desaparecido == 0 ? '' : r.desaparecido}`, fontSize: 5, bold: true, alignment: 'center', colSpan: 1 }, 
                  { text: `${r.fallecido == 0 ? '' : r.fallecido}`, fontSize: 5, bold: true, alignment: 'center', colSpan: 1 }, 
                  { text: `${r.edadMenor1 == 0 ? '' : r.edadMenor1}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edadMenor1 == 0 ? '' : r.edadMenor1}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad14 == 0 ? '' : r.edad14}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad14 == 0 ? '' : r.edad14}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad59 == 0 ? '' : r.edad59}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad59 == 0 ? '' : r.edad59}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad1014 == 0 ? '' : r.edad1014}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad1014 == 0 ? '' : r.edad1014}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edada1517 == 0 ? '' : r.edada1517}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edada1517 == 0 ? '' : r.edada1517}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad1849 == 0 ? '' : r.edad1849}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad1849 == 0 ? '' : r.edad1849}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad5059 == 0 ? '' : r.edad5059}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad5059 == 0 ? '' : r.edad5059}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad60Mas == 0 ? '' : r.edad60Mas}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
                  { text: `${r.edad60Mas == 0 ? '' : r.edad60Mas}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 1 },
  
                  { text: `${r.semanaGestacion == null ? "" : r.semanaGestacion}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 4}, '', '', '',
                  { text: `${r.personaDiscapacidad == 0 ? '' : r.personaDiscapacidad}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 4}, '', '', '',
                  { text: `${r.enfermedadCronica == 0 ? '' : r.enfermedadCronica}`, fontSize: 6, bold: true, alignment: 'center', colSpan: 6}, '', '', '','', '',
                ]
              })                            
            ]
          },
        },
        {
          columns: [
            {
              alignment: 'center',
              fontSize: 5,
              width: '*',
              text: 'Nota. Si se observan daños en los MEdios de Vida, pasar al Formulario 2B'
            },
          ],

        },
        {
          columns: [
            {
              alignment: 'left',
              fontSize: 6,
              width: '*',
              text: 'Aprobado ________________________________'
            },
          ],
        },
        {
          text : '\n'
        },
        {
          columns: [
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: '_______________________________________________________\nNombre, Apellido y Firma del(la) Evaluador(a) EDAN PERÚ\n D.N.I N° ______________'
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: '__________________________________________________________________\nFirma y Sello Jefe(a). Oficina de Defensa Civil\n D.N.I N° ______________'
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: '______________________________________________________________\nFirma y Sello del Gobernador(a) Regional / Alcalde(sa)'
            },
          ],
        },
        ,
        {
          text: '\n(i)Luego de llenar el FOrmulario entregar a la Oficina De Defensa Civil para su procesamiento en el COE. (ii) LAs personas y funcionarios que ingresen información falsa en este y otros formularios EDAN - PERÚ, serán sancionados de acuerdo a lo dispuesto en el Artículo 20 de la ley N° 29664 y la Ley N° 17444, Ley del Procedimiento Administrativo General',
          fontSize: 4.8,
          alignment: 'justified'
        },

      ]

    }
    pdfMake.createPdf(dd).open()
  }

  pdfForm2b() {

    this.resumenService.getResumenEmpadronamiento2b(this.idEmp).subscribe((resumen: any) => {
      console.log(JSON.stringify(resumen));
      if(resumen){
        this.createPdfEmpadronamiento2b(resumen);
      }else{
        this.alertService.toastError(`Error no se pudo cargar el pdf`);
      }

    })
  }

  createPdfEmpadronamiento2b(resumen: any){
    const cabecera = resumen.cabecera;
    const detalle = resumen.detalle;

    console.log("test",cabecera);
    console.log("detalle",detalle);
    
    let data : any = {
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
              text: 'FORMULARIO DE CAMPO 2B: EMPADRONAMIENTO MEDIOS DE VIDA\n(Declaracion Jurada - Ley 27444 - Ley de Procedimiento Administrativo General)',
              color: '#1363DF',
              bold: true,
              fontSize: 15,
            },
            {
              alignment: 'center',
              width: 100,
              text: ''
            },
          ],
        },
        {
          text: '\n'
        },
        {
          columns: [
            {
              fontSize: 8,
              text: `EVALUACION N°: ${cabecera.numeroFormulario}`
            },
            {
              text: ''
            },
            {
              fontSize: 8,
              alignment: 'center',
              text: `CODIGO SINPAD N°: ${cabecera.codigoSinpad}`
            }
          ]
        },
        {
          text: '\n'
        },
        {
          columns: [
            {
              fontSize: 8,
              text: `Tipo de Peligro: ${cabecera.tipoPeligro} \n\nDepartamento: ${cabecera.departamento} Provincia: ${cabecera.provincia} \n\nBarrio/Sector/Urbanizacion: (${cabecera.tipoLugar}) ${cabecera.descripcionLugar == null ? '' : cabecera.descripcionLugar}\n\nCentro Poblado: ${cabecera.centroPoblado}`
            },
            {
              fontSize: 8,
              text: `Fecha Ocurrencia: ${cabecera.fechaOcurrencia} Hora Ocurrencia: ${cabecera.horaOcurrencia} \n\nDistrito: ${cabecera.distrito} Localidad: ${cabecera.localidad} \n\nCalle/Manzana: (${cabecera.tipoLugar2}) ${cabecera.descripcionLugar2}\n\nCaserio / Anexo:${cabecera.descripcionLugarEspecifico}`
            },
            {
              fontSize: 8,
              alignment: 'center',
              text: `Fecha del Empadronamiento: ${cabecera.fechaEmpadronamiento}\n\nHora del Empadronamiento: ${cabecera.horaEmpadronamiento} \n\nEdificio/Piso/Dpto: ${cabecera.descripcionEdificio} \n\nOtros: ${cabecera.otros}`
            }
          ]
        },
        {
          text: '\n'
        },
        {
          text: 'IV. INFORMACIÓN DE DAÑOS A LOS MEDIOS DE VIDA (Indicar con números)', alignment: 'center', fontSize: 7, bold: true
        },
        {
          table: {
            alignment: 'center',
            widths: [100, '*', '*', '*', '*', '*', '*', '*', 25, '*', '*', 50, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Nombres y Apellidos', fontSize: 7, bold: true, alignment: 'center', colSpan: 8, rowSpan: 2,fillColor: '#F6EDC1' }, '', '', '', '', '', '', '',
                { text: 'DOCUMENTO DE IDENTIDAD', fontSize: 7, bold: true, alignment: 'center', colSpan: 4,fillColor: '#F6EDC1' }, '', '', '',
                { text: 'AGRICULTURA', fontSize: 7, bold: true, alignment: 'center', colSpan: 10,fillColor: '#C1D8AE' }, '', '', '', '', '', '', '', '', '',
                { text: 'GANADERIA', fontSize: 7, bold: true, alignment: 'center', colSpan: 12 ,fillColor: '#FFCD9C'}, '', '', '', '', '', '', '', '', '', '', '',
                { text: 'COMERCIO', fontSize: 7, bold: true, alignment: 'center', colSpan: 8 ,fillColor: '#E8C9F3'}, '', '', '', '', '', '', '',
                { text: 'TURISMO', fontSize: 7, bold: true, alignment: 'center', colSpan: 8 ,fillColor: '#F5CBA7 '}, '', '', '', '', '', '', '',
                { text: 'PESCA', fontSize: 7, bold: true, alignment: 'center', colSpan: 10 ,fillColor: '#AED6F1'}, '', '', '', '', '', '', '', '', '',
                { text: 'OTROS', fontSize: 7, bold: true, alignment: 'center', colSpan: 6 ,fillColor: '#E5E8E8'}, '', '', '', '', '',
              ],
              [
                { text: '', fontSize: 7, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                { text: 'TIPO', fontSize: 7, alignment: 'center', colSpan: 2 ,fillColor: '#F6EDC1'}, '',
                { text: 'NUMERO', fontSize: 7, alignment: 'center', colSpan: 2 ,fillColor: '#F6EDC1'}, '',
                { text: 'C\nU\nL\nT\nI\nV\nO\nS\n\nP\nA\nN\n\nL\nL\nE\nV\nA\nR', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'C\nU\nL\nT\nI\nV\nO\nS\n\nP\nE\nR\nM\nA\nN\nE\nN\nT\nE\nS', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'C\nU\nL\nT\nI\nV\nO\nS\n\nT\nR\nA\nN\nS\nI\nT\nO\nR\nI\nO\nS', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'C\nU\nL\nT\nI\nV\nO\nS\n\nN\nO\n\nP\nE\nR\nM\nA\nN\nE\nN\nT\nE\nS', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'A\nP\nI\nC\nU\nL\nT\nU\nR\nA', fontSize: 5, alignment: 'center', colSpan: 2 }, '',

                { text: 'V\nA\nC\nU\nN\nO', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'E\nQ\nU\nI\nN\nO', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'O\nV\nI\nN\nO', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'C\nA\nM\nO\nL\nI\nD\nO\nS', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'P\nO\nR\nC\nI\nN\nO\nS', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'A\nN\nI\nM\nA\nL\nE\nS', fontSize: 5, alignment: 'center', colSpan: 2 }, '',

                { text: 'B\nO\nD\nE\nG\nA', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'R\nE\nS\nT\nA\nU\nR\nA\nN\nT\nE', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'T\nA\nL\nL\nE\nR', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'Z\nA\nP\nA\nT\nE\nR\nI\nA', fontSize: 5, alignment: 'center', colSpan: 2 }, '',

                { text: 'S\nE\nR\nV\nI\nC\nI\nO\n\nT\nU\nR\nI\nS\nT\nI\nC\nO', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'H\nO\nS\nP\nE\nD\nA\nJ\nE', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'E\nM\nP\n\nT\nR\nA\nN\nS\nP\nO\nR\nT\nE', fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'H\nO\nT\nE\nL\nE\nS', fontSize: 5, alignment: 'center', colSpan: 2 }, '',

                { text: 'R\nE\nC\nU\nR\nS\nO\n\nN\nA\nT\nU\nR\nA\nL', bold: true, fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'P\nI\nC\nI\nG\nR\nA\nN\nJ\nA', bold: true, fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'A\nP\nA\nR\nE\nJ\nO\nS\n\nD\nE\n\nP\nE\nS\nC\nA', bold: true, fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'E\nM\nB\nA\nR\nC\nA\nC\nI\nO\nN\nE\nS', bold: true, fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'C\nO\nN\nS\nE\nR\nV\nE\nR\nA\nS', bold: true, fontSize: 5, alignment: 'center', colSpan: 2 }, '',

                { text: 'E\nS\nP\nE\nC\nI\nF\nI\nC\nA\nR', bold: true, fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'E\nS\nP\nE\nC\nI\nF\nI\nC\nA\nR', bold: true, fontSize: 5, alignment: 'center', colSpan: 2 }, '',
                { text: 'E\nS\nP\nE\nC\nI\nF\nI\nC\nA\nR', bold: true, fontSize: 5, alignment: 'center', colSpan: 2 }, '',
              ],

              ...detalle.map((r: any) => {
                return [
                  { text: `${r.nombresApellidos == 0 ? '' : r.nombresApellidos}`, fontSize: 8, alignment: 'center', colSpan: 8 }, '', '', '', '', '', '', '',
                  { text: `${r.tipoDocumento == 0 ? '' : r.tipoDocumento}`, fontSize: 8, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.numeroDocumento == 0 ? '' : r.numeroDocumento}`, fontSize: 8, alignment: 'center', colSpan: 2 }, '',

                  { text: `${r.cultivoDePanLLevar == 0 ? '' :r.cultivoDePanLLevar}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.cultivoPermanente == 0 ? '' : r.cultivoPermanente }`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.cultivoTransitorio == 0 ? '' :r.cultivoTransitorio}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.cultivoNoPermanente == 0 ? '' : r.cultivoNoPermanente}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.cultivoApicultura == 0 ? '' : r.cultivoApicultura }`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',

                  { text: `${r.vacuno == 0 ? '' : r.vacuno}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.equino == 0 ? '' : r.equino}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.ovino == 0 ? '' : r.ovino}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.camelidos == 0 ? '' : r.camelidos}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.porcinos == 0 ? '' : r.porcinos}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.animales == 0 ? '' : r.animales}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',

                  { text: `${r.bodega == 0 ? '' : r.bodega}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.restaurant == 0 ? '' : r.restaurant}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.taller == 0 ? '' : r.taller}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.zapateria == 0 ? '' : r.zapateria}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',

                  { text: `${r.servicioTuristico == 0 ? '' : r.servicioTuristico}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.hospedaje == 0 ? '' : r.hospedaje}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.empresaTransporte == 0 ? '' : r.empresaTransporte}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.hoteles == 0 ? '' : r.hoteles}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',

                  { text: `${r.recursoNatural == 0 ? '' : r.recursoNatural}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.piscigranja == 0 ? '' : r.piscigranja}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.aparejosPesca == 0 ? '' : r.aparejosPesca}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.embarcaciones == 0 ? '' : r.embarcaciones}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: `${r.conservas == 0 ? '' : r.conservas}`, fontSize: 6, alignment: 'center', colSpan: 2 }, '',

                  { text: ``, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: ``, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                  { text: ``, fontSize: 6, alignment: 'center', colSpan: 2 }, '',
                ]
              }),
            ]
          }
        },
        {
          text: '\n'
        },
        {
          //pageBreak: 'before',
          columns: [
            {
              fontSize: 8,
              text: 'Aprobado: _____________________________________________'
            },
            {
              fontSize: 8,
              text: ''
            },
            {
              fontSize: 8,
              text: ''
            }
          ]
        },
        {
          text: '\n\n'
        },
        {
          columns: [
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: '_______________________________________________________\nNombre, Apellido y Firma del(la) Evaluador(a) EDAN PERÚ\n D.N.I N° ______________'
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: '__________________________________________________________________\nFirma y Sello Jefe(a). Oficina de Defensa Civil\n D.N.I N° ______________'
            },
            {
              alignment: 'center',
              fontSize: 8,
              width: '*',
              text: '______________________________________________________________\nFirma y Sello del Gobernador(a) Regional / Alcalde(sa)'
            },
          ],
        },
        {
          text: '\n'
        },
        {
          text: '\n(i)Luego de llenar el FOrmulario entregar a la Oficina De Defensa Civil para su procesamiento en el COE. (ii) LAs personas y funcionarios que ingresen información falsa en este y otros formularios EDAN - PERÚ, serán sancionados de acuerdo a lo dispuesto en el Artículo 20 de la ley N° 29664 y la Ley N° 17444, Ley del Procedimiento Administrativo General',
          fontSize: 4.8,
          alignment: 'justified'
        },
        /*{
          table: {
            widths: [5, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', 12, '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Tipo de Peligro', fontSize: 9, bold: true, alignment: 'center', colSpan: 11, fillColor: '#FFCD9C' }, '', '', '', '', '', '', '', '', '', '',
                { text: '\nI-2', fontSize: 9, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Fecha de ocurrencia', fontSize: 9, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCD9C' }, '', '',
                { text: 'Hora de ocurrencia estimada', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 1 },
                { text: 'Data', fontSize: 9, bold: true, alignment: 'center', colSpan: 11 }, '', '', '', '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 1 },
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
            ]
          }
        },*/
        /*{
          table: {
            widths: [5, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Provincia', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
                { text: 'Distrito', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
                { text: 'Localidad', fontSize: 9, bold: true, alignment: 'center', colSpan: 3, fillColor: '#FFCD9C' }, '', '',
                { text: 'Barrio/Sector/Urbanización', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
                { text: 'Centro Poblado-Caserío/Anexo', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
              ],
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Data', fontSize: 9, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: false, alignment: 'center', colSpan: 3 }, '', '',
                { text: '', fontSize: 9, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
            ]
          }
        },
        {
          table: {
            widths: [5, '*', '*', '*', '*', '*', '*', '*', '*', '*', 12, '*', '*', '*', '*', 12, '*', '*', '*', '*'],
            body: [
              [
                { text: '', fontSize: 9, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Punto de referencia par allegar a la localidad afectada(Adjuntar croquis a mano alzada del acceso a la zona de emergencia)', fontSize: 9, bold: true, alignment: 'center', colSpan: 9 }, '', '', '', '', '', '', '', '',
                { text: '\nI-5', fontSize: 9, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Fecha de ocurrencia', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
                { text: '\nI-6', fontSize: 9, bold: true, alignment: 'center', colSpan: 1, rowSpan: 2, fillColor: '#FFCD9C' },
                { text: 'Fecha de ocurrencia', fontSize: 9, bold: true, alignment: 'center', colSpan: 4, fillColor: '#FFCD9C' }, '', '', '',
              ],
              [
                { text: '', fontSize: 9, bold: false, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: 'Data', fontSize: 9, bold: false, alignment: 'center', colSpan: 9 }, '', '', '', '', '', '', '', '',
                { text: '', fontSize: 9, bold: false, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: '', fontSize: 9, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
                { text: '', fontSize: 9, bold: false, alignment: 'center', colSpan: 1, fillColor: '#FFCD9C' },
                { text: '', fontSize: 9, bold: false, alignment: 'center', colSpan: 4 }, '', '', '',
              ],
            ]
          }
        },*/
      ]

    }
    pdfMake.createPdf(data).open()
  }

  setValueData(text : any){
    if(text == null) return " "
    else return text
  }
  
}
