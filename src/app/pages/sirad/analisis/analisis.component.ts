import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAnalisisComponent } from './add-analisis/add-analisis.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.scss']
})
export class AnalisisComponent implements OnInit {

  constructor(private modalService : NgbModal, private _router: Router) { }

  ngOnInit(): void {
  }

  addAnalisis() {
    const modalRef = this.modalService.open(AddAnalisisComponent, {
      size : 'lg',
      ariaLabelledBy : 'modal',
      centered : false,
      windowClass : 'modal',
      backdrop : 'static'
    })
  }

  irMapa() {
    this._router.navigate(['/sirad/visualizacion/mapa']);
  }
}
