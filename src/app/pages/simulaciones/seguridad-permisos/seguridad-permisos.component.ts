import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seguridad-permisos',
  templateUrl: './seguridad-permisos.component.html',
  styleUrls: ['./seguridad-permisos.component.scss']
})
export class SeguridadPermisosComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  createPermission(){
    this.router.navigate(['/simulaciones/seguridad/permisos-add']);
  }

}
