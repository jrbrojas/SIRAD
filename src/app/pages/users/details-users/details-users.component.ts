import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileService } from '../../../shared/services/profile.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { AlertService } from '../../../shared/services/alert.service';
import { UsuarioEditar } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-details-users',
  templateUrl: './details-users.component.html',
  styleUrls: ['./details-users.component.scss']
})
export class DetailsUsersComponent implements OnInit {
  public documentTypes: any[] = [
    { id: 1, descripcion: 'DNI' },
    { id: 2, descripcion: 'PASAPORTE' },
    { id: 3, descripcion: 'CARNET DE EXTRANJERIA' },
    { id: 4, descripcion: 'OTRO DOCUMENTO' }
  ]

  public nivelTypes: any = [
    {id: 1, descripcion: 'NACIONAL'},
    {id: 2, descripcion: 'REGIONAL'},
    {id: 3, descripcion: 'PROVINCIAL'},
    {id: 4, descripcion: 'DISTRITAL'},
  ]

  public idsAgregarUsuario: number[] = new Array<number>();
  public isId: any;
  public createUser: FormGroup;
  public detailUsuario: any;
  public selectProfile: any;
  public selectRegion: any;
  public selectProvincia: any;
  public selectDistrito: any;
  public nomProfile: string = '';
  public descripcionRegion: string = '';
  public descripcionProvincia: string = '';
  public descripcionDistrito: string = '';
  public HabilitarPerfil: boolean = false;
  disabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profilesService: ProfileService,
    public usuarioService: UsuarioService,
    private params: ActivatedRoute,
    private alertService: AlertService
  ) { 
    this.createUser = this.fb.group({
      codRegion: [''],
      codProvincia: [''],
      codDistrito: [''],
      levels: [''],
      idTipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['',[Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      username: ['',[Validators.required]],
      password: ['', [Validators.required]],
      email:  new FormControl('', [Validators.required,Validators.email]),
      idPerfil: [''],
      nivel: [''],
      codigoRegion: [''],
      habilitado:[''],
      descRegion: [''],
      codigoRegionProvincia: [''],
      codigoRegionDistrito: [''],
      idSistema: 1
    });
  }

  ngOnInit(): void {
    this.isId = this.params.snapshot.paramMap.get('userName');
    this.getDetaillsUsuario();
    this.getProfile();    
  }

  cancelProject() {
    this.router.navigate(['/seguridad/usuarios']).then(r => r);
  }



  EditarUsuario(){
    this.createUser.value
    const data: UsuarioEditar = {
      username: this.createUser.value.username,
      nombres : this.createUser.value.nombres,
      apellidos : this.createUser.value.apellidos,
      email: this.createUser.value.email,
      nivel: this.createUser.value.levels,
      codigoRegion: this.createUser.value.codRegion,
      codigoRegionProvincia: this.createUser.value.codProvincia,
      codigoRegionDistrito: this.createUser.value.codDistrito,
      idsPerfiles : String(this.createUser.value.idPerfil),
      habilitado : this.createUser.value.habilitado

    }
    console.log("Esto envia   : ",data);
    //return
    this.setvalue();   
    
    this.usuarioService.editUsuario(data).subscribe(res => {
      this.router.navigate(['/seguridad/usuarios']);
      this.getDetaillsUsuario();
    })
    
  }
  
  setvalue() {
    var nivel
    nivel = this.createUser.value.levels
    this.getRegion();
    this.getPerfilNivel(nivel)
    if (nivel == '1') {
      
      this.HabilitarPerfil = false

      this.createUser.controls['codRegion'].reset();
      this.createUser.value.codRegion = " "
      this.createUser.controls['codProvincia'].reset();
      this.createUser.value.codProvincia = ""
      this.createUser.controls['codDistrito'].reset();
      this.createUser.value.codDistrito = ""
      this.createUser.controls['idPerfil'].reset();
      
    } else if (nivel == '2') {
      this.HabilitarPerfil = true
      this.createUser.controls['codRegion'].reset();
      this.createUser.controls['codProvincia'].reset();
      this.createUser.controls['codDistrito'].reset();
      this.createUser.controls['idPerfil'].reset();
      } else if (nivel == '3') {
      this.HabilitarPerfil = true
      this.createUser.controls['codRegion'].reset();
      this.createUser.controls['codProvincia'].reset();
      this.createUser.controls['codDistrito'].reset();
      this.createUser.controls['idPerfil'].reset();
    }else if (nivel == '4'){

      this.createUser.controls['codRegion'].reset();
      this.createUser.controls['codProvincia'].reset();
      this.createUser.controls['codDistrito'].reset();
      this.createUser.controls['idPerfil'].reset();
      this.HabilitarPerfil = true
    }

   
  }


  getDetaillsUsuario() {
    this.usuarioService.getDetalleUsuario(this.isId).subscribe((res : any) => {
      this.detailUsuario = res;
      this.createUser.controls['idTipoDocumento'].setValue(this.detailUsuario[0].idTipoDocumento);
      this.createUser.controls['numeroDocumento'].setValue(this.detailUsuario[0].numeroDocumento);
      this.createUser.controls['nombres'].setValue(this.detailUsuario[0].nombres);
      this.createUser.controls['apellidos'].setValue(this.detailUsuario[0].apellidos);
      this.createUser.controls['email'].setValue(this.detailUsuario[0].email);
      this.createUser.controls['username'].setValue(this.detailUsuario[0].username);
      this.createUser.controls['levels'].setValue(this.detailUsuario[0].nivel);
      this.createUser.controls['codRegion'].setValue(this.detailUsuario[0].codigoRegion);
      this.createUser.controls['habilitado'].setValue(this.detailUsuario[0].habilitado);
      this.createUser.controls['codProvincia'].setValue(this.detailUsuario[0].codigoRegionProvincia);
      this.createUser.controls['codDistrito'].setValue(this.detailUsuario[0].codigoRegionDistrito);
      

      console.log("Retorna    :   ", res)

      if (this.detailUsuario[0].nivel == 2) { // Regional
        this.getRegion();
      } else if (this.detailUsuario[0].nivel == 3) { // Provincial
        this.getRegion();
        this.getProvincia(this.detailUsuario[0].codigoRegion, true); 
      } else if (this.detailUsuario[0].nivel == 4) { // Distrital
        this.getRegion();
        this.getProvincia(this.detailUsuario[0].codigoRegion, true);
        this.getDistrito(this.detailUsuario[0].codigoRegionProvincia, true);
      }

      
      this.createUser.controls['idPerfil'].setValue(parseInt(this.detailUsuario[0].idsPerfilesdetalle))
      this.getPerfilNivel(this.detailUsuario[0].nivel)
    });
  }

  // Perfil
  
  getProfile() {
    this.profilesService.getProfile().subscribe(rows => {
      this.selectProfile = rows;
      //this.getDetaillsUsuario();  
    })
  }

  getSelectProfile(event: any) {

    
//    this.getDistrito(event.codProvincia);

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
  }

  //Provincia
  getProvincia(codRegion: string, fromDetailUser = false) {

    this.usuarioService.getProvincia(codRegion).subscribe(rows => {
      this.selectProvincia = rows;
      if (!fromDetailUser) {
        this.createUser.controls['codProvincia'].reset();
        this.createUser.controls['codDistrito'].reset();      
      }
    })
  }

  getSelectProvincia(event: any) {
    this.HabUigeo('Provincia')
    this.descripcionProvincia = event.descripcion;
    this.getDistrito(event.codProvincia);
  }

  //Distrito


  getDistrito(codRegionProv: string, fromDetailUser = false) {
    this.usuarioService.getDistrito(codRegionProv).subscribe(rows => {
      this.selectDistrito = rows;
      if (!fromDetailUser) {
        this.createUser.controls['codDistrito'].reset();
      }
    })
  }
  
  getSelectDistrito(event: any) {
    this.HabUigeo('Distrito')
    this.descripcionDistrito = event.descripcion;
  }


getPerfilNivel(nivel : any){
  this.usuarioService.getPerfilNivel(nivel).subscribe(rows => {
    this.selectProfile = rows;
    this.selectProfile = this.selectProfile.perfiles;
  })


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



}
