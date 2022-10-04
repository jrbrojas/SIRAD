import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudCreacionUsuarioRoutingModule } from './solicitud-creacion-usuario-routing.module';
import { AddSolicitudCreacionUsuarioComponent } from './add-solicitud-creacion-usuario/add-solicitud-creacion-usuario.component';
import { DetailsSolicitudCreacionUsuarioComponent } from './details-solicitud-creacion-usuario/details-solicitud-creacion-usuario.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ListSolicitudCreacionUsuarioComponent } from './list-solicitud-creacion-usuario/list-solicitud-creacion-usuario.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatRadioModule } from '@angular/material/radio';
import { ModalSolicitudUsuarioComponent } from './modal-solicitud-usuario/modal-solicitud-usuario.component';



@NgModule({
  declarations: [
    ListSolicitudCreacionUsuarioComponent,
    AddSolicitudCreacionUsuarioComponent,
    DetailsSolicitudCreacionUsuarioComponent,
    ModalSolicitudUsuarioComponent
  ],
  imports: [
    CommonModule,
    SolicitudCreacionUsuarioRoutingModule,
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
    NgSelectModule,
    MatRadioModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})
export class SolicitudCreacionUsuarioModule { }
