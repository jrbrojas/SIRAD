import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form2aService } from 'src/app/shared/services/form-2a.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddAffectComponent } from '../modal-add-affect/modal-add-affect.component';
import { MasterTablesService } from 'src/app/shared/services/master-tables.service';
import { DtoAffectation, AffectedHousing } from '../../../shared/models/empadronamiento.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ID_GRUPO_ENFERMEDAD_LESIONADO, ID_LESIONADO } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-modal-affectation',
  templateUrl: './modal-affectation.component.html',
  styleUrls: ['./modal-affectation.component.scss'],
  providers: [NgbDropdownConfig]
})
export class ModalAffectationComponent implements OnInit {

  public createFormSalud: FormGroup;
  public chronicIllness: any;
  public personDisability: any;
  public isHealth: boolean = false;
  public isMv: boolean = false;
  public isViv: boolean = false;

  public ceilings: any;
  public walls: any;
  public floors: any;
  public healths: any;
  public cantidadMedioVida: any;

  public loadButton = false
  public disButton = false

  public lesiones : any = [
    {"id" : 1 , "descripcion" : "Grave"},
    {"id" : 2 , "descripcion" : "Moderado"},
    {"id" : 3 , "descripcion" : "Leve"},
  ]

  public tratamientos : any = [
    {"id" : 1 , "descripcion" : "Tratamiento local"},
    {"id" : 2 , "descripcion" : "Necesidad de evacuacion"},
  ]

  public lesionSeleccionada = {
    "id" : '',
    "descripcion" : ''
  }

  public tratamientoSeleccionado = {
    "id" : '',
    "descripcion" : ''
  }
  @Input() fromIdFamily: any;
  public family: any;
  idFamilia: any;
  idEmp: any;
  public wrapperHealth: any;

  tabId: string = 'health';
  tabTitle: string = 'Salud';

  constructor(
    config: NgbDropdownConfig,
    private _fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public form2aService: Form2aService,
    private modalService: NgbModal,
    private alert: AlertService,
    private master: MasterTablesService,
  ) {
    config.placement = 'top-top';
    config.autoClose = false;
    this.createFormSalud = this._fb.group({
      id: [],
      integrantes: this._fb.array([])
    });
  }

  ngOnInit(): void {
    this.getChronicIllness();
    this.getPersonDisability();
    this.getCeiling()
    this.getWall()
    this.getFloor()
    this.getHealth();
    this.idEmp = this.fromIdFamily.idEmp;
    this.cantidadMedioVida = this.fromIdFamily.cantidadMedioVida;
    this.getEmpById(this.idEmp);
    this.idFamilia = this.fromIdFamily.idFamily;
    this.getFamily();

  }

  getEmpById(id: number) {
    this.form2aService.getByIdForm2a(id).subscribe(res => {
      console.log("asdsd",res.empadronamiento)
      this.isViv = res.empadronamiento.tieneVivienda;
      this.isHealth = res.empadronamiento.tieneSalud;
      this.isMv = res.empadronamiento.tieneMedioVida;
    })
  }

  get integrantes() {
    return <FormArray>this.createFormSalud.get('integrantes');
  }

  displaySaludIntegrantes(res: any[]){

    res.forEach((value, index) => {
        const group = this._fb.group({
            integrante: value,
            afectacionSalud: [],
            idNivelLesion: [],
            nivelLesion : [],
            idCircunstanciaLesionado: [],
            circunstanciaLesionado: [],
            lugarDesplazamiento: []
        });
        this.integrantes.push(group);
        var idsSalud = <any[]>value.afectacionesSalud.map((t: any)=> Number(t.idSubCategoriaSalud));
        (((<FormArray>this.createFormSalud.controls['integrantes']).at(index)) as FormGroup).controls['afectacionSalud'].setValue(idsSalud);

        const personaLesionada = value.afectacionesSalud.find(afectacion => afectacion.idCategoriaSalud == ID_GRUPO_ENFERMEDAD_LESIONADO && afectacion.idSubCategoriaSalud == ID_LESIONADO);
        if(personaLesionada != undefined || personaLesionada != null){
          (((<FormArray>this.createFormSalud.controls['integrantes']).at(index)) as FormGroup).controls['idNivelLesion'].setValue(personaLesionada.idNivelLesion);
          (((<FormArray>this.createFormSalud.controls['integrantes']).at(index)) as FormGroup).controls['nivelLesion'].setValue(personaLesionada.nivelLesion);
          (((<FormArray>this.createFormSalud.controls['integrantes']).at(index)) as FormGroup).controls['idCircunstanciaLesionado'].setValue(personaLesionada.idCircunstanciaLesionado);
          (((<FormArray>this.createFormSalud.controls['integrantes']).at(index)) as FormGroup).controls['circunstanciaLesionado'].setValue(personaLesionada.circunstanciaLesionado);
          (((<FormArray>this.createFormSalud.controls['integrantes']).at(index)) as FormGroup).controls['lugarDesplazamiento'].setValue(personaLesionada.lugarDesplazamiento);   
        }        
    });
  }

