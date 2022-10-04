import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EmergenciesRoutingModule } from './emergencies-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddEmergencyComponent } from './add-emergency/add-emergency.component';
import { EditEmergencyComponent } from './edit-emergency/edit-emergency.component';
import { ListEmergenciesComponent } from './list-emergencies/list-emergencies.component';
import { DetailsEmergenciesComponent } from './details-emergencies/details-emergencies.component';
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
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { RecordEmergenciesComponent } from './record-emergencies/record-emergencies.component';
import { ObservacionComponent } from './observacion/observacion.component';
import { MonitoringEmergenciesComponent } from './monitoring-emergencies/monitoring-emergencies.component';
import { ModalMonitoringComponent } from './monitoring-emergencies/modal-monitoring/modal-monitoring.component';
import { ModalArticlesComponent } from './modal-articles/modal-articles.component';
import { ModalEmergencyCareComponent } from './modal-emergency-care/modal-emergency-care.component';
import { EmergencyCareComponent } from './emergency-care/emergency-care.component';
import { ModalArticleCareComponent } from './modal-article-care/modal-article-care.component';
import { CloseEmergencyComponent } from './close-emergency/close-emergency.component';
import { SolicitudCierreComponent } from './solicitud-cierre/solicitud-cierre.component';
import { ModalSolicitudCierreComponent } from './solicitud-cierre/modal-solicitud-cierre/modal-solicitud-cierre.component';
import { RecuperacionEmergenciesComponent } from './recuperacion-emergencies/recuperacion-emergencies.component';
import { RecuperacionEmergenciesModalComponent } from './recuperacion-emergencies/recuperacion-emergencies-modal/recuperacion-emergencies-modal.component';

@NgModule({
  declarations: [AddEmergencyComponent, EditEmergencyComponent, 
    ListEmergenciesComponent, DetailsEmergenciesComponent, 
    RecordEmergenciesComponent, ObservacionComponent, ModalMonitoringComponent, ModalArticlesComponent, ModalEmergencyCareComponent, EmergencyCareComponent, ModalArticleCareComponent, CloseEmergencyComponent, SolicitudCierreComponent, ModalSolicitudCierreComponent, RecuperacionEmergenciesComponent, RecuperacionEmergenciesModalComponent],
    imports: [
        CommonModule,
        EmergenciesRoutingModule,
        SharedModule,
        NgxDatatableModule,
        NgbModule,
        NgSelectModule,
        MatFormFieldModule,
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
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
    ],
    entryComponents:[ObservacionComponent],
    
    providers: [
      {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
      { provide: MAT_DATE_LOCALE, useValue: 'es-PE'}
  ]
})


export class EmergenciesModule { }
