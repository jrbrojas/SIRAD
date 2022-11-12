import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileRoutingModule } from './sirad-routing.module';
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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';


import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTreeModule} from '@angular/material/tree';
import { UsuariosListComponent } from './seguridad/seguridad/usuarios-list/usuarios-list.component';
import { UsuariosDetailsComponent } from './seguridad/seguridad/usuarios-details/usuarios-details.component';
import { RecursosComponent } from './registro/registro/recursos/recursos.component';
import { RecursosAddComponent } from './registro/registro/recursos-add/recursos-add.component';
import { CategoriesComponent } from './registro/categories/categories.component';
import { CargaMasivaComponent } from './carga-masiva/carga-masiva.component';
import { AddCategoriesModalComponent } from './registro/add-categories-modal/add-categories-modal.component';
import { EditCategoriesModalComponent } from './registro/edit-categories-modal/edit-categories-modal.component';
import { AddSubcategoriesModalComponent } from './registro/add-subcategories-modal/add-subcategories-modal.component';
import { EditSubcategoriesModalComponent } from './registro/edit-subcategories-modal/edit-subcategories-modal.component';
import { MatTabsModule } from '@angular/material/tabs'
import { MatChipsModule } from '@angular/material/chips'
import { PerfilListComponent } from './seguridad/seguridad/perfil-list/perfil-list.component';
import { PerfilAddComponent } from './seguridad/seguridad/perfil-add/perfil-add.component';
import { PermisosAddComponent } from './seguridad/seguridad/permisos-add/permisos-add.component';
import { PermisosListComponent } from './seguridad/seguridad/permisos-list/permisos-list.component';
import { PerfilEditComponent } from './seguridad/seguridad/perfil-edit/perfil-edit.component';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*',
  createImageThumbnails: true
};

@NgModule({
  declarations: [

    UsuariosListComponent,
       UsuariosDetailsComponent,
       CategoriesComponent,
       RecursosComponent,
       RecursosAddComponent,
       CargaMasivaComponent,
       PerfilListComponent,
       PerfilAddComponent,
       PermisosAddComponent,
       PermisosListComponent,
       AddCategoriesModalComponent,
       EditCategoriesModalComponent,
       AddSubcategoriesModalComponent,
       EditSubcategoriesModalComponent,
       PerfilEditComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
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
    NgxMatTimepickerModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonToggleModule,
    MatTreeModule,
    DropzoneModule,
    MatTabsModule,
    MatChipsModule

  ],
  providers: [
    { provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG },
  ]
})
export class SiradModuleComponent { }
