import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {
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
  public nivel: number = 0

  constructor(public alert : AlertService, public router : Router) { }

  ngOnInit(): void {
  }

  back(type : number){
    let mensaje = "Guardar"
    if(type == 1) mensaje = "Cancelar"
    this.alert.questionAlertConfirm('¿Está seguro de ' + mensaje + '?', '', 'Si, ' + mensaje, TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.router.navigate(['/sirad/seguridad/usuarios']);
        }
      }
    );
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
