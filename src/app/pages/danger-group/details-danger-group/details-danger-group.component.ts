import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { TYPE_ALERT } from '../../../shared/services/config';
import { DangerGroup } from '../../../shared/models/danger-group.model';
import { DangerGroupService } from '../../../shared/services/danger-group.service';

@Component({
  selector: 'app-details-danger-group',
  templateUrl: './details-danger-group.component.html',
  styleUrls: ['./details-danger-group.component.scss']
})
export class DetailsDangerGroupComponent implements OnInit {

  public updateFormDangerGroup: FormGroup;
  public isShowButton: boolean = false;
  public isShowInputUpdate: boolean = false;
  private isId!: any;
  public detailsDangerGroup!: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private params: ActivatedRoute,
    private alert: AlertService,
    private dangerGroupService: DangerGroupService
  ) { 
    this.updateFormDangerGroup = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
   }

   ngOnInit(): void {
    this.isId = this.params.snapshot.paramMap.get('id');
    this.getDetailsDangerGroup();
  }

  getDetailsDangerGroup() {
    this.dangerGroupService.getDangerGroupById(this.isId).subscribe(res => {
      this.detailsDangerGroup = res;
      this.updateFormDangerGroup.controls['id'].setValue(res.id);
      this.updateFormDangerGroup.controls['nombre'].setValue(res.nombre);
      this.updateFormDangerGroup.controls['descripcion'].setValue(res.descripcion);
    });
  }

  updateDangerGroup1() {
    const dataU: DangerGroup = {
      id: this.updateFormDangerGroup.value.id,
      nombre: this.updateFormDangerGroup.value.nombre,
      descripcion: this.updateFormDangerGroup.value.descripcion
    }
    
    this.alert.questionAlertConfirm(
      '¿Está seguro de actualizar el grupo peligro?',
      '',
      'Si, Actualizar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.dangerGroupService.updateDangerGroup(dataU).subscribe((res: any) => {
            this.alert.toastSuccess('Actualizado Grupo Peligro Correctamente');
            this.router.navigate([`/administracion/grupo-peligro`]).then(() => {});
            this.isShowButton = false;
            this.isShowInputUpdate = false;
            this.getDetailsDangerGroup();
          });
        }
      }
    );
  }

  showUpdateForm() {
    this.isShowButton = true;
    this.isShowInputUpdate = true;
  }

  reverseForm() {
    this.isShowButton = false;
    this.isShowInputUpdate = false;
  }

  cancel() {
    this.router.navigate(['/administracion/grupo-peligro']).then(r => r);
  }

}
