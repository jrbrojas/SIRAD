import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DanioVidaSalud, Peligro, Preliminar } from 'src/app/shared/models/preliminar.model';
import { PreliminarService } from 'src/app/shared/services/preliminar.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergencyService } from 'src/app/shared/services/emergency.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public formCrearInfoGeneral: FormGroup;

  public listarTransporte: any;
  public listarTipoVehiculo: any;

  tabId: string = 'general';
  idPreliminar: any;
  idDanioVidaSalud: any;
  lesionados: any;
  personal: any;
  idEmergencia: any;
  codigoSinpad: any;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private preliminarService: PreliminarService,
    private router: Router,
    private params: ActivatedRoute,
    private emergencyService : EmergencyService
  ) {
    this.formCrearInfoGeneral = this.fb.group({
      idResponsable: [1],
      responsable: ['Leo'],
      dni: ['76957680'],
      cargo: ['Developer'],
      institucion: ['INDECI'],
      condicionClimatica: ['', Validators.required],
      idViaTransporte: ['', Validators.required],
      viaTransporte: ['', Validators.required],
      idTipoVehiculo: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
      lugarPartida: ['', Validators.required],
      tiempoEstimadoLlegada: ['', Validators.required],
      rutaPrincipal: ['', Validators.required],
      rutaAlterna: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getListViaTransport();
    this.getListTipoVehiculo();
    this.idEmergencia = this.params.snapshot.paramMap.get('idEmergencia');
    this.getDetailsEmergency()
  }

  getDetailsEmergency() {
    this.emergencyService.getEmergencyById(this.idEmergencia).subscribe(res => {
      this.codigoSinpad = res.codigoSinpad
      console.log("codigo Sinpad",this.codigoSinpad);
      
    });
}

  /*=============================================== LISTADO DE MAESTRAS ================================================*/
  getListViaTransport() {
    this.preliminarService.getMaeViaTransporte().subscribe(res => {
      this.listarTransporte = res;
    })
  }

  getListTipoVehiculo() {
    this.preliminarService.getMaeTipoVehiculo().subscribe(res => {
      this.listarTipoVehiculo = res;
    })
  }

  crearInfoGeneral() {
    const data: Preliminar = {
      idEmergencia: this.idEmergencia,
      tipoFormulario: 'PRELIMINAR',
      idResponsable: this.formCrearInfoGeneral.value.idResponsable,
      responsable: this.formCrearInfoGeneral.value.responsable,
      dni: this.formCrearInfoGeneral.value.dni,
      cargo: this.formCrearInfoGeneral.value.cargo,
      institucion: this.formCrearInfoGeneral.value.institucion,
      condicionClimatica: this.formCrearInfoGeneral.value.condicionClimatica,
      idViaTransporte: this.formCrearInfoGeneral.value.idViaTransporte,
      viaTransporte: this.formCrearInfoGeneral.value.viaTransporte,
      idTipoVehiculo: this.formCrearInfoGeneral.value.idTipoVehiculo,
      tipoVehiculo: this.formCrearInfoGeneral.value.tipoVehiculo,
      lugarPartida: this.formCrearInfoGeneral.value.lugarPartida,
      tiempoEstimadoLlegada: this.formCrearInfoGeneral.value.tiempoEstimadoLlegada,
      rutaPrincipal: this.formCrearInfoGeneral.value.rutaPrincipal,
      rutaAlterna: this.formCrearInfoGeneral.value.rutaAlterna,
      habilitado: 1,
      idRegistradoPor:  null,
      registradoPor:  null,
      fechaHoraRegistrado:  null,
      idRevisadoPor:  null,
      revisadoPor:  null,
      fechaHoraRevisado: null,
      idAprobadoPor: null,
      aprobadoPor: null,
      fechaHoraAprobado: null,
      peligro: {
        peligroSecundario: '',
        peligroNaturalHumana: ''
      },
      danioVidaSalud: {
        habilitado: 1
      },
      danioMaterial: {
        habilitado: 1
      },
      analisisNecesidad: {
        habilitado: 1
      },
      coordinacion: {
        coordinacion: ''
      },
      conclusionObservacion: {
        conclusionObservacion: ''
      },
      recomendacion: {
        recomendacion: ''
      },
      resumen: {
        resumen: ''
      },
      archivos: [],
      estado_formulario: 1,
      nota: null,
    }

    this.preliminarService.crearInformGeneral(data).subscribe((res: any) => {
      this.alertService.toastSuccess(`${res.message}`);
      this.idPreliminar = res.post.id;
      this.router.navigate([`/form-preliminary/create-information/${this.idPreliminar}/${this.idEmergencia}`]).then(() => {});
    });
  }

  changeViaTransporte(event: any) {
    const select = event.target;
    const val = select.options[select.selectedIndex].getAttribute('name');
    this.formCrearInfoGeneral.controls['viaTransporte'].setValue(val);
  }

  changeTipoVehiculo(event: any) {
    const select = event.target;
    const val = select.options[select.selectedIndex].getAttribute('name');
    this.formCrearInfoGeneral.controls['tipoVehiculo'].setValue(val);
  }

  /*================================== LISTADO ======================================= */
  getAllLesionados(id: number) {
    this.preliminarService.getAllLesionados(id).subscribe(res => {
      this.lesionados = res;
    })
  }

  getAllPersonal(id: number) {
    this.preliminarService.getAllPersonal(id).subscribe(res => {
      this.personal = res;
    })
  }

  back() {
    this.router.navigate([`/quick-evaluation/list/${this.idEmergencia}`]).then(() => { });
  }
}
