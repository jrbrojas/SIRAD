import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { DangerGroupService } from '../../../shared/services/danger-group.service';

@Component({
  selector: 'app-list-danger-group',
  templateUrl: './list-danger-group.component.html',
  styleUrls: ['./list-danger-group.component.scss']
})
export class ListDangerGroupComponent implements OnInit {

  public showEntries: FormGroup;
  public dangerGroup: any;

  constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private dangerGroupService: DangerGroupService
  ) { 
    this.showEntries = this.fb.group({
      id: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      descripcion: ['',[Validators.required]]
    });
   }

  ngOnInit(): void {
    this.getDangerGroupList();
  }

  getDangerGroupList(){
    this.dangerGroupService.getDangerGroup().subscribe((res: any) => {

      this.dangerGroup = res;
    })
  }

  createDangerGroup() {
    this.router.navigate(['/administracion/grupo-peligro/create-danger-group']).then(() => { });
  }

  detailDangerGroup(id: number) {
    this.router.navigate([`/administracion/grupo-peligro/details-danger-group/${id}`]).then(() => {});
  }

}
