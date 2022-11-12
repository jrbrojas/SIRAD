import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { MatFormField } from '@angular/material/form-field';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public show: boolean = false;
  public hide: boolean = true;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  showPassword() {
    this.show = !this.show;
  }

  login(){
    this.router.navigate(['/auth']);
  }

  enviarCorreo() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Correo enviado correctamente',
      timer: 2500
    })
    this.router.navigate(['/auth']);
  }
}
