import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileService } from '../../../shared/services/profile.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { ThisReceiver } from '@angular/compiler';
import { id } from '@swimlane/ngx-datatable';
import { SolicitudUsuarioEditar } from 'src/app/shared/models/usuario.model';
import { Console } from 'console';
import { AlertService } from '../../../shared/services/alert.service';
import { TYPE_ALERT } from '../../../shared/services/config';
@Component({
  selector: 'app-details-solicitud-creacion-usuario',
  templateUrl: './details-solicitud-creacion-usuario.component.html',
  styleUrls: ['./details-solicitud-creacion-usuario.component.scss']
})
export class DetailsSolicitudCreacionUsuarioComponent implements OnInit {
  public documentTypes: any[] = [
    { id: 1, descripcion: 'DNI' },
    { id: 2, descripcion: 'PASAPORTE' },
    { id: 3, descripcion: 'CARNET DE EXTRANJERIA' },
    { id: 4, descripcion: 'OTRO DOCUMENTO' }
  ]


  public nivelTypes: any = [
    { id: 1, descripcion: 'NACIONAL' },
    { id: 2, descripcion: 'REGIONAL' },
    { id: 3, descripcion: 'PROVINCIAL' },
    { id: 4, descripcion: 'DISTRITAL' },
  ]


  public idsAgregarUsuario: number[] = new Array<number>();
  public isId: any;
  public detailSolicitudUsuario: FormGroup;
  public detaiSollUsuario: any;
  public selectProfile: any;
  public selectInstitucion: any;
  //public selectInstitucionPrivada:any;
  public descripcionInstitucion: string = '';
  public descripcionInstitucionPrivada: string = '';
  public descripcionInstitucionPublica: string = '';
  public descripcionPerfil: string = '';
  public idPerfil: string = '';
  public selectRegion: any;
  public selectProvincia: any;
  public selectDistrito: any;
  public nomProfile: string = '';
  public selectPerfilNivel: any;
  public idPerfilDescripcion: string = '';

  public tipoInstitucion: any;
  public tipoInstitucionPublica: any;
  public tipoInstitucionPrivada: any;
  public descripcionRegion: string = '';
  public descripciontipoInstitucion: string = '';
  public descripcionProvincia: string = '';
  public descripcionDistrito: string = '';
  public descripcionPerfilNivel: string = '';
  public showConbo: boolean = false;
  public chkpriv: boolean = false;
  public chkpub: boolean = false;



  constructor(

    private fb: FormBuilder,
    private router: Router,
    private profilesService: ProfileService,
    public usuarioService: UsuarioService,
    private params: ActivatedRoute,
    private alert: AlertService,

  ) {
    this.detailSolicitudUsuario = this.fb.group({
      codRegion: [''],
      codProvincia: [''],
      codigoSolicitud: [''],
      codDistrito: [''],
      levels: [''],
      fechaRegistro: [''],
      idTipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: new FormControl('', [Validators.required, Validators.email]),
      idPerfil: [],
      cargo: [''],
      idInstitucionPrivada: [''],
      idInstitucionPublica: [''],
      descripcionInstitucion: [''],
      //descripcionInstitucionPrivada:[''],
      nivel: [''],
      rinstitucion: [''],
      codigoRegion: [''],
      descRegion: [''],
      codigoRegionProvincia: [''],
      codigoRegionDistrito: [''],
      idSistema: 1,
      habilitado: 1,
      observacion: [''],
      comentarios: ['']
    });
  }

  ngOnInit(): void {
    this.isId = this.params.snapshot.paramMap.get('id');
    console.log("Id Solicitud: ",this.isId)
    this.getDetaillsUsuario()

  }

