import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { PermissionService } from '../../../shared/services/permission.service';
import { PermissionGroupService } from '../../../shared/services/permission-group.service';
import { Permission } from '../../../shared/models/permission';
import { TYPE_ALERT } from '../../../shared/services/config';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {
  
  public counter: number = 0;
  public counter1: number = 0;
  public createPermission: FormGroup;
  public selectGrupoPermiso: any;
  public nomGrupoPermiso: string = '';
  public desGrupoPermiso: string = '';

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private alertService: AlertService,
    public permissionService: PermissionService,
    public permissionGroupService: PermissionGroupService
  ) { 
    this.createPermission = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      idGrupoPermiso: ['', [Validators.required]],
      nombreGrupoPermiso: [''],
      descripcionGrupoPermiso: [''],
    });
  }

  ngOnInit(): void {
    this.getPermission();
  }

  createPermisos() {
    const data: Permission = {
      nombre: this.createPermission.value.nombre,
      descripcion: this.createPermission.value.descripcion,
      idGrupoPermiso: this.createPermission.value.idGrupoPermiso,
      nombreGrupoPermiso: this.nomGrupoPermiso,
      descripcionGrupoPermiso: this.desGrupoPermiso
    }

    this.alertService.questionAlertConfirm(
      '¿Está seguro de crear los permisos?',
      '',
      'Si, Crear',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.permissionService.createPermission(data).subscribe((res: any) => {
            this.alertService.toastSuccess('Creado Permiso correctamente');
            this.router.navigate(['/seguridad/permisos']).then(() => {});
            this.permissionService.showLoader = false;
          });
        } else {
          this.permissionService.showLoader = false;
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

  cancelProject() {
    this.createPermission.reset();
    this.permissionService.showLoader = false;
    this.router.navigate(['/seguridad/permisos']).then(r => r);
  }

  getPermission() {
    this.permissionGroupService.getPermissionGroup().subscribe(rows => {
      this.selectGrupoPermiso = rows;
    })
  }

  getSelectGrupoPermiso(event: any) {
    this.nomGrupoPermiso = event.nombre;
    this.desGrupoPermiso = event.descripcion;
  }
  
}
