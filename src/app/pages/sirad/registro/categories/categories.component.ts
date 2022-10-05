import { Component, OnInit } from '@angular/core';

export interface DataCategories {
  codCategory : string;
  nameCategory : string;
  updateDate : string;
  showDetail : boolean
}

export interface DataSubCategories {
    codCategory : string;
    codSubCategory : string;
    nameSubCategory : string;
    keyWords : Array<any>;
    keyWordsGeo : string;
    summary : string;
    infoExtended : string;
    infoDate : string;
    updateDateFinal : string;
    dataSource : string;
    generalManager : string;
    responsibleInfoLayer : string;
    contactDataSource : Array<any>;
    typeGeo : string;
    systemCoord : string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public dataSubCategories : DataSubCategories[] = []
  public dataCategories : DataCategories[] = []
  rows = [
    {id: 1, desc: "foo", showDetail: false},
    {id: 2, desc: "bar", showDetail: false},
  ]


  constructor() { }

  ngOnInit(): void {

    this.dataCategories.push(
      {
        codCategory : 'C0001',
        nameCategory : 'Abastecimiento de agua',
        updateDate : '2022-08-05',
        showDetail : false
      },
      {
        codCategory : 'C0002',
        nameCategory : 'Abastecimiento de Alimentos',
        updateDate : '2022-04-02',
        showDetail : false
      },
      {
        codCategory : 'C0003',
        nameCategory : 'Transporte y viabilidad',
        updateDate : '2022-02-08',
        showDetail : false
      }

      
    )

    
    this.dataSubCategories.push({
      codCategory : 'C0001',
      codSubCategory : 'SB0001',
      nameSubCategory : 'Plantas de Agua Potable',
      keyWords : ['Agua Potable'],
      keyWordsGeo : 'Lima/Callao',
      summary : `Descripción básica de las plantas de producción de agua potable en términos de producción y de tipo de instalaciones, reservorios etc…`,
      infoExtended : `Proyecto “Elaboración de un Sistema de Información Geográfico y Análisis de Recursos Esenciales para la Respuesta y Recuperación Temprana ante la Ocurrencia de un sismo y/o Tsunami en el Área Metropolitana de Lima y Callao” (Proyecto SIRAD Convocatoria PNUD/SDP-052/2009 / 22 de abril - 15 febrero 2011).
      Practicas de Jérémy Guilbaud, estudiante ingeniero de la Escuela Nacional de Ciencias Geográficas de Francia.
      `,
      infoDate : '2010',
      updateDateFinal : '2010-07-26',
      dataSource : 'Sedapal',
      generalManager : `Roberto D'Ercole (IRD)`,
      responsibleInfoLayer : 'Pascale Mertzger(IRD)',
      contactDataSource: ['Pierre Vernier', 'Pauline Gluski', 'Jeremy Guilbaud'],
      typeGeo : 'Punto',
      systemCoord: 'EPSG: 32718 - WGS 84 UTM zona 18 sur'

    })

  }

}
