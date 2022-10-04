import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { MasterTablesService } from 'src/app/shared/services/master-tables.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FamilyMembers } from 'src/app/shared/models/forms.model';
import * as moment from 'moment';
import { ModalMvComponent } from '../modal-mv/modal-mv.component';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';

@Component({
  selector: 'app-modal-int-fam',
  templateUrl: './modal-int-fam.component.html',
  styleUrls: ['./modal-int-fam.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalIntFamComponent implements OnInit {

  public createIntFam: FormGroup;
  modalsNumber = 0;

  public typeDocuments: any;
  public form2b: any;
  public familyMembers: any;
  public isUpdate: boolean = false;
  public isShowModal: boolean = false;
  public isWomanDisable: boolean = false;
  public disabled: boolean = false;

  public PERMISOS = PERMISOS;

  @Input() fromEditParentFamily: any;
  @Input() dataFromMv: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public form2aService: Form2aService,
    private master: MasterTablesService,
    private alertService: AlertService,
    private modalService: NgbModal,
    public authService: AuthService
  ) {
    this.createIntFam = this.fb.group({
      idFamily: [],
      typeIntegral: [''],
      idTypeDocument: ['', [Validators.required]],
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
      weeks: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });

    this.modalService.activeInstances.subscribe(list => {
      this.modalsNumber = list.length;
    })
  }

  ngOnInit(): void {
    this.getTypeDocuments();
    this.getForm2B();
  }

  createFamilyInfo() {
    const data: FamilyMembers = {
      tipoIntegrante: 'DEPENDIENTE',
      idTipoDocumento: this.createIntFam.value.idTypeDocument,
      tipoDocumento: this.createIntFam.value.typeDocument,
      numeroDocumento: this.createIntFam.value.numberDocument,
      apellidos: this.createIntFam.value.surname,
      nombres: this.createIntFam.value.lastNames,
      fechaNacimiento: moment(this.createIntFam.value.birthDate).format('YYYY-MM-DD'),
      edad: this.createIntFam.value.yearAndMonth,
      tipoSexo: this.createIntFam.value.sex,
      direccion: this.createIntFam.value.address,
      lote: this.createIntFam.value.lotNumber,
      gestante: this.createIntFam.value.pregnantWomen,
      semanaGestacion: this.createIntFam.value.weeks,
      habilitado: 1,
      fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      familia: {
        id: 1
      }
    }

    this.form2aService.createFamilyInfo(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      //this.getFamilyMembers(this.fromParentVivFam.ID);
      //this.resetInput();
      this.isUpdate = true;
    });
  }

  updateFamilyInfo() {
    const d: FamilyMembers = {
      id: this.createIntFam.value.idFamily,
      tipoIntegrante: 'DEPENDIENTE',
      idTipoDocumento: this.createIntFam.value.idTypeDocument,
      tipoDocumento: this.createIntFam.value.typeDocument,
      numeroDocumento: this.createIntFam.value.numberDocument,
      apellidos: this.createIntFam.value.surname,
      nombres: this.createIntFam.value.lastNames,
      fechaNacimiento: moment(this.createIntFam.value.birthDate).format('YYYY-MM-DD'),
      edad: this.createIntFam.value.yearAndMonth,
      tipoSexo: this.createIntFam.value.sex,
      direccion: this.createIntFam.value.address,
      lote: this.createIntFam.value.lotNumber,
      gestante: this.createIntFam.value.pregnantWomen,
      semanaGestacion: this.createIntFam.value.weeks,
      habilitado: 1,
      fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      familia: {
        id: 1
      }
    }

    this.form2aService.createFamilyInfo(d).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      //this.getFamilyMembers(this.fromParentVivFam.ID);
      this.resetInput();
      this.isUpdate = false;
    });
  }

  deleteFamily(id: number) {
    this.alertService.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar este registro', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.form2aService.deleteFamily(id).subscribe(res => {
            this.alertService.toastSuccess(`${res.message}`);
            //this.getFamilyMembers(this.fromParentVivFam.ID);
          })
        }
      }
    );
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
    this.createIntFam.controls['typeDocument'].setValue(val);
  }

  getFamilyMembers(id: number) {
    this.form2aService.listFamilyMembers(id).subscribe((res: any[]) => {
      this.familyMembers = res;
    })
  }

  closeModal() {
    this.activeModal.close();
  }

  modalForm2b(id: number) {
    this.isShowModal = true;
    const modalRef = this.modalService.open(ModalMvComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: true,
      windowClass: 'modal',
      backdrop: 'static',
      backdropClass: ''
    });
    modalRef.componentInstance.fromParentMv = id;
    modalRef.result.then((res) => {
    }, (reason) => {

    })
  }

  showUpdate(id: number) {
    this.isUpdate = true;
    this.form2aService.getFamily(id).subscribe(res => {
      this.createIntFam.controls['idFamily'].setValue(res.id);
      this.createIntFam.controls['typeIntegral'].setValue(res.tipoIntegrante);
      this.createIntFam.controls['format2B'].setValue(res.tipoFormulario);
      this.createIntFam.controls['idTypeDocument'].setValue(res.idTipoDocumento);
      this.createIntFam.controls['numberDocument'].setValue(res.numeroDocumento);
      this.createIntFam.controls['surname'].setValue(res.apellidos);
      this.createIntFam.controls['lastNames'].setValue(res.nombres);
      this.createIntFam.controls['birthDate'].setValue(moment(res.fechaNacimiento).format('YYYY-MM-DD'));
      this.createIntFam.controls['sex'].setValue(res.tipoSexo);
      this.createIntFam.controls['selectYearMonth'].setValue(res.idEdad);
      this.createIntFam.controls['yearAndMonth'].setValue(res.edad);
      this.createIntFam.controls['conditions'].setValue(res.tipoCondicion);
      this.createIntFam.controls['idPersonalInjury'].setValue(res.idTipoDanoPersonal);
      this.createIntFam.controls['pregnantWomen'].setValue(res.gestante);
      this.createIntFam.controls['weeks'].setValue(res.semanaGestante);
      this.createIntFam.controls['idPersonDisability'].setValue(res.idTipoDiscapacidad);
      this.createIntFam.controls['idChronicIllness'].setValue(res.idTipoEnfermedadCronica);
      this.createIntFam.controls['typeDocument'].setValue(res.tipoDocumento);
      this.createIntFam.controls['personDisability'].setValue(res.tipoDiscapacidad);
      this.createIntFam.controls['chronicIllness'].setValue(res.tipoEnfermedadCronica);
    })
  }

  resetInput() {
    this.createIntFam.controls['typeIntegral'].reset('');
    this.createIntFam.controls['format2B'].reset('');
    this.createIntFam.controls['idTypeDocument'].reset('');
    this.createIntFam.controls['typeDocument'].reset('');
    this.createIntFam.controls['numberDocument'].reset('');
    this.createIntFam.controls['surname'].reset('');
    this.createIntFam.controls['lastNames'].reset('');
    this.createIntFam.controls['birthDate'].reset('');
    this.createIntFam.controls['sex'].reset('');
    this.createIntFam.controls['selectYearMonth'].reset('');
    this.createIntFam.controls['yearAndMonth'].reset('');
    this.createIntFam.controls['idPersonalInjury'].reset('');
    this.createIntFam.controls['personalInjury'].reset('');
    this.createIntFam.controls['pregnantWomen'].reset('');
    this.createIntFam.controls['weeks'].reset('');
    this.createIntFam.controls['idPersonDisability'].reset('');
    this.createIntFam.controls['personDisability'].reset('');
    this.createIntFam.controls['idChronicIllness'].reset('');
    this.createIntFam.controls['chronicIllness'].reset('');
  }

  isCalculateAge(event: any) {
    const td = new Date();
    const myBirthDay = new Date(moment(event).format('YYYY/MM/DD'));
    let age = td.getFullYear() - myBirthDay.getFullYear();
    const difMonth = td.getMonth() - myBirthDay.getMonth();
    if (difMonth < 0 || (difMonth === 0 && td.getDate() < myBirthDay.getDate())) {
      age--;
    }
    return this.createIntFam.controls['yearAndMonth'].setValue(age);
  }

  isWoman(event: any) {
    const select = event.target;
    if (select.options[select.selectedIndex].getAttribute('name') == 'F') {
      this.isWomanDisable = true;
    } else {
      this.isWomanDisable = false;
      this.createIntFam.controls['pregnantWomen'].reset('');
    }
  }

  isPregnantWomen(event: any) {
    const select = event.target;
    if (select.options[select.selectedIndex].getAttribute('name') == 'SI') {
      this.disabled = true;
    } else {
      this.disabled = false;
      this.createIntFam.controls['weeks'].reset('');
    }
  }

}
