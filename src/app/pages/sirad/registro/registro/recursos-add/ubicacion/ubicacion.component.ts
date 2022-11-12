import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent implements OnInit {

  public markers: any[];
  public markers1: any[];
  public zoom: number;

  constructor(
    private modalService : NgbModal,
    public dialog: MatDialog,
  ) {
    this.markers = [];
    this.zoom = 2;
  }

  ngOnInit(): void {
    const bangalore = { lat: 12.97, lng: 77.59 };
  }


  closeModal(){
    this.modalService.dismissAll()
  }

  guardarExperiencia() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Guardado correctamente',
      showConfirmButton: false,
      timer: 1500
    });
    this.closeModal();
  }
}
