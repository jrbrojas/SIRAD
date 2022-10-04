import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MasterTablesService } from 'src/app/shared/services/master-tables.service';
import { AffectedHousing } from '../../../shared/models/empadronamiento.model';
import { Form2aService } from '../../../shared/services/form-2a.service';
import { TYPE_ALERT } from '../../../shared/services/config';
import { AlertService } from '../../../shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';

/*
todo agregar los campos create-vivhtml add.compontent.ts create-viv.component.ts
* */

@Component({
  selector: 'app-create-viv',
  templateUrl: './create-viv.component.html',
  styleUrls: ['./create-viv.component.scss']
})
export class CreateVivComponent implements OnInit {
  @Input() public fromIdFamily!: any;
  public livingPlaceForm: FormGroup;
  public ceilings: any;
  public walls: any;
  public floors: any;
  @Input() idEmpFamily: any;
  
  public PERMISOS = PERMISOS;

  public idUso: any;
  public uso: any;
  public idCondicion: any;
  public condicion: any;
  public direccion: any;
  public numeroLote: any;
  public tenenciaPropia: any;
  public unidadMedidaArea: any;
  public idTipoTecho: any;
  public idTipoPared: any;
  public tipoPared: any;
  public idTipoPiso: any;
  public tipoPiso: any;
  public familia: any;
  public tipoTecho: any;

  public selectUso: any;
  public selectTecho: any;
  public selectPiso: any;
  public selectPared: any;
  public selectCondicionUso: any;

  //private urlMaestra:string = 'http://172.20.31.22:8080/ms-maestras';
  private urlMaestra:string = 'http://200.123.30.214:8080/ms-maestras';

