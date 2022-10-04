import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../shared/services/profile.service';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { Usuario, UsuarioEditar } from '../../../shared/models/usuario.model';
import { AlertService } from '../../../shared/services/alert.service';
import { PersonasService } from 'src/app/shared/services/personas.service';
import { TYPE_ALERT } from '../../../shared/services/config';
import { Persona } from 'src/app/shared/models/emergency.model';
import { empty, isEmpty } from 'rxjs';
import { Select } from 'ol/interaction';



/*
function emptySelect(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value === null || c.value === '00' || c.value === '' || c.value === 0 ){
    return { 'emptyOption': true };
  }
  return null;
}
*/
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})


export class AddUsersComponent implements OnInit {
  //
  public idsPerfilesUsuario: number[] = new Array<number>();

  public isId: any;
  public selectProfile: any;
  public selectRegion: any;
  public selectProvincia: any;
  public selectDistrito: any;
  public createUser: FormGroup;
  public nomProfile: string = '';
  public descripcionRegion: string = '';
  public descripcionProvincia: string = '';
  public descripcionPerfilNivel: string = '';
  public descripcionDistrito: string = '';
  public user: any;
  public disEdit = false
  public existedniusuario: boolean =  false;
  public existednisolicitudusuario: boolean =  false;
  public existeEmailUsuario: boolean  = false;
  public existeEmailSolicitudUsuario: boolean = false;


  public HabilitarPerfil: boolean = true;
  public loadButton = false;

