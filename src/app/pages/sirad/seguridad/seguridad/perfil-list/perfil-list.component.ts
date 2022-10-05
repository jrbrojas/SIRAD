import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent implements OnInit {

  constructor(
    public router : Router
  ) { }

  ngOnInit(): void {
  }

  createPermission(){
    this.router.navigate(['/sirad/seguridad/perfiles-add']);
  }

}
