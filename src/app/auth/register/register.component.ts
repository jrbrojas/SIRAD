import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public show: boolean = false;
  public _hide = true;

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
