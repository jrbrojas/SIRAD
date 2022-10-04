import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-peligros-secundarios',
  templateUrl: './add-peligros-secundarios.component.html',
  styleUrls: ['./add-peligros-secundarios.component.scss']
})
export class AddPeligrosSecundariosComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }


  cancelProject() {
    /*this.createEmergency.reset();
    this.emergencyService.showLoader = false;*/
    this.router.navigate(['/administracion/peligros-secundarios']).then(r => r);
  }
}
