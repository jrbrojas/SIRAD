import { ThisReceiver } from '@angular/compiler';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AtencionEmergencia } from 'src/app/shared/models/emergency.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlmacenService } from 'src/app/shared/services/almacen.service';
import { TYPE_ALERT } from 'src/app/shared/services/config';
import { EmergencyAtentionService } from 'src/app/shared/services/emergency-atention.service';
import { EmergencyService } from 'src/app/shared/services/emergency.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';

@Component({
  selector: 'app-modal-emergency-care',
  templateUrl: './modal-emergency-care.component.html',
  styleUrls: ['./modal-emergency-care.component.scss']
})
export class ModalEmergencyCareComponent implements OnInit {

  public imageSrc: any;
  public selectUbigeo: any;
  public desUbigeo: string = '';
  public codUbigeo: any;
  public almacenesUbigeo: Array<any> = [];
  public almacen: string = '';
  public createEmergencyAtention: FormGroup;
  public selAlmacen: any;
  public arr_Almacenes: Array<any> = [];
  public file: File = undefined;
  public imgSelect: String | ArrayBuffer;
  public boolOp: boolean = true;
  public emergenciaTotal: any
  @Input() public codigoSinpad;
  @Input() public dateValidator;

  //Comunicacion para editar
  @Input() public id;
  @Input() public ubigeo_almacen;
  @Input() public nombre_almacen;
  @Input() public fecha_atencion;
  @Input() public descripcion;
  @Input() public archivo;

