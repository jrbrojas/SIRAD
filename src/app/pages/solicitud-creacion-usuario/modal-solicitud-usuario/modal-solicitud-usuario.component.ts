import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { AuthService } from '../../../shared/services/auth.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { TYPE_ALERT } from '../../../shared/services/config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudUsuario, SolicitudUsuarioEditar } from '../../../shared/models/usuario.model';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-solicitud-usuario',
  templateUrl: './modal-solicitud-usuario.component.html',
  styleUrls: ['./modal-solicitud-usuario.component.scss']
})
export class ModalSolicitudUsuarioComponent implements OnInit {

  public solicitudUser: any;
  public detailSolicitudUsuario: any;
  public isShowButton: boolean = false;
  public isShowInputUpdate: boolean = false;
  public updateSolicitud: FormGroup;
  @Input() idSolicitud;
  public counter: number = 0;
  public idPerfil: string = '';
  
  constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    public usuarioService: UsuarioService,
    public authService: AuthService,
    private alertService: AlertService,
    private params: ActivatedRoute,
    private modalService: NgbModal,
    public activemodal: NgbActiveModal,

  ) { 
    this.updateSolicitud = this.fb.group({
      id: ['', [Validators.required]],
      codigoSolicitud: [''],
      fechaRegistro: [''],
      nombres: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      username: [''],
      tipoInstitucion: [''],
      idTipoDocumento: ['',[Validators.required]],
      numeroDocumento: ['',[Validators.required]],
      idInstitucionPublica: [''],
      idInstitucionPrivada: [''],
      descripcionInstitucionPublica: ['',[Validators.required]],
      descripcionInstitucionPrivada: ['',[Validators.required]],
      nombreCargo: ['',[Validators.required]],
      email: new FormControl('', [Validators.required,Validators.email]),
      nivel: [''],
      region: [''],
      provincia: [''],
      distrito: [''],
      estado: [''],
      habilitado: [''],
      idPerfil: [],
      observacion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getDetaillsSolicitudUsuario();
    console.log(this.idSolicitud)
  }

  getDetaillsSolicitudUsuario() {
    this.usuarioService.getSolicitudUsuarioId(this.idSolicitud).subscribe((res : any) => {
      this.detailSolicitudUsuario = res;
      console.log("Solicitudes: ",res);
      this.updateSolicitud.controls['id'].setValue(res.id);
      this.updateSolicitud.controls['codigoSolicitud'].setValue(res.codigoSolicitud);
      this.updateSolicitud.controls['nombres'].setValue(res.nombres);
      this.updateSolicitud.controls['apellidos'].setValue(res.apellidos);
      this.updateSolicitud.controls['username'].setValue(res.numeroDocumento);
      this.updateSolicitud.controls['fechaRegistro'].setValue(res.fechaRegistro);
      this.updateSolicitud.controls['nombreCargo'].setValue(res.nombreCargo);
      this.updateSolicitud.controls['idTipoDocumento'].setValue(res.idTipoDocumento);
      this.updateSolicitud.controls['numeroDocumento'].setValue(res.numeroDocumento);
      this.updateSolicitud.controls['email'].setValue(res.email);
      this.updateSolicitud.controls['idInstitucionPublica'].setValue(res.idInstitucionPublica);
      this.updateSolicitud.controls['descripcionInstitucionPublica'].setValue(res.descripcionInstitucionPublica);
      this.updateSolicitud.controls['idInstitucionPrivada'].setValue(res.idInstitucionPrivada);
      this.updateSolicitud.controls['descripcionInstitucionPrivada'].setValue(res.descripcionInstitucionPrivada);
      this.updateSolicitud.controls['nivel'].setValue(res.nivel);
      this.updateSolicitud.controls['region'].setValue(res.region);
      this.updateSolicitud.controls['provincia'].setValue(res.provincia);
      this.updateSolicitud.controls['distrito'].setValue(res.distrito);
      this.updateSolicitud.controls['observacion'].setValue(res.observacion);
      this.updateSolicitud.controls['comentarios'].setValue(res.comentarios);
      this.updateSolicitud.controls['idPerfil'].setValue(+res.idPerfiles);
    });
  }

  updateSolicitudUsuario() {
    const dataU: SolicitudUsuarioEditar = {
      id: this.updateSolicitud.value.id,
      codigoSolicitud: this.updateSolicitud.value.codigoSolicitud,
      nombres: this.updateSolicitud.value.nombres,
      apellidos: this.updateSolicitud.value.apellidos,
      username: this.updateSolicitud.value.numeroDocumento,
      fechaRegistro: this.updateSolicitud.value.fechaRegistro,
      nombreCargo: this.updateSolicitud.value.nombreCargo,
      idTipoDocumento: this.updateSolicitud.value.idTipoDocumento,
      numeroDocumento: this.updateSolicitud.value.numeroDocumento,
      email: this.updateSolicitud.value.email,
      idInstitucionPublica: this.updateSolicitud.value.idInstitucionPublica,
      descripcionInstitucionPublica: this.updateSolicitud.value.descripcionInstitucionPublica,
      idInstitucionPrivada: this.updateSolicitud.value.idInstitucionPrivada,
      descripcionInstitucionPrivada: this.updateSolicitud.value.descripcionInstitucionPrivada,
      nivel: this.updateSolicitud.value.nivel,
      region: this.updateSolicitud.value.region,
      provincia: this.updateSolicitud.value.provincia,
      distrito: this.updateSolicitud.value.email,
      observacion: this.updateSolicitud.value.observacion,
      estado: 3,
      habilitado:1,
      idPerfiles: String(this.updateSolicitud.value.idPerfil),
      comentarios: this.updateSolicitud.value.comentarios
    }
    console.log("Solicitudes: ",dataU)
    //return
    this.alert.questionAlertConfirm(
      '¿Est&aacute;s seguro de observar la Solicitud?',
      '',
      'S&iacute;, Actualizar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.usuarioService.getUpdateSolicitudUsuario(dataU).subscribe((res: any) => {
            console.log(res)
            this.alert.toastSuccess('Solicitud de Credenciales Observado');
            this.router.navigate(['/seguridad/solicitud-creacion-credenciales']).then(() => { });
            this.getDetaillsSolicitudUsuario();
            this.closeModal();
          });
        }
      }
    );
  }

  closeModal() {
    this.activemodal.close();
  }

  onKey(event: any) {
    this.counter = event.target.value.length;
  }
}
