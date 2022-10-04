import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seguridad-usuarios',
  templateUrl: './seguridad-usuarios.component.html',
  styleUrls: ['./seguridad-usuarios.component.scss']
})
export class SeguridadUsuariosComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  add(){
    this.router.navigate(['/simulaciones/seguridad/usuarios-add']).then(() => { });
  }

}