  public PERMISOS = PERMISOS;

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private emergencyService: EmergencyService,
    private almacenService: AlmacenService,
    public emergencyAtentionService: EmergencyAtentionService,
    public authService: AuthService
  ) {
    this.createEmergencyAtention = this.fb.group({
      ubigeoAlmacen: [[Validators.required]],
      almacen: [[Validators.required]],
      fechaHoraAtencion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      archivo: ['', [Validators.required]]
    })



  }

  ngOnInit(): void {
    const datoGeoPolitico = localStorage.getItem('datoGeoPolitico');
    let fecha = ""
    for (let i = 0; i < 10; i++) {
      fecha += this.dateValidator[i]
    }
    this.dateValidator = fecha
    console.log("fecha validacion", this.dateValidator);
    this.getUbigeos();

  
    let fechaString = ""+this.fecha_atencion
    let arr = fechaString.split('/')
    let fechaFormateada = `${arr[2]}-${arr[1]}-${arr[0]}`

    if (this.id !== undefined) {
      this.createEmergencyAtention = this.fb.group({
        ubigeoAlmacen: [this.ubigeo_almacen],
        almacen: [this.nombre_almacen],
        fechaHoraAtencion: [moment(fechaFormateada).format('YYYY-MM-DD')],
        descripcion: [this.descripcion],
        archivo: [this.archivo.filename]
      })
    }

  }



  fileChangeEvent(event: any): void {
    var file: any;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
    } else {
      this.file = undefined;
    }
    if (file.size <= 40000000) {
      if (
        file.type == 'application/x-zip-compressed' ||
        file.type == 'application/x-rar-compressed' ||
        file.type == 'application/pdf' ||
        file.type == 'application/x-pdf' ||
        file.type == 'application/ms-word' ||
        file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type == 'application/vnd.ms-excel' ||
        file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type == 'application/vnd.ms-excel.sheet.macroEnabled.12' ||
        file.type == 'application/vnd.ms-excel.template.macroEnabled.12' ||
        file.type == 'application/vnd.ms-excel.addin.macroEnabled.12' ||
        file.type == 'application/vnd.ms-excel.sheet.binary.macroEnabled.12' ||
        file.type == 'application/vnd.ms-powerpoint' ||
        file.type == 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        file.type == 'image/png' ||
        file.type == 'image/webp' ||
        file.type == 'image/jpg' ||
        file.type == 'image/gif' ||
        file.type == 'image/jpeg') {
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;

        reader.readAsDataURL(file);
        this.file = file;
      } else {
        this.file = undefined
      }
    } else {
      this.file = undefined
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  getUbigeos() {
    const datoGeoPolitico = localStorage.getItem('datoGeoPolitico');
    const region = JSON.parse(datoGeoPolitico).desRegion;
    const provincia = JSON.parse(datoGeoPolitico).desProvincia;
    const distrito = JSON.parse(datoGeoPolitico).desDistrito;

    this.almacenService.getAlmacenUbigeo().subscribe(
      rows => {      
        if(region != " " && provincia == " " && distrito == " ") this.selectUbigeo = this.getRegion(rows,region)
        if(provincia != " " && distrito == " ") this.selectUbigeo = this.getProvincia(rows,provincia)
        if(distrito != " ") this.selectUbigeo = this.getDIstrito(rows,distrito)
        if(region == null && provincia == null && distrito == null) this.selectUbigeo = rows
       
      }
    )
  }

  getRegion(rows, region) {
    let aux = []
    rows.forEach((e: any) => {
      let ubicacion = e.split("-")
      if (region == ubicacion[0])
        aux.push(e)
    });
    console.log(aux);
    return aux
  }

  getProvincia(rows, provinciia) {
    let aux = []
    rows.forEach((e: any) => {
      let ubicacion = e.split("-")
      if (provinciia == ubicacion[1])
        aux.push(e)
    });
    return aux
  }

  getDIstrito(rows, distrito) {
    let aux = []
    rows.forEach((e: any) => {
      let ubicacion = e.split("-")
      if (distrito == ubicacion[2])
        aux.push(e)
    });
    console.log(aux)
    return aux
  }

  getSelectUbigeo(event: any) {
    this.desUbigeo = event;
    this.getAlmacenes(event)
    this.arr_Almacenes = [];
    this.boolOp = false
    this.createEmergencyAtention.controls['almacen'].reset()
  }

  getAlmacenes(ubigeo: string) {

    this.almacenService.getAlmacen(ubigeo).subscribe(
      rowsAlmacen => {
        rowsAlmacen.forEach(element => {
          this.arr_Almacenes.push(element.nombre_almacen)
          this.almacenesUbigeo = this.arr_Almacenes
        })
      }
    )


  }

  selectAlmacen(value: any) {
    this.selAlmacen = value;

  }

  actualizarAtencionEmergencia(id) {
    const data: AtencionEmergencia = {
      ubigeoAlmacen: this.createEmergencyAtention.value.ubigeoAlmacen,
      nombreAlmacen: this.createEmergencyAtention.value.almacen,
      fechaAtencion: moment(this.createEmergencyAtention.value.fechaHoraAtencion).format('DD/MM/YYYY'),
      descripcion: this.createEmergencyAtention.value.descripcion,
      codigoSinpad: this.codigoSinpad,
      estado: 1,
      habilitado: 1
    }

    this.alertService.questionAlertConfirm(
      '¿Est&aacute;s Seguro de Actualizar la Atenci&oacute;n?',
      '',
      'S&iacute;, Actualizar',
      TYPE_ALERT.QUESTION
    ).then(
      (result) => {
        if (result.value) {
          this.emergencyAtentionService.actualizarAtencion(id, data, this.file).subscribe(
            response => {
              this.closeModal()
            }
          )
          this.emergencyService.showLoader = false;
        } else {
          this.emergencyService.showLoader = false;
        }
      }
    )
  }

  guardarAtencionEmergencia() {
    const data: AtencionEmergencia = {
      ubigeoAlmacen: this.createEmergencyAtention.value.ubigeoAlmacen,
      nombreAlmacen: this.selAlmacen,
      fechaAtencion: moment(this.createEmergencyAtention.value.fechaHoraAtencion).format('DD/MM/YYYY'),
      descripcion: this.createEmergencyAtention.value.descripcion,
      codigoSinpad: this.codigoSinpad,
      estado: 1,
      habilitado: 1
    }


    this.alertService.questionAlertConfirm(
      '¿Est&aacute;s Seguro de Agregar la Atenci&oacute;n?',
      '',
      'Si, Crear',
      TYPE_ALERT.QUESTION
    ).then(

      (result) => {
        if (result.value) {
          this.emergencyAtentionService.guardarAtencionEmergencia(data, this.file).subscribe(
            response => {
              this.closeModal()
            }
          )
          this.emergencyService.showLoader = false;
        } else {
          this.emergencyService.showLoader = false;
        }
      }
    )
  }



}
