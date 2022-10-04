import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { Form2bMVida } from 'src/app/shared/models/forms.model';
import * as moment from 'moment';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { ModalEditFamComponent } from '../modal-edit-fam/modal-edit-fam.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';

@Component({
  selector: 'app-modal-mv',
  templateUrl: './modal-mv.component.html',
  styleUrls: ['./modal-mv.component.scss']
})
export class ModalMvComponent implements OnInit {

  @Input() fromParentMv: any;
  public createFormMv: FormGroup;
  public mv: any;
  @ViewChild(ModalEditFamComponent) child: any;
  public PERMISOS = PERMISOS;

  constructor(
    private fb: FormBuilder,
    public form2aService: Form2aService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal,
    public authService:  AuthService
  ) {
    this.createFormMv = this.fb.group({
      lastName: [''],
      name: [''],
      apName: [''],
      numberDocument: [''],
      typeDocument: [''],
      codeSinpad: [''],
      codeFam: [''],
      idWayOfLife: ['', [Validators.required]],
      wayOfLife: ['', [Validators.required]],
      amountAffected: ['', [Validators.required]],
      idKindProduct: ['', [Validators.required]],
      kindProduct: ['', [Validators.required]],
      lastAmount: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getDataFamily();
    this.getForm2bViv();
  }

  getForm2bViv() {
    this.form2aService.getForm2bViv(this.fromParentMv).subscribe(res => {
      this.mv = res;
    })
  }

  getDataFamily() {
    this.form2aService.getFamily(this.fromParentMv).subscribe(res => {
      this.createFormMv.controls['lastName'].setValue(`${res.nombres} ${res.apellidos}`);
      this.createFormMv.controls['numberDocument'].setValue(res.numeroDocumento);
      this.createFormMv.controls['name'].setValue(res.nombres);
      this.createFormMv.controls['apName'].setValue(res.apellidos);
      this.createFormMv.controls['typeDocument'].setValue(res.tipoDocumento);
      this.createFormMv.controls['codeSinpad'].setValue(res.codigoSinpad);
      this.createFormMv.controls['codeFam'].setValue(res.id);
    })
  }

  createForm2b() {
    const data: Form2bMVida = {
      codigoSinpad: this.createFormMv.value.codeSinpad,
      idFamInt: this.createFormMv.value.codeFam,
      apellidos: this.createFormMv.value.apName,
      nombres: this.createFormMv.value.name,
      tipoDocumento: this.createFormMv.value.typeDocument,
      numeroDocumento: this.createFormMv.value.numberDocument,
      idTipoMedioVida: this.createFormMv.value.idWayOfLife,
      tipoMedioVida: this.createFormMv.value.wayOfLife,
      cantidadAfectada: this.createFormMv.value.amountAffected,
      idProductoEspecie: this.createFormMv.value.idKindProduct,
      productoEspecie: this.createFormMv.value.kindProduct,
      cantidadPerdida: this.createFormMv.value.lastAmount,
      habilitado: 1,
      fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }

    this.form2aService.createFamilyMv(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.resetInput();
      this.getForm2bViv();
    });
  }

  onChangeWayOfLife(event: any) {
    this.createFormMv.controls['wayOfLife'].setValue(event.triggerValue);
  }

  onChangeKindProd(event: any) {
    this.createFormMv.controls['kindProduct'].setValue(event.triggerValue);
  }

  closeModal() {
    this.activeModal.close();
  }

  deleteMv(id: number) {
    this.alertService.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar este registro', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.form2aService.deleteFamMV(id).subscribe(res => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getForm2bViv();
          })
        }
      }
    );
  }

  resetInput() {
    this.createFormMv.controls['idWayOfLife'].reset('');
    this.createFormMv.controls['amountAffected'].reset('');
    this.createFormMv.controls['idKindProduct'].reset('');
    this.createFormMv.controls['lastAmount'].reset('');
    this.createFormMv.controls['wayOfLife'].reset('');
    this.createFormMv.controls['kindProduct'].reset('');
  }
}
