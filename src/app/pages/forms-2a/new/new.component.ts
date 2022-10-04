import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DtoEmpadronamiento, Empadronamiento, GeoFormulario2ab } from 'src/app/shared/models/empadronamiento.model';
import { Form2aService } from "../../../shared/services/form-2a.service";
import { AlertService } from "../../../shared/services/alert.service";
import { FormularioService } from 'src/app/shared/services/formulario.service';
import * as moment from "moment";
import { EmergencyService } from 'src/app/shared/services/emergency.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public createForm: FormGroup;
  public idEmergency: any;
  public wrapGeometria: any = {};
  public formulariosEvaluacionRapida: any
  public changeInicial = false
  public idEvaluacionRapida: any;
  public idFormulario: any;
  public isShow: boolean = false;
  public descripcionEvaluacionRapida = "";
  public codigoSinpad: any;
  public isEdit : any

  constructor(
    private params: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    public form2aService: Form2aService,
    private alertService: AlertService,
    private formularioService: FormularioService,
    private emergencyService : EmergencyService
  ) {
    this.createForm = fb.group({
      isHealth: [],
      isMv: [],
      isViv: [],
      idEmergencia: [],
      idEvaluacionRapida: [],
      tipoFormulario: 'EMPADRONAMIENTO',
      idTipoPeligro: [],
      tipoPeligro: [],
      idGrupoPeligro: [],
      grupoPeligro: [],
      idTipoPeligroSecundario: [],
      tipoPeligroSecundario: [],
      codigoUbigeo: [],
      descripcionUbigeo: [],
      codigoUbigeoCentroPoblado: [],
      centroPoblado: [],
      fechaHoraEvento: [],
      idTipoLugar: [],
      tipoLugar: [],
      descripcionLugar: [],
      idLugarEspecifico: [],
      lugarEspecifico: [],
      descripcionLugarEspecifico: []
    })
    if (this.idEmergency) this.getFormularios();

  }

  ngOnInit(): void {

    /*this.params.paramMap.subscribe(params => {
      console.log(params.has('idFormulario')); // true
    })*/

    this.idEmergency = this.params.snapshot.paramMap.get('idEmergencia');
    let words = this.params.snapshot.paramMap.get('idFormulario').split(",")
    this.idFormulario = words[0];
    this.isEdit = words[1];
    console.log("idEmergecia",this.idEmergency);
    console.log("idFormulario",this.idFormulario);
    console.log("isEdit",this.isEdit);
    

    this.getFormularios();
    this.getDetailsEmergency();

  }

  getDetailsEmergency() {
    this.emergencyService.getEmergencyById(this.idEmergency).subscribe(res => {
      this.codigoSinpad = res.codigoSinpad
      console.log("codigo Sinpad",this.codigoSinpad);
    });
  }

  tabChange() {

    const data: Empadronamiento = {
      idEmergencia: this.idEmergency,
      tipoFormulario: this.createForm.value.tipoFormulario,
      idEvaluacionRapida: this.createForm.value.idEvaluacionRapida,
      idTipoPeligro: this.createForm.value.idTipoPeligro,
      tipoPeligro: this.createForm.value.tipoPeligro,
      idGrupoPeligro: this.createForm.value.idGrupoPeligro,
      grupoPeligro: this.createForm.value.grupoPeligro,
      idTipoPeligroSecundario: this.createForm.value.idTipoPeligroSecundario,
      tipoPeligroSecundario: this.createForm.value.tipoPeligroSecundario,
      codigoUbigeo: this.createForm.value.codigoUbigeo,
      descripcionUbigeo: this.createForm.value.descripcionUbigeo,
      codigoUbigeoCentroPoblado: this.createForm.value.codigoUbigeoCentroPoblado,
      centroPoblado: this.createForm.value.centroPoblado,
      fechaHoraEvento: this.createForm.value.fechaHoraEvento,
      idTipoLugar: this.createForm.value.idTipoLugar,
      tipoLugar: this.createForm.value.tipoLugar,
      descripcionLugar: this.createForm.value.descripcionLugar,
      idLugarEspecifico: this.createForm.value.idLugarEspecifico,
      lugarEspecifico: this.createForm.value.lugarEspecifico,
      descripcionLugarEspecifico: this.createForm.value.descripcionLugarEspecifico,
      tieneSalud: this.createForm.value.isHealth != 1 ? 0 : 1,
      tieneMedioVida: this.createForm.value.isMv != 1 ? 0 : 1,
      tieneVivienda: this.createForm.value.isViv != 1 ? 0 : 1,
      habilitado: 1
    }

    const dto: DtoEmpadronamiento = {
      empadronamiento: data,
    }

    if (this.isShow) this.route.navigate([`/form-2a/create/${this.idEmergency}/${this.idFormulario},${this.isEdit}`]).then(() => { });

    else {
      this.form2aService.createForm2a(dto).subscribe((res: any) => {
        this.alertService.toastSuccess(`${res.message}`);
        const idEmp = res.post.empadronamiento.id;

        this.route.navigate([`/form-2a/create/${this.idEmergency}/${idEmp}`]).then(() => { });
      });
    }
  }


  getFormularios() {

    if (this.idEmergency) {
      if (this.idFormulario != 'undefined') {

        this.isShow = true;

        this.formularioService.listarEvaluacionesRapidasPorEmergencia(this.idEmergency, this.idFormulario).subscribe((res: any) => {
          console.log('lista evaluacion rapida', res)

          this.formulariosEvaluacionRapida = res;
          if (res.length) {
            console.log('LLego aqui')
            this.form2aService.getByIdForm2a(this.idFormulario).subscribe(res => {
              const data = res.empadronamiento;
              this.createForm.controls['isHealth'].setValue(data.tieneSalud)
              this.createForm.controls['isMv'].setValue(data.tieneMedioVida)
              this.createForm.controls['isViv'].setValue(data.tieneVivienda)
              this.getSelectFormularioEvaluacionRapida(data.idEvaluacionRapida)
              console.log('data', data)
              //this.formulariosEvaluacionRapida = data.descripcionUbigeo+ " - " +data.centroPoblado + " - "+data.tipoPeligro + " - " + data.tipoPeligroSecundario
              this.createForm.controls['idEvaluacionRapida'].setValue(data.idEvaluacionRapida);
              this.descripcionEvaluacionRapida = (data.numeroFormulario + " - " + data.descripcionUbigeo + " - " + data.centroPoblado + " - " + data.tipoPeligro + " - " + data.tipoPeligroSecundario);
            })

            this.formulariosEvaluacionRapida.map((e: any) => {
              e.descripcion = "dsadsad"+e.descripcionUbigeo + " - " + e.centroPoblado + " - " + e.tipoPeligro + " - " + e.tipoPeligroSecundario
              //this.createForm.controls['idEvaluacionRapida'].setValue(e.descripcion)
            });
            //this.createForm.controls['idEvaluacionRapida'].setValue([this.formulariosEvaluacionRapida]);
          }

          //consulta el empadronamitno por id

          // datos delempadronamitento -> idEvaluacionrapida

          // compare 

        });

      } else {
        this.isShow = false;
        console.log("else");
        this.formularioService.listarEvaluacionesRapidasPorEmergencia(this.idEmergency, 0).subscribe((res: any) => {
          this.formulariosEvaluacionRapida = res;
          if (res.length) {
            console.log('LLego aqui')
            this.formulariosEvaluacionRapida.map((e: any) => {
              e.descripcion = e.numeroFormulario + " - " + e.descripcionUbigeo + " - " + e.centroPoblado + " - " + e.tipoPeligro + " - " + e.tipoPeligroSecundario
            });
          }
        });

      }
    }
  }

  getSelectFormularioEvaluacionRapida(event: any) {
    this.changeInicial = true
    let evaluacionRapidaSeleccionado: any
    if (!this.isShow) evaluacionRapidaSeleccionado = this.formulariosEvaluacionRapida.find(ev => ev.id == this.createForm.value.idEvaluacionRapida);
    else evaluacionRapidaSeleccionado = event

    this.createForm.patchValue({
      idEvaluacionRapida: evaluacionRapidaSeleccionado.id,
      idTipoPeligro: evaluacionRapidaSeleccionado.idTipoPeligro,
      tipoPeligro: evaluacionRapidaSeleccionado.tipoPeligro,
      idGrupoPeligro: evaluacionRapidaSeleccionado.idGrupoPeligro,
      grupoPeligro: evaluacionRapidaSeleccionado.grupoPeligro,
      idTipoPeligroSecundario: evaluacionRapidaSeleccionado.idTipoPeligroSecundario,
      tipoPeligroSecundario: evaluacionRapidaSeleccionado.tipoPeligroSecundario,
      codigoUbigeo: evaluacionRapidaSeleccionado.codigoUbigeo,
      descripcionUbigeo: evaluacionRapidaSeleccionado.descripcionUbigeo,
      codigoUbigeoCentroPoblado: evaluacionRapidaSeleccionado.codigoUbigeoCentroPoblado,
      centroPoblado: evaluacionRapidaSeleccionado.centroPoblado,
      fechaHoraEvento: evaluacionRapidaSeleccionado.fechaHoraEvento,
      idTipoLugar: evaluacionRapidaSeleccionado.idTipoLugar,
      tipoLugar: evaluacionRapidaSeleccionado.tipoLugar,
      descripcionLugar: evaluacionRapidaSeleccionado.descripcionLugar,
      idLugarEspecifico: evaluacionRapidaSeleccionado.idLugarEspecifico,
      lugarEspecifico: evaluacionRapidaSeleccionado.lugarEspecifico,
      descripcionLugarEspecifico: evaluacionRapidaSeleccionado.descripcionLugarEspecifico,
    });


  }

  back() {
    this.route.navigate([`/quick-evaluation/list/${this.idEmergency}`]).then(() => { });
  }
}
