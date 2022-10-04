import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MasterTablesService } from 'src/app/shared/services/master-tables.service';
import { Form2aViv } from 'src/app/shared/models/forms.model';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

@Component({
  selector: 'app-modal-edit-viv',
  templateUrl: './modal-edit-viv.component.html',
  styleUrls: ['./modal-edit-viv.component.scss']
})
export class ModalEditVivComponent implements OnInit {

  public updateForm: FormGroup;
  public ceilings: any;
  public walls: any;
  public floors: any;
  public barrrio: any;
  public calle: any;

  @Input() fromEditParent: any;

  constructor(
    private fb: FormBuilder,
    private master: MasterTablesService,
    public form2a: Form2aService,
    private alertService: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) {
    this.updateForm = this.fb.group({
      codeViv: [],
      codeSinpad: [],
      idEmpadrona: [],
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
      floor: [''],
      dateUpdate: [''],
    });
  }

  ngOnInit(): void {
    this.getCeiling();
    this.getWall();
    this.getFloor();
    this.getDetailsViv();
  }

  updateHousingInfo() {
    const viv: Form2aViv = {
      id: this.updateForm.value.codeViv,
      codigoSinpad: this.updateForm.value.codeSinpad,
      idEmpadrona: this.updateForm.value.idEmpadrona,
      direccion: this.updateForm.value.address,
      numeroLote: this.updateForm.value.lotNumber != '' ? this.updateForm.value.lotNumber : 'S/N',
      tenenciaPropia: this.updateForm.value.ownPossession,
      desCondicionUso: this.updateForm.value.installationConditionOfUse,
      desCondicionViv: this.updateForm.value.condition,
      area: this.updateForm.value.area,
      idTecho: this.updateForm.value.idCeiling,
      desTecho: this.updateForm.value.ceiling,
      idPared: this.updateForm.value.idWalls,
      desPared: this.updateForm.value.walls,
      idPiso: this.updateForm.value.idFloor,
      desPiso: this.updateForm.value.floor,
      habilitado: 1,
      fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }

    this.form2a.createHousingInfo(viv).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.modalService.dismissAll('closeModal');
    });
  }

  getDetailsViv() {
    this.form2a.getByIdViv(this.fromEditParent.id).subscribe(res => {
      /*this.updateForm.controls['codeViv'].setValue(res.id);
      this.updateForm.controls['codeSinpad'].setValue(res.codigoSinpad);
      this.updateForm.controls['idEmpadrona'].setValue(res.idEmpadrona);
      this.updateForm.controls['lotNumber'].setValue(res.numeroLote);
      this.updateForm.controls['ownPossession'].setValue(res.tenenciaPropia);
      this.updateForm.controls['installationConditionOfUse'].setValue(res.desCondicionUso);
      this.updateForm.controls['condition'].setValue(res.desCondicionViv);
      this.updateForm.controls['idCeiling'].setValue(res.idTecho);
      this.updateForm.controls['ceiling'].setValue(res.desTecho);
      this.updateForm.controls['idWalls'].setValue(res.idPared);
      this.updateForm.controls['walls'].setValue(res.desPared);
      this.updateForm.controls['idFloor'].setValue(res.idPiso);
      this.updateForm.controls['floor'].setValue(res.desPiso);
      this.updateForm.controls['dateUpdate'].setValue(res.fechaHoraRegistrado);*/

      this.updateForm.controls['codeViv'].setValue(res.id);
      this.updateForm.controls['codeSinpad'].setValue(res.codigoSinpad);
      this.updateForm.controls['idEmpadrona'].setValue(res.idEmpadrona);
      this.updateForm.controls['address'].setValue(res.direccion);
      this.updateForm.controls['lotNumber'].setValue(res.numeroLote);
      this.updateForm.controls['ownPossession'].setValue(res.tenenciaPropia);
      this.updateForm.controls['installationConditionOfUse'].setValue(res.desCondicionUso);
      this.updateForm.controls['area'].setValue(res.area);
      this.updateForm.controls['condition'].setValue(res.desCondicionViv);
      this.updateForm.controls['idCeiling'].setValue(res.idTecho);
      this.updateForm.controls['ceiling'].setValue(res.desTecho);
      this.updateForm.controls['idWalls'].setValue(res.idPared);
      this.updateForm.controls['walls'].setValue(res.desPared);
      this.updateForm.controls['idFloor'].setValue(res.idPiso);
      this.updateForm.controls['floor'].setValue(res.desPiso);
      this.updateForm.controls['dateUpdate'].setValue(res.fechaHoraRegistrado);
    })
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
    this.updateForm.controls['ceiling'].setValue(event.triggerValue);
  }

  changeWalls(event: any) {
    this.updateForm.controls['walls'].setValue(event.triggerValue);
  }

  changeFloor(event: any) {
    this.updateForm.controls['floor'].setValue(event.triggerValue);
  }

  closeModal() {
    this.activeModal.close();
  }
}
