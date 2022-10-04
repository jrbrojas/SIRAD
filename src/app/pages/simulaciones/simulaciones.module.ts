import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileRoutingModule } from './simulaciones-routing.module';
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
import { SimulacionesListComponent } from './simulaciones-list/simulaciones-list.component';
import { SimulacionesDetailsComponent } from './simulaciones-details/simulaciones-details.component';
import { SeguridadUsuariosComponent } from './seguridad-usuarios/seguridad-usuarios.component';
import { SeguridadPerfilesComponent } from './seguridad-perfiles/seguridad-perfiles.component';
import { SimulacionesSeguimientoReportesComponent } from './simulaciones-seguimiento-reportes/simulaciones-seguimiento-reportes.component';
import { SeguridadPermisosComponent } from './seguridad-permisos/seguridad-permisos.component';
import { SeguridadUsuariosAddComponent } from './seguridad-usuarios-add/seguridad-usuarios-add.component';
import { SeguridadPermisosAddComponent } from './seguridad-permisos-add/seguridad-permisos-add.component';
import { SeguridadUsuariosSolicitudComponent } from './seguridad-usuarios-solicitud/seguridad-usuarios-solicitud.component';
import { SeguridadUsuariosSolicitudAddComponent } from './seguridad-usuarios-solicitud-add/seguridad-usuarios-solicitud-add.component';
import { SeguridadPerfilesAddComponent } from './seguridad-perfiles-add/seguridad-perfiles-add.component';


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
import { SolicitudCredencialesComponent } from './solicitud-credenciales/solicitud-credenciales.component';
import { ModalVerSolicitudComponent } from './solicitud-credenciales/modal-ver-solicitud/modal-ver-solicitud.component';
import {MatTreeModule} from '@angular/material/tree';
import { SimulacionesFichaEvaluacionDetalleComponent } from './simulaciones-ficha-evaluacion-detalle/simulaciones-ficha-evaluacion-detalle.component';
import { SimulacionesFichaEvaluacionComponent } from './simulaciones-ficha-evaluacion/simulaciones-ficha-evaluacion.component';


@NgModule({
  declarations: [
    SimulacionesListComponent,
    SimulacionesDetailsComponent,
    SeguridadUsuariosComponent,
    SeguridadPerfilesComponent,
    SimulacionesSeguimientoReportesComponent,
    SeguridadPermisosComponent,
    SeguridadUsuariosAddComponent,
    SeguridadPermisosAddComponent,
    SeguridadUsuariosSolicitudComponent,
    SeguridadUsuariosSolicitudAddComponent,
    SeguridadPerfilesAddComponent,
    SolicitudCredencialesComponent,
    ModalVerSolicitudComponent,
    SimulacionesFichaEvaluacionDetalleComponent,
    SimulacionesFichaEvaluacionComponent
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


//////////////////////////


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
    MatTreeModule

  ]
})
export class SimulacionesModule { }
