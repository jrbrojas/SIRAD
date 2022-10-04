import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(public authService: AuthService) { }
  nivelUsuario: string;
  nombresApellidos: string;

  ngOnInit(): void {

    const datoGeoPolitico = localStorage.getItem('datoGeoPolitico');
    this.nombresApellidos = JSON.parse(localStorage.getItem('nombresApellidos'));
    const nivel= JSON.parse(datoGeoPolitico).nivel;
    this.obtenerNivel(nivel);

  }

  obtenerNivel(nivel:any){
    switch (nivel) {
      case 1:
        this.nivelUsuario='NACIONAL'
        break;
      case 2:
        this.nivelUsuario='REGIONAL'
        break;
      case 3:
        this.nivelUsuario='PROVINCIAL'
        break;
      case 4:
        this.nivelUsuario='DISTRITAL'
        break;
    }
  }
}
