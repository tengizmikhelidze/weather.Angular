import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./weather/weather').then(m => m.Weather),
  },
  {
    path: 'theme',
    loadComponent: () => import('./theme-picker/theme-picker').then(m => m.ThemePicker),
  },
  {
    path: 'storybook',
    loadChildren: () => import('./storybook/storybook.routes').then(m => m.storybookRoutes),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found').then(m => m.NotFound),
  },
];
