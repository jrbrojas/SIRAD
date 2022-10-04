import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public createForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, private render: Renderer2, public projectService: ProjectService) {
    this.createForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required]],
      clientName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      projectRate: ['', [Validators.required]],
      projectType: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      projectSize: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['']
    });
  }

  ngOnInit(): void {
  }

  addProject() {
    if (!this.createForm.value['firstName']) {
      this.render.addClass(document.getElementById('firstName'), 'is-invalid');
      //this.render.addClass(document.getElementById('firstNameError'), 'invalid-feedback');
    }
    this.projectService.createProject(this.createForm.value['firstName'])
  }

  cancelProject() {
    this.createForm.reset();
    this.router.navigate(['/project/list']);
  }

}
