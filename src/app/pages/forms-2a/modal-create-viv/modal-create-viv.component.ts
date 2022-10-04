import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterTablesService } from 'src/app/shared/services/master-tables.service';
import { Form2aViv } from 'src/app/shared/models/forms.model';
import * as moment from 'moment';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-create-viv',
  templateUrl: './modal-create-viv.component.html',
  styleUrls: ['./modal-create-viv.component.scss']
})
export class ModalCreateVivComponent implements OnInit {

  public livingPlaceForm: FormGroup;
  @Input() fromCreateLotParent: any;

  public ceilings: any;
  public walls: any;
  public floors: any;

  constructor(
    private fb: FormBuilder,
    private master: MasterTablesService,
    public form2aService: Form2aService,
    private alertService: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) {
    this.livingPlaceForm = this.fb.group({
      address: [''],
      lotNumber: [''],
      ownPossession: ['', [Validators.required]],
      installationConditionOfUse: ['', [Validators.required]],
      area: [''],
      condition: [''],
      idCeiling: [],
      ceiling: [''],
      idWalls: [],
      walls: [''],
      idFloor: [],
      floor: ['']
    })
  }

  ngOnInit(): void {
    this.getCeiling();
    this.getWall();
    this.getFloor();
  }

  createHousingInfo() {
    const data: Form2aViv = {
      codigoSinpad: this.fromCreateLotParent.codeSinpad,
      idEmpadrona: this.fromCreateLotParent.idEmpadrona,
      direccion: this.livingPlaceForm.value.address,
      numeroLote: this.livingPlaceForm.value.lotNumber != '' ? this.livingPlaceForm.value.lotNumber : 'S/N',
      tenenciaPropia: this.livingPlaceForm.value.ownPossession,
      desCondicionUso: this.livingPlaceForm.value.installationConditionOfUse,
      desCondicionViv: this.livingPlaceForm.value.condition,
      area: this.livingPlaceForm.value.area,
      idTecho: this.livingPlaceForm.value.idCeiling,
      desTecho: this.livingPlaceForm.value.ceiling,
      idPared: this.livingPlaceForm.value.idWalls,
      desPared: this.livingPlaceForm.value.walls,
      idPiso: this.livingPlaceForm.value.idFloor,
      desPiso: this.livingPlaceForm.value.floor,
      habilitado: 1,
      fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }

    this.form2aService.createHousingInfo(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.modalService.dismissAll('openLivingPlace');
      this.resetInput();
    });
  }

  getCeiling() {
    this.master.getCeiling().subscribe(res => {
      this.ceilings = res;
    });
  }

  getWall() {
    this.master.getWall().subscribe(res => {
      this.walls = res;
    });
  }

  getFloor() {
    this.master.getFloor().subscribe(res => {
      this.floors = res;
    });
  }

  changeCeiling(event: any) {
    this.livingPlaceForm.controls['ceiling'].setValue(event.triggerValue);
  }

  changeWalls(event: any) {
    this.livingPlaceForm.controls['walls'].setValue(event.triggerValue);
  }

  changeFloor(event: any) {
    this.livingPlaceForm.controls['floor'].setValue(event.triggerValue);
  }

  closeModal() {
    this.activeModal.close();
  }

  resetInput() {
    this.livingPlaceForm.controls['address'].reset('');
    this.livingPlaceForm.controls['lotNumber'].reset('');
    this.livingPlaceForm.controls['area'].reset('');
    this.livingPlaceForm.controls['ownPossession'].reset('');
    this.livingPlaceForm.controls['installationConditionOfUse'].reset('');
    this.livingPlaceForm.controls['condition'].reset('');
    this.livingPlaceForm.controls['idCeiling'].reset('');
    this.livingPlaceForm.controls['ceiling'].reset('');
    this.livingPlaceForm.controls['idWalls'].reset('');
    this.livingPlaceForm.controls['walls'].reset('');
    this.livingPlaceForm.controls['idFloor'].reset('');
    this.livingPlaceForm.controls['floor'].reset('');
  }
}
