import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { MasterTablesService } from 'src/app/shared/services/master-tables.service';
import { FamilyMembers } from 'src/app/shared/models/forms.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import * as moment from 'moment';
import {ModalMvComponent} from "../modal-mv/modal-mv.component";
import {TYPE_ALERT} from "../../../shared/services/config";
import {FamilyGroupService} from "../../../shared/services/family-group.service";
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { PersonasService } from 'src/app/shared/services/personas.service';
import { Persona } from 'src/app/shared/models/emergency.model';


@Component({
  selector: 'app-modal-family',
  templateUrl: './modal-family.component.html',
  styleUrls: ['./modal-family.component.scss']
})
export class ModalFamilyComponent implements OnInit {

  public createFormFamily: FormGroup;
  public disabled: boolean = false;
  public isWomanDisable: boolean = false;
  public idFamilia: any;
  public idEmpadronamiento: any;
  public idEmpDelete: any;
  public familyGroup: any;

  public PERMISOS = PERMISOS;

  public typeDocuments: any;
  public form2b: any;
  public familyMembers: any;
  public isUpdate: boolean = false;
  public searchDocument = '';
  public disButton = true
  public loadButton = false
  public disEdit = false
  public user : any

  public background : string = "background-color: #EBEDEF"

  @Input() fromParentIdEmp: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _fb: FormBuilder,
    public form2aService: Form2aService,
    private master: MasterTablesService,
    private alertService: AlertService,
    private modalService: NgbModal,
    public authService:  AuthService,
    private personaService : PersonasService
  ) {
    this.user = localStorage.getItem('userData');
    this.createFormFamily = this._fb.group({
      idTypeDocument: ['', [Validators.required]],
      idFamInt: [''],
      typeInt: ['', [Validators.required]],
      format2B: [''],
      type: [''],
      typeDocument: ['', [Validators.required]],
      numberDocument: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      yearAndMonth: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      address: [''],
      lotNumber: [''],
      pregnantWomen: [''],
      weeks: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  ngOnInit(): void {
    this.getTypeDocuments();
    this.getForm2B();
    this.idEmpadronamiento = this.fromParentIdEmp;
  }

  createFamilyInfo() {
    if (this.createFormFamily.value.type != "JEFE") {
      //dependiente
      const dep: FamilyMembers = {
        medioVida: this.createFormFamily.value.format2B,
        tipoIntegrante: this.createFormFamily.value.typeInt,
        idTipoDocumento: this.createFormFamily.value.idTypeDocument,
        tipoDocumento: this.createFormFamily.value.typeDocument,
        numeroDocumento: this.createFormFamily.value.numberDocument,
        apellidos: this.createFormFamily.value.surname,
        nombres: this.createFormFamily.value.lastNames,
        fechaNacimiento: moment(this.createFormFamily.value.birthDate).format('YYYY-MM-DD'),
        edad: this.createFormFamily.value.yearAndMonth,
        tipoSexo: this.createFormFamily.value.sex,
        direccion: this.createFormFamily.value.address,
        lote: this.createFormFamily.value.lotNumber,
        gestante: this.createFormFamily.value.pregnantWomen,
        semanaGestacion: this.createFormFamily.value.weeks,
        habilitado: 1,
        fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        familia: {
          id: this.idFamilia,
        }
      }

      this.form2aService.createFamilyInfo(dep).subscribe((res: any) => {
        this.alertService.toastSuccess(`${res.message}`);
        this.resetInput();
        this.getFamily(res.post.familia.id);
        this.idEmpDelete = res.post.familia.id;
      });
    } else {
      const jef: FamilyMembers = {
        medioVida: this.createFormFamily.value.format2B,
        tipoIntegrante: this.createFormFamily.value.typeInt,
        idTipoDocumento: this.createFormFamily.value.idTypeDocument,
        tipoDocumento: this.createFormFamily.value.typeDocument,
        numeroDocumento: this.createFormFamily.value.numberDocument,
        apellidos: this.createFormFamily.value.surname,
        nombres: this.createFormFamily.value.lastNames,
        fechaNacimiento: moment(this.createFormFamily.value.birthDate).format('YYYY-MM-DD'),
        edad: this.createFormFamily.value.yearAndMonth,
        tipoSexo: this.createFormFamily.value.sex,
        direccion: this.createFormFamily.value.address,
        lote: this.createFormFamily.value.lotNumber,
        gestante: this.createFormFamily.value.pregnantWomen,
        semanaGestacion: this.createFormFamily.value.weeks,
        habilitado: 1,
        fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        familia: {
          empadronamiento: {
            id: this.fromParentIdEmp
          },
          habilitado: 1
        }
      }

      this.form2aService.createFamilyInfo(jef).subscribe((res: any) => {
        this.alertService.toastSuccess(`${res.message}`);
        this.resetInput();
        this.idFamilia = res.post.familia.id;
        this.getFamily(res.post.familia.id);
        this.idEmpDelete = res.post.familia.id;
      });
    }
  }

  resetInput() {
    this.createFormFamily.controls['typeInt'].reset('');
    this.createFormFamily.controls['format2B'].reset('');
    this.createFormFamily.controls['idTypeDocument'].reset('');
    this.createFormFamily.controls['typeDocument'].reset('');
    this.createFormFamily.controls['numberDocument'].reset('');
    this.createFormFamily.controls['surname'].reset('');
    this.createFormFamily.controls['lastNames'].reset('');
    this.createFormFamily.controls['birthDate'].reset('');
    this.createFormFamily.controls['sex'].reset('');
    this.createFormFamily.controls['address'].reset('');
    this.createFormFamily.controls['lotNumber'].reset('');
    this.createFormFamily.controls['yearAndMonth'].reset('');
    this.createFormFamily.controls['pregnantWomen'].reset('');
    this.createFormFamily.controls['weeks'].reset('');
  }

  getTypeDocuments() {
    this.master.getTypeDocuments().subscribe(res => {
      console.log("J",res)
      this.typeDocuments = res;
    });
  }

  getForm2B() {
    this.master.getForm2b().subscribe(res => {
      this.form2b = res;
    });
  }

  changeTypeDocument(event: any) {
    this.disButton = true;
    this.disEdit = false;
    this.createFormFamily.controls['numberDocument'].reset();
    this.createFormFamily.controls['surname'].reset();
    this.createFormFamily.controls['lastNames'].reset();
    this.createFormFamily.controls['birthDate'].reset('');
    this.createFormFamily.controls['yearAndMonth'].reset('');
    this.createFormFamily.controls['sex'].reset('');
    const select = event.target;
    const val = select.options[select.selectedIndex].getAttribute('name');
    this.createFormFamily.controls['typeDocument'].setValue(val);
    if(val === "DNI"){
      this.disButton = false
      
    }
    
  }

  getFamilyMembers(id: number) {
    this.form2aService.listFamilyMembers(id).subscribe((res: any[]) => {
      this.familyMembers = res;
    })
  }

  closeModal() {
    this.modalService.dismissAll(this.idEmpadronamiento);
  }

  updateFamilyInfo() {
    if (this.createFormFamily.value.type != "JEFE") {
      //dependiente
      const dep: FamilyMembers = {
        id: this.createFormFamily.value.idFamInt,
        medioVida: this.createFormFamily.value.format2B,
        tipoIntegrante: this.createFormFamily.value.typeInt,
        idTipoDocumento: this.createFormFamily.value.idTypeDocument,
        tipoDocumento: this.createFormFamily.value.typeDocument,
        numeroDocumento: this.createFormFamily.value.numberDocument,
        apellidos: this.createFormFamily.value.surname,
        nombres: this.createFormFamily.value.lastNames,
        fechaNacimiento: moment(this.createFormFamily.value.birthDate).format('YYYY-MM-DD'),
        edad: this.createFormFamily.value.yearAndMonth,
        tipoSexo: this.createFormFamily.value.sex,
        direccion: this.createFormFamily.value.address,
        lote: this.createFormFamily.value.lotNumber,
        gestante: this.createFormFamily.value.pregnantWomen,
        semanaGestacion: this.createFormFamily.value.weeks,
        habilitado: 1,
        fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        familia: {
          id: this.idFamilia,
        }
      }

      this.form2aService.createFamilyInfo(dep).subscribe((res: any) => {
        this.alertService.toastSuccess(`${res.message}`);
        this.resetInput();
        //this.idFamilia = res.post.familia.id;
        this.getFamily(res.post.familia.id);
        this.isUpdate = false;
        this.idEmpDelete = res.post.familia.id;
        //this.modalService.dismissAll(this.idFamilia);
      });
    } else {
      //jefe
      const d: FamilyMembers = {
        id: this.createFormFamily.value.idFamInt,
        medioVida: this.createFormFamily.value.format2B,
        tipoIntegrante: this.createFormFamily.value.typeInt,
        idTipoDocumento: this.createFormFamily.value.idTypeDocument,
        tipoDocumento: this.createFormFamily.value.typeDocument,
        numeroDocumento: this.createFormFamily.value.numberDocument,
        apellidos: this.createFormFamily.value.surname,
        nombres: this.createFormFamily.value.lastNames,
        fechaNacimiento: moment(this.createFormFamily.value.birthDate).format('YYYY-MM-DD'),
        tipoSexo: this.createFormFamily.value.sex,
        direccion: this.createFormFamily.value.address,
        lote: this.createFormFamily.value.lotNumber,
        edad: this.createFormFamily.value.yearAndMonth,
        gestante: this.createFormFamily.value.pregnantWomen,
        semanaGestacion: this.createFormFamily.value.weeks,
        habilitado: 1,
        fechaHoraRegistrado: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        familia: {
          empadronamiento: {
            id: this.fromParentIdEmp
          },
          habilitado: 1
        }
      }

      this.form2aService.createFamilyInfo(d).subscribe((res: any) => {
        this.alertService.toastSuccess(`${res.message}`);
        this.resetInput();
        this.idFamilia = res.post.familia.id;
        //this.idEmpadronamiento = res.post.familia.empadronamiento.id;
        this.getFamily(res.post.familia.id);
        this.idEmpDelete = res.post.familia.id;
        this.isUpdate = false;
      });
    }
  }

  deleteFamily(id: number) {
    this.alertService.questionAlertConfirm('¿Está seguro de eliminar?', 'No volverá a visualizar este registro', 'Si, Eliminar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.form2aService.deleteFamily(id).subscribe(res => {
            this.alertService.toastSuccess(`${res.message}`);
            //this.getFamilyMembers(this.fromParent.ID);
            this.getFamily(this.idEmpDelete);
          })
        }
      }
    );
  }

  showUpdate(data: any) {
    this.isUpdate = true;
    this.createFormFamily.controls['idFamInt'].setValue(data.id);
    this.createFormFamily.controls['typeInt'].setValue(data.tipoIntegrante);
    this.createFormFamily.controls['format2B'].setValue(data.medioVida);
    this.createFormFamily.controls['idTypeDocument'].setValue(data.idTipoDocumento);
    this.createFormFamily.controls['numberDocument'].setValue(data.numeroDocumento);
    this.createFormFamily.controls['surname'].setValue(data.apellidos);
    this.createFormFamily.controls['lastNames'].setValue(data.nombres);
    this.createFormFamily.controls['birthDate'].setValue(moment(data.fechaNacimiento).format('MM-DD-YYYY'));
    this.createFormFamily.controls['sex'].setValue(data.tipoSexo);
    this.createFormFamily.controls['yearAndMonth'].setValue(data.edad);
    this.createFormFamily.controls['address'].setValue(data.direccion);
    this.createFormFamily.controls['lotNumber'].setValue(data.lote);
    this.createFormFamily.controls['pregnantWomen'].setValue(data.gestante);
    this.createFormFamily.controls['weeks'].setValue(data.semanaGestacion);
    this.createFormFamily.controls['typeDocument'].setValue(data.tipoDocumento);
  }

  isPregnantWomen(event: any) {
    const select = event.target;
    if (select.options[select.selectedIndex].getAttribute('name') == 'SI') {
      this.disabled = true;
    } else {
      this.disabled = false;
      this.createFormFamily.controls['weeks'].reset('');
    }
  }

  isWoman(event: any) {
    const select = event.target;
    console.log(select.options[select.selectedIndex].getAttribute('name'));
    
    if (select.options[select.selectedIndex].getAttribute('name') == 'F') {
      this.isWomanDisable = true;
      this.background = "";
    } else {
      this.background = "background-color: #EBEDEF";
      this.isWomanDisable = false;
      this.createFormFamily.controls['pregnantWomen'].reset('');
    }
    console.log("cambio",this.isWomanDisable);
    
  }

  isCalculateAge(event: any) {
    const today = new Date();
    const myBirthDay = new Date(moment(event).format('YYYY/MM/DD'));
    let age = today.getFullYear() - myBirthDay.getFullYear();
    const difMonth = today.getMonth() - myBirthDay.getMonth();
    if (difMonth < 0 || (difMonth === 0 && today.getDate() < myBirthDay.getDate())) {
      age--;
    }
    return this.createFormFamily.controls['yearAndMonth'].setValue(age);
  }

  isTypeInt(event: any) {
    const select = event.target;
    const val = select.options[select.selectedIndex].getAttribute('name');
    if (val != "JEFE") {
      this.createFormFamily.controls['type'].setValue('DEPENDIENTE');
    } else {
      this.createFormFamily.controls['type'].setValue('JEFE');
    }
  }

  getFamily(id: number){
    this.form2aService.getFormFamily(id).subscribe((res: any) => {
      this.familyGroup = res;
    })
  }

  consultarDni(){
    this.loadButton = true
    let dniRequested = this.createFormFamily.controls['numberDocument'].value
    this.user == "00374311"
    //this.personaService.obtenerPersona(dniRequested).subscribe(
      //response => {
        /* if(response === null){ */
          this.form2aService.queryReniec( "00374311" , dniRequested).subscribe(
            response => {
              if(response.coResultado == "0000"){
                console.log(response)
                let apellidosConcat = `${response.datosPersona.primerApellido}  ${response.datosPersona.segundoApellido}`
                this.createFormFamily.controls['lastNames'].setValue(response.datosPersona.prenombres)
                this.createFormFamily.controls['surname'].setValue(apellidosConcat)
                
                if(response.datosPersona.genero == "MASCULINO"){
                  this.createFormFamily.controls['sex'].setValue('M')
                }else{
                  this.createFormFamily.controls['sex'].setValue('F')
                }
          
                let desNac = response.datosPersona.fechaNacimiento.split('/')
                this.createFormFamily.controls['birthDate'].setValue(`${desNac[1]}/${desNac[0]}/${desNac[2]}`)
                this.loadButton = false
                this.disEdit = true

                const data: Persona = {
                  dni : response.datosPersona.dni,
                  prenombres : response.datosPersona.prenombres,
                  primerapellido : response.datosPersona.primerApellido,
                  segundoapellido : response.datosPersona.segundoApellido,
                  apellidocasada : response.datosPersona.apellidoCasada,
                  fechanacimiento : response.datosPersona.fechaNacimiento,
                  genero : response.datosPersona.genero
                }

                this.personaService.guardarPersona(data).subscribe(response => console.log(response))

              }
              else{
                this.alertService.confirmAlert(response.deResultado, TYPE_ALERT.WARNING )
                this.createFormFamily.controls['numberDocument'].reset();
                this.createFormFamily.controls['surname'].reset();
                this.createFormFamily.controls['lastNames'].reset();
                this.createFormFamily.controls['birthDate'].reset('');
                this.createFormFamily.controls['yearAndMonth'].reset('');
                this.createFormFamily.controls['sex'].reset('');
                this.loadButton = false
              }
            }
          )
  }
}
