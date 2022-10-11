import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';

@Component({
  selector: 'app-seguridad-perfiles-add',
  templateUrl: './seguridad-perfiles-add.component.html',
  styleUrls: ['./seguridad-perfiles-add.component.scss']
})
export class SeguridadPerfilesAddComponent implements OnInit {

  constructor(public alert : AlertService) { }

  ngOnInit(): void {
  }

  back(type : number){
    let mensaje = "Guardar"
    if(type == 1) mensaje == "Cancelar"
    this.alert.questionAlertConfirm('¿Está seguro de ' + mensaje + '?', '', 'Si, ' + mensaje, TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
        }
      }
    );
  }

}