  public detailsAffectedHousing : any;
  public isShowButton: boolean = false;
  public isShowInputUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private master: MasterTablesService,
    private router: Router,
    private params: ActivatedRoute,
    public form2aService: Form2aService,
    private alert: AlertService,
    private alertService: AlertService,
    public authService:  AuthService
  ) {
    this.livingPlaceForm = this.fb.group({
      id: [''],
      direccion: [''],
      numeroLote: [''],
      tenenciaPropia: [''],
      idUso: [''],
      tipoUsoVivienda: ['', [Validators.required]],
      uso: [''],
      idCondicion: [''],
      tipoCondicionUso: ['', [Validators.required]],
      unidadMedidaArea: [''],
      idTipoTecho:[''],
      tipoTechoVivienda: ['', [Validators.required]],
      idTipoPared:[''],
      tipoParedVivienda: ['', [Validators.required]],
      idTipoPiso:[''],
      tipoPisoVivienda: ['', [Validators.required]],
      idFamily: ['']
    })
  }

  ngOnInit(): void {
    this.getTiposPared();
    this.getTiposPiso();
    this.getTipoTecho();
    this.getUsoVivienda();
    this.getCondicionUsoVivienda();
    this.getCeiling();
    this.getWall();
    this.getFloor();
    this.getDetailsAffectedHousing();
  }

  createAffectedHousing() {
    const data: AffectedHousing = {
      direccion: this.livingPlaceForm.value.direccion,
      numeroLote: this.livingPlaceForm.value.numeroLote,
      tenenciaPropia: this.livingPlaceForm.value.tenenciaPropia,
      idUso: this.idUso,
      uso: this.uso,
      idCondicion: this.idCondicion,
      condicion: this.condicion,
      unidadMedidaArea: this.livingPlaceForm.value.unidadMedidaArea,
      idTipoTecho: this.idTipoTecho,
      tipoTecho: this.tipoTecho,
      idTipoPared: this.idTipoPared,
      tipoPared: this.tipoPared,
      idTipoPiso: this.idTipoPiso,
      tipoPiso: this.tipoPiso,
      familia: {
        id: this.fromIdFamily
      }
    }

    this.alertService.questionAlertConfirm(
      '¿Está seguro de crear la vivienda?',
      '',
      'Si, Crear',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.form2aService.createAffectedHousing(data).subscribe((res: any) => {
            this.alertService.toastSuccess('Vivienda Creado Correctamente');
            this.form2aService.showLoader = false;
            this.getDetailsAffectedHousing()
            this.resetInput()
          });
        } else {
          this.form2aService.showLoader = false;
        }
      }
    );
  }

  getDetailsAffectedHousing() {
    this.form2aService.getAffectedHousingById(this.fromIdFamily).subscribe(res => {
      this.detailsAffectedHousing = res;
      
    });
  }

  updateAffectedHousing() {
    const dataU: AffectedHousing = {
      id: this.livingPlaceForm.value.id,
      direccion: this.livingPlaceForm.value.direccion,
      numeroLote: this.livingPlaceForm.value.numeroLote,
      tenenciaPropia: this.livingPlaceForm.value.tenenciaPropia,
      idUso: this.livingPlaceForm.value.tipoUsoVivienda,
      uso: this.livingPlaceForm.value.uso,
      idCondicion: this.livingPlaceForm.value.tipoCondicionUso,
      condicion: this.condicion,
      unidadMedidaArea: this.livingPlaceForm.value.unidadMedidaArea,
      idTipoTecho: this.livingPlaceForm.value.tipoTechoVivienda,
      tipoTecho: this.tipoTecho,
      idTipoPared: this.livingPlaceForm.value.tipoParedVivienda,
      tipoPared: this.tipoPared,
      idTipoPiso: this.livingPlaceForm.value.tipoPisoVivienda,
      tipoPiso: this.tipoPiso,
      familia: {
        id: this.fromIdFamily
      }
    }

    this.alert.questionAlertConfirm(
      '¿Está seguro de actualizar la Afectación de Vivienda?',
      '',
      'Si, Actualizar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.form2aService.updateAffectedHousing(dataU).subscribe((res: any) => {
            this.alert.toastSuccess('Actualizado Afectacion de Vivienda Correctamente');
            this.getDetailsAffectedHousing();
            this.resetInput()
          });
        }
      }
    );
  }

  getTiposPared() {
    this.master.getTipoPared(this.urlMaestra).subscribe(res => {
      this.selectPared = res;
    });
  }

  getTiposPiso() {
    this.master.getTipoPiso(this.urlMaestra).subscribe(res => {
      this.selectPiso = res;
    });
  }

  getTipoTecho() {
    this.master.getTipoTecho(this.urlMaestra).subscribe(res => {
      this.selectTecho = res;
    });
  }

  getUsoVivienda() {
    this.master.getUsoVivienda(this.urlMaestra).subscribe(res => {
      this.selectUso= res;
    });
  }

  getCondicionUsoVivienda() {
    this.master.getCondicionUsoVivienda(this.urlMaestra).subscribe(res => {
      this.selectCondicionUso = res;
    });
  }

  getSelectUso(event: any){
    this.idUso = event.id;
    this.uso = event.descripcion;
    
  }

  getSelectTecho(event: any){
    this.idTipoTecho = event.id;
    this.tipoTecho = event.descripcion;
  }

  getSelectPiso(event: any){
    this.idTipoPiso = event.id;
    this.tipoPiso = event.descripcion;
  }

  getSelectPared(event: any){
    this.idTipoPared = event.id;
    this.tipoPared = event.descripcion;
  }

  getSelectCondicionUso(event: any){
    this.idCondicion = event.id;
    this.condicion = event.descripcion
  }

  getCeiling() {
    this.master.getCeiling().subscribe(res => {
      this.ceilings = res;
    });
  }

  getWall() {
    this.master.getWall().subscribe(res => {
      this.walls = res;
    });
  }

  getFloor() {
    this.master.getFloor().subscribe(res => {
      this.floors = res;
    });
  }

  editHousing(){
      this.livingPlaceForm.controls['id'].setValue(this.detailsAffectedHousing.id);
      this.livingPlaceForm.controls['direccion'].setValue(this.detailsAffectedHousing.direccion);
      this.livingPlaceForm.controls['numeroLote'].setValue(this.detailsAffectedHousing.numeroLote);
      this.livingPlaceForm.controls['tenenciaPropia'].setValue(this.detailsAffectedHousing.tenenciaPropia);
      this.livingPlaceForm.controls['tipoUsoVivienda'].setValue(this.detailsAffectedHousing.idUso);
      this.livingPlaceForm.controls['tipoCondicionUso'].setValue(this.detailsAffectedHousing.idCondicion);
      this.livingPlaceForm.controls['unidadMedidaArea'].setValue(this.detailsAffectedHousing.unidadMedidaArea);
      this.livingPlaceForm.controls['tipoTechoVivienda'].setValue(this.detailsAffectedHousing.idTipoTecho);
      this.livingPlaceForm.controls['tipoParedVivienda'].setValue(this.detailsAffectedHousing.idTipoPared);
      this.livingPlaceForm.controls['tipoPisoVivienda'].setValue(this.detailsAffectedHousing.idTipoPiso);
  }

  resetInput() {
    this.livingPlaceForm.controls['id'].reset(null);
    this.livingPlaceForm.controls['direccion'].reset(null);
    this.livingPlaceForm.controls['numeroLote'].reset(null);
    this.livingPlaceForm.controls['tenenciaPropia'].reset(null);
    this.livingPlaceForm.controls['tipoUsoVivienda'].reset(null);
    this.livingPlaceForm.controls['tipoCondicionUso'].reset(null);
    this.livingPlaceForm.controls['unidadMedidaArea'].reset(null);
    this.livingPlaceForm.controls['tipoTechoVivienda'].reset(null);
    this.livingPlaceForm.controls['tipoParedVivienda'].reset(null);
    this.livingPlaceForm.controls['tipoPisoVivienda'].reset(null);
  }
}
