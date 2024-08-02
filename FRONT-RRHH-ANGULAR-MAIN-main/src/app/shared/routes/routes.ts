import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'rrhh',
    loadChildren: () => import('../../pages/rrhh/rrhh.module').then((m) => m.RRHHModule),
  },
  {
    path: 'user',
    loadChildren: () => import('../../pages/user/user.module').then((m) => m.UserModule),
  },
];
