import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginRequestModel} from "../../auth/login/login-request";
import {AlertService} from 'src/app/shared/services/alert.service';
import { PERMISOS } from 'src/app/shared/models/permisos';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json '})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  public userData: any;
  public showLoader: boolean = false;

  constructor(private http: HttpClient,
              public router: Router,
              public ngZone: NgZone,
              public toaster: ToastrService,
              private alertService: AlertService,) {
  }


  signIn(username: any, password: any) {
    this.showLoader = true;
    let loginRequest: LoginRequestModel = new LoginRequestModel();

    loginRequest.usernameOrEmail = username;
    loginRequest.password = password;
    loginRequest.idSistema = '1';

    // return this.http.post<any>('http://localhost:8080/api/v1/usuario/obtener-permisos', loginRequest, httpOptions).subscribe(
    return this.http.post<any>(environment.urlApiLogin, loginRequest, httpOptions).subscribe(
      res => {
        var habilitado
        habilitado = res.userData.habilitado
        console.log("Esta habilitado o no?   :   " , habilitado)
        if (res.mensaje == 'CORRECTO' && habilitado == 1) {
          localStorage.setItem("userData", JSON.stringify(res.userData));
          localStorage.setItem("token", JSON.stringify(res.token));
          localStorage.setItem("datoGeoPolitico", JSON.stringify(res.datoGeoPolitico));
          localStorage.setItem("permisos", JSON.stringify(res.permisos));
          localStorage.setItem("isAuthorized", JSON.stringify(res.userData));
          localStorage.setItem("nombresApellidos", JSON.stringify(res.nombresApellidos));
          this.router.navigate(['/home']);
        }else if (habilitado == 0){
          this.alertService.toastError(`El usuario esta deshabilitado`);
        } else {
          this.alertService.toastError(`${res.mensaje}`);
        }
        console.log("Esto me trae el Login     :     ", res)
        this.showLoader = false;
      }
    );
  }

  getPermisosUsuarioAutenticado(){
    return JSON.parse(localStorage.getItem('permisos')!);
  }

  validarPermisos(permisos: PERMISOS[]){
    const permisosUsuario = this.getPermisosUsuarioAutenticado();
    if((permisos && permisosUsuario) && (permisos.length > 0 && permisos.length> 0)){
      const result = permisosUsuario.some((permisoUsuario: any) => {
        return permisos.some((permiso: any)=> {return permisoUsuario.nombre === permiso})
      });
      return result;
    }
    return false;
  }

  soloUno(permiso: string){
    return this.getPermisosUsuarioAutenticado().some((item: any) => {return item.nombre === permiso});
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('datoGeoPolitico');
    localStorage.removeItem('permisos');
    localStorage.removeItem('isAuthorized');
    this.router.navigate(['/auth']);
  }

}
