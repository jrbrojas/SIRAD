import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';

@Component({
  selector: 'app-perfil-add',
  templateUrl: './perfil-add.component.html',
  styleUrls: ['./perfil-add.component.scss']
})
export class PerfilAddComponent implements OnInit {
  constructor(public alert : AlertService, public router : Router) { }

  ngOnInit(): void {
  }

  back(type : number){
    let mensaje = "Guardar"
    if(type == 1) mensaje = "Cancelar"
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
