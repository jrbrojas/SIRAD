import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudUsuario, SolicitudUsuarioEditar } from '../../../shared/models/usuario.model';
import { AlertService } from '../../../shared/services/alert.service';
import { PersonasService } from 'src/app/shared/services/personas.service';
import { TYPE_ALERT } from '../../../shared/services/config';
import { Persona } from 'src/app/shared/models/emergency.model';

@Component({
  selector: 'app-add-solicitud-creacion-usuario',
  templateUrl: './add-solicitud-creacion-usuario.component.html',
  styleUrls: ['./add-solicitud-creacion-usuario.component.scss']
})
export class AddSolicitudCreacionUsuarioComponent implements OnInit {
  public documentTypes: any[] = [
    { id: 1, descripcion: 'DNI' },
    { id: 2, descripcion: 'PASAPORTE' },
    { id: 3, descripcion: 'CARNET DE EXTRANJERIA' },
    { id: 4, descripcion: 'OTRO DOCUMENTO' }
  ]

  public createSolicitudUser: FormGroup;
  public showConbo : boolean = false;

  public selectCargo: any;
  public selectRegion: any;
  public selectProvincia: any;
  public selectDistrito:any;
  public selectInstitucionPublica:any;
  public selectInstitucionPrivada:any;
  public selectPerfilNivel: any;

  public descripcionCargo: string = '';
  public descripcionProvincia: string = '';
  public descripcionDistrito: string = '';
  public descripcionInstitucionPublica: string = '';
  public descripcionInstitucionPrivada: string = '';
  public descripcionPerfilNivel: string = '';

  public tipoInstitucionPublica: any;
  public tipoInstitucionPrivada: any;
  public idCargo: any;
  public idNivel: any;
  public disButton = true
  public loadButton = false
  public disEdit = false
  public user : any

