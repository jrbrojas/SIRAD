import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WayLife } from 'src/app/shared/models/empadronamiento.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';

@Component({
  selector: 'app-create-mv',
  templateUrl: './create-mv.component.html',
  styleUrls: ['./create-mv.component.scss']
})
export class CreateMvComponent implements OnInit {

  public createFormMv: FormGroup;
  public groupProductsWayLife: any;
  public productsWayLife: any;
  public members: any;
  public waysLifeFamily: any;
  public idFamilia: any;
  public PERMISOS = PERMISOS;
  public cantidadMediosDeVIda = 0;

  @Input() fromIdFamily: any;

  constructor(private fb: FormBuilder,
    private form2aService: Form2aService,
    private alertService: AlertService,
    public authService: AuthService) {
    this.createFormMv = fb.group({
      idIntegrante: [null],
      idMedioVida: [null],
      categoriaMedioVida: [null],
      idSubCategoriaMedioVida: [null],
      subCategoriaMedioVida: [null],
      cantidadAfectada: [null],
      cantidadPerdida: [null]
    })
  }

  ngOnInit(): void {
    this.idFamilia = this.fromIdFamily;
    this.getGroupProductsWayLife();
    this.getMembersHaveWayLife(this.idFamilia);
    this.getAllWaysLifeByFamily(this.idFamilia);
  }

  getGroupProductsWayLife() {

    this.form2aService.getGroupProductsWayLife().subscribe(res => {
      this.groupProductsWayLife = res
    });
  }

  getSelectGroupWayLife(event: any) {
    this.getProductsWayLife(event.idTipoProducto);
    this.createFormMv.controls['categoriaMedioVida'].setValue(event.descripcion);

    this.createFormMv.controls['idSubCategoriaMedioVida'].setValue(null);
    this.createFormMv.controls['subCategoriaMedioVida'].setValue(null);
  }

  getSelectWayLife(event: any) {
    this.createFormMv.controls['subCategoriaMedioVida'].setValue(event.descripcion);
  }

  getProductsWayLife(id: number) {
    this.form2aService.getProductsWayLife(id).subscribe(res => {
      this.productsWayLife = res
    });
  }

  getMembersHaveWayLife(idFamilia: number) {
    this.form2aService.getMembersHaveWayLifeByFamily(idFamilia).subscribe((res: any) => {
      this.members = res;
      this.members = res.map((i: any) => { i.nombresApellidos = i.nombres + ' ' + i.apellidos; return i });
      if(this.members)this.cantidadMediosDeVIda = this.members.length
      else this.cantidadMediosDeVIda = 0
      
    })
  }

  getAllWaysLifeByFamily(idFamilia: number) {
    this.form2aService.getAllWaysLifeByFamily(idFamilia).subscribe(res => {
      this.waysLifeFamily = res

    })
  }

  resetInput() {
    this.createFormMv.controls['idMedioVida'].reset(null);
    this.createFormMv.controls['categoriaMedioVida'].reset(null);
    this.createFormMv.controls['idSubCategoriaMedioVida'].reset(null);
    this.createFormMv.controls['subCategoriaMedioVida'].reset(null);
    this.createFormMv.controls['cantidadAfectada'].reset(null);
    this.createFormMv.controls['cantidadPerdida'].reset(null);
    this.createFormMv.controls['idIntegrante'].reset(null);
  }

  craateWayLife() {
    if (!this.createFormMv.value.cantidadAfectada) this.createFormMv.value.cantidadAfectada = 0
    if (!this.createFormMv.value.cantidadPerdida) this.createFormMv.value.cantidadPerdida = 0
    if (this.createFormMv.valid) {
      const mv: WayLife = {
        idCategoriaMedioVida: this.createFormMv.value.idMedioVida,
        categoriaMedioVida: this.createFormMv.value.categoriaMedioVida,
        idSubCategoriaMedioVida: this.createFormMv.value.idSubCategoriaMedioVida,
        subCategoriaMedioVida: this.createFormMv.value.subCategoriaMedioVida,
        cantidadAfectada: this.createFormMv.value.cantidadAfectada,
        cantidadPerdida: this.createFormMv.value.cantidadPerdida,
        integrante: {
          id: this.createFormMv.value.idIntegrante,
        }
      }

      this.form2aService.saveWayLife(mv).subscribe(res => {
        this.alertService.toastSuccess(`${res.message}`);
        this.resetInput();
        this.getAllWaysLifeByFamily(this.idFamilia);
      });
    }

  }

  getFullName(nombres: string, apellidos: string) {
    return nombres + ' ' + apellidos;
  }


  deleteWayLife(id: number) {
    this.alertService.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar este registro', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.form2aService.deleteWayLife(id).subscribe(res => {
            this.alertService.toastSuccess(`${res.message}`);
            this.getAllWaysLifeByFamily(this.idFamilia);
          })
        }
      }
    )
  }

}
