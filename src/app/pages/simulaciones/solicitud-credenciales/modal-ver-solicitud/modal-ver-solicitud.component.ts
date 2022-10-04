import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-ver-solicitud',
  templateUrl: './modal-ver-solicitud.component.html',
  styleUrls: ['./modal-ver-solicitud.component.scss']
})
export class ModalVerSolicitudComponent implements OnInit {

  @Input() public solicitud;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
