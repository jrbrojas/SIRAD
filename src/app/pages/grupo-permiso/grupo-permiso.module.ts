import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListPermissionGroupComponent } from './list-permission-group/list-permission-group.component';
import { DetailsPermissionGroupComponent } from './details-permission-group/details-permission-group.component';
import { AddPermissionGroupComponent } from './add-permission-group/add-permission-group.component';
import { GrupoPermisoRoutingModule } from './grupo-permiso-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';




@NgModule({
  declarations: [
    ListPermissionGroupComponent,
    DetailsPermissionGroupComponent,
    AddPermissionGroupComponent
  ],
  imports: [
    CommonModule,
    GrupoPermisoRoutingModule,
    SharedModule,
    NgbModule,
    NgxDatatableModule,
    NgSelectModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    NgxPaginationModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
  ]
})
export class GrupoPermisoModule { }
