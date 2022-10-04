import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralReportesComponent } from './general-reportes/general-reportes.component';

const routes: Routes = [
  {
    path: '',
    //component: ListSolicitudCreacionUsuarioComponent,
    children: [
      {
        path: '',
        component: GeneralReportesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