  disbled: boolean = false;
  public counter: number = 0;
  public nivel: number = 0;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public form2aService: Form2aService,
    private profilesService: ProfileService,
    public usuarioService: UsuarioService,
    private params: ActivatedRoute,
    private personaService : PersonasService,
    private alertService: AlertService
  ) {
    this.createUser = this.fb.group({
      codRegion: [''],
      codProvincia: [''],
      codDistrito: [''],
      levels: [''],
      idTipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      username: [''],
      password: ['', [Validators.required]],
      email: new FormControl('', [Validators.required, Validators.email]),
      idPerfil: [[]],
      nivel: [''],
      cargo:[''],
      codigoRegion: [''],
      descRegion: [''],
      codigoRegionProvincia: [''],
      codigoRegionDistrito: [''],
      idSistema: 1
    });
  }

  ngOnInit(): void {
    this.isId = this.params.snapshot.paramMap.get('codRegion');
    this.getProfile();
    this.getRegion();
  }

  get idPerfil() {
    return this.createUser.get('idPerfil') as FormArray
  }



  createUsuarios() {





    //this.validacionUbigeo()
    const data: Usuario = {
      
      idTipoDocumento: this.createUser.value.idTipoDocumento,
      numeroDocumento: this.createUser.value.numeroDocumento,
      nombres: this.createUser.value.nombres,
      apellidos: this.createUser.value.apellidos,
      username: this.createUser.value.numeroDocumento,
      password: this.createUser.value.password,
      email: this.createUser.value.email,
      nivel : this.createUser.value.levels,
      codigoRegion: this.createUser.value.codRegion,
      descRegion: this.createUser.value.descRegion,
      codigoRegionProvincia: this.createUser.value.codProvincia,
      codigoRegionDistrito: this.createUser.value.codDistrito,
      idsPerfiles: String(this.createUser.value.idPerfil),
      cargo:" ",
      habilitado: 1,
      idSistema: 1,

    }
    
    
    this.setvalue();

    this.ExisteEmail(this.createUser.value.email)
    this.ExisteEmailSoLicitud(this.createUser.value.email)
    
/*
    if(this.existeEmailUsuario==true || this.existeEmailSolicitudUsuario == true){

      this.alertService.confirmAlert('El correo electronico', TYPE_ALERT.WARNING )
      //this.alertService.toastError(`${res.mensaje}`);
      this.createUser.controls['email'].reset();

    }
*/
 //   console.log("Esto es lo que se envia creacion de usuario    :  ", data),



    this.alertService.questionAlertConfirm(
      'Est&aacute;s Seguro de Crear el Usuario?',
      '',
      'S&iacute;, Crear',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.usuarioService.createUsuario(data).subscribe(
            res => {
              let msj = res;
              if (msj != '0') {
                this.alertService.toastSuccess(msj);
                this.router.navigate(['/seguridad/usuarios']).then(() => {
                  this.usuarioService.showLoader = false;
                });
              } else {
                this.alertService.toastError('Error');
              }
            }
          );

        } else {
          this.usuarioService.showLoader = false;
        }
      }
    );

  }

  cancelProject() {
    this.router.navigate(['/seguridad/usuarios']).then(r => r);
  }

  // Perfil
  getProfile() {
    this.profilesService.getProfile().subscribe(rows => {
      console.log("Perfiles: ",rows)
      this.selectProfile = rows.map((r: any) => {
        return { id: r.id, nombre: r.nombre }
      });
      this.createUser.controls['idPerfil'].reset();
    })
  }


  getSelectProfile(event: any) {
    let ids: number[] = []
    this.descripcionPerfilNivel = event.nombre;
  }


  //Region
  getRegion() {
    this.usuarioService.getRegion().subscribe(rows => {
      this.selectRegion = rows;
    })
  }

  getSelectRegion(event: any) {
    this.HabUigeo('Region')
    this.getProvincia(event.codRegion);
    this.createUser.controls['descRegion'].setValue(event.descripcion);
  }

  //Provincia
  getProvincia(codRegion: string) {

    this.usuarioService.getProvincia(codRegion).subscribe(rows => {
      this.selectProvincia = rows;
      this.createUser.controls['codProvincia'].reset();
    })
  }

  getSelectProvincia(event: any) {
    this.HabUigeo('Provincia')
    this.descripcionProvincia = event.descripcion;
    this.getDistrito(event.codProvincia);
  }

  //Distrito
  getDistrito(codRegionProv: string) {
    this.usuarioService.getDistrito(codRegionProv).subscribe(rows => {
      this.selectDistrito = rows;
      this.createUser.controls['codDistrito'].reset();
    })
  }

  getSelectDistrito(event: any) {
    this.HabUigeo('Distrito')
    this.descripcionDistrito = event.descripcion;
  }

  setvalue() {
    var nivel
    var valor
    nivel = this.createUser.value.levels
    //this.createUser.controls['idPerfil'].reset();
    var nivel
    nivel = this.createUser.value.levels,
    console.log("Esto es lo que se envia      :     " , nivel)
    this.usuarioService.getPerfilNivel(nivel).subscribe(rows => {
      this.selectProfile = rows;
      this.selectProfile = this.selectProfile.perfiles;
    })


    if (nivel == '1') {
      //this.HabilitarPerfil = false
      this.HabilitarPerfil = false
//      valor = this.createUser.value.codRegion
      this.createUser.controls['codRegion'].reset();
      this.createUser.value.codRegion = " "
      this.createUser.controls['codProvincia'].reset();
      this.createUser.value.codProvincia = ""
      this.createUser.controls['codDistrito'].reset();
      this.createUser.controls['idPerfil'].reset();
      this.createUser.value.codDistrito = ""
      
    } else if (nivel == '2') {
      this.HabilitarPerfil = true
      this.createUser.controls['codRegion'].reset();
      this.createUser.controls['codProvincia'].reset();
      this.createUser.value.codProvincia = ""
      this.createUser.controls['codDistrito'].reset();
      this.createUser.controls['idPerfil'].reset();
      this.createUser.value.codDistrito = ""
      } else if (nivel == '3') {
      this.HabilitarPerfil = true
      this.createUser.controls['codRegion'].reset();
      this.createUser.controls['codProvincia'].reset();
      this.createUser.controls['codDistrito'].reset();
      this.createUser.controls['idPerfil'].reset();
      this.createUser.value.codDistrito = ""
    }else if (nivel == '4'){

      this.createUser.controls['codRegion'].reset();
      this.createUser.controls['codProvincia'].reset();
      this.createUser.controls['codDistrito'].reset();
      this.createUser.controls['idPerfil'].reset();
      this.HabilitarPerfil = true
    }

  }


  existeDniUser(dni: any){
    this.usuarioService.getValidacionDniUsuario(dni).subscribe((res : any )=>
    
      this.existedniusuario = res
    
    )
        console.log("Lo que devuelve la validacion de DNI usuario     :   " , )
  }

  existeDniSolicitudUser(dni:any){
    this.usuarioService.getValidacionDniSolicitudUsuario(dni).subscribe((res : any )=> 
    {
      this.existednisolicitudusuario = res  
    }
    )
  }


  consultarDni(){
    this.loadButton = true
    let dniRequested = this.createUser.controls['numeroDocumento'].value
    this.user == "00374311"

    this.existeDniUser(dniRequested)
    this.existeDniSolicitudUser(dniRequested)


console.log("Existe en usuario    :   ",  this.existedniusuario )
console.log("Existe en Solicitud de Usuario    :  " , this.existeDniSolicitudUser)


    console.log("Esto se envia    :   ", dniRequested)

          this.form2aService.queryReniec( "00374311" , dniRequested).subscribe(
            response => {
              
            
            
           if( this.existedniusuario == true || this.existednisolicitudusuario == true) {
            this.alertService.confirmAlert("El numero de documento ya existe en sistema ", TYPE_ALERT.WARNING )
            this.createUser.controls['apellidos'].reset();
            this.createUser.controls['nombres'].reset();
            this.loadButton = false
          }else if(response.coResultado == "0000"){
                console.log(response)
                let apellidosConcat = `${response.datosPersona.primerApellido}  ${response.datosPersona.segundoApellido}`
                this.createUser.controls['nombres'].setValue(response.datosPersona.prenombres)
                this.createUser.controls['apellidos'].setValue(apellidosConcat)
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
                this.createUser.controls['numeroDocumento'].reset();
                this.createUser.controls['apellidos'].reset();
                this.createUser.controls['nombres'].reset();
               this.loadButton = false
              }
            }
          )
  }

  onKey(event: any) {
    this.counter = event.target.value.length;
  }

  HabUigeo(Ubigeo: any){
    var nivel

    nivel = this.createUser.value.levels

    if(nivel == 2 && Ubigeo== 'Region'){
      this.HabilitarPerfil = false
    }else  if ( nivel == 3 && Ubigeo == 'Provincia'){
    this.HabilitarPerfil = false
    }else if (nivel == 4 && Ubigeo == 'Distrito' ){
    this.HabilitarPerfil = false
    }else{
    this.HabilitarPerfil = true
    }
  }

  ExisteEmail(email: any){
    this.usuarioService.getValidacionEmailUsuario(email).subscribe((res:any)=>{
    this.existeEmailUsuario =  res

    if(this.existeEmailUsuario ==  true){
      this.alertService.confirmAlert("El email ya existe en Usuarios", TYPE_ALERT.WARNING )
      this.createUser.controls['email'].reset();
    }

  })
}

  ExisteEmailSoLicitud(email: any){
    this.usuarioService.getValidacionEmaiSolicitudlUsuario(email).subscribe((res:any)=>{
      this.existeEmailSolicitudUsuario = res

      if(this.existeEmailSolicitudUsuario ==  true){
        this.alertService.confirmAlert("El email ya existe en Solicitud ", TYPE_ALERT.WARNING )
        this.createUser.controls['email'].reset()
      }
  
    })
  }

ValidacionEmail(){

  var email

  email = this.createUser.value.email

  console.log('El enmail es   :   ', email)

  if(this.existeEmailUsuario == true || this.existeEmailSolicitudUsuario == true){
    this.alertService.confirmAlert('El email se encuentra registrado', TYPE_ALERT.WARNING )
  }
}


}
