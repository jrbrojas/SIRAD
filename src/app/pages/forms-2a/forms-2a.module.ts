import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { Forms2aRoutingModule } from './forms-2a-routing.module';
import { AddForm2AComponent } from './add/add.component';
import { DetailsForm2AComponent } from './details/details.component';
import { MatOptionModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { ModalFamilyComponent } from './modal-family/modal-family.component';
import { ModalMvComponent } from './modal-mv/modal-mv.component';
import { ModalEditVivComponent } from './modal-edit-viv/modal-edit-viv.component';
import { ModalEditFamComponent } from './modal-edit-fam/modal-edit-fam.component';
import { ModalCreateVivComponent } from './modal-create-viv/modal-create-viv.component';
import { ModalAffectationComponent } from './modal-affectation/modal-affectation.component';
import { CreateMvComponent } from './create-mv/create-mv.component';
import { CreateVivComponent } from './create-viv/create-viv.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalListFamilyComponent } from './modal-list-family/modal-list-family.component';
import { ModalAddAffectComponent } from './modal-add-affect/modal-add-affect.component';
import { NewComponent } from './new/new.component';
import { ModalIntFamComponent } from './modal-int-fam/modal-int-fam.component';
import { NewEditComponent } from './new-edit/new-edit.component';

@NgModule({
  declarations: [
    AddForm2AComponent,
    DetailsForm2AComponent,
    ModalFamilyComponent,
    ModalMvComponent,
    ModalEditVivComponent,
    ModalEditFamComponent,
    ModalCreateVivComponent,
    ModalAffectationComponent,
    CreateMvComponent,
    CreateVivComponent,
    ModalListFamilyComponent,
    ModalAddAffectComponent,
    NewComponent,
    ModalIntFamComponent,
    NewEditComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    Forms2aRoutingModule,
    SharedModule,
    NgbModule,
    MatFormFieldModule,
    MatOptionModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    BsDatepickerModule.forRoot()
  ],
  entryComponents: [
    ModalFamilyComponent,
    ModalMvComponent,
    ModalEditVivComponent,
    ModalEditFamComponent,
    ModalCreateVivComponent,
    ModalAffectationComponent,
    ModalListFamilyComponent,
    ModalAddAffectComponent,
    ModalIntFamComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    }
  ]
})
export class Forms2aModule { }
