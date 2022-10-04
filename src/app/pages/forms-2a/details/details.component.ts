import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Form2aService} from 'src/app/shared/services/form-2a.service';
import {QuickEvaluationService} from 'src/app/shared/services/quickevaluation.service';
import * as moment from 'moment';
import {AlertService} from 'src/app/shared/services/alert.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TYPE_ALERT} from 'src/app/shared/services/config';
import {ModalEditFamComponent} from '../modal-edit-fam/modal-edit-fam.component';
import { eTypeAction } from 'src/app/shared/models/geometria.model';
import {DtoEmpadronamiento, Empadronamiento, FileEmpadronamiento, GeoFormulario2ab} from "../../../shared/models/empadronamiento.model";
import {ModalFamilyComponent} from "../modal-family/modal-family.component";
import {FamilyGroupService} from "../../../shared/services/family-group.service";
import {ModalAffectationComponent} from "../modal-affectation/modal-affectation.component";
import {HttpHeaders} from "@angular/common/http";
import {FileService} from "../../../shared/services/file.service";
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { EmergencyService } from 'src/app/shared/services/emergency.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModal]
})
export class DetailsForm2AComponent implements OnInit {

  tabId: string = 'general';
  public idEmp: any;
  public idEmergency: any;
  public updateForm2A: FormGroup;
  public familyGroup: any;

  
  public PERMISOS = PERMISOS;

  public getPopulatedCenter: any;
  public kindPlaces: any;
  public specificPlaces: any;

  public geoFormulario2ab: GeoFormulario2ab = {};
  public wrapGeometria: any = {};
  public typeAction: eTypeAction = eTypeAction.insert;
  idMapa: string = "mapEmpadronamientoDetail";

  public codigoSinpad: any;

  constructor(
    private route: Router,
    private params: ActivatedRoute,
    private fb: FormBuilder,
    private form2aService: Form2aService,
    private quickEvalService: QuickEvaluationService,
    private emergencyService : EmergencyService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private alert: AlertService,
    private familyGroupService: FamilyGroupService,
    private fileService: FileService,
    public authService:  AuthService
  ) {
    this.updateForm2A = this.fb.group({
      codeEmergency: [],
      codeSinpad: [],
      codeForm2a: [],
      codeEmpFam: [],
      tieneSalud: [],
      tieneMedioVida: [],
      tieneVivienda: [],
      formNumber: ['', Validators.required],
      groupPhenomenon: ['', [Validators.required]],
      idGroupPhenomenon: [''],
      typePhenomenon: ['', [Validators.required]],
      idTypePhenomenon: [''],
      datetimeEvent: ['', [Validators.required]],
      datetimeRegistration: ['', [Validators.required]],
      populatedCenter: [''],
      namePopulatedCenter: [''],
      ubigeoCode: [''],
      ubigeoDesc: [''],
      sectorPlaceName: [''],
      idSectorPlace: [''],
      sectorPlaceDesc: [''],
      streetName: [''],
      idStreet: [''],
      streetDesc: [''],
      floorName: [''],
      specificPlaceName: [''],
      idSpecificPlace: [''],
      specificPlaceDesc: [''],
      file: [null],
      files: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.idEmp = this.params.snapshot.paramMap.get('id');
    this.getDetailsEmergency();
    this.detailsForm2a();
    this.getKindPlaces();
    this.getSpecificPlaces();
    this.getFamilyGroup(this.idEmp);
    console.log("codigo Sinpad",this.codigoSinpad);
  }

  getDetailsEmergency() {
    this.emergencyService.getEmergencyById(this.idEmp).subscribe(res => {
      this.codigoSinpad = res.codigoSinpad
    });
  }

  get files() {
    return <FormArray>this.updateForm2A.get('files');
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
    return this.updateForm2A.value.files[index].nombre
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
    const file = this.updateForm2A.value.files[index]
    this.fileService.removeFile(file.archivo, file.ruta).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.files.removeAt(index)
    });
  }

