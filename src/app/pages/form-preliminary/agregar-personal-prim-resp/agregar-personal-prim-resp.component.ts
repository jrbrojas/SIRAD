import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonalRespuesta } from 'src/app/shared/models/preliminar.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';

@Component({
  selector: 'app-agregar-personal-prim-resp',
  templateUrl: './agregar-personal-prim-resp.component.html',
  styleUrls: ['./agregar-personal-prim-resp.component.scss']
})
export class AgregarPersonalPrimRespComponent implements OnInit {

  public formCrearPersonal: FormGroup;
  @Input() idDanioVidaSalud: any;
  @Input() idPersonall: any;
  @Input() status: any;
  public statusButton: boolean = false;
  public idPersonal: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private alertService: AlertService,
    private preliminarService: PreliminarService
  ) {
    this.formCrearPersonal = this.fb.group({
      idPotencialHumano: [],
      potencialHumano: [],
      totalPersonal: [],
      cantidadLesionado: [],
      cantidadFallecido: [],
      cantidadDesaparecido: [],
      observacion: []
    })
  }

  ngOnInit(): void {
    if (this.status != 1) {
      this.getDetailPersonal(this.idPersonall)
      this.statusButton = true
    }
  }

  agregarPersonal() {
    const data: PersonalRespuesta = {
      idPotencialHumano: 1,
      potencialHumano: this.formCrearPersonal.value.potencialHumano,
      totalPersonal: Number(this.formCrearPersonal.value.totalPersonal),
      cantidadLesionado: Number(this.formCrearPersonal.value.cantidadLesionado),
      cantidadFallecido: Number(this.formCrearPersonal.value.cantidadFallecido),
      cantidadDesaparecido: Number(this.formCrearPersonal.value.cantidadDesaparecido),
      observacion: this.formCrearPersonal.value.observacion,
      danioVidaSalud: {
        id: Number(this.idDanioVidaSalud)
      }
    }

    this.preliminarService.crearPersonal(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.closeModal();
    })
  }

  actualizarPersonal() {
    const data: PersonalRespuesta = {
      id: this.idPersonal,
      idPotencialHumano: this.formCrearPersonal.value.idPotencialHumano,
      potencialHumano: this.formCrearPersonal.value.potencialHumano,
      totalPersonal: Number(this.formCrearPersonal.value.totalPersonal),
      cantidadLesionado: Number(this.formCrearPersonal.value.cantidadLesionado),
      cantidadFallecido: Number(this.formCrearPersonal.value.cantidadFallecido),
      cantidadDesaparecido: Number(this.formCrearPersonal.value.cantidadDesaparecido),
      observacion: this.formCrearPersonal.value.observacion,
      danioVidaSalud: {
        id: Number(this.idDanioVidaSalud)
      }
    }

    this.preliminarService.crearPersonal(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.closeModal();
    })
  }

  getDetailPersonal(id: number) {
    this.preliminarService.getDetailPersonalRespuesta(id).subscribe((res: PersonalRespuesta) => {
      this.formCrearPersonal.controls['idPotencialHumano'].setValue(res.idPotencialHumano)
      this.formCrearPersonal.controls['potencialHumano'].setValue(res.potencialHumano)
      this.formCrearPersonal.controls['totalPersonal'].setValue(res.totalPersonal)
      this.formCrearPersonal.controls['cantidadLesionado'].setValue(res.cantidadLesionado)
      this.formCrearPersonal.controls['cantidadFallecido'].setValue(res.cantidadFallecido)
      this.formCrearPersonal.controls['cantidadDesaparecido'].setValue(res.cantidadDesaparecido)
      this.formCrearPersonal.controls['observacion'].setValue(res.observacion)
      this.idPersonal = res.id;
    })
  }

  closeModal() {
    this.activeModal.close();
  }
}
