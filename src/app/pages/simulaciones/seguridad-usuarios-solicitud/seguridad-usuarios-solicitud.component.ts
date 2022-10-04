import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';

@Component({
  selector: 'app-seguridad-usuarios-solicitud',
  templateUrl: './seguridad-usuarios-solicitud.component.html',
  styleUrls: ['./seguridad-usuarios-solicitud.component.scss']
})
export class SeguridadUsuariosSolicitudComponent implements OnInit {
  public value : ""
  constructor(
    public router : Router,
    public alert : AlertService
  ) { }

  ngOnInit(): void {
  }

  createSolicitudUsuarios(){
    this.router.navigate(['/simulaciones/seguridad/usuarios-solicitud-add']).then(() => { });
  }

  aprobarUsuario(){
    this.alert.questionAlertConfirm('¿Está seguro de aprobar?', '', 'Si, aprobar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.alert.toastSuccess(`Usuario aprobado con exito`);
        }
        else
        this.alert.toastInfo(`Usuario no aprobado`);
      }
    )
  }

}