  constructor(
    private fb: FormBuilder,
    public usuarioService: UsuarioService,
    public form2aService: Form2aService,
    private router: Router,
    private alertService: AlertService,
    private params: ActivatedRoute,
    private personaService : PersonasService
  ) {
    this.createSolicitudUser = this.fb.group({
      tipoInstitucion: ['',[Validators.required]],
      idTipoDocumento: ['',[Validators.required]],
      numeroDocumento: ['',[Validators.required]],
      nombres: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      username: ['',[Validators.required]],
      idInstitucionPublica: ['',[Validators.required]],
      idInstitucionPrivada: ['',[Validators.required]],
      descripcionInstitucionPublica: ['',[Validators.required]],
      descripcionInstitucionPrivada: ['',[Validators.required]],
      nombreCargo: ['',[Validators.required]],
      email: new FormControl('', [Validators.required,Validators.email]),
      nivel: ['',[Validators.required]],
      region: ['',[Validators.required]],
      provincia: ['',[Validators.required]],
      distrito: ['',[Validators.required]],
      estado: ['',[Validators.required]],
      habilitado: ['',[Validators.required]],
      idPerfiles: ['',[Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getCargo();
    this.getRegion();
    this.getInstitucionPublica();
    this.getInstitucionPrivada();
    //this.getPerfilNivel();
  }

  changeStatus(estado : number){
    if(estado == 1) {
      this.tipoInstitucionPrivada = "";
      this.descripcionInstitucionPrivada = ""
    }
    else {
      this.tipoInstitucionPublica = "";
      this.descripcionInstitucionPublica = ""
    }
    this.showConbo = true;
  }

  /*Cargo*/
  getCargo() {
    this.usuarioService.getCargo().subscribe(rows => {
      this.selectCargo = rows;
    })
  }

  getSelectCargo(event: any) {
    this.descripcionCargo = event.descripcion;
    this.idCargo = event.id;
  }

  /*Instituciones Publicas*/
  getInstitucionPublica() {
    this.usuarioService.getInstitucionPublica().subscribe(rows => {
      this.selectInstitucionPublica = rows;
    })
  }

  getSelectInstitucionPublica(event: any) {
    console.log("Institucion Publica: ",event)
    this.descripcionInstitucionPublica = event.nombre;
    this.tipoInstitucionPublica = event.id;
    console.log("publica     :    ", this.tipoInstitucionPublica)
  }

  /*Instituciones Privadas*/
  getInstitucionPrivada() {
    this.usuarioService.getInstitucionPrivada().subscribe(rows => {
      this.selectInstitucionPrivada = rows;
    })
  }

  getSelectInstitucionPrivada(event: any) {
    this.descripcionInstitucionPrivada = event.nombre;
    this.tipoInstitucionPrivada = event.id;
  }

  /*Region*/
  getRegion() {
    this.usuarioService.getRegion().subscribe(rows => {
      this.selectRegion = rows;
    })
  }

  getSelectRegion(event: any) {
    this.getProvincia(event.codRegion);
    //this.createSolicitudUser.controls['descRegion'].setValue(event.descripcion);
  }

  /*Provincia*/
  getProvincia(codRegion: string) {
    this.usuarioService.getProvincia(codRegion).subscribe(rows => {
      this.selectProvincia = rows;
      //this.createSolicitudUser.controls['codProvincia'].reset();
    })
  }

  getSelectProvincia(event: any) {
    this.descripcionProvincia = event.descripcion;
    this.getDistrito(event.codProvincia);
  }

  /*Distrito*/
  getDistrito(codRegionProv: string) {
    this.usuarioService.getDistrito(codRegionProv).subscribe(rows => {
      this.selectDistrito = rows;
      //this.createSolicitudUser.controls['codDistrito'].reset();
    })
  }

  getSelectDistrito(event: any) {
    this.descripcionDistrito = event.descripcion;
  }

  /*Perfil por Nivel*/
  getPerfilNivel() {
    var nivel
    nivel = this.createSolicitudUser.value.nivel,
    this.usuarioService.getPerfilNivel(nivel).subscribe(rows => {
      //console.log("Perfil por Nivel: ",rows[0].nivel)
      this.selectPerfilNivel = rows;
      this.selectPerfilNivel = this.selectPerfilNivel.perfiles;
    })
  }

  getSelectPerfilNivel(event: any) {
    console.log("Nivel: ",event)
    this.descripcionPerfilNivel = event.descripcion;
  }

  cancelProject() {
    this.router.navigate(['/seguridad/solicitud-creacion-credenciales']).then(r => r);
  }

  /**Crear SOlicitud de Usuarios**/
  createSolicitudUsuarios() {
    if(this.tipoInstitucionPublica == undefined) this.tipoInstitucionPublica = ""
    if(this.tipoInstitucionPrivada == undefined) this.tipoInstitucionPrivada = ""
    const data: SolicitudUsuarioEditar = {
      idTipoDocumento: this.createSolicitudUser.value.idTipoDocumento,
      numeroDocumento: this.createSolicitudUser.value.numeroDocumento,
      nombres: this.createSolicitudUser.value.nombres,
      apellidos: this.createSolicitudUser.value.apellidos,
      username: this.createSolicitudUser.value.numeroDocumento,
      idInstitucionPublica: this.tipoInstitucionPublica,
      descripcionInstitucionPublica: this.descripcionInstitucionPublica,
      idInstitucionPrivada: this.tipoInstitucionPrivada,
      descripcionInstitucionPrivada: this.descripcionInstitucionPrivada,
      nombreCargo: this.createSolicitudUser.value.nombreCargo,
      email: this.createSolicitudUser.value.email,
      nivel: this.createSolicitudUser.value.nivel,
      region: this.createSolicitudUser.value.region,
      provincia: this.createSolicitudUser.value.provincia,
      distrito: this.createSolicitudUser.value.distrito,
      estado: 1,
      habilitado: 1,
      idPerfiles: this.createSolicitudUser.value.idPerfiles
    }

    console.log("Solicitud: ",data)

    this.setvalue();
    //return
    this.alertService.questionAlertConfirm(
      '¿Est&aacute;s seguro de crear la solicitud de creaci&oacute;n de usuario?',
      '',
      'S&iacute;, Crear',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.usuarioService.createSolicitudUsuario(data).subscribe((res: any) => {
            this.alertService.toastSuccess('Solicitud de Usuarios Creado Correctamente');
            this.router.navigate(['/seguridad/solicitud-creacion-credenciales']).then(() => { });
            this.alertService.confirmAlert(`C&oacute;digo Solicitud <br><b style="font-size: 60px">${res.codigoSolicitud}</b>`, TYPE_ALERT.SUCCESS);
            this.usuarioService.showLoader = false;
          })
        } else {
          this.usuarioService.showLoader = false;
        }
      }
    );

  }

  setvalue() {
    var nivel
    var valor
    nivel = this.createSolicitudUser.value.nivel


    if (nivel == '1') {

      valor = this.createSolicitudUser.value.codRegion = ""
      this.createSolicitudUser.value.codProvincia = ""
      this.createSolicitudUser.value.codDistrito = ""



    } else if (nivel == '2') {
      this.createSolicitudUser.value.codProvincia = ""
      this.createSolicitudUser.value.codDistrito = ""
    } else if (nivel == '3') {
      this.createSolicitudUser.value.codDistrito = ""
    }

  }

  /*getNivelPerfil(event:any){
    const nivel = this.createSolicitudUser.value.nivel;
    switch (nivel) {
      case 1:
        this.getPerfilNivel(event.nivel);
        break;
      case 2:
        this.getPerfilNivel(event.nivel);
        break;
      case 3:
        this.getPerfilNivel(event.nivel);
        break;
      case 4:
        this.getPerfilNivel(event.nivel);
        break;

    }
  }*/


  cantidaDigitos(){
    var longitud
    longitud  = this.createSolicitudUser.controls['nombres'].get.length
    console.log("La longitud es  :    ",longitud)
  }





  consultarDni(){
    this.loadButton = true
    let dniRequested = this.createSolicitudUser.controls['numeroDocumento'].value
    this.user == "00374311"

    //this.personaService.obtenerPersona(dniRequested).subscribe(
      //response => {
        /* if(response === null){ */
          this.form2aService.queryReniec( "00374311" , dniRequested).subscribe(
            response => {
              if(response.coResultado == "0000"){
                console.log(response)
                let apellidosConcat = `${response.datosPersona.primerApellido}  ${response.datosPersona.segundoApellido}`
                this.createSolicitudUser.controls['nombres'].setValue(response.datosPersona.prenombres)
                this.createSolicitudUser.controls['apellidos'].setValue(apellidosConcat)
              /*
                if(response.datosPersona.genero == "MASCULINO"){
                  this.createSolicitudUser.controls['sex'].setValue('M')
                }else{
                  this.createSolicitudUser.controls['sex'].setValue('F')
                }

                let desNac = response.datosPersona.fechaNacimiento.split('/')
                this.createSolicitudUser.controls['birthDate'].setValue(`${desNac[1]}/${desNac[0]}/${desNac[2]}`)
          */

                this.loadButton = false
                this.disEdit = true

                const data: Persona = {
                  dni : response.datosPersona.dni,
                  prenombres : response.datosPersona.prenombres,
                  primerapellido : response.datosPersona.primerApellido,
                  segundoapellido : response.datosPersona.segundoApellido,
                  apellidocasada : response.datosPersona.apellidoCasada,
                  fechanacimiento : response.datosPersona.fechaNacimiento,
                  genero : response.datosPersona.genero
                }

                this.personaService.guardarPersona(data).subscribe(response => console.log(response))

              }
              else{
                this.alertService.confirmAlert(response.deResultado, TYPE_ALERT.WARNING )
                this.createSolicitudUser.controls['numeroDocumento'].reset();
                this.createSolicitudUser.controls['apellidos'].reset();
                this.createSolicitudUser.controls['nombres'].reset();
               this.loadButton = false
              }
            }
          )
  }

/*
  changeTypeDocument(event: any) {
    this.disButton = true;
    this.disEdit = false;
    this.createSolicitudUser.controls['numeroDocumento'].reset();
    this.createSolicitudUser.controls['apellidos'].reset();
    const select = event.target;
    const val = select.options[select.selectedIndex].getAttribute(' ');
    this.createSolicitudUser.controls['tipoDocumento'].setValue(val);
    if(val === "DNI"){
      this.disButton = false

    }

  }
*/


}