  getDetaillsUsuario() {
    this.usuarioService.getSolicitudUsuarioId(this.isId).subscribe((res: any) => {
      this.detaiSollUsuario = res;
      this.detailSolicitudUsuario.controls['codigoSolicitud'].setValue(this.detaiSollUsuario.codigoSolicitud);
      this.detailSolicitudUsuario.controls['idTipoDocumento'].setValue(this.detaiSollUsuario.idTipoDocumento);
      this.detailSolicitudUsuario.controls['numeroDocumento'].setValue(this.detaiSollUsuario.numeroDocumento);
      this.detailSolicitudUsuario.controls['nombres'].setValue(this.detaiSollUsuario.nombres);
      this.detailSolicitudUsuario.controls['apellidos'].setValue(this.detaiSollUsuario.apellidos);
      this.detailSolicitudUsuario.controls['fechaRegistro'].setValue(this.detaiSollUsuario.fechaRegistro)
      this.detailSolicitudUsuario.controls['email'].setValue(this.detaiSollUsuario.email);
      this.detailSolicitudUsuario.controls['levels'].setValue(this.detaiSollUsuario.nivel);
      this.detailSolicitudUsuario.controls['codRegion'].setValue(this.detaiSollUsuario.region);
      this.detailSolicitudUsuario.controls['codProvincia'].setValue(this.detaiSollUsuario.provincia);
      this.detailSolicitudUsuario.controls['codDistrito'].setValue(this.detaiSollUsuario.distrito);
      this.detailSolicitudUsuario.controls['idPerfil'].setValue(+this.detaiSollUsuario.idPerfiles);
      this.detailSolicitudUsuario.controls['cargo'].setValue(this.detaiSollUsuario.nombreCargo);
      this.detailSolicitudUsuario.controls['observacion'].setValue(this.detaiSollUsuario.observacion);
      this.detailSolicitudUsuario.controls['comentarios'].setValue(this.detaiSollUsuario.comentarios);

      console.log("Esto me traes     :    ", res)
      if (this.detaiSollUsuario.descripcionInstitucionPrivada != null) {
        this.detailSolicitudUsuario.controls['descripcionInstitucion'].setValue(this.detaiSollUsuario.descripcionInstitucionPublica)
        this.detailSolicitudUsuario.controls['idInstitucionPublica'].setValue(this.detaiSollUsuario.idInstitucionPublica)
        this.descripcionInstitucion = this.detaiSollUsuario.descripcionInstitucionPrivada

      } else {
        this.detailSolicitudUsuario.controls['descripcionInstitucion'].setValue(this.detaiSollUsuario.descripcionInstitucionPrivada)
        this.detailSolicitudUsuario.controls['idInstitucionPublica'].setValue(this.detaiSollUsuario.idInstitucionPrivada)
        this.descripcionInstitucion = this.detaiSollUsuario.descripcionInstitucionPublica
      }

      if (this.detaiSollUsuario.nivel == 1) {
        this.getPerfilNivel()
      } else if (this.detaiSollUsuario.nivel == 2) { // Regional
        this.getPerfilNivel()
        this.getRegion();
      } else if (this.detaiSollUsuario.nivel == 3) { // Provincial
        this.getPerfilNivel()
        this.getRegion();
        this.getProvincia(this.detaiSollUsuario.region, true);
      } else if (this.detaiSollUsuario.nivel == 4) { // Distrital
        this.getPerfilNivel()
        this.getRegion();
        this.getProvincia(this.detaiSollUsuario.region, true);
        this.getDistrito(this.detaiSollUsuario.provincia, true);
      }


      if (this.detaiSollUsuario.idInstitucionPublica != null) {
        this.getInstitucionPublica(this.detaiSollUsuario.idInstitucionPublica)
        this.detailSolicitudUsuario.controls['rinstitucion'].setValue(`1`)
      } else {
        this.getInstitucionPrivada(this.detaiSollUsuario.idInstitucionPrivada)
        this.detailSolicitudUsuario.controls['rinstitucion'].setValue(`2`)
      }



      this.idPerfilDescripcion = this.detaiSollUsuario.idPerfiles
      

    });
  }

  cancelProject() {
    this.router.navigate(['/seguridad/solicitud-creacion-credenciales']).then(r => r);
  }



