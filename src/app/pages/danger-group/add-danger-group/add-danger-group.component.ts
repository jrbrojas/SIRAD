import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { AlertService } from '../../../shared/services/alert.service';
import { DangerGroupService } from '../../../shared/services/danger-group.service';
import { DangerGroup } from '../../../shared/models/danger-group.model';

@Component({
  selector: 'app-add-danger-group',
  templateUrl: './add-danger-group.component.html',
  styleUrls: ['./add-danger-group.component.scss']
})
export class AddDangerGroupComponent implements OnInit {

  public createDangerGroup: FormGroup;
  public counter: number = 0;
  public counter1: number = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService ,
    public dangerGroupService: DangerGroupService
  ) { 
    this.createDangerGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  createDangerGroup1() {
    const data: DangerGroup = {
      id: this.createDangerGroup.value.id,
      nombre: this.createDangerGroup.value.nombre,
      descripcion: this.createDangerGroup.value.descripcion
    }
    this.alertService.questionAlertConfirm(
      '¿Está seguro de crear el grupo de permiso?',
      '',
      'Si, Crear',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.dangerGroupService.createDangerGroup(data).subscribe((res: any) => {
            this.alertService.toastSuccess('Creado Grupo Peligro correctamente');
            this.router.navigate(['/administracion/grupo-peligro']).then(() => {});
            this.dangerGroupService.showLoader = false;
          });
        } else {
          this.dangerGroupService.showLoader = false;
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
    this.createDangerGroup.reset();
    this.dangerGroupService.showLoader = false;
    this.router.navigate(['/administracion/grupo-peligro']).then(r => r);
  }

}
