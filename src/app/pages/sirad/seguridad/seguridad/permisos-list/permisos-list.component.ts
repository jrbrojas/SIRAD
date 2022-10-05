import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permisos-list',
  templateUrl: './permisos-list.component.html',
  styleUrls: ['./permisos-list.component.scss']
})
export class PermisosListComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  createPermission(){
    this.router.navigate(['/sirad/seguridad/permisos-add']);
  }

}
