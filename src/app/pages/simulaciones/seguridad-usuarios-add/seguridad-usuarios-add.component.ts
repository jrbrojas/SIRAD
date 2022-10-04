import { Component, OnInit } from '@angular/core';
import { TYPE_ALERT } from '../../../shared/services/config';
import { Persona } from '../../../shared/models/emergency.model';
import { Validators, FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Form2aService } from '../../../shared/services/form-2a.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonasService } from '../../../shared/services/personas.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Usuario } from '../../../shared/models/usuario.model';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-seguridad-usuarios-add',
  templateUrl: './seguridad-usuarios-add.component.html',
  styleUrls: ['./seguridad-usuarios-add.component.scss']
})
export class SeguridadUsuariosAddComponent implements OnInit {

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
  ) {
  }

  ngOnInit(): void {
  }

  get idPerfil() {
    return null;
  }



  createUsuarios() {

  }

  cancelProject() {
    
  }

  // Perfil
  getProfile() {
  }


  getSelectProfile(event: any) {
  }


  //Region
  getRegion() {
  }

  getSelectRegion(event: any) {
  }

  //Provincia
  getProvincia(codRegion: string) {
  }

  getSelectProvincia(event: any) {
  }

  //Distrito
  getDistrito(codRegionProv: string) {
  }

  getSelectDistrito(event: any) {
  }

  setvalue() {
  }


  existeDniUser(dni: any){
  }

  existeDniSolicitudUser(dni:any){
  }


  consultarDni(){
  }

  onKey(event: any) {
    this.counter = event.target.value.length;
  }

  HabUigeo(Ubigeo: any){
  }

  ExisteEmail(email: any){

  
}

  ExisteEmailSoLicitud(email: any){
  }

ValidacionEmail(){

}


}
