import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';

@Component({
  selector: 'app-permisos-edit',
  templateUrl: './permisos-edit.component.html',
  styleUrls: ['./permisos-edit.component.scss']
})
export class PermisosEditComponent implements OnInit {

  constructor(public alert : AlertService, public router : Router) { }

  ngOnInit(): void {
  }

  back(type : number){
    let mensaje = "Guardar"
    if(type == 1) mensaje = "Cancelar"
    this.alert.questionAlertConfirm('¿Está seguro de ' + mensaje + '?', '', 'Si, ' + mensaje, TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.router.navigate(['/sirad/seguridad/permisos']);
        }
      }
    );
  }

}
