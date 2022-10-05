import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-categories-modal',
  templateUrl: './add-categories-modal.component.html',
  styleUrls: ['./add-categories-modal.component.scss']
})
export class AddCategoriesModalComponent implements OnInit {

  constructor(
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
  }


  closeModal(){
    this.modalService.dismissAll()
  }

}
