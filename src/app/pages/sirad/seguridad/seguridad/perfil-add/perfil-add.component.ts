import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-add',
  templateUrl: './perfil-add.component.html',
  styleUrls: ['./perfil-add.component.scss']
})
export class PerfilAddComponent implements OnInit {
  public value = ""
  constructor() { }

  ngOnInit(): void {
  }

}
