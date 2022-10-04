import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { Profile } from '../../../shared/models/profile';
import { TYPE_ALERT } from '../../../shared/services/config';
import { PermissionService } from '../../../shared/services/permission.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {

  public selectedCar?: number;
  public counter: number = 0;
  public counter1: number = 0;
  public createProfile: FormGroup;
  public selectPermiso: any;
  public nomPermiso: string = '';
  public desPermiso: string = '';

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    public profileService: ProfileService,
    public permissionService: PermissionService
  ) { 
    this.createProfile = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      habilitado: ['', [Validators.required]],
      permission: this.fb.array([])
    
   })
  }

  ngOnInit(): void {
    this.getPermission();
  }

  get permission() {
    return this.createProfile.get('permission') as FormArray
  }

  createProfile1() {
    const data: Profile = {
      nombre: this.createProfile.value.nombre,
      descripcion: this.createProfile.value.descripcion,
      habilitado: this.createProfile.value.habilitado,
      permisos: this.createProfile.value.permission
    }


    this.alertService.questionAlertConfirm(
      '¿Está seguro de crear el Perfil?',
      '',
      'Si, Crear',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.profileService.createProfile(data).subscribe((res: any) => {
            
            this.alertService.toastSuccess('Creado Perfil correctamente');
            this.router.navigate(['/seguridad/perfiles']).then(() => {});
            this.profileService.showLoader = false;
          });
        } else {
          this.profileService.showLoader = false;
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
    this.createProfile.reset();
    this.profileService.showLoader = false;
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
