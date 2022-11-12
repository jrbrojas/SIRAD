import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent implements OnInit {

  constructor(
    public router : Router,
    public alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  createPermission(){
    this.router.navigate(['/sirad/seguridad/perfiles-add']);
  }

  editPerfil(){
    this.router.navigate(['/sirad/seguridad/perfiles-edit']);
  }
  
  back(type : number){
    let mensaje = "Guardar"
    if(type == 1) mensaje = "Eliminar"
    this.alert.questionAlertConfirm('¿Está seguro de ' + mensaje + '?', '', 'Si, ' + mensaje, TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          console.log("asasdasdasd");
          this.router.navigate(['/sirad/seguridad/perfiles']);
        }
      }
    );
  }
}
