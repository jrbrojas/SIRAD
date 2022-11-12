import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {

  constructor(
    public router : Router,
    public alert : AlertService
  ) { }

  ngOnInit(): void {
  }

  add(){
    this.router.navigate(['/sirad/seguridad/usuarios-add']).then(() => { });
  }

  editUsuario(){
    this.router.navigate(['/sirad/seguridad/usuarios-edit']);
  }

  back(type : number){
    let mensaje = "Guardar"
    if(type == 1) mensaje = "Eliminar"
    this.alert.questionAlertConfirm('¿Está seguro de ' + mensaje + '?', '', 'Si, ' + mensaje, TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          console.log("asasdasdasd");
          this.router.navigate(['/sirad/seguridad/usuarios']);
        }
      }
    );
  }

}
