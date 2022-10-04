import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PeligrosSecundariosRoutingModule } from './peligros-secundarios-routing.module';
import { ListPeligrosSecundariosComponent } from './list-peligros-secundarios/list-peligros-secundarios.component';
import { AddPeligrosSecundariosComponent } from './add-peligros-secundarios/add-peligros-secundarios.component';
import { DetailsPeligrosSecundariosComponent } from './details-peligros-secundarios/details-peligros-secundarios.component';
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
    ListPeligrosSecundariosComponent,
    AddPeligrosSecundariosComponent,
    DetailsPeligrosSecundariosComponent
  ],
  imports: [
    CommonModule,
    PeligrosSecundariosRoutingModule,
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
export class PeligrosSecundariosModule { }
