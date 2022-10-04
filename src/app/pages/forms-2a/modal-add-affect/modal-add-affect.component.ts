import { Component, OnInit } from '@angular/core';
import { Form2aService } from 'src/app/shared/services/form-2a.service';

@Component({
  selector: 'app-modal-add-affect',
  templateUrl: './modal-add-affect.component.html',
  styleUrls: ['./modal-add-affect.component.scss']
})
export class ModalAddAffectComponent implements OnInit {

  public chronicIllness: any;
  public personDisability: any;

  public defaultBindingsList = [
    { value: "1", label: "LEODAN PEREZ" },
    { value: "2", label: "ALEXIS DOE" },
    { value: "3", label: "JOE BIDEN"},
    { value: "4", label: "HANRY DIE" },
    { value: "5", label: "JOHN DOE" },
  ];

  public multipleSelectedCity!: string[];

  constructor(public form2aService: Form2aService) { }

  ngOnInit(): void {
    this.getChronicIllness();
    this.getPersonDisability();
  }

  getChronicIllness() {
    this.form2aService.listChronicIllness().subscribe(res => {
      this.chronicIllness = res;
    });
  }

  getPersonDisability() {
    this.form2aService.listPersonDisability().subscribe(res => {
      this.personDisability = res;
    });
  }

  multiple(event: any) {
  }
}
