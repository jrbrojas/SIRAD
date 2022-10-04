import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { TYPE_ALERT } from '../../../shared/services/config';
import { Profile } from '../../../shared/models/profile';
import { ProfileService } from '../../../shared/services/profile.service';
import { PermissionService } from '../../../shared/services/permission.service';


@Component({
  selector: 'app-details-profile',
  templateUrl: './details-profile.component.html',
  styleUrls: ['./details-profile.component.scss']
})
export class DetailsProfileComponent implements OnInit {

  public updateFormProfile: FormGroup;
  public isShowButton: boolean = false;
  public isShowInputUpdate: boolean = false;
  public counter: number = 0;
  public counter1: number = 0;
  private isId!: any;
  public detailsProfile!: any;
  public selectPermiso: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private params: ActivatedRoute,
    private alert: AlertService,
    private profileService: ProfileService,
    public permissionService: PermissionService
  ) { this.updateFormProfile = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    habilitado: ['', [Validators.required]],
    permission: this.fb.array([])
  }); 
}

  ngOnInit(): void {
    this.isId = this.params.snapshot.paramMap.get('id');
    this.getDetailsProfile();
    this.getPermission();
  }

  get permission() {
    return this.updateFormProfile.get('permission') as FormArray
  }

  getDetailsProfile() {
    this.profileService.getProfileById(this.isId).subscribe(res => {
      
      this.detailsProfile = res;
      this.updateFormProfile.controls['id'].setValue(res.id);
      this.updateFormProfile.controls['nombre'].setValue(res.nombre);
      this.updateFormProfile.controls['descripcion'].setValue(res.descripcion);
      this.updateFormProfile.controls['habilitado'].setValue(res.habilitado);
      this.updateFormProfile.controls['permisos'].setValue(res.permisos);
    });
  }

  updateProfile() {
    const dataU: Profile = {
      id: this.updateFormProfile.value.id,
      nombre: this.updateFormProfile.value.nombre,
      descripcion: this.updateFormProfile.value.descripcion,
      habilitado: this.updateFormProfile.value.habilitado,
      permisos: this.updateFormProfile.value.permission
    }
    this.alert.questionAlertConfirm(
      '¿Está seguro de actualizar el permiso?',
      '',
      'Si, Actualizar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.profileService.updateProfile(dataU).subscribe((res: any) => {
            this.alert.toastSuccess('Actualizado Perfil Correctamente');
            this.router.navigate([`/seguridad/perfiles`]).then(() => {});
            this.isShowButton = false;
            this.isShowInputUpdate = false;
            this.getDetailsProfile();
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

  cancel() {
    this.router.navigate(['/seguridad/perfiles']).then(r => r);
  }

  getPermission() {
    this.permissionService.getPermission().subscribe(rows => {
      this.selectPermiso = rows;
    })
  }

  getSelectPermiso(event: any) {
    this.permission.clear()
    for (let i = 0; i < event.length; i++) {
      const element = event[i];
      const lessonForm = this.fb.group({
        id: [element.id],
        nombre: [element.nombre],
        descripcion: [element.descripcion],
        idGrupoPermiso: [element.idGrupoPermiso],
        nombreGrupoPermiso: [element.nombreGrupoPermiso],
        descripcionGrupoPermiso: [element.descripcionGrupoPermiso],
      });      
      this.permission.push(lessonForm);
    }
  }

}