  getNameIntegrante(index: any){
    const integrante = this.createFormSalud.value.integrantes[index].integrante
    return (integrante.nombres + ' ' + integrante.apellidos);
  }

  getIntegrante(index: any){
    return this.createFormSalud.value.integrantes[index].integrante
  }

  tabChange(event: string){
    if (event === 'mv') {
      this.tabId = event;
      this.tabTitle = 'Medios de Vida'
    } else if (event === 'health') {
      this.tabId = event;
      this.tabTitle = 'Salud';
    } else if (event === 'v') {
      this.tabId = event;
      this.tabTitle = 'Vivienda';
    }
  }

  changeChronic(event: any) {
  }

  getChronicIllness() {
    this.form2aService.listChronicIllness().subscribe(res => {
      this.chronicIllness = res;
    });
  }

  getPersonDisability() {
    this.form2aService.listPersonDisability().subscribe(res => {
      this.personDisability = res;
    });
  }

  multiple(event: any) {
  }

  closeModal() {
    this.activeModal.close();
  }

  getHealth() {
    this.form2aService.getHealth().subscribe(res => {
      this.healths = res;

    })
  }

  getFamily() {
    this.form2aService.getFormFamily(this.idFamilia).subscribe(res => {
      console.log('family', res)
      this.family = res;
      this.displaySaludIntegrantes(this.family);
    })
  }

  IsLesionado(i){
    let result = false;
    const integrante = this.createFormSalud.value.integrantes[i].integrante;
    if(integrante.afectacionesSalud){
      result = integrante.afectacionesSalud.some(afectacion => afectacion.idCategoriaSalud == ID_GRUPO_ENFERMEDAD_LESIONADO && afectacion.idSubCategoriaSalud == ID_LESIONADO);
    }
    return result;
  }

  getSelectNivelLesion(event: any, i: any){

    const integrante = this.getIntegrante(i);

    integrante.afectacionesSalud.filter(afectacion => afectacion.idCategoriaSalud == ID_GRUPO_ENFERMEDAD_LESIONADO && afectacion.idSubCategoriaSalud == ID_LESIONADO)
                                .map(af => {af.idNivelLesion =  event.id, af.nivelLesion = event.descripcion});
    this.form2aService.createAffectation(integrante).subscribe(res => {
        this.alert.toastSuccess('nivel de lesión actualizado');
    })
  }

  getSelectCircunstanciaLesionado(event: any, i: any){
   
    const integrante = this.getIntegrante(i);

    integrante.afectacionesSalud.filter(afectacion => afectacion.idCategoriaSalud == ID_GRUPO_ENFERMEDAD_LESIONADO && afectacion.idSubCategoriaSalud == ID_LESIONADO)
                                .map(af => {af.idCircunstanciaLesionado =  event.id, af.circunstanciaLesionado = event.descripcion});

      this.form2aService.createAffectation(integrante).subscribe(res => {
        this.alert.toastSuccess('circunstancia del lesionado actualizado');
      })
  }



  getSelectAfectacionesSalud(listaAfectacion: any, i: any){

    const integranteAfectado = this.getIntegrante(i);
      

      let afectaciones: any = [];

      listaAfectacion.forEach((afectacion: any) => {
        const af:any = {
          idCategoriaSalud: afectacion.idGrupoEnfermedad,
          categoriaSalud: afectacion.desGrupoEnfermedad,
          idSubCategoriaSalud: afectacion.id,
          subCategoriaSalud: afectacion.descripcion,
        }
         let afectacionSalud = integranteAfectado.afectacionesSalud.find((item: any)=> (item.idSubCategoriaSalud == afectacion.id))
         if(afectacionSalud){
           af.id = afectacionSalud.id;
         }
        afectaciones.push(af);
      });

      integranteAfectado.afectacionesSalud = afectaciones;
      this.form2aService.createAffectation(integranteAfectado).subscribe(res => {
        
        this.alert.toastSuccess(res.message);
        this.getHealth()

        if(res.post != null){
          integranteAfectado.afectacionesSalud = res.post.afectacionesSalud;
        }
      })

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

  guardarLugarDesplazamiento(i: any){
    this.loadButton = true
    const integranteAfectado = this.getIntegrante(i);

    const valuesForm = this.createFormSalud.value.integrantes[i];
  
    integranteAfectado.afectacionesSalud.filter(afectacion => afectacion.idCategoriaSalud == ID_GRUPO_ENFERMEDAD_LESIONADO && afectacion.idSubCategoriaSalud == ID_LESIONADO)
                                .map(af => {af.lugarDesplazamiento =  valuesForm.lugarDesplazamiento});

      this.form2aService.createAffectation(integranteAfectado).subscribe(res => {
        if(res.post != null){
          this.alert.toastSuccess('Lugar de desplzamiento actualizado');
          this.loadButton = false;
        }else{
          this.alert.toastWarning('HUbo un error al actualizar el lugar de desplazamiento');
          this.loadButton = false
        }
      })

  }

}
