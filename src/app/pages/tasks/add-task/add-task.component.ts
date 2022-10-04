import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {

  @ViewChild("addTask", { static: false }) AddTask!: TemplateRef<any>;

  public closeResult!: string;
  public modalOpen: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal() {
    if (isPlatformBrowser(this.platformId)) { // For SSR
      this.modalService.open(this.AddTask, {
        size: 'lg',
        ariaLabelledBy: 'modal',
        centered: true,
        windowClass: 'modal'
      }).result.then((result) => {
        this.modalOpen = true;
      }, (reason) => {
        this.closeResult = `Dismissed ${AddTaskComponent.getDismissReason(reason)}`;
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
