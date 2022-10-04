import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DtoEmpadronamiento } from 'src/app/shared/models/empadronamiento.model';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { Emergency } from 'src/app/shared/models/emergency.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';

@Component({
  selector: 'app-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.scss']
})
export class NewEditComponent implements OnInit {

  public updateForm: FormGroup;
  public idEmp: any;
  public PERMISOS = PERMISOS;
  codigoSinpad: any;
  constructor(
    private params: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    public form2aService: Form2aService,
    private alertService: AlertService,
    public authService:  AuthService
  ) {
    this.updateForm = fb.group({
      idEmp: [],
      idEmergency: [],
      isHealth: [],
      isMv: [],
      isViv: [],
      habilitado: [],
      fechaHoraEmpadronamiento: [],
    })
  }


  ngOnInit(): void {
    this.idEmp = this.params.snapshot.paramMap.get('id');
    const words = this.idEmp.split(',');
    this.idEmp = words[0]
    this.codigoSinpad = words[1]
    this.detailsEmp();
  }
  
  detailsEmp() {
    this.form2aService.getByIdForm2a(this.idEmp).subscribe((res: any) => {
      console.log('detalle empadronamiento', res)
      this.updateForm.controls['idEmp'].setValue(res.empadronamiento.id);
      this.updateForm.controls['idEmergency'].setValue(res.empadronamiento.idEmergencia);
      this.updateForm.controls['isHealth'].setValue(res.empadronamiento.tieneSalud);
      this.updateForm.controls['isMv'].setValue(res.empadronamiento.tieneMedioVida);
      this.updateForm.controls['isViv'].setValue(res.empadronamiento.tieneVivienda);
      this.updateForm.controls['habilitado'].setValue(res.empadronamiento.habilitado);
      this.updateForm.controls['fechaHoraEmpadronamiento'].setValue(res.empadronamiento.fechaHoraEmpadronamiento);
    })
  }

  tabChange() {
    const data: DtoEmpadronamiento = {
      empadronamiento: {
        id: this.updateForm.value.idEmp,
        idEmergencia: this.updateForm.value.idEmergency,
        tieneSalud: this.updateForm.value.isHealth != 1 ? 0 : 1,
        tieneMedioVida: this.updateForm.value.isMv != 1 ? 0 : 1,
        tieneVivienda: this.updateForm.value.isViv != 1 ? 0 : 1,
        habilitado: this.updateForm.value.habilitado,
        fechaHoraRegistrado: this.updateForm.value.fechaHoraEmpadronamiento,
      }
    }
    this.form2aService.createForm2a(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.route.navigate([`/form-2a/details/${this.idEmp}`]).then(() => { });
    });
  }

  tabChange1() {
    const data: DtoEmpadronamiento = {
      empadronamiento: {
        id: this.updateForm.value.idEmp,
        idEmergencia: this.updateForm.value.idEmergency,
        tieneSalud: this.updateForm.value.isHealth != 1 ? 0 : 1,
        tieneMedioVida: this.updateForm.value.isMv != 1 ? 0 : 1,
        tieneVivienda: this.updateForm.value.isViv != 1 ? 0 : 1,
        habilitado: this.updateForm.value.habilitado,
        fechaHoraRegistrado: this.updateForm.value.fechaHoraEmpadronamiento,
      }
    }
    this.route.navigate([`/form-2a/details/${this.idEmp}`]).then(() => { });
    /*this.form2aService.createForm2a(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.route.navigate([`/form-2a/details/${this.idEmp}`]).then(() => { });
    });*/
  }
}
