import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { PermissionGroupService } from '../../../shared/services/permission-group.service';
import { PermissionGroup } from '../../../shared/models/permission-group';
import { TYPE_ALERT } from '../../../shared/services/config';

@Component({
  selector: 'app-details-permission-group',
  templateUrl: './details-permission-group.component.html',
  styleUrls: ['./details-permission-group.component.scss']
})
export class DetailsPermissionGroupComponent implements OnInit {

  public updateFormPermissionGroup: FormGroup;
  public isShowButton: boolean = false;
  public isShowInputUpdate: boolean = false;
  private isId!: any;
  public detailsPermissionGroup!: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private params: ActivatedRoute,
    private alert: AlertService,
    private permissionGroupService: PermissionGroupService
  ) { 
    this.updateFormPermissionGroup = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
    this.isId = this.params.snapshot.paramMap.get('id');
    this.getDetailsPermissionGroup();
  }

  getDetailsPermissionGroup() {
    this.permissionGroupService.getPermissionGroupById(this.isId).subscribe(res => {
      this.detailsPermissionGroup = res;
      this.updateFormPermissionGroup.controls['id'].setValue(res.id);
      this.updateFormPermissionGroup.controls['nombre'].setValue(res.nombre);
      this.updateFormPermissionGroup.controls['descripcion'].setValue(res.descripcion);
    });
  }

  updatePermissionGroup1() {
    const dataU: PermissionGroup = {
      id: this.updateFormPermissionGroup.value.id,
      nombre: this.updateFormPermissionGroup.value.nombre,
      descripcion: this.updateFormPermissionGroup.value.descripcion
    }

    //return
    this.alert.questionAlertConfirm(
      '¿Está seguro de actualizar el grupo permiso?',
      '',
      'Si, Actualizar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.permissionGroupService.updatePermissionGroup(dataU).subscribe((res: any) => {
            this.alert.toastSuccess('Actualizado Grupo Permiso Correctamente');
            this.router.navigate([`/seguridad/grupo-permisos`]).then(() => {});
            this.isShowButton = false;
            this.isShowInputUpdate = false;
            this.getDetailsPermissionGroup();
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
    this.router.navigate(['/seguridad/grupo-permisos']).then(r => r);
  }
}
