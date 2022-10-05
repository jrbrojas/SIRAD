import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-map-layers',
  templateUrl: './map-layers.component.html',
  styleUrls: ['./map-layers.component.scss']
})
export class MapLayersComponent implements OnInit {

  constructor() { }

  layers = [
    {
      name: 'Agua',
    },
    {
      name: 'Tierra',
    },
    {
      name: 'Fuego',
    },
    {
      name: 'Aire',
    }
  ]
  ;
  notes = [];
  ngOnInit(): void {
  }

}
