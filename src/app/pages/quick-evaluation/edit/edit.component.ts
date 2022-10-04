import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {AlertService} from "../../../shared/services/alert.service";
import {Router} from "@angular/router";
import {TYPE_ALERT} from "../../../shared/services/config";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditQuickEvaluationComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Huaycos', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  maxDate!: Date;

  tabId: string = 'general';

  constructor(private _formBuilder: FormBuilder,private toaster: AlertService, private route: Router) { this.maxDate = new Date(); }

  ngOnInit(): void {
  }

  public finish(){
    this.toaster.toastSuccess('Successfully Registered')
  }

  tabChange(event: string){
    this.tabId = event;
  }

  save() {
    this.toaster.questionAlertConfirm('¿Está seguro de guardar?', '','Si, guardar', TYPE_ALERT.QUESTION).then(
      (result) => {
        if (result.value) {
          this.route.navigate(['/quick-evaluation']);
          this.toaster.toastSuccess('Se registró correctamente');
        }
      }
    );
  }
}
