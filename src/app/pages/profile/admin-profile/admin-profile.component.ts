import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { PermissionService } from '../../../shared/services/permission.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  tabId: string = 'permission-group';
  public permission: any;
  public showEntries: FormGroup;

  public getGroupName: any;
  profilePer: any;

  constructor(
    private Router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private permissionService: PermissionService
  ) {
    this.showEntries = this.fb.group({
    id: ['',[Validators.required]],
    nombre: ['',[Validators.required]],
    descripcion: ['',[Validators.required]],
    grupoPermiso: ['',[Validators.required]]
  });
}

  ngOnInit(): void {
    this.getProfilePermissionList()
  }

  getProfilePermissionList(){
    this.permissionService.getProfilePermission(41).subscribe(res =>{
      this.profilePer = res;
      this.getGroupName = res[0].nombreGrupoPermiso;
    })
    
  }

  tabChange(event: string) {
    this.tabId = event;
    document.querySelector('.nav-link');
    window.scrollTo(0, 0);
  }

}
