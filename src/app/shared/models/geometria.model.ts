import { GeoJSONGeometryCollection } from "ol/format/GeoJSON";
import { GeoJSON } from "geojson";


export enum eTypeAction {
  insert,
  update,
  delete,
  view
}

export type sTypeAction = keyof typeof eTypeAction;

// export interface Geometria {
//     id?: number;
//     geometria: GeoJSONGeometryCollection;
// }

export enum eTypeGraphic {
    Point = "PUNTO",
    LineString = "LINEA",
    Polygon = "POLIGONO",
    Circle = "CIRCULO",
    None = "NINGUNO",
    Delete = "DELETE"
  }

export type tTypeGraphicString = keyof typeof eTypeGraphic;


export enum eToolMap {
  Point = "Point",
  LineString = "LineString",
  Polygon = "Polygon",
  Circle = "Circle",
  None = "None",
  Delete = "Delete"
}

export type tToolMap = keyof typeof eToolMap;
