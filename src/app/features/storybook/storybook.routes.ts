import {Routes} from '@angular/router';
import {Storybook} from "./storybook";

export const storybookRoutes: Routes = [
    {
        path: '',
        component: Storybook,
        children: [
            {
                path: "",
                pathMatch: 'full',
                redirectTo: 'buttons'
            },
            {
                path: 'menu',
                loadComponent: () => import('./menu-storybook/menu-storybook').then(m => m.MenuStorybook),
            },
            {
                path: 'units',
                loadComponent: () => import('./units-storybook/units-storybook').then(m => m.UnitsStorybook),
            },
            {
                path: 'buttons',
                loadComponent: () => import('./buttons-storybook/buttons-storybook').then(m => m.ButtonsStorybook),
            },
        ]
    },
];
