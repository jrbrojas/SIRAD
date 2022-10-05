import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientInMemoryWebApiModule, InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { FakeDbService } from './shared/services/fake-db.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterComponent } from './auth/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatCardHeader} from "@angular/material/card";
import { MonitoringEmergenciesComponent } from './pages/emergencies/monitoring-emergencies/monitoring-emergencies.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { GeneralReportesComponent } from './pages/reportes/general-reportes/general-reportes.component';
import { RegistroComponent } from './pages/sirad/registro/registro/registro.component';
import { VisualizacionComponent } from './pages/sirad/visualizacion/visualizacion/visualizacion.component';
import { SeguridadComponent } from './pages/sirad/seguridad/seguridad/seguridad.component';
import { AddCategoriesModalComponent } from './pages/registro/add-categories-modal/add-categories-modal.component';
import { AddSubcategoriesModalComponent } from './pages/sirad/registro/add-subcategories-modal/add-subcategories-modal.component';
// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    RegisterComponent,
    ResetPasswordComponent,
    GeneralReportesComponent,
    MonitoringEmergenciesComponent,
    RegistroComponent,
    VisualizacionComponent,
    SeguridadComponent,
    AddCategoriesModalComponent

  ],
  imports: [
    BrowserModule,
    /*InMemoryWebApiModule.forRoot(FakeDbService, {
      passThruUnknownUrl: true
    }),*/
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(
      FakeDbService, {
        passThruUnknownUrl: true,
      }
    ),
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    CarouselModule,
    NgxPaginationModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
