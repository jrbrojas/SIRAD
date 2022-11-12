import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor(public authService: AuthService, private fb: FormBuilder, public router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  showPassword() {
    this.show = !this.show;
  }

  login() {
    this.router.navigate(['/simulaciones/seguridad/usuarios']);
  }

  forgetPassword(){
    this.router.navigate(['/forget-password']);
  }

  register(){
    this.router.navigate(['/register']);
  }
  
  recuperarClave() {
    this.router.navigate(['/reset-password/:7937nt78t5nc479wymxt407ytc90cw374590387452v903872h3496823c9465c8235689234657938c23465hco3']);
  }
  hide = true;

}
