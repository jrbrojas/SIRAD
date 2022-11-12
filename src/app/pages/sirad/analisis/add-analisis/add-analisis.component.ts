import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface categoria {
  id: number;
  desc: string;
}

@Component({
  selector: 'app-add-analisis',
  templateUrl: './add-analisis.component.html',
  styleUrls: ['./add-analisis.component.scss']
})
export class AddAnalisisComponent implements OnInit {

  cat : categoria[] = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.dismissAll()
  }
}
