import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Lesionado } from 'src/app/shared/models/preliminar.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';

@Component({
  selector: 'app-agregar-lesionados',
  templateUrl: './agregar-lesionados.component.html',
  styleUrls: ['./agregar-lesionados.component.scss']
})
export class AgregarLesionadosComponent implements OnInit {

  public formCrearInfoGeneral: FormGroup;
  @Input() idDanioVidaSalud: any;
  @Input() dataEditar: any;
  public statusButton: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private alertService: AlertService,
    private preliminarService: PreliminarService
  ) {
    this.formCrearInfoGeneral = this.fb.group({
      lugarAtencion: [],
      cantidadGrave: [],
      cantidadModerado: [],
      cantidadLeve: [],
      cantidadTratamientoLocal: [],
      cantidadNecesidadEvacuacion: []
    })
  }

  ngOnInit(): void {
    if (this.dataEditar.status != 1) {
      this.getDetailLesionado(this.dataEditar.idLesionado)
      this.statusButton = true;
    }
  }

  getDetailLesionado(id: number) {
    this.preliminarService.getOneLesionado(id).subscribe(res => {
      this.formCrearInfoGeneral.controls['lugarAtencion'].setValue(res.lugarAtencion);
      this.formCrearInfoGeneral.controls['cantidadGrave'].setValue(res.cantidadGrave);
      this.formCrearInfoGeneral.controls['cantidadModerado'].setValue(res.cantidadModerado);
      this.formCrearInfoGeneral.controls['cantidadLeve'].setValue(res.cantidadLeve);
      this.formCrearInfoGeneral.controls['cantidadTratamientoLocal'].setValue(res.cantidadTratamientoLocal);
      this.formCrearInfoGeneral.controls['cantidadNecesidadEvacuacion'].setValue(res.cantidadNecesidadEvacuacion);
    })
  }

  agregarLesionados() {
    const data: Lesionado = {
      lugarAtencion: this.formCrearInfoGeneral.value.lugarAtencion,
      cantidadGrave: Number(this.formCrearInfoGeneral.value.cantidadGrave),
      cantidadModerado: Number(this.formCrearInfoGeneral.value.cantidadModerado),
      cantidadLeve: Number(this.formCrearInfoGeneral.value.cantidadLeve),
      cantidadTratamientoLocal: Number(this.formCrearInfoGeneral.value.cantidadTratamientoLocal),
      cantidadNecesidadEvacuacion: Number(this.formCrearInfoGeneral.value.cantidadNecesidadEvacuacion),
      danioVidaSalud: {
        id: Number(this.idDanioVidaSalud)
      }
    }

    this.preliminarService.crearLesionado(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.closeModal();
    })
  }

  actualizarLesionados() {
    const data: Lesionado = {
      id: this.dataEditar.idLesionado,
      lugarAtencion: this.formCrearInfoGeneral.value.lugarAtencion,
      cantidadGrave: Number(this.formCrearInfoGeneral.value.cantidadGrave),
      cantidadModerado: Number(this.formCrearInfoGeneral.value.cantidadModerado),
      cantidadLeve: Number(this.formCrearInfoGeneral.value.cantidadLeve),
      cantidadTratamientoLocal: Number(this.formCrearInfoGeneral.value.cantidadTratamientoLocal),
      cantidadNecesidadEvacuacion: Number(this.formCrearInfoGeneral.value.cantidadNecesidadEvacuacion),
      danioVidaSalud: {
        id: Number(this.dataEditar.idDanioVidaSalud)
      }
    }

    this.preliminarService.crearLesionado(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.closeModal();
    })
  }

  closeModal() {
    this.activeModal.close();
  }
}
