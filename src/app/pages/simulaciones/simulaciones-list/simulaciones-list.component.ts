import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AlertService } from 'src/app/shared/services/alert.service';



export interface DataEvento {
  numIdEvento: number;
  txtEventoNombre: string;
  txtEventoDescripcion: string;
  txtEventoLugar: string;
  datEventoFecha: Date;
  timEventoHoraInicio: string;
  timEventoHoraFin: string;
  bolEventoActivo: boolean;
  bolEventoIniciado: boolean;
  dataEventoGrupos: DataEventoGrupos[];
  dataEventoSubGrupos: DataEventoSubGrupos[];
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
  tipo?: number;
  nivel?: number;
}


const TREE_DATA: FoodNode[] = [
  /* {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  }, */
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

export interface DataGrupo {
  numero: number;
  descripcion: string;
}

export interface participantesPerfil {
  numero: number;
  descripcion: string;
}

export interface DataEventoGrupos {
  numIdGrupo: number;
  numIdEvento: number;
  txtGrupoNombre: string;
  bolGrupoActivo: boolean;
}

export interface DataEventoSubGrupos {
  numIdSubGrupo: number;
  numIdGrupo: number;
  datGrupo: DataEventoGrupos;
  txtGrupoNombre: string;
  txtSubGrupoNombre: string;
  bolSubGrupoActivo: boolean;
}

export interface DataEventoPerfil {
  numIdPerfilEncargado: number;
  txtPerfilEncargadoNombre: string;
}

export interface DataEventoPerfilEncargado {
  numIdPerfilEncargadoEvento: number;
  numIdEvento: number;
  numIdGrupo: number;
  numIdPerfilEncargado: number;
  datGrupo: DataEventoGrupos;
  datPerfil: DataEventoPerfil;
  txtPerfilEncargadoNombre: string;
  txtGrupoNombre: string;
  bolPerfilEncargadoActivo: boolean;
}

@Component({
  selector: 'app-simulaciones-list',
  templateUrl: './simulaciones-list.component.html',
  styleUrls: ['./simulaciones-list.component.scss']
})
export class SimulacionesListComponent implements OnInit {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  public boolPerfil: boolean = false
  public addEdit: boolean = false
  public boolGroup: boolean = false
  public nombreGrupoTree: string = ""
  public data: any[] = [
    {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }, {
      txtTitulo: 'SISMO MAGNITUD 8.8',
      txtUbigeo: 'LIMA/LIMA/VENTANILLA',
      txtEstado: 'Activo',
      txtInicio: '28.09.22 15:00',
      txtFin: '28.09.22 15:00',
      numParticipantes: 150
    }
  ]
  constructor(public authService: AuthService, private alert: AlertService,
    private _formBuilder: FormBuilder) {
    if (JSON.parse(localStorage.getItem('user'))) {
      console.log("true");
    } else {
      console.log("NO ");
    }
    this.dataSource.data = TREE_DATA;

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  logoutFunc() {
    //this.authService.SignOut();
  }

  dataEvento: DataEvento[] = [];
  dataGrupo: DataGrupo[] = [];
  dataEventoFiltro: DataEvento[] = [];
  dataEventoGruposLista = new MatTableDataSource<DataEventoGrupos>([]);
  dataEventoSubGruposLista = new MatTableDataSource<DataEventoSubGrupos>([]);
  dataEventoPerfilEncargadoLista = new MatTableDataSource<DataEventoPerfilEncargado>([]);
  dataEventoPerfil: DataEventoPerfil[] = [];

  datosEventoFormGroup: any;
  gruposEventoFormGroup: any;
  subGruposEventoFormGroup: any;
  perfilEncargadoEventoFormGroup: any;

  displayedColumnsGrupo: string[] = ['item', 'txtGrupoNombre', 'bolGrupoActivo'];
  displayedColumnsSubGrupo: string[] = ['item', 'txtGrupoNombre', 'txtSubGrupoNombre', 'bolSubGrupoActivo'];
  displayedColumnsPerfilEncargado: string[] = ['item', 'txtGrupoNombre', 'txtPerfilEncargadoNombre', 'bolPerfilEncargadoActivo'];

  resultsLength = 10;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginatorGrupo!: MatPaginator;
  @ViewChild(MatPaginator) paginatorSubGrupo!: MatPaginator;
  @ViewChild(MatPaginator) paginatorPerfilEncargado!: MatPaginator;

  @ViewChild(MatSort) sortGrupo!: MatSort;
  @ViewChild(MatSort) sortSubGrupo!: MatSort;
  @ViewChild(MatSort) sortPerfilEncargado!: MatSort;

  addGrupo: boolean = false;
  addSubGrupo: boolean = false;
  addPerfilEncargado: boolean = false;
  addGroupTreeF: boolean = false;
  addGroupTreeSub: boolean = false;
  addGroupTreeSubDesc: string = "";
  addGroupTreeSubType: number = 1;
  addGroupTreeSubLevel: number = 0;
  addGroupTreeSubName: string = "";

  bolNuevoEvento: boolean = false;
  bolEditarEvento: boolean = false;

  index: number = 0;
  numTipoFiltro: number = 0;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  formGroupTree = new FormGroup({
    descripcion: new FormControl(),
  });

  onIniciarRegistro() {
    this.formGroupTree = this._formBuilder.group({
      descripcion: ['', Validators.required],
    });
    this.datosEventoFormGroup = this._formBuilder.group({
      numIdEvento: [null],
      txtEventoNombre: [null, Validators.required],
      txtEventoDescripcion: [null, Validators.required],
      txtEventoLugar: [null, Validators.required],
      datEventoFecha: [null, Validators.required],
      timEventoHoraInicio: [null, Validators.required],
      timEventoHoraFin: [null, Validators.required],
      bolEventoActivo: [true],
      bolEventoIniciado: [false],
      dataEventoGrupos: [null],
      dataEventoSubGrupos: [null],
    });
    this.gruposEventoFormGroup = this._formBuilder.group({
      numIdGrupo: [null],
      numIdEvento: [null],
      txtGrupoNombre: ['', Validators.required],
      bolGrupoActivo: [true]
    });
    this.subGruposEventoFormGroup = this._formBuilder.group({
      numIdSubGrupo: [null],
      numIdGrupo: [null],
      datGrupo: [null, Validators.required],
      txtGrupoNombre: [null],
      txtSubGrupoNombre: ['', Validators.required],
      bolSubGrupoActivo: [true]
    });
    this.perfilEncargadoEventoFormGroup = this._formBuilder.group({
      numIdPerfilEncargadoEvento: [null],
      numIdEvento: [null],
      numIdGrupo: [null],
      numIdPerfilEncargado: [null],
      datGrupo: [null, Validators.required],
      datPerfil: [null, Validators.required],
      txtPerfilEncargadoNombre: [null],
      txtGrupoNombre: [null],
      bolPerfilEncargadoActivo: [true]
    });
  }


  ngOnInit(): void {
    this.onIniciarRegistro();
    this.dataEventoGruposLista.paginator = this.paginatorGrupo;
    this.dataEventoSubGruposLista.paginator = this.paginatorSubGrupo;
    this.dataEventoPerfilEncargadoLista.paginator = this.paginatorPerfilEncargado;
    this.dataEventoPerfil.push({
      numIdPerfilEncargado: 1,
      txtPerfilEncargadoNombre: `Camila de la Santísima Trinidad`,
    }, {
      numIdPerfilEncargado: 2,
      txtPerfilEncargadoNombre: `Juana de la Santísima Cruz`,
    }, {
      numIdPerfilEncargado: 3,
      txtPerfilEncargadoNombre: `Mónica Patricia de Ávalos Mendoza`,
    }, {
      numIdPerfilEncargado: 4,
      txtPerfilEncargadoNombre: `Martín Elías de los Ríos Acosta`,
    }, {
      numIdPerfilEncargado: 5,
      txtPerfilEncargadoNombre: `Valeria Hernández de Vásquez`,
    }, {
      numIdPerfilEncargado: 6,
      txtPerfilEncargadoNombre: `Rosa María Gómez de Jiménez`,
    }, {
      numIdPerfilEncargado: 7,
      txtPerfilEncargadoNombre: `Tulia Adriana Meneses de Piedrahíta`,
    }, {
      numIdPerfilEncargado: 8,
      txtPerfilEncargadoNombre: `Natalia Fernández Vda. de Del Prado`,
    }, {
      numIdPerfilEncargado: 9,
      txtPerfilEncargadoNombre: `Daniel La Roche Zuluaga`,
    }, {
      numIdPerfilEncargado: 10,
      txtPerfilEncargadoNombre: `Matías de Greiff Rincón`,
    })
    this.dataEvento.push({
      numIdEvento: 1,
      txtEventoNombre: `SISMO 8.1`,
      txtEventoDescripcion: `Sismo de magnitiud 8.8 en distrito de ventanilla, a generado daños y perdidas humanas`,
      txtEventoLugar: `Lima-Callao-Ventanilla`,
      datEventoFecha: new Date('2022-10-01'),
      timEventoHoraInicio: '15:30',
      timEventoHoraFin: '18:15',
      bolEventoActivo: true,
      bolEventoIniciado: false,
      dataEventoGrupos: [],
      dataEventoSubGrupos: []
    }, {
      numIdEvento: 2,
      txtEventoNombre: `SISMO 8.1`,
      txtEventoDescripcion: `Sismo de magnitiud 8.8 en distrito de ventanilla, a generado daños y perdidas humanas`,
      txtEventoLugar: `Lima-Callao-Ventanilla`,
      datEventoFecha: new Date('2022-10-01'),
      timEventoHoraInicio: '15:30',
      timEventoHoraFin: '18:15',
      bolEventoActivo: true,
      bolEventoIniciado: false,
      dataEventoGrupos: [],
      dataEventoSubGrupos: []
    }, {
      numIdEvento: 3,
      txtEventoNombre: `SISMO 8.1`,
      txtEventoDescripcion: `Sismo de magnitiud 8.8 en distrito de ventanilla, a generado daños y perdidas humanas`,
      txtEventoLugar: `Lima-Callao-Ventanilla`,
      datEventoFecha: new Date('2022-10-01'),
      timEventoHoraInicio: '15:30',
      timEventoHoraFin: '18:15',
      bolEventoActivo: true,
      bolEventoIniciado: false,
      dataEventoGrupos: [],
      dataEventoSubGrupos: []
    }, {
      numIdEvento: 4,
      txtEventoNombre: `SISMO 8.1`,
      txtEventoDescripcion: `Sismo de magnitiud 8.8 en distrito de ventanilla, a generado daños y perdidas humanas`,
      txtEventoLugar: `Lima-Callao-Ventanilla`,
      datEventoFecha: new Date('2022-10-01'),
      timEventoHoraInicio: '15:30',
      timEventoHoraFin: '18:15',
      bolEventoActivo: true,
      bolEventoIniciado: false,
      dataEventoGrupos: [],
      dataEventoSubGrupos: []
    }, {
      numIdEvento: 5,
      txtEventoNombre: `SISMO 8.1`,
      txtEventoDescripcion: `Sismo de magnitiud 8.8 en distrito de ventanilla, a generado daños y perdidas humanas`,
      txtEventoLugar: `Lima-Callao-Ventanilla`,
      datEventoFecha: new Date('2022-10-01'),
      timEventoHoraInicio: '15:30',
      timEventoHoraFin: '18:15',
      bolEventoActivo: true,
      bolEventoIniciado: false,
      dataEventoGrupos: [],
      dataEventoSubGrupos: []
    });
    this.onFiltro(0);


    this.dataGrupo.push(
      {
        numero: 1,
        descripcion: "EXCON"
      },
      {
        numero: 2,
        descripcion: "EXCON ADMINISTRATIVO"
      },
      {
        numero: 3,
        descripcion: "EVALUADOR"
      },
      {
        numero: 4,
        descripcion: "OBSERVADOR"
      },
      {
        numero: 5,
        descripcion: "PARTICIPANTES"
      });
  }

  onFiltro(numTipoFiltro: number) {
    this.dataEventoFiltro = [];
    this.numTipoFiltro = numTipoFiltro;
    for (let a = 0; a < this.dataEvento.length; a++) {
      if (numTipoFiltro === 0) {
        this.dataEventoFiltro.push(this.dataEvento[a]);
      } else if (numTipoFiltro === 1) {
        if (this.dataEvento[a].bolEventoIniciado) this.dataEventoFiltro.push(this.dataEvento[a]);
      } else if (numTipoFiltro === 2) {
        if (this.dataEvento[a].bolEventoActivo && !this.dataEvento[a].bolEventoIniciado) this.dataEventoFiltro.push(this.dataEvento[a]);
      } else if (numTipoFiltro === 3) {
        if (!this.dataEvento[a].bolEventoActivo) this.dataEventoFiltro.push(this.dataEvento[a]);
      }
    }
  }

  onNuevoEvento(bolNuevoEvento: boolean) {
    this.bolNuevoEvento = bolNuevoEvento;
    this.bolEditarEvento = false;
    this.onIniciarRegistro();
  }

  onIniciarEvento(index: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Confirmar?',
      html: "Esta a punto de iniciar simulación. <strong>Una vez iniciada no se podrá cancelar.</strong>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo iniciar simulación!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataEventoFiltro[index].bolEventoIniciado = true;
        for (let a = 0; a < this.dataEvento.length; a++) {
          if (this.dataEvento[a].numIdEvento === this.dataEventoFiltro[index].numIdEvento) {
            this.dataEvento[a].bolEventoIniciado = true;
            break;
          }
        }
        this.onFiltro(this.numTipoFiltro);
        swalWithBootstrapButtons.fire(
          'Simulación iniciada correctamente!',
          '',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se cancelo el inicio de la simulación correctamente',
          'error'
        )
      }
    })
  }

  onFinalizarEvento(index: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Confirmar?',
      html: "Esta a punto de finalizar la simulación, <strong>una vez finalizada no se podrá iniciar nuvamente.</strong>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo finalizar simulación!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataEventoFiltro[index].bolEventoIniciado = false;
        this.dataEventoFiltro[index].bolEventoActivo = false;
        for (let a = 0; a < this.dataEvento.length; a++) {
          if (this.dataEvento[a].numIdEvento === this.dataEventoFiltro[index].numIdEvento) {
            this.dataEvento[a].bolEventoIniciado = false;
            this.dataEvento[a].bolEventoActivo = false;
            break;
          }
        }
        this.onFiltro(this.numTipoFiltro);
        swalWithBootstrapButtons.fire(
          'Simulación finalizada correctamente!',
          '',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se cancelo la finalización de la simulación correctamente',
          'error'
        )
      }
    })
  }

  onEditarEvento(element: any, index: number) {
    this.bolNuevoEvento = true;
    this.bolEditarEvento = true;
    this.index = index;
    this.datosEventoFormGroup.get("numIdEvento")?.setValue(element.numIdEvento);
    this.datosEventoFormGroup.get("txtEventoNombre")?.setValue(element.txtEventoNombre);
    this.datosEventoFormGroup.get("txtEventoDescripcion")?.setValue(element.txtEventoDescripcion);
    this.datosEventoFormGroup.get("txtEventoLugar")?.setValue(element.txtEventoLugar);
    this.datosEventoFormGroup.get("datEventoFecha")?.setValue(element.datEventoFecha),
      this.datosEventoFormGroup.get("timEventoHoraInicio")?.setValue(element.timEventoHoraInicio);
    this.datosEventoFormGroup.get("timEventoHoraFin")?.setValue(element.timEventoHoraFin);
    this.datosEventoFormGroup.get("bolEventoActivo")?.setValue(element.timEventoHoraFin);
    this.datosEventoFormGroup.get("dataEventoGrupos")?.setValue(element.dataEventoGrupos);
    this.datosEventoFormGroup.get("dataEventoSubGrupos")?.setValue(element.dataEventoSubGrupos);
  }

  /*INICIO - GRUPO Y SUB GRUPO*/
  onAgregarGrupo() {
    if (!this.addGrupo) this.gruposEventoFormGroup.reset();
    if (this.addGrupo && this.gruposEventoFormGroup.valid) {
      this.isLoadingResults = true
      this.dataEventoGruposLista.data.push({
        //numIdGrupo: item.value.numIdGrupo!,
        numIdGrupo: (this.dataEventoGruposLista.data.length + 1),
        numIdEvento: this.gruposEventoFormGroup.value.numIdEvento!,
        txtGrupoNombre: this.gruposEventoFormGroup.value.txtGrupoNombre!,
        bolGrupoActivo: true
      });
      this.dataEventoGruposLista = new MatTableDataSource<DataEventoGrupos>(this.dataEventoGruposLista.data);
      this.isLoadingResults = false;
    }
    this.addGrupo = !this.addGrupo;
  }

  onAgregarSubGrupo() {
    if (!this.addSubGrupo) this.subGruposEventoFormGroup.reset();
    if (this.addSubGrupo && this.subGruposEventoFormGroup.valid) {
      this.isLoadingResults = true
      let dataEventoGruposSelect: DataEventoGrupos = this.subGruposEventoFormGroup.value.datGrupo!;
      this.dataEventoSubGruposLista.data.push({
        //numIdGrupo: item.value.numIdGrupo!,
        numIdSubGrupo: (this.dataEventoSubGruposLista.data.length + 1),
        numIdGrupo: dataEventoGruposSelect.numIdGrupo,
        datGrupo: null!,
        txtSubGrupoNombre: this.subGruposEventoFormGroup.value.txtSubGrupoNombre!,
        txtGrupoNombre: dataEventoGruposSelect.txtGrupoNombre,
        bolSubGrupoActivo: true
      });
      this.dataEventoSubGruposLista = new MatTableDataSource<DataEventoSubGrupos>(this.dataEventoSubGruposLista.data);
      this.isLoadingResults = false;
    }
    this.addSubGrupo = !this.addSubGrupo;
  }
  /*FIN - GRUPO Y SUB GRUPO*/


  /*INICIO - PERFIL ENCARGADO*/
  onAgregarPerfilEncargado() {
    if (!this.addPerfilEncargado) this.perfilEncargadoEventoFormGroup.reset();
    if (this.addPerfilEncargado && this.perfilEncargadoEventoFormGroup.valid) {
      this.isLoadingResults = true
      let dataEventoPerfilEncargadoSelect: DataEventoPerfilEncargado = this.perfilEncargadoEventoFormGroup.value.datPerfil!;
      let dataEventoGruposSelect: DataEventoGrupos = this.perfilEncargadoEventoFormGroup.value.datGrupo!;
      this.dataEventoPerfilEncargadoLista.data.push({
        //numIdPerfilEncargado: item.value.numIdPerfilEncargado!,
        numIdPerfilEncargadoEvento: (this.dataEventoPerfilEncargadoLista.data.length + 1),
        numIdEvento: this.perfilEncargadoEventoFormGroup.value.numIdEvento!,
        numIdGrupo: dataEventoGruposSelect.numIdGrupo!,
        txtGrupoNombre: dataEventoGruposSelect.txtGrupoNombre!,
        numIdPerfilEncargado: dataEventoPerfilEncargadoSelect.numIdPerfilEncargado!,
        txtPerfilEncargadoNombre: dataEventoPerfilEncargadoSelect.txtPerfilEncargadoNombre!,
        datGrupo: null!,
        datPerfil: null!,
        bolPerfilEncargadoActivo: true
      });
      this.dataEventoPerfilEncargadoLista = new MatTableDataSource<DataEventoPerfilEncargado>(this.dataEventoPerfilEncargadoLista.data);
      this.isLoadingResults = false;
    }
    this.addPerfilEncargado = !this.addPerfilEncargado;
  }
  /*FIN - PERFIL ENCARGADO*/

  /*INICIO - EVENTO*/
  onGuardarEvento() {
    if (this.bolEditarEvento) {
      this.dataEvento[this.index] = {
        numIdEvento: this.datosEventoFormGroup.value.numIdEvento!,
        txtEventoNombre: this.datosEventoFormGroup.value.txtEventoNombre!,
        txtEventoDescripcion: this.datosEventoFormGroup.value.txtEventoDescripcion!,
        txtEventoLugar: this.datosEventoFormGroup.value.txtEventoLugar!,
        datEventoFecha: this.datosEventoFormGroup.value.datEventoFecha!,
        timEventoHoraInicio: this.datosEventoFormGroup.value.timEventoHoraInicio!,
        timEventoHoraFin: this.datosEventoFormGroup.value.timEventoHoraFin!,
        bolEventoActivo: this.datosEventoFormGroup.value.bolEventoActivo!,
        bolEventoIniciado: false,
        dataEventoGrupos: this.dataEventoGruposLista.data,
        dataEventoSubGrupos: this.dataEventoSubGruposLista.data
      };
    } else {
      this.dataEvento.push({
        numIdEvento: this.datosEventoFormGroup.value.numIdEvento!,
        txtEventoNombre: this.datosEventoFormGroup.value.txtEventoNombre!,
        txtEventoDescripcion: this.datosEventoFormGroup.value.txtEventoDescripcion!,
        txtEventoLugar: this.datosEventoFormGroup.value.txtEventoLugar!,
        datEventoFecha: this.datosEventoFormGroup.value.datEventoFecha!,
        timEventoHoraInicio: this.datosEventoFormGroup.value.timEventoHoraInicio!,
        timEventoHoraFin: this.datosEventoFormGroup.value.timEventoHoraFin!,
        bolEventoActivo: this.datosEventoFormGroup.value.bolEventoActivo!,
        bolEventoIniciado: false,
        dataEventoGrupos: this.dataEventoGruposLista.data,
        dataEventoSubGrupos: this.dataEventoSubGruposLista.data
      });
    }
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: (this.bolEditarEvento ? 'Modificado Correctamente' : 'Registrado Correctamente')
    })
    this.bolNuevoEvento = false;
    this.bolEditarEvento = false;
    this.onFiltro(this.numTipoFiltro);
  }
  /*FIN - EVENTO*/

  add() {
    this.boolPerfil = true
  }

  addParticipantes() {
    this.boolPerfil = true
  }

  noadd() {
    this.boolPerfil = false
  }

  addEditF() {
    this.addEdit = true
    console.log("isedit", this.addEdit);
  }

  noaddEditF() {
    this.addEdit = false
    console.log("isedit", this.addEdit);
  }

  addGroup() {
    this.boolGroup = true
  }

  addGroupTree() {
    this.addGroupTreeSub = false;
    this.addGroupTreeF = true
  }

  addGroupTreeOne() {
    console.log("name", this.formGroupTree.value.descripcion);
    this.addGroupTreeF = false
    const tree : FoodNode = {
      name: "Grupo: "+this.formGroupTree.value.descripcion,
      children: [],
      tipo : 0,
      nivel : 0
    }
    /* const tree2 = {
      name: "jaja jjjw"
    }
    tree.children.push(tree2) */
    TREE_DATA.push(tree)
    this.dataSource.data = TREE_DATA;
    console.log("test", this.dataSource.data);
    this.formGroupTree.controls['descripcion'].setValue("")
  }

  viewData(data: any,type : number) {
    this.addGroupTreeF = false
    this.addGroupTreeSub = true;
    this.addGroupTreeSubDesc = "Sub Grupo"
    if(type == 2){
      this.addGroupTreeSubDesc = "Institucion"
      this.addGroupTreeSubType = 2
    }
    this.addGroupTreeSubLevel = data.level
    this.addGroupTreeSubName = data.name
    console.log("test", this.dataSource.data);
    console.log("data", data.level);

  }

  addGroupTreeFinal(){
    let text = "Sub Grupo creado"
    let nameFinal = "Sub Grupo: "+this.formGroupTree.value.descripcion
    if(this.addGroupTreeSubType == 2){
      text = "Institucion creada"
      nameFinal = "Institusion: "+this.formGroupTree.value.descripcion
    }
    console.log("name", this.formGroupTree.value.descripcion);
    let data = {
      "name":this.addGroupTreeSubName,
      "level":this.addGroupTreeSubLevel
    }
    const tree2 = {
      name: nameFinal,
      children: [],
      tipo: this.addGroupTreeSubType,
      nivel : this.addGroupTreeSubLevel
    }
    let encontrado : any
    TREE_DATA.map((x: any) => {
      if (data.level == 0) {
        if (data.name == x.name){
          encontrado = x
          x.children.push(tree2)
        }
      }
      if (data.level >= 1 && x.children != undefined) {
        x.children.map((y: any) => {
          if (data.name == y.name){
            encontrado = y
            y.children.push(tree2)
          }
          if (data.level >= 2 && y.children != undefined) {
            y.children.forEach((z: any) => {
              if (data.name == z.name){
                encontrado = z
                z.children.push(tree2)
              }
              if(data.level >= 3 && z.children != undefined){
                z.children.map((a:any)=>{
                  if(data.name == a.name)
                    encontrado = a
                })
              }
            })
          }
        })
      }
    })
    this.alert.toastSuccess(text);
    console.log("encontrado", encontrado);
    console.log("data", this.dataSource.data);
    /* this.boolGroup = false;
    this.formGroupTree.value.descripcion = ""
    this.addGroupTreeSub = false; */
    this.addGroupTreeSub = false;

    this.dataSource.data = TREE_DATA;

    this.formGroupTree.controls['descripcion'].setValue("")
  }

  noAddGroupTreeOne(){
    this.addGroupTreeSub = false
    this.addGroupTreeF = false
  }


}
