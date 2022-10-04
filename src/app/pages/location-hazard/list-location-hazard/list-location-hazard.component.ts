import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../../shared/services/usuario.service';

@Component({
  selector: 'app-list-location-hazard',
  templateUrl: './list-location-hazard.component.html',
  styleUrls: ['./list-location-hazard.component.scss']
})
export class ListLocationHazardComponent implements OnInit {

  public formData: FormGroup;
  public selectRegion: any;
  public selectProvincia: any;
  public selectDistrito: any;
  public descripcionRegion: string = '';
  public descripcionProvincia: string = '';
  public descripcionDistrito: string = '';

  constructor(
    private _fb: FormBuilder,
    public usuarioService: UsuarioService) {
    this.formData = this._fb.group({
      codRegion: [''],
      codProvincia: [''],
      codDistrito: [''],
      region: [''],
      province: ['']
    })
  }

  ngOnInit(): void {
    this.getRegion();
  }

  //Region
  getRegion() {
    this.usuarioService.getRegion().subscribe(rows => {
      this.selectRegion = rows;
    })
  }

  getSelectRegion(event: any) {
    this.getProvincia(event.codRegion);
    //this.formData.controls['codRegion'].reset();
  }

  resetCalculations()  {
    this.selectProvincia = null;
    this.selectDistrito = null;
  }

  //Provincia
  getProvincia(codRegion: string) {
    
    this.usuarioService.getProvincia(codRegion).subscribe(rows => {
      this.selectProvincia = rows;
      this.formData.controls['codProvincia'].reset();
    })
  }

  getSelectProvincia(event: any) {
    this.descripcionProvincia = event.descripcion;
    this.getDistrito(event.codProvincia);
  }

  //Distrito
  getDistrito(codRegionProv: string) {
    this.usuarioService.getDistrito(codRegionProv).subscribe(rows => {
      this.selectDistrito = rows;
      this.formData.controls['codDistrito'].reset();
    })
  }

  getSelectDistrito(event: any) {
    this.descripcionDistrito = event.descripcion;
  }
}
