import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { PermissionService } from '../../../shared/services/permission.service';
import { Permission } from '../../../shared/models/permission';
import { TYPE_ALERT } from '../../../shared/services/config';
import { PermissionGroupService } from '../../../shared/services/permission-group.service';

@Component({
  selector: 'app-details-permission',
  templateUrl: './details-permission.component.html',
  styleUrls: ['./details-permission.component.scss']
})
export class DetailsPermissionComponent implements OnInit {

  public updateFormPermission: FormGroup;
  public isShowButton: boolean = false;
  public isShowInputUpdate: boolean = false;
  public counter: number = 0;
  public counter1: number = 0;
  private isId!: any;
  public detailsPermission!: any;
  public selectGrupoPermiso: any;
  public nomGrupoPermiso: string = '';
  public desGrupoPermiso: string = '';
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private params: ActivatedRoute,
    private alert: AlertService,
    private permissionService: PermissionService,
    private permissionGroupService: PermissionGroupService
  ) { 
    this.updateFormPermission = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      idGrupoPermiso: ['', [Validators.required]],
      nombreGrupoPermiso: ['', [Validators.required]],
      descripcionGrupoPermiso: ['', [Validators.required]]
    }); 
  }

  ngOnInit(): void {
    this.isId = this.params.snapshot.paramMap.get('id');
    this.getDetailsPermission();
    this.getPermission();
  }

  getDetailsPermission() {
    this.permissionService.getPermissionById(this.isId).subscribe(res => {
      this.detailsPermission = res;
      this.updateFormPermission.controls['id'].setValue(res.id);
      this.updateFormPermission.controls['nombre'].setValue(res.nombre);
      this.updateFormPermission.controls['descripcion'].setValue(res.descripcion);
      this.updateFormPermission.controls['idGrupoPermiso'].setValue(res.idGrupoPermiso);
      this.updateFormPermission.controls['nombreGrupoPermiso'].setValue(res.nombreGrupoPermiso);
      this.updateFormPermission.controls['descripcionGrupoPermiso'].setValue(res.descripcionGrupoPermiso);
    });
  }

  updatePermission() {
    const dataU: Permission = {
      id: this.updateFormPermission.value.id,
      nombre: this.updateFormPermission.value.nombre,
      descripcion: this.updateFormPermission.value.descripcion,
      idGrupoPermiso: this.updateFormPermission.value.idGrupoPermiso,
      nombreGrupoPermiso: this.updateFormPermission.value.nombreGrupoPermiso,
      descripcionGrupoPermiso: this.updateFormPermission.value.descripcionGrupoPermiso,
    }

    //return
    this.alert.questionAlertConfirm(
      '¿Está seguro de actualizar el permiso?',
      '',
      'Si, Actualizar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.permissionService.updatePermission(dataU).subscribe((res: any) => {
            this.alert.toastSuccess('Actualizado Permiso Correctamente');
            this.router.navigate([`/seguridad/permisos`]).then(() => {});
            this.isShowButton = false;
            this.isShowInputUpdate = false;
            this.getDetailsPermission();
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

  getPermission() {
    this.permissionGroupService.getPermissionGroup().subscribe(rows => {
      this.selectGrupoPermiso = rows;
    })
  }

  getSelectGrupoPermiso(event: any) {
    this.updateFormPermission.controls['nombreGrupoPermiso'].setValue(event.nombre);
    this.updateFormPermission.controls['descripcionGrupoPermiso'].setValue(event.descripcion);    
  }

  cancel() {
    this.router.navigate(['/seguridad/permisos']).then(r => r);
  }
}
