import { Component, Inject, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { NavService } from '../../services/nav.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public elem: any;
  public dark: boolean = this.layout.config.settings.layout_version == 'dark-only' ? true : false;
  descripcionNivel: string;

  constructor(public layout: LayoutService, public navServices: NavService, @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.elem = document.documentElement;
    const datoGeoPolitico = localStorage.getItem('datoGeoPolitico');
    this.descripcionNivel = this.obtenerDescripcionNivel(datoGeoPolitico);
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
    this.navServices.megaMenu  = false;
    this.navServices.levelMenu = false;
  }

  layoutToggle() {
    this.dark = !this.dark;
    this.layout.config.settings.layout_version = this.dark ? 'dark-only' : 'light';
  }

  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
  //--


  obtenerDescripcionNivel(datoGeoPolitico: any){
    const nivel = JSON.parse(datoGeoPolitico).nivel;
    let descNivel = '';

    if(nivel == 1){
      descNivel='NACIONAL';
      return descNivel;
    }

    const desRegion= JSON.parse(datoGeoPolitico).desRegion;
    const desProvincia= JSON.parse(datoGeoPolitico).desProvincia;
    const desDistrito= JSON.parse(datoGeoPolitico).desDistrito;
    if(desRegion.length>1){
      descNivel = desRegion;
    }
    if(desProvincia.length>1){
      descNivel = descNivel+'/'+desProvincia;
    }
    if(desDistrito.length>1){
      descNivel =  descNivel+'/'+desDistrito;
    }

    return descNivel;
  }


}
