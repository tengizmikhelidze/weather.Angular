import { Routes } from '@angular/router';

export const storybookRoutes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu-storybook/menu-storybook').then(m => m.MenuStorybook),
  },
];
