import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { MasterTablesService } from 'src/app/shared/services/master-tables.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FamilyMembers } from 'src/app/shared/models/forms.model';
import * as moment from 'moment';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';

@Component({
  selector: 'app-modal-edit-fam',
  templateUrl: './modal-edit-fam.component.html',
  styleUrls: ['./modal-edit-fam.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalEditFamComponent implements OnInit {

  public updateForm: FormGroup;
  public disabled: boolean = false;
  public isWomanDisable: boolean = false;
  public idFamily: any;
  public idEmp: any;
  public familyGroup: any;

  public PERMISOS = PERMISOS;

  public typeDocuments: any;
  public form2b: any;
  public familyMembers: any;
  public isUpdate: boolean = false;

  @Input() fromEditParentFamily: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public form2aService: Form2aService,
    private master: MasterTablesService,
    private alertService: AlertService,
    private modalService: NgbModal,
    public authService:  AuthService
  ) {
    this.updateForm = this.fb.group({
      idTypeDocument: ['', [Validators.required]],
      idFamInt: [''],
      typeInt: ['', [Validators.required]],
      format2B: [''],
      type: [''],
      typeDocument: ['', [Validators.required]],
      numberDocument: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      yearAndMonth: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      address: [''],
      lotNumber: [''],
      pregnantWomen: [''],
      weeks: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  ngOnInit(): void {
    this.getTypeDocuments();
    this.getForm2B();
    this.idEmp = this.fromEditParentFamily.idEmpadrona;
    this.idFamily = this.fromEditParentFamily.idFamilia;
    this.getFamily(this.idFamily);
  }

  createFamilyInfo() {
    if (this.updateForm.value.type != "JEFE") {
      // TODO: Crear dependiente
      const dep: FamilyMembers = {
        medioVida: this.updateForm.value.format2B,
        tipoIntegrante: this.updateForm.value.typeInt,
        idTipoDocumento: this.updateForm.value.idTypeDocument,
        tipoDocumento: this.updateForm.value.typeDocument,
        numeroDocumento: this.updateForm.value.numberDocument,
        apellidos: this.updateForm.value.surname,
        nombres: this.updateForm.value.lastNames,
        fechaNacimiento: moment(this.updateForm.value.birthDate).format('YYYY-MM-DD'),
        edad: this.updateForm.value.yearAndMonth,
        tipoSexo: this.updateForm.value.sex,
        direccion: this.updateForm.value.address,
        lote: this.updateForm.value.lotNumber,
        gestante: this.updateForm.value.pregnantWomen,
        semanaGestacion: this.updateForm.value.weeks,
        habilitado: 1,
        fechaHoraRegistrado: moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
        familia: {
          id: this.idFamily,
        }
      }

      this.form2aService.createFamilyInfo(dep).subscribe((res: any) => {
        this.alertService.toastSuccess(`${res.message}`);
        this.resetInput();
        this.getFamily(this.idFamily);
      });
    } else {
      // TODO: Crear Jefe
      const jef: FamilyMembers = {
        medioVida: this.updateForm.value.format2B,
        tipoIntegrante: this.updateForm.value.typeInt,
        idTipoDocumento: this.updateForm.value.idTypeDocument,
        tipoDocumento: this.updateForm.value.typeDocument,
        numeroDocumento: this.updateForm.value.numberDocument,
        apellidos: this.updateForm.value.surname,
        nombres: this.updateForm.value.lastNames,
        fechaNacimiento: moment(this.updateForm.value.birthDate).format('YYYY-MM-DD'),
        edad: this.updateForm.value.yearAndMonth,
        tipoSexo: this.updateForm.value.sex,
        direccion: this.updateForm.value.address,
        lote: this.updateForm.value.lotNumber,
        gestante: this.updateForm.value.pregnantWomen,
        semanaGestacion: this.updateForm.value.weeks,
        habilitado: 1,
        fechaHoraRegistrado: moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
        familia: {
          empadronamiento: {
            id: this.idEmp
          },
          habilitado: 1
        }
      }

      this.form2aService.createFamilyInfo(jef).subscribe((res: any) => {
        this.alertService.toastSuccess(`${res.message}`);
        this.resetInput();
        this.getFamily(this.idFamily);
      });
    }
  }

  resetInput() {
    this.updateForm.controls['typeInt'].reset('');
    this.updateForm.controls['format2B'].reset('');
    this.updateForm.controls['idTypeDocument'].reset('');
    this.updateForm.controls['typeDocument'].reset('');
    this.updateForm.controls['numberDocument'].reset('');
    this.updateForm.controls['surname'].reset('');
    this.updateForm.controls['lastNames'].reset('');
    this.updateForm.controls['birthDate'].reset('');
    this.updateForm.controls['sex'].reset('');
    this.updateForm.controls['address'].reset('');
    this.updateForm.controls['lotNumber'].reset('');
    this.updateForm.controls['yearAndMonth'].reset('');
    this.updateForm.controls['pregnantWomen'].reset('');
    this.updateForm.controls['weeks'].reset('');
  }

  getTypeDocuments() {
    this.master.getTypeDocuments().subscribe(res => {
      this.typeDocuments = res;
    });
  }

  getForm2B() {
    this.master.getForm2b().subscribe(res => {
      this.form2b = res;
    });
  }

  changeTypeDocument(event: any) {
    const select = event.target;
    const val = select.options[select.selectedIndex].getAttribute('name');
    this.updateForm.controls['typeDocument'].setValue(val);
  }

  getFamilyMembers(id: number) {
    this.form2aService.listFamilyMembers(id).subscribe((res: any[]) => {
      this.familyMembers = res;
    })
  }

  closeModal() {
    this.modalService.dismissAll(this.idEmp);
  }

  updateFamilyInfo() {
    if (this.updateForm.value.type != "JEFE") {
      // TODO: Update dependiente
      const dep: FamilyMembers = {
        id: this.updateForm.value.idFamInt,
        medioVida: this.updateForm.value.format2B,
        tipoIntegrante: this.updateForm.value.typeInt,
        idTipoDocumento: this.updateForm.value.idTypeDocument,
        tipoDocumento: this.updateForm.value.typeDocument,
        numeroDocumento: this.updateForm.value.numberDocument,
        apellidos: this.updateForm.value.surname,
        nombres: this.updateForm.value.lastNames,
        fechaNacimiento: moment(this.updateForm.value.birthDate).format('YYYY-MM-DD'),
        edad: this.updateForm.value.yearAndMonth,
        tipoSexo: this.updateForm.value.sex,
        direccion: this.updateForm.value.address,
        lote: this.updateForm.value.lotNumber,
        gestante: this.updateForm.value.pregnantWomen,
        semanaGestacion: this.updateForm.value.weeks,
        habilitado: 1,
        fechaHoraRegistrado: moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
        familia: {
          id: this.idFamily
        }
      }

      this.form2aService.createFamilyInfo(dep).subscribe((res: any) => {
        this.alertService.toastSuccess(`${res.message}`);
        this.resetInput();
        this.getFamily(this.idFamily);
        this.isUpdate = false;
      });
    } else {
      //TODO: Update Jefe
      const d: FamilyMembers = {
        id: this.updateForm.value.idFamInt,
        medioVida: this.updateForm.value.format2B,
        tipoIntegrante: this.updateForm.value.typeIntegral,
        idTipoDocumento: this.updateForm.value.idTypeDocument,
        tipoDocumento: this.updateForm.value.typeDocument,
        numeroDocumento: this.updateForm.value.numberDocument,
        apellidos: this.updateForm.value.surname,
        nombres: this.updateForm.value.lastNames,
        fechaNacimiento: moment(this.updateForm.value.birthDate).format('YYYY-MM-DD'),
        tipoSexo: this.updateForm.value.sex,
        direccion: this.updateForm.value.address,
        lote: this.updateForm.value.lotNumber,
        edad: this.updateForm.value.yearAndMonth,
        gestante: this.updateForm.value.pregnantWomen,
        semanaGestacion: this.updateForm.value.weeks,
        habilitado: 1,
        fechaHoraRegistrado: moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
        familia: {
          empadronamiento: {
            id: this.idEmp
          },
          habilitado: 1
        }
      }

      this.form2aService.createFamilyInfo(d).subscribe((res: any) => {
        this.alertService.toastSuccess(`${res.message}`);
        this.resetInput();
        this.getFamily(this.idFamily);
        this.isUpdate = false;
      });
    }
  }

  deleteFamily(id: number) {
    this.alertService.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar este registro', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.form2aService.deleteFamily(id).subscribe(res => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getFamily(this.idFamily);
          })
        }
      }
    );
  }

  showUpdate(data: any) {
    this.isUpdate = true;
    this.updateForm.controls['idFamInt'].setValue(data.id);
    this.updateForm.controls['typeInt'].setValue(data.tipoIntegrante);
    this.updateForm.controls['format2B'].setValue(data.medioVida);
    this.updateForm.controls['idTypeDocument'].setValue(data.idTipoDocumento);
    this.updateForm.controls['numberDocument'].setValue(data.numeroDocumento);
    this.updateForm.controls['surname'].setValue(data.apellidos);
    this.updateForm.controls['lastNames'].setValue(data.nombres);
    this.updateForm.controls['birthDate'].setValue(moment(data.fechaNacimiento).format('MM-DD-YYYY'));
    this.updateForm.controls['sex'].setValue(data.tipoSexo);
    this.updateForm.controls['yearAndMonth'].setValue(data.edad);
    this.updateForm.controls['address'].setValue(data.direccion);
    this.updateForm.controls['lotNumber'].setValue(data.lote);
    this.updateForm.controls['pregnantWomen'].setValue(data.gestante);
    this.updateForm.controls['weeks'].setValue(data.semanaGestacion);
    this.updateForm.controls['typeDocument'].setValue(data.tipoDocumento);
  }

  isPregnantWomen(event: any) {
    const select = event.target;
    if (select.options[select.selectedIndex].getAttribute('name') == 'SI') {
      this.disabled = true;
    } else {
      this.disabled = false;
      this.updateForm.controls['weeks'].reset('');
    }
  }

  isWoman(event: any) {
    const select = event.target;
    if (select.options[select.selectedIndex].getAttribute('name') == 'F') {
      this.isWomanDisable = true;
    } else {
      this.isWomanDisable = false;
      this.updateForm.controls['pregnantWomen'].reset('');
    }
  }

  isCalculateAge(event: any) {
    const tdy = new Date();
    const myBirthDay = new Date(moment(event).format('YYYY/MM/DD'));
    let age = tdy.getFullYear() - myBirthDay.getFullYear();
    const difMonth = tdy.getMonth() - myBirthDay.getMonth();
    if (difMonth < 0 || (difMonth === 0 && tdy.getDate() < myBirthDay.getDate())) {
      age--;
    }
    return this.updateForm.controls['yearAndMonth'].setValue(age);
  }

  isTypeInt(event: any) {
    const select = event.target;
    const val = select.options[select.selectedIndex].getAttribute('name');
    if (val != "JEFE") {
      this.updateForm.controls['type'].setValue('DEPENDIENTE');
    } else {
      this.updateForm.controls['type'].setValue('JEFE');
    }
  }

  getFamily(id: number){
    this.form2aService.getFormFamily(id).subscribe((res: any) => {
      this.familyGroup = res;
    })
  }
}
