import { Routes } from '@angular/router';
import { featuresRoutes } from './features/features.routes';

export const routes: Routes = [
  {
    path: '',
    children: featuresRoutes,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
