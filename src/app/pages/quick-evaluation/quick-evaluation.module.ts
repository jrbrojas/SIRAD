import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { QuickEvaluationRoutingModule } from './quick-evaluation-routing.module';
import { AddQuickEvaluationComponent } from './add/add.component';
import { EditQuickEvaluationComponent } from './edit/edit.component';
import { ListQuickEvaluationComponent } from './list/list.component';
import { ModalComponent } from './modal/modal.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetailsQuickEvaluationComponent } from './details/details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from "@angular/material/card";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AddQuickEvaluationComponent,
    EditQuickEvaluationComponent,
    ListQuickEvaluationComponent,
    ModalComponent,
    DetailsQuickEvaluationComponent
  ],
  imports: [
    CommonModule,
    QuickEvaluationRoutingModule,
    SharedModule,
    NgbModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    MatCardModule,
    NgSelectModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})
export class QuickEvaluationModule { }
