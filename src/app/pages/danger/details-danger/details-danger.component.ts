import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { DangerService } from '../../../shared/services/danger.service';
import { DangerGroupService } from '../../../shared/services/danger-group.service';
import { TYPE_ALERT } from '../../../shared/services/config';
import { Danger } from '../../../shared/models/danger.model';

@Component({
  selector: 'app-details-danger',
  templateUrl: './details-danger.component.html',
  styleUrls: ['./details-danger.component.scss']
})
export class DetailsDangerComponent implements OnInit {

  public updateFormDanger: FormGroup;
  public isShowButton: boolean = false;
  public isShowInputUpdate: boolean = false;
  public counter: number = 0;
  public counter1: number = 0;
  private isId!: any;
  public detailsDanger!: any;
  public selectGrupoPeligro: any;
  public nomGrupoPeligro: string = '';
  public desGrupoPeligro: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private params: ActivatedRoute,
    private alert: AlertService,
    private dangerService: DangerService,
    private dangerGroupService: DangerGroupService
  ) { 
    this.updateFormDanger = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      idGrupoPeligro: ['', [Validators.required]],
      nombreGrupoPeligro: ['', [Validators.required]],
      descripcionGrupoPeligro: ['', [Validators.required]]
    }); 
  }

  ngOnInit(): void {
    this.isId = this.params.snapshot.paramMap.get('id');
    this.getDetailsDanger();
    this.getDanger();
  }

  getDetailsDanger() {
    this.dangerService.getDangerById(this.isId).subscribe(res => {
      this.detailsDanger = res;
      this.updateFormDanger.controls['id'].setValue(res.id);
      this.updateFormDanger.controls['nombre'].setValue(res.nombre);
      this.updateFormDanger.controls['descripcion'].setValue(res.descripcion);
      this.updateFormDanger.controls['idGrupoPeligro'].setValue(res.idGrupoPeligro);
      this.updateFormDanger.controls['nombreGrupoPeligro'].setValue(res.nombreGrupoPeligro);
      this.updateFormDanger.controls['descripcionGrupoPeligro'].setValue(res.descripcionGrupoPeligro);
    });
  }

  updateDanger() {
    const dataU: Danger = {
      id: this.updateFormDanger.value.id,
      nombre: this.updateFormDanger.value.nombre,
      descripcion: this.updateFormDanger.value.descripcion,
      idGrupoPeligro: this.updateFormDanger.value.idGrupoPeligro,
      nombreGrupoPeligro: this.updateFormDanger.value.nombreGrupoPeligro,
      descripcionGrupoPeligro: this.updateFormDanger.value.descripcionGrupoPeligro,
    }
    
    this.alert.questionAlertConfirm(
      '¿Está seguro de actualizar el peligro?',
      '',
      'Si, Actualizar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.dangerService.updateDanger(dataU).subscribe((res: any) => {
            this.alert.toastSuccess('Actualizado Peligro Correctamente');
            this.router.navigate([`/administracion/peligro`]).then(() => {});
            this.isShowButton = false;
            this.isShowInputUpdate = false;
            this.getDetailsDanger();
          });
        }
      }
    );
  }

  onKey(event: any) {
    this.counter = event.target.value.length;
  }

  onKey1(event: any) {
    this.counter1 = event.target.value.length;
  }

  showUpdateForm() {
    this.isShowButton = true;
    this.isShowInputUpdate = true;
  }

  reverseForm() {
    this.isShowButton = false;
    this.isShowInputUpdate = false;
  }

  getDanger() {
    this.dangerGroupService.getDangerGroup().subscribe(rows => {
      this.selectGrupoPeligro = rows;
    })
  }

  getSelectGrupoPeligro(event: any) {
    this.updateFormDanger.controls['nombreGrupoPeligro'].setValue(event.nombre);
    this.updateFormDanger.controls['descripcionGrupoPeligro'].setValue(event.descripcion);    
  }

  cancel() {
    this.router.navigate(['/administracion/peligro']).then(r => r);
  }
}
