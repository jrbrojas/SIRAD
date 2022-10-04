import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmergencyService } from 'src/app/shared/services/emergency.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';




@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

    public showEntries: FormGroup;
    public users: any;
    public pages: number = 1;
    public total: number=0;

    public loading: boolean = false;
    public isShowSearch: boolean = false;

    public PERMISOS = PERMISOS;
    public value='';
    public cantidadItemsForm: number = 10;
    public paginaActalForm : number = 1;
    public cantidadPaginasForm : number = 1;
    public cantidadTotalRegistrosBusqueda: number =0;

    public statusForm = [
      {id:"1",descripcion:"HABILITADO"},
      {id:"0",descripcion:"DESHABILITADO"},
      {id:"3",descripcion:"TODO"},
    ]
    
    constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private usuarioServices: UsuarioService,
    public authService: AuthService,
    ) {
this.showEntries = this.fb.group ({
  cantidadRegistro: [this.cantidadItemsForm],
  textoBusqueda: [null],
  estado:[''],
})

this.searchUsuario();//se cambio el searusuarioicnicial
  }

  ngOnInit(): void {
    this.paginateUsuario(1)
  }

  searchUsuario() {

    this.showEntries.valueChanges.subscribe(data => {
    this.paginaActalForm = 1;
    console.log("Esto es Data    :   ", data)
      const d = {
        impBusqueda: data.textoBusqueda,
        estado: this.showEntries.value.estado,
        
        cantReg:data.cantidadRegistro, // cambiar que vebga de lk que escogio elk usuario
        numPag: this.paginaActalForm
      }
      console.log("esto es d   :  " ,d)
      this.usuarioServices.getUsuarioListar(d).subscribe((res: any) => {
        console.log("lo que me trae el res   :", res)
        this.users = res.lista;
         this.cantidadTotalRegistrosBusqueda = res.cantidad;
         this.paginaActalForm = 1;
         this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda,this.cantidadItemsForm);
       })
       
       
       ;
       

    });


  }


  getStatusUsuario(e : any){
    this.showEntries.controls['estadoEmergencia'].setValue(e.value)    
    this.paginateUsuario(1)
    
  }





  detailsUsers(userName:string) {
    this.router.navigate([`/seguridad/usuarios/details-users/${userName}`]).then(() => {});
  }
/*-
  detailEmergency(id: number) {
    this.router.navigate([`/emergencies/details/${id}]).then(() => {});
  }
*/

showEntriesUsuarios(e: any) {
    this.cantidadItemsForm = e.target.value;
    this.paginaActalForm = 1;
    this.searchUsuario();//se cambio el seacrh usuarioinicial
  }


  paginateUsuario(page: number) {
    this.paginaActalForm = page;
    const d = {
      impBusqueda: "",
      estado : this.showEntries.value.estado,
      cantReg: this.showEntries.value.cantidadRegistro,
      numPag: this.paginaActalForm
    }

    this.usuarioServices.getUsuarioListar(d).subscribe((res: any) => {
        this.users = res.lista;
        console.log("Esto me traes   :   ", res)
        this.cantidadTotalRegistrosBusqueda = res.cantReg;
        this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda,this.cantidadItemsForm);
    
        
      })

      //
  }

  calculatePageCount(cantRegistros: number, numPaginasBusqueda: number){
    return Math.round(cantRegistros / numPaginasBusqueda);
  }

  createUsers() {
    this.router.navigate(['/seguridad/usuarios/create-users']).then(() => { });
  }

  eliminar(numdoc: any){
    this.usuarioServices.getEliminarUsuario(numdoc).subscribe((res:any)=>{
    console.log("Usuario eliminado")
    
    })
    this.paginateUsuario(1)
    
    }



}
