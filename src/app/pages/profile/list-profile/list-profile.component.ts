import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { retry } from 'rxjs';

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {

  public loading: boolean = false;
  public showEntries: FormGroup;
  public profile: any;
  public isId: any;

  constructor(
    private router: Router,
    private alert: AlertService,
    private fb: FormBuilder,
    private params: ActivatedRoute,
    private profileService: ProfileService
  ) {
    this.showEntries = this.fb.group({
    id: ['',[Validators.required]],
    nombre: ['',[Validators.required]],
    descripcion: ['',[Validators.required]],
    habilitado: ['',[Validators.required]],
    permiso: ['',[Validators.required]]
  });
}

  ngOnInit(): void {
    this.isId = this.params.snapshot.paramMap.get('id');
    this.getProfileList();
  }

  getProfileList(){
    this.profileService.getProfile().subscribe((res: any) => {
      this.profile = res;
    })
  }

  createProfile() {
    this.router.navigate(['/seguridad/perfiles/create-profile']).then(() => { });
  }

  detailsProfile(id: number) {
    this.router.navigate([`/seguridad/perfiles/details-profile/${id}`]).then(() => { });
  }

  /*detailsProfilePermission() {
    this.router.navigate([`/seguridad/perfiles/admin-profile/${id}`]).then(() => { });
  }*/

}
