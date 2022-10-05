import { eTypeAction } from './../../../../shared/models/geometria.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizacion',
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.scss']
})
export class VisualizacionComponent implements OnInit {

  idMapa  = "visualizador";
  typeAction = eTypeAction.view;
  wrapGeometria = {};
  constructor() { }

  ngOnInit(): void {
  }

}
