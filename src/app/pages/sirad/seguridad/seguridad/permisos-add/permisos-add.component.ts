import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';

@Component({
  selector: 'app-permisos-add',
  templateUrl: './permisos-add.component.html',
  styleUrls: ['./permisos-add.component.scss']
})
export class PermisosAddComponent implements OnInit {

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
