import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { AlertService } from '../../../shared/services/alert.service';
import { PermissionGroup } from '../../../shared/models/permission-group';
import { PermissionGroupService } from '../../../shared/services/permission-group.service';

@Component({
  selector: 'app-add-permission-group',
  templateUrl: './add-permission-group.component.html',
  styleUrls: ['./add-permission-group.component.scss']
})
export class AddPermissionGroupComponent implements OnInit {

  public createPermissionGroup: FormGroup;
  public counter: number = 0;
  public counter1: number = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService ,
    public permissionGroupService: PermissionGroupService
  ) { 
    this.createPermissionGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  createPermissionGroup1() {
    const data: PermissionGroup = {
      id: this.createPermissionGroup.value.id,
      nombre: this.createPermissionGroup.value.nombre,
      descripcion: this.createPermissionGroup.value.descripcion
    }
    this.alertService.questionAlertConfirm(
      '¿Está seguro de crear el grupo de permiso?',
      '',
      'Si, Crear',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.permissionGroupService.createPermissionGroup(data).subscribe((res: any) => {
            this.alertService.toastSuccess('Creado Grupo Permiso correctamente');
            this.router.navigate(['/seguridad/grupo-permisos']).then(() => {});
            this.permissionGroupService.showLoader = false;
          });
        } else {
          this.permissionGroupService.showLoader = false;
        }
      }
    );
  }

  cancelProject() {
    this.createPermissionGroup.reset();
    this.permissionGroupService.showLoader = false;
    this.router.navigate(['/seguridad/grupo-permisos']).then(r => r);
  }

  onKey(event: any) {
    this.counter = event.target.value.length;
  }

  onKey1(event: any) {
    this.counter1 = event.target.value.length;
  }

}