  EditarUsuario() {

    var descpb, despv

    if (this.tipoInstitucion == 1) {
      despv = this.descripcionInstitucion
      descpb = ''
    } else {
      despv = ''
      descpb = this.descripcionInstitucion
    }
    var cargo
    cargo = this.detailSolicitudUsuario.controls['cargo'].value
    console.log("Cargo     :   ", this.detailSolicitudUsuario.controls['cargo'].value)
    console.log("Perfil     :   ", this.detailSolicitudUsuario.value.idPerfil)
    console.log("Tipo documento    :   ", this.detailSolicitudUsuario.value.idTipoDocumento)

    const data: SolicitudUsuarioEditar = {
      id: this.isId,
      codigoSolicitud: this.detailSolicitudUsuario.value.codigoSolicitud,
      nombres: this.detailSolicitudUsuario.value.nombres,
      apellidos: this.detailSolicitudUsuario.value.apellidos,
      idInstitucionPublica: this.tipoInstitucionPublica,
      idInstitucionPrivada: this.tipoInstitucionPrivada,
      descripcionInstitucionPrivada: despv,
      descripcionInstitucionPublica: descpb,
      email: this.detailSolicitudUsuario.value.email,
      fechaRegistro: this.detailSolicitudUsuario.value.fechaRegistro,
      idTipoDocumento: this.detailSolicitudUsuario.value.idTipoDocumento,
      numeroDocumento: this.detailSolicitudUsuario.value.numeroDocumento,
      nivel: this.detailSolicitudUsuario.value.levels,
      region: this.detailSolicitudUsuario.value.codRegion,
      provincia: this.detailSolicitudUsuario.value.codProvincia,
      distrito: this.detailSolicitudUsuario.value.codDistrito,
      nombreCargo: cargo,
      idPerfiles: String(this.detailSolicitudUsuario.value.idPerfil),
      estado: 1,
      habilitado: 1,
      observacion: this.detailSolicitudUsuario.value.observacion,
      comentarios: this.detailSolicitudUsuario.value.comentarios,
    }

    this.setvalue();
    this.alert.questionAlertConfirm(
      '¿Est&aacute;s Seguro de Actualizar la Solicitud de Credenciales?',
      '',
      'S&iacute;, Actualizar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.usuarioService.getUpdateSolicitudUsuario(data).subscribe((res: any) => {
            this.alert.toastSuccess('Actualizaci&oacute;n Correctamente');
            this.router.navigate(['/seguridad/solicitud-creacion-credenciales'])
            this.getDetaillsUsuario();
          });
        }
      }
    );
  }

  setvalue() {
    var nivel
    var valor
    nivel = this.detailSolicitudUsuario.value.nivel


    if (nivel == '1') {

      valor = this.detailSolicitudUsuario.value.codRegion = ""
      this.detailSolicitudUsuario.value.codProvincia = ""
      this.detailSolicitudUsuario.value.codDistrito = ""



    } else if (nivel == '2') {
      this.detailSolicitudUsuario.value.codProvincia = ""
      this.detailSolicitudUsuario.value.codDistrito = ""
    } else if (nivel == '3') {
      this.detailSolicitudUsuario.value.codDistrito = ""
    }

  }

  changeStatus(estado: number) {

    console.log("Id de institiucion publica fuera   :   ", this.detailSolicitudUsuario.controls['rinstitucion'].value)

    this.tipoInstitucion = this.detailSolicitudUsuario.controls['rinstitucion'].value

    if (estado == 1) {
      this.descripciontipoInstitucion = "INSTITUCION PUBLICA"
      this.usuarioService.getInstitucionPublica().subscribe(rows => {
        this.selectInstitucion = rows;
        console.log("INSTITUCIONES PUB       :   ", rows)
        this.detailSolicitudUsuario.controls['descripcionInstitucion'].setValue(1)
      })

      this.tipoInstitucionPrivada = ''
      this.tipoInstitucionPublica = 1


    } else {
      this.descripciontipoInstitucion = "INSTITUCION PRIVADA"
      this.usuarioService.getInstitucionPrivada().subscribe(rows => {
        this.selectInstitucion = rows;
        console.log("INSTITUCIONES PRIV       :   ", rows)
        this.detailSolicitudUsuario.controls['descripcionInstitucion'].setValue(1)
        console.log("Id de institiucion privada    :   ", this.detailSolicitudUsuario.controls['descripcionInstitucion'].value)
      })
      this.tipoInstitucionPublica = ''
      this.tipoInstitucionPrivada = 1

    }
    this.showConbo = true;
  }


  getPerfilNivel() {
    var nivel
    //this.detailSolicitudUsuario.controls['idPerfil'].patchValue('')
    nivel = this.detailSolicitudUsuario.value.levels
    this.getRegion();
    this.usuarioService.getPerfilNivel(nivel).subscribe(rows => {
      this.selectPerfilNivel = rows;
      this.selectPerfilNivel = this.selectPerfilNivel.perfiles;
    })
  }

  getSelectPerfilNivel(event: any) {
    this.idPerfil = event.id
    this.descripcionPerfilNivel = event.nombre;
  }

  //Instituciones
  getInstitucionPublica(id = null) {
    this.usuarioService.getInstitucionPublica().subscribe(rows => {
      this.selectInstitucion = rows;
      if (id != null) {
        this.detailSolicitudUsuario.controls['descripcionInstitucion'].setValue(id)
      }
    })
    this.tipoInstitucionPrivada = ''
    this.tipoInstitucionPublica = 1
  }

  getSelectInstitucion(event: any) {
    this.descripcionInstitucion = event.nombre;
    this.tipoInstitucionPublica = event.id;

    console.log("El tipo de institucion es    :    ", this.tipoInstitucionPublica)
    if (this.tipoInstitucion == 1) {
      this.tipoInstitucionPublica = ''
      this.tipoInstitucionPrivada = event.id
      this.tipoInstitucion

    } else {
      this.tipoInstitucionPublica = event.id
      this.tipoInstitucionPrivada = ''

    }
  }

  getInstitucionPrivada(id = null) {
    console.log("ID INSTPRIVADA     :    ", id)
    this.usuarioService.getInstitucionPrivada().subscribe(rows => {
      this.selectInstitucion = rows;
      if (id != null) {
        this.detailSolicitudUsuario.controls['descripcionInstitucion'].setValue(id)
      }
    })
    console.log("Valor del ID    :  ", this.detailSolicitudUsuario.controls['descripcionInstitucion'].value)
    this.tipoInstitucionPrivada = 1
    this.tipoInstitucionPublica = ''
    console.log("tipoInstitucionPrivada     :   ", this.tipoInstitucionPrivada)
  }

  //Region
  getRegion() {
    this.usuarioService.getRegion().subscribe(rows => {
      this.selectRegion = rows;
    })
  }
  getSelectRegion(event: any) {
    this.getProvincia(event.codRegion);
  }

  //Provincia
  getProvincia(codRegion: string, fromDetailUser = false) {

    this.usuarioService.getProvincia(codRegion).subscribe(rows => {
      this.selectProvincia = rows;
      if (!fromDetailUser) {
        this.detailSolicitudUsuario.controls['codProvincia'].reset();
        this.detailSolicitudUsuario.controls['codDistrito'].reset();
      }
    })
  }

  getSelectProvincia(event: any) {
    console.log("este es el event   :    ", event)
    this.descripcionProvincia = event.descripcion;
    this.getDistrito(event.codProvincia);
  }

  //Distrito
  getDistrito(codRegionProv: string, fromDetailUser = false) {
    this.usuarioService.getDistrito(codRegionProv).subscribe(rows => {
      this.selectDistrito = rows;
      if (!fromDetailUser) {
        this.detailSolicitudUsuario.controls['codDistrito'].reset();
      }
    })
  }

  getSelectDistrito(event: any) {
    this.descripcionDistrito = event.descripcion;
  }

}