  displayFiles(files: FileEmpadronamiento[]): void {
    for (let file of files) {
      const group = this.fb.group({
        id : file.id,
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

  detailsForm2a() {
    this.form2aService.getByIdForm2a(this.idEmp).subscribe((res: any) => {
      this.idEmergency = res.empadronamiento.idEmergencia;
      this.geoFormulario2ab = res.geometria;
      this.wrapGeometria.geometria = res.geometria.geometria;
      this.updateForm2A.controls['codeEmpFam'].setValue(res.empadronamiento.id);
      this.updateForm2A.controls['tieneSalud'].setValue(res.empadronamiento.tieneSalud);
      this.updateForm2A.controls['tieneMedioVida'].setValue(res.empadronamiento.tieneMedioVida);
      this.updateForm2A.controls['tieneVivienda'].setValue(res.empadronamiento.tieneVivienda);
      this.updateForm2A.controls['codeEmergency'].setValue(res.empadronamiento.idEmergencia);
      this.updateForm2A.controls['formNumber'].setValue(res.empadronamiento.numeroFormulario);
      this.updateForm2A.controls['idGroupPhenomenon'].setValue(res.empadronamiento.idGrupoPeligro);
      this.updateForm2A.controls['groupPhenomenon'].setValue(res.empadronamiento.grupoPeligro);
      this.updateForm2A.controls['idTypePhenomenon'].setValue(res.empadronamiento.idTipoPeligro);
      this.updateForm2A.controls['typePhenomenon'].setValue(res.empadronamiento.tipoPeligro);
      this.updateForm2A.controls['datetimeEvent'].setValue(moment(res.empadronamiento.fechaHoraEvento).format('YYYY-MM-DD HH:mm'));
      this.updateForm2A.controls['datetimeRegistration'].setValue(res.empadronamiento.fechaHoraEmpadronamiento);

      this.updateForm2A.controls['populatedCenter'].setValue(res.empadronamiento.codigoUbigeoCentroPoblado);
      this.updateForm2A.controls['namePopulatedCenter'].setValue(res.empadronamiento.centroPoblado);

      this.updateForm2A.controls['ubigeoCode'].setValue(res.empadronamiento.codigoUbigeo);
      this.updateForm2A.controls['ubigeoDesc'].setValue(res.empadronamiento.descripcionUbigeo);

      this.updateForm2A.controls['idSectorPlace'].setValue(res.empadronamiento.idTipoLugar.toString());
      this.updateForm2A.controls['sectorPlaceName'].setValue(res.empadronamiento.tipoLugar);
      this.updateForm2A.controls['sectorPlaceDesc'].setValue(res.empadronamiento.descripcionLugar);
      this.updateForm2A.controls['idSpecificPlace'].setValue(res.empadronamiento.idLugarEspecifico.toString());
      this.updateForm2A.controls['specificPlaceName'].setValue(res.empadronamiento.lugarEspecifico);
      this.updateForm2A.controls['specificPlaceDesc'].setValue(res.empadronamiento.descripcionLugarEspecifico);
      this.updateForm2A.controls['floorName'].setValue(res.empadronamiento.descripcionEdificioPisoDpto);
      this.updateForm2A.controls['idStreet'].setValue(res.empadronamiento.idTipoLugar2.toString());
      this.updateForm2A.controls['streetDesc'].setValue(res.empadronamiento.descripcionLugar2);
      this.updateForm2A.controls['streetName'].setValue(res.empadronamiento.tipoLugar2);
      this.quickEvalService.getPopulatedCenter(res.empadronamiento.codigoUbigeo).subscribe((res: any) => {
        this.getPopulatedCenter = res;
      });
      this.displayFiles(res.empadronamiento.archivos as FileEmpadronamiento[])
    })
  }

  tabChange(event: string){
    this.tabId = event;
  }

  getPopulated(event: any) {
    this.updateForm2A.controls['populatedCenter'].setValue(event.value);
    this.updateForm2A.controls['namePopulatedCenter'].setValue(event.triggerValue);
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
    this.updateForm2A.controls['idSpecificPlace'].setValue(event.value);
    this.updateForm2A.controls['specificPlaceName'].setValue(event.triggerValue);
  }

  changeKindPlaces(event: any) {
    this.updateForm2A.controls['idSectorPlace'].setValue(event.value);
    this.updateForm2A.controls['sectorPlaceName'].setValue(event.triggerValue);
  }

  changeStreet(event: any) {
    this.updateForm2A.controls['idStreet'].setValue(event.value);
    this.updateForm2A.controls['streetName'].setValue(event.triggerValue);
  }

  tabChangeAndUpdate(event: string) {
    this.tabId = event;

    let data: Empadronamiento = {
      id: this.updateForm2A.value.codeEmpFam,
      idEmergencia: this.updateForm2A.value.codeEmergency,
      numeroFormulario: this.updateForm2A.value.formNumber,
      tipoFormulario: 'EMPADRONAMIENTO',

      codigoUbigeo: this.updateForm2A.value.ubigeoCode,
      descripcionUbigeo: this.updateForm2A.value.ubigeoDesc,

      codigoUbigeoCentroPoblado: this.updateForm2A.value.populatedCenter,
      centroPoblado: this.updateForm2A.value.namePopulatedCenter,

      fechaHoraEvento: this.updateForm2A.value.datetimeEvent,
      fechaHoraEmpadronamiento: this.updateForm2A.value.datetimeRegistration,
      idTipoLugar: this.updateForm2A.value.idSectorPlace,
      tipoLugar: this.updateForm2A.value.sectorPlaceName,
      descripcionLugar: this.updateForm2A.value.sectorPlaceDesc,
      idLugarEspecifico: this.updateForm2A.value.idSpecificPlace,
      lugarEspecifico: this.updateForm2A.value.specificPlaceName,
      descripcionLugarEspecifico: this.updateForm2A.value.specificPlaceDesc,
      idTipoLugar2: this.updateForm2A.value.idStreet,
      tipoLugar2: this.updateForm2A.value.streetName,
      descripcionLugar2: this.updateForm2A.value.streetDesc,
      descripcionEdificioPisoDpto: this.updateForm2A.value.floorName,
      idTipoPeligro: this.updateForm2A.value.idTypePhenomenon,
      tipoPeligro: this.updateForm2A.value.typePhenomenon,
      idGrupoPeligro: this.updateForm2A.value.idGroupPhenomenon,
      grupoPeligro: this.updateForm2A.value.groupPhenomenon,
      fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      habilitado: 1,
      idRegistradoPor: 0,
      registradoPor: '',
      idRevisadoPor: null,
      revisadoPor: null,
      fechaHoraRevisado: null,
      idAprobadoPor: null,
      aprobadoPor: null,
      fechaHoraAprobado: null,
      //archivos: this.files.value
    }

    let idGeometria = (this.geoFormulario2ab.id != null)? this.geoFormulario2ab.id : null;
    let geometry: GeoFormulario2ab = {
      id:  idGeometria,
      idEmpadronamiento: this.idEmp,
      geometria: this.wrapGeometria.geometria as any
    }

    const dto: DtoEmpadronamiento = {
      empadronamiento: data,
      geometria: geometry
    }
    this.form2aService.createForm2a(dto).subscribe((res: any) => {
      this.geoFormulario2ab = res.geometria;
      this.alertService.toastSuccess(`${res.message}`);
    });
  }

  back() {
    this.route.navigate([`/quick-evaluation/list/${this.idEmergency}`]).then(() => { });
  }

  save() {
    this.route.navigate([`/quick-evaluation/list/${this.idEmergency}`]).then(() => {});
  }

  getFamilyGroup(id: number){
    const data = {
      idEmpadronamiento: id
    }
    this.familyGroupService.getFamilyGroup(data).subscribe((res: any) => {
      this.familyGroup = res.grupoFamiliarList;
    })
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
      idFamilia: id
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

  deleteFamily(id: number) {
    this.alert.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar este registro', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.form2aService.deleteEmpFamily(id).subscribe(res => {
            this.alert.toastSuccess(`${res.message}`);
            this.getFamilyGroup(this.idEmp);
          })
        }
      }
    );
  }

  updateFiles() {
    const data: DtoEmpadronamiento = {
      empadronamiento: {
        id: this.updateForm2A.value.codeEmpFam,
        archivos: this.files.value
      }
    }
    this.form2aService.createForm2a(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.route.navigate([`/quick-evaluation/list/${this.idEmergency}`]).then(() => {});
    });
  }

  updateFiles1() {
    this.route.navigate([`/quick-evaluation/list/${this.idEmergency}`]).then(() => {});
  }
}
