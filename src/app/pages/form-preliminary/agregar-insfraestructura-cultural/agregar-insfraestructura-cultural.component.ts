import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-insfraestructura-cultural',
  templateUrl: './agregar-insfraestructura-cultural.component.html',
  styleUrls: ['./agregar-insfraestructura-cultural.component.scss']
})
export class AgregarInsfraestructuraCulturalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close();
  }
}
