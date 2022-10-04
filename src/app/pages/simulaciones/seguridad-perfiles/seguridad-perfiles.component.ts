import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seguridad-perfiles',
  templateUrl: './seguridad-perfiles.component.html',
  styleUrls: ['./seguridad-perfiles.component.scss']
})
export class SeguridadPerfilesComponent implements OnInit {

  constructor(
    public router : Router
  ) { }

  ngOnInit(): void {
  }

  createPermission(){
    this.router.navigate(['/simulaciones/seguridad/perfiles-add']);
  }

}
