import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAffectationComponent } from '../modal-affectation/modal-affectation.component';
import { ModalFamilyComponent } from '../modal-family/modal-family.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PERMISOS } from 'src/app/shared/models/permisos';

@Component({
  selector: 'app-modal-list-family',
  templateUrl: './modal-list-family.component.html',
  styleUrls: ['./modal-list-family.component.scss']
})
export class ModalListFamilyComponent implements OnInit {

  public PERMISOS = PERMISOS;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public authService:  AuthService
  ) { }

  ngOnInit(): void {
  }  

  addFamily() {
    const modalRef = this.modalService.open(ModalFamilyComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.result.then((res) => {
    }, (reason) => {

    })
  }

  addAffectation() {
    const modalRef = this.modalService.open(ModalAffectationComponent, {
      size: 'xl',
      ariaLabelledBy: 'modal',
      centered: false,
      windowClass: 'modal',
      backdrop: 'static',
    });
    modalRef.result.then((res) => {
    }, (reason) => {

    })
  }

  closeModal() {
    this.activeModal.close();
  }

}
