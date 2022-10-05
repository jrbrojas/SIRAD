import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

// Menu
export interface Menu {
  headTitle1?: string,
  headTitle2?: string,
  path?: string;
  reportegeneral? : string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  tooltip?: string;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root'
})
export class NavService implements OnDestroy {

  private unsubscribe: Subject<any> = new Subject();
  public  screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuCollapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize').pipe(
      debounceTime(1000),
      takeUntil(this.unsubscribe)
    ).subscribe((evt: any) => {
      this.setScreenWidth(evt.target.innerWidth);
      if (evt.target.innerWidth < 991) {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      }
      if(evt.target.innerWidth < 1199) {
        this.megaMenuCollapse = true;
      }
    });
    if(window.innerWidth < 991) { // Detect Route change sidebar close
      this.router.events.subscribe(event => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENU_ITEMS: Menu[] = [
    /*{
      headTitle1: 'General', headTitle2: 'Dashboards & widgets.',
    },*/
    {
      title: 'REGISTRO', icon: 'home', tooltip: 'Registro', type: 'sub', badgeType: 'success', active: true, children: [
        { path: '/sirad/registro/recursos', title: 'Recursos', type: 'link' },
        { path: '/sirad/registro/carga-masiva', title: 'Carga Masiva', type: 'link' },
        /* { path: '/simulaciones', title: 'Simulaciones', type: 'link', },
        { path: '/simulaciones/solicitud-credenciales', title: 'Aprobar Solicitudes Credenciales', type: 'link', },
        { path: '/simulaciones/seguimiento-reportes', title: 'Seguimiento', type: 'link', },
        { path: '/simulaciones/ficha-evaluacion', title: 'Ficha Evaluación', type: 'link', } */
      ]
    },
    {
      title: 'VISUALIZACION', tooltip: 'Visualizacion', icon: 'shield', type: 'sub', active: false, children: [
        { path: '/sirad/visualizacion/mapa', title: 'Mapa', type: 'link' },
      ]
    },
    {
      title: 'SEGURIDAD', tooltip: 'Seguridad', icon: 'folder-plus', type: 'sub', active: false, children: [
        { path: '/sirad/seguridad/usuarios', title: 'Usuarios', type: 'link' },
      ]
    },
    /* {
      title: 'EMERGENCIAS', icon: 'home', tooltip: 'Emergencias', type: 'sub', badgeType: 'success', active: true, children: [
        { path: '/emergencias', title: 'Emergencias', type: 'link', },
        { path: '/emergencias/monitoring-emergencies', title: 'Monitoreo', type: 'link', },
        { path: '/emergencias/solicitud-cierre', title: 'Solicitudes Cierre', type: 'link', },
        { path: '/emergencias/recuperacion-emergencies', title: 'Recuperacion', type: 'link', }
      ]
    },
    {
      title: 'PI', icon: 'airplay', tooltip: 'Peligros Inminentes', type: 'sub', active: false, children: [
        { path: '/dee', title: 'Peligro Inminente', type: 'link' }
      ]
    },
    {
      title: 'DEE', icon: 'airplay', tooltip: 'Declaracion Estado Emergencia', type: 'sub', active: false, children: [
        { path: '/dee', title: 'DEE', type: 'link' }
      ]
    }
    ,
    {
      title: 'ESS', icon: 'box', tooltip: 'Ejercicios, Simulación y Simulacro', type: 'sub', badgeValue: 'New', active: false, children: [
        { path: '/ess', title: 'ESS', type: 'link' }
      ]
    },
    {
      title: 'ALMACENES', tooltip: 'Almacenes', type: 'sub', icon: 'shopping-bag', active: false, children: [
        { path: '/almacenes', title: 'Almacenes', type: 'link' }
      ]
    },
    {
      title: "REPORTES", tooltip: 'Reportes', icon: 'folder-plus', type: 'sub', active: false, children: [
          { path: '/reportes/reportes-general', title: 'General', type: 'link' },
          { path: '', title: 'Reportes', type: 'link' },

      ]
    },
    {
      title: 'USUARIOS', tooltip: 'Usuarios', icon: 'users', type: 'sub', active: false, children: [
        { path: '/usuarios', title: 'Usuarios', type: 'link' }
      ]
    },
    {
      title: 'SEGURIDAD', tooltip: 'Seguridad', icon: 'shield', type: 'sub', active: false, children: [
        { path: '/seguridad/grupo-permisos', title: 'Grupo Permisos', type: 'link' },
        { path: '/seguridad/permisos', title: 'Permisos', type: 'link' },
        { path: '/seguridad/perfiles', title: 'Perfiles', type: 'link' },
        { path: '/seguridad/usuarios', title: 'Usuarios', type: 'link' },
        { path: '/seguridad/solicitud-creacion-credenciales', title: 'Solicitudes Credenciales', type: 'link' },
      ]
    },
    {
      title: 'ADMINISTRACION', tooltip: 'Administración', icon: 'check-square', type: 'sub', active: false, children: [
        { path: '/administracion/peligro', title: 'Peligro', type: 'link' },
        { path: '/administracion/peligros-secundarios', title: 'Peligros Secundarios', type: 'link' },
        { path: '/administracion/grupo-peligro', title: 'Grupo Peligro', type: 'link' },
        { path: '/administracion/peligro-ubicacion', title: 'Peligro por Ubicación', type: 'link' }
      ]
    },
    {
      title: 'DASHBOARD', tooltip: 'Dashboard', icon: 'command', type: 'sub', active: false, children: [
        { path: '/home', title: 'Dashboard', type: 'link' },
      ]
    }, */
  ];

  MEGA_MENU_ITEMS: Menu[] = [
    {
      title: 'Error Pages', type: 'sub', active: true, children: [
        { path: '/error-page/error-400', title: 'Error Page 400', type: 'link' },
        { path: '/error-page/error-401', title: 'Error Page 401', type: 'link' },
        { path: '/error-page/error-403', title: 'Error Page 403', type: 'link' },
        { path: '/error-page/error-404', title: 'Error Page 404', type: 'link' },
        { path: '/error-page/error-500', title: 'Error Page 500', type: 'link' },
        { path: '/error-page/error-503', title: 'Error Page 503', type: 'link' },
      ]
    },
    {
      title: 'Authentication', type: 'sub', active: false, children: [
        { path: '/authentication/simple-login', title: 'Login Simple', type: 'link' },
        { path: '/authentication/login-with-background-image', title: 'Login BG Image', type: 'link' },
        { path: '/authentication/login-with-background-video', title: 'Login BG Video', type: 'link' },
        { path: '/authentication/simple-register', title: 'Simple Register', type: 'link' },
        { path: '/authentication/register-with-background-image', title: 'Register BG Image', type: 'link' },
        { path: '/authentication/register-with-background-video', title: 'Register BG Video', type: 'link' }
      ]
    },
    {
      title: 'Usefull Pages', type: 'sub', active: false, children: [
        { path: '/search-pages', title: 'Search Pages', type: 'link' },
        { path: '/authentication/unlock-user', title: 'Unlock User', type: 'link' },
        { path: '/authentication/forgot-password', title: 'Forgot Password', type: 'link' },
        { path: '/authentication/reset-password', title: 'Reset Password', type: 'link' },
        { path: '/maintenance', title: 'Maintenance', type: 'link' }
      ]
    },
    {
      title: 'Email templates', type: 'sub', active: false, children: [
        { path: 'http://admin.pixelstrap.com/cuba/theme/basic-template.html', title: 'Basic Email', type: 'extTabLink' },
        { path: 'http://admin.pixelstrap.com/cuba/theme/email-header.html', title: 'Basic With Header', type: 'extTabLink' },
        { path: 'http://admin.pixelstrap.com/cuba/theme/template-email.html', title: 'Ecomerce Template', type: 'extTabLink' },
        { path: 'http://admin.pixelstrap.com/cuba/theme/template-email-2.html', title: 'Email Template 2', type: 'extTabLink' },
        { path: 'http://admin.pixelstrap.com/cuba/theme/ecommerce-templates.html', title: 'Ecommerce Email', type: 'extTabLink' },
        { path: 'http://admin.pixelstrap.com/cuba/theme/email-order-success.html', title: 'Order Success', type: 'extTabLink' }
      ]
    },
    {
      title: 'Coming Soon', type: 'sub', active: false, children: [
        { path: '/coming-soon/simple', title: 'Coming Simple', type: 'link' },
        { path: '/coming-soon/simple-with-bg-img', title: 'Coming BG Image', type: 'link' },
        { path: '/coming-soon/simple-with-bg-vid', title: 'Coming BG Video', type: 'link' }
      ]
    },
  ];

  LEVEL_MENU_ITEMS: Menu[] = [
    {
      path: '/file-manager', title: 'File Manager', icon: 'git-pull-request', type: 'link'
    },
    {
      title: 'Users', icon: 'users', type: 'sub', active: false, children: [
        { path: '/user/team-details', title: 'All Users', icon: 'users', type: 'link' },
        { path: '/user/profile', title: 'User Profile', icon: 'users', type: 'link' },
        { path: '/user/edit-profile', title: 'Edit Profile', icon: 'users', type: 'link' },
      ]
    },
    { path: '/bookmarks', title: 'Bookmarks', icon: 'heart', type: 'link' },
    { path: '/calender', title: 'Calender', icon: 'calendar', type: 'link' },
    { path: '/social-app', title: 'Social App', icon: 'zap', type: 'link' }
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENU_ITEMS);
  megaItems = new BehaviorSubject<Menu[]>(this.MEGA_MENU_ITEMS);
  levelMenuItems = new BehaviorSubject<Menu[]>(this.LEVEL_MENU_ITEMS);
}
