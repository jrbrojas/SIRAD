import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEmergencyComponent} from "./add-emergency/add-emergency.component";
import {ListEmergenciesComponent} from "./list-emergencies/list-emergencies.component";
import {DetailsEmergenciesComponent} from "./details-emergencies/details-emergencies.component";
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { PERMISOS } from 'src/app/shared/models/permisos';
import { RecordEmergenciesComponent } from './record-emergencies/record-emergencies.component';
import { MonitoringEmergenciesComponent } from './monitoring-emergencies/monitoring-emergencies.component';
import { EmergencyCareComponent } from './emergency-care/emergency-care.component';
import { SolicitudCierreComponent } from './solicitud-cierre/solicitud-cierre.component';
import { RecuperacionEmergenciesComponent } from './recuperacion-emergencies/recuperacion-emergencies.component';

const routes: Routes = [
  {
    path: '',
    //component: ListEmergenciesComponent,
    children: [
      {
        path: '',
        component: ListEmergenciesComponent,
      },
      {
        path: 'create-emergency',
        component: AddEmergencyComponent,
        canActivate: [AuthGuard],
        data: {permisos: [PERMISOS.CREAR_EMERGENCIAS]} 
      },
      {
        path: 'details/:id',
        component: DetailsEmergenciesComponent,
        canActivate: [AuthGuard],
        data: {permisos: [PERMISOS.VER_EMERGENCIA]} 
      },
      {
        path: 'record/:id',
        component: RecordEmergenciesComponent
      },
      {
        path : 'monitoring-emergencies',
        component : MonitoringEmergenciesComponent
      },
      {
        path : 'emergency-care/:id',
        component : EmergencyCareComponent,
        data: {permisos: [PERMISOS.EDITAR_ATENCION_EMERGENCIA]}
      },
      {
        path : 'solicitud-cierre',
        component : SolicitudCierreComponent
      },
      {
        path : 'recuperacion-emergencies',
        component : RecuperacionEmergenciesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergenciesRoutingModule { }
