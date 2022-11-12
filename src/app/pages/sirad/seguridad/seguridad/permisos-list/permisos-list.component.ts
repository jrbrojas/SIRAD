import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';

@Component({
  selector: 'app-permisos-list',
  templateUrl: './permisos-list.component.html',
  styleUrls: ['./permisos-list.component.scss']
})
export class PermisosListComponent implements OnInit {

  constructor(
    private router : Router,
    public alert : AlertService
  ) { }

  ngOnInit(): void {
  }

  createPermission(){
    this.router.navigate(['/sirad/seguridad/permisos-add']);
  }

  editPermission(){
    this.router.navigate(['/sirad/seguridad/permisos-edit']);
  }

  back(type : number){
    let mensaje = "Guardar"
    if(type == 1) mensaje = "Eliminar"
    this.alert.questionAlertConfirm('¿Está seguro de ' + mensaje + '?', '', 'Si, ' + mensaje, TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          console.log("asasdasdasd");
          this.router.navigate(['/sirad/seguridad/permisos']);
        }
      }
    );
  }

}
