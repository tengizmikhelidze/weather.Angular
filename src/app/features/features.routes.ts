import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home),
  },
  {
    path: 'theme',
    loadComponent: () => import('./theme-picker/theme-picker').then(m => m.ThemePicker),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found').then(m => m.NotFound),
  },
];
