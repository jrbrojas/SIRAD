import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { PermissionGroupService } from '../../../shared/services/permission-group.service';

@Component({
  selector: 'app-list-permission-group',
  templateUrl: './list-permission-group.component.html',
  styleUrls: ['./list-permission-group.component.scss']
})
export class ListPermissionGroupComponent implements OnInit {

  public showEntries: FormGroup;
  public permissionGroup: any;

  constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private permissionGroupService: PermissionGroupService
  ) { 
    this.showEntries = this.fb.group({
      id: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      descripcion: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getPermissionGroupList();
  }

  getPermissionGroupList(){
    this.permissionGroupService.getPermissionGroup().subscribe((res: any) => {
      this.permissionGroup = res;
    })
  }

  createPermissionGroup() {
    this.router.navigate(['/seguridad/grupo-permisos/create-permission-group']).then(() => { });
  }

  detailPermissionGroup(id: number) {
    this.router.navigate([`/seguridad/grupo-permisos/details-permission-group/${id}`]).then(() => {});
  }
}
