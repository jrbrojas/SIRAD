import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-peligros-secundarios',
  templateUrl: './list-peligros-secundarios.component.html',
  styleUrls: ['./list-peligros-secundarios.component.scss']
})
export class ListPeligrosSecundariosComponent implements OnInit {

  public showdangerSecondary: FormGroup;
  public cantidadItemsForm: number = 10;
  public paginaActalForm: number = 1;
  public cantidadPaginasForm: number = 1;
  public cantidadTotalRegistrosBusqueda: number = 0;
  public dangerSecondary: any;
  public loading: boolean = false;
  public isShowButton: boolean = false;
  public value = '';

  constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private params: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  createPeligrosSecundarios() {
    this.router.navigate(['/administracion/peligros-secundarios/create-peligros-secundarios']).then(() => { });
  }

  showEntriesChange(e: any) {
    this.cantidadItemsForm = e.target.value;
    /*this.paginaActalForm = 1;
    this.searchSolicitudUsuario();*/
  }

}
