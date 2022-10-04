import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { PermissionService } from '../../../shared/services/permission.service';

@Component({
  selector: 'app-list-permission',
  templateUrl: './list-permission.component.html',
  styleUrls: ['./list-permission.component.scss']
})
export class ListPermissionComponent implements OnInit {

  public loading: boolean = false;
  public showEntries: FormGroup;
  public permission: any;
  public cantidadItemsForm: number = 10;
  public paginaActalForm: number = 1;
  public estadoEmergencia: number = 1;
  public cantidadPaginasForm: number = 1;
  public cantidadTotalRegistrosBusqueda: number = 0;
  
  constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private permissionService: PermissionService
  ) { 
    this.showEntries = this.fb.group({
      textoBusqueda: [null],
      cantidadRegistro: [this.cantidadItemsForm]
    });
    this.searchPermission();
   }

  ngOnInit(): void {
    this.paginatePermission(1);
    //this.getPermissionList();
  }

  /*getPermissionList(){
    this.permissionService.getPermission().subscribe((res: any) => {
      this.permission = res;
    })
  }*/

  showEntriesChange(e: any) {
    this.cantidadItemsForm = e.target.value;
    this.paginaActalForm = 1;
    this.searchPermission();
  }

  searchPermission() {

    this.showEntries.valueChanges.subscribe(data => {
      this.paginaActalForm = 1;
      const d = {
        textoBusqueda: data.textoBusqueda,
        cantidadRegistro: data.cantidadRegistro,
        numeroPagina: this.paginaActalForm
      }
      this.permissionService.getPermissionPaginado(d).subscribe((res: any) => {
        this.cantidadTotalRegistrosBusqueda = res.cantidad;
        this.permission = res.permiso;
        this.paginaActalForm = 1;
        this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda, 
        this.cantidadItemsForm);

      })
    });

  }

  paginatePermission(page: number) {
    this.paginaActalForm = page;

    const d = {
      textoBusqueda: this.showEntries.value.textoBusqueda,
      cantidadRegistro: this.showEntries.value.cantidadRegistro,
      numeroPagina: this.paginaActalForm
    }

    this.permissionService.getPermissionPaginado(d).subscribe((res: any) => {
      this.permission = res.permiso;
      this.cantidadTotalRegistrosBusqueda = res.cantidad;
      this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda, this.cantidadItemsForm);
    })
  }

  calculatePageCount(cantRegistros: number, numPaginasBusqueda: number) {
    return Math.round(cantRegistros / numPaginasBusqueda);
  }

  createPermission() {
    this.router.navigate(['/seguridad/permisos/create-permission']).then(() => { });
  }

  detailsPermission(id: number) {
    this.router.navigate([`/seguridad/permisos/details-permission/${id}`]).then(() => { });
  }

}
