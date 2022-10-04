import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {

  constructor(
    public router : Router
  ) { }

  ngOnInit(): void {
  }

  add(){
    this.router.navigate(['/sirad/seguridad/usuarios-add']).then(() => { });
  }

}
