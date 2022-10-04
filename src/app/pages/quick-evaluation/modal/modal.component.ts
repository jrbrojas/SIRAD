import {Component, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild("AddModal", { static: false }) AddModal!: TemplateRef<any>;

  public closeResult!: string;
  public modalOpen: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openToast() {
    if (isPlatformBrowser(this.platformId)) { // For SSR
      this.modalService.open(this.AddModal, {
        size: 'lg',
        ariaLabelledBy: 'modal',
        centered: true,
        windowClass: 'modal'
      }).result.then((result) => {
        this.modalOpen = true;
      }, (reason) => {
        this.closeResult = `Dismissed ${ModalComponent.getDismissReason(reason)}`;
      });
    }
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    if(this.modalOpen){
      this.modalService.dismissAll();
    }
  }

}
