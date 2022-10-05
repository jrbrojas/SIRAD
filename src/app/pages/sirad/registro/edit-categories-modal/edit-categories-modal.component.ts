import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-categories-modal',
  templateUrl: './edit-categories-modal.component.html',
  styleUrls: ['./edit-categories-modal.component.scss']
})
export class EditCategoriesModalComponent implements OnInit {

  constructor(
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
  }

  
  closeModal(){
    this.modalService.dismissAll()
  }

}
