import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { DangerService } from '../../../shared/services/danger.service';
import { DangerGroupService } from '../../../shared/services/danger-group.service';
import { Danger } from '../../../shared/models/danger.model';
import { TYPE_ALERT } from '../../../shared/services/config';

@Component({
  selector: 'app-add-danger',
  templateUrl: './add-danger.component.html',
  styleUrls: ['./add-danger.component.scss']
})
export class AddDangerComponent implements OnInit {

  public counter: number = 0;
  public counter1: number = 0;
  public createDanger: FormGroup;
  public selectGrupoPeligro: any;
  public nomGrupoPeligro: string = '';
  public desGrupoPeligro: string = '';

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private alertService: AlertService,
    public dangerService: DangerService,
    public dangerGroupService: DangerGroupService
  ) { 
    this.createDanger = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      idGrupoPeligro: ['', [Validators.required]],
      nombreGrupoPeligro: [''],
      descripcionGrupoPeligro: [''],
    });
  }

  ngOnInit(): void {
    this.getDanger();
  }

  createPeligros() {
    const data: Danger = {
      nombre: this.createDanger.value.nombre,
      descripcion: this.createDanger.value.descripcion,
      idGrupoPeligro: this.createDanger.value.idGrupoPeligro,
      nombreGrupoPeligro: this.nomGrupoPeligro,
      descripcionGrupoPeligro: this.desGrupoPeligro
    }

    this.alertService.questionAlertConfirm(
      '¿Está seguro de crear los peligros?',
      '',
      'Si, Crear',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.dangerService.createDanger(data).subscribe((res: any) => {
            this.alertService.toastSuccess('Creado Peligros correctamente');
            this.router.navigate(['/administracion/peligro']).then(() => {});
            this.dangerService.showLoader = false;
          });
        } else {
          this.dangerService.showLoader = false;
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
    this.createDanger.reset();
    this.dangerService.showLoader = false;
    this.router.navigate(['/administracion/peligro']).then(r => r);
  }

  getDanger() {
    this.dangerGroupService.getDangerGroup().subscribe(rows => {
      this.selectGrupoPeligro = rows;
    })
  }

  getSelectGrupoPeligro(event: any) {
    this.nomGrupoPeligro = event.nombre;
    this.desGrupoPeligro = event.descripcion;
  }

}
