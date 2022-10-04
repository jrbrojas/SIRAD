import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-seguridad-usuarios-solicitud-add',
  templateUrl: './seguridad-usuarios-solicitud-add.component.html',
  styleUrls: ['./seguridad-usuarios-solicitud-add.component.scss']
})
export class SeguridadUsuariosSolicitudAddComponent implements OnInit {

  constructor( private alert : AlertService,
    private router: Router) { }

  ngOnInit(): void {
  }

  cancelProject() {
    this.router.navigate(['/simulaciones/solicitud-credenciales']);
  }

  guardar(){
    this.alert.toastSuccess(`Datos guardados con éxito`);
  }

}
