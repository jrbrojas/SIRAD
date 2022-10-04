import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { MatFormField } from '@angular/material/form-field';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public show: boolean = false;
  public hide: boolean = true;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  showPassword() {
    this.show = !this.show;
  }

  login(){
    this.router.navigate(['/auth']);
  }

}
