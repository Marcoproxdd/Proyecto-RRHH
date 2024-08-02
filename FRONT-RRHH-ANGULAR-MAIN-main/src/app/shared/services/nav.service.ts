import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

// Menu Interface
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }
  
  ngOnDestroy() {
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  // Define the menu items
  MENUITEMS: Menu[] = [
    {
      headTitle1: 'General',
    },
    {
      title: 'Dashboard',
      icon: 'home',
      type: 'link',
      badgeType: 'light-primary',
      active: true,
      path: '/rrhh/sorti',
    },
    {
      headTitle1: 'Applications',
      headTitle2: 'Ready To Use Apps.',
    },
    {
      title: 'RRHH',
      icon: 'charts',
      type: 'sub',
      badgeType: 'light-secondary',
      active: false,
      children: [
        { path: '/rrhh/puesto', title: 'Crear Puestos', type: 'link' },
        { path: '/rrhh/puesto/ver-puesto', title: 'Ver Puestos', type: 'link' },
        { path: '/rrhh/rol', title: 'Roles', type: 'link' },
        { path: '/rrhh/rol/ver-roles', title: 'Ver roles', type: 'link' },
        { path: '/rrhh/departamento', title: 'Crear Departamentos', type: 'link' },
        { path: '/rrhh/departamento/view-departamento', title: 'Ver Departamentos', type: 'link' },
        { path: '/rrhh/view-horario', title: 'Ver Horarios', type: 'link' },
        { path: '/rrhh/crear-horario', title: 'Crear Horario', type: 'link' },
        { path: '/rrhh/permisos', title: 'Listar Permisos', type: 'link' },
        { path: '/rrhh/crear-permiso', title: 'Crear Permiso', type: 'link' },
        
        
      ],
    },
    {
      headTitle1: 'Administration',
      headTitle2: 'Ready To Use Apps.',
    },
    {
      title: 'USERS',
      icon: 'users',
      type: 'sub',
      badgeType: 'light-secondary',
      active: false,
      children: [
        { path: '/user/view', title: 'View Users', type: 'link' },
        { path: '/user/create', title: 'Create User', type: 'link' }
      ]
    }
  ];
  
  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
