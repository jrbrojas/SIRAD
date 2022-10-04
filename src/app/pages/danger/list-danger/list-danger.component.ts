import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { DangerService } from '../../../shared/services/danger.service';

@Component({
  selector: 'app-list-danger',
  templateUrl: './list-danger.component.html',
  styleUrls: ['./list-danger.component.scss']
})
export class ListDangerComponent implements OnInit {

  public showEntries: FormGroup;
  public danger: any;
  public pages: number = 1;
  public src!: string;
  public start!: string;
  public end!: string;
  public total: number = 0;
  public loading: boolean = false;

  public cantidadItemsForm: number = 10;
  public paginaActalForm: number = 1;
  public cantidadPaginasForm: number = 1;
  public cantidadTotalRegistrosBusqueda: number = 0;
  public value = '';

  constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private dangerService: DangerService
  ) { 
    this.showEntries = this.fb.group({
      id: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      grupoPeligro: ['',[Validators.required]],
      cantidadRegistro: [this.cantidadItemsForm],
      textoBusqueda: [null]
    });
    this.searchDanger();
   }

  ngOnInit(): void {
    this.paginateDanger(1);
  }

  searchDanger() {
    this.showEntries.valueChanges.subscribe(data => {
      this.paginaActalForm = 1;
      const d = {
        textoBusqueda: data.textoBusqueda,
        cantidadRegistro: data.cantidadRegistro,
        numeroPagina: this.paginaActalForm
      }
      this.dangerService.getDanger(d).subscribe((res: any) => {
        this.danger = res.peligroResult;
        this.cantidadTotalRegistrosBusqueda = res.cantidad;
        this.paginaActalForm = 1;
        this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda,this.cantidadItemsForm);
      })
    });
  }

  showEntriesChange(e: any) {
    this.cantidadItemsForm = e.target.value;
    this.paginaActalForm = 1;
    this.searchDanger();
  }

  paginateDanger(page: number) {
    this.paginaActalForm = page;

    const d = {
      textoBusqueda: this.showEntries.value.textoBusqueda,
      cantidadRegistro: this.showEntries.value.cantidadRegistro,
      numeroPagina: this.paginaActalForm
    }

    this.dangerService.getDanger(d).subscribe((res: any) => {
      this.danger = res.peligroResult;
      this.cantidadTotalRegistrosBusqueda = res.cantidad;
      this.cantidadPaginasForm = this.calculatePageCount(this.cantidadTotalRegistrosBusqueda,this.cantidadItemsForm);
    })
  }

  calculatePageCount(cantRegistros: number, numPaginasBusqueda: number) {
    return Math.round(cantRegistros / numPaginasBusqueda);
  }

  createDanger() {
    this.router.navigate(['/administracion/peligro/create-danger']).then(() => { });
  }

  detailsDanger(id: number) {
    this.router.navigate([`/administracion/peligro/details-danger/${id}`]).then(() => { });
  }

}
