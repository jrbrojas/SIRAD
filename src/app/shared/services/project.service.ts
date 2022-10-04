import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public projectData: any;
  public showLoader: boolean = false;

  constructor(public router: Router, public toaster: ToastrService) { }

  createProject(data: any) {
    this.showLoader = true;
    this.projectData = data;
    this.toaster.success('Project Created Successfully');
    //this.router.navigate(['/project/list']);
  }
}
