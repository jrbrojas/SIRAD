import { MapLayersComponent } from './components/map/map-layers/map-layers.component';
import { MapTableComponent } from './components/map/map-table/map-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Components
import { ContentComponent } from './components/layout/content/content.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { MyAccountComponent } from './components/header/elements/my-account/my-account.component';
import { MegaMenuComponent } from './components/header/elements/mega-menu/mega-menu.component';
import { NotificationComponent } from './components/header/elements/notification/notification.component';
import { MessageBoxComponent } from './components/header/elements/message-box/message-box.component';
import { NavService } from './services/nav.service';
import { LayoutService } from './services/layout.service';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { DragDropFileUploadDirective } from './directives/drag-drop-file-upload.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { MapComponent } from './components/map/map.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon'
@NgModule({
  declarations: [
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FeatherIconsComponent,
    MyAccountComponent,
    MegaMenuComponent,
    NotificationComponent,
    MessageBoxComponent,
    TapToTopComponent,
    DateFormatPipe,
    DragDropFileUploadDirective,
    LoaderComponent,
    MapComponent,
    MapTableComponent,
    MapLayersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule
  ],
  providers: [
    NavService,
    LayoutService
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FeatherIconsComponent,
    BreadcrumbComponent,
    TapToTopComponent,
    DateFormatPipe,
    LoaderComponent,
    MapComponent
  ]
})
export class SharedModule { }
