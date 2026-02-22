import {Component, signal} from '@angular/core';
import {MenuItem} from "../../../shared/components/menus/interfaces/menu-item";
import {Units} from "../../../shared/components/menus/units/units";

@Component({
    selector: 'app-menu-storybook',
    imports: [
        Units
    ],
    templateUrl: './units-storybook.html',
    styleUrl: './units-storybook.scss',
    standalone: true
})
export class UnitsStorybook {
    menuItems = signal<MenuItem[]>([
        {
            label: 'Home',
        },
        {
            label: 'About',
        }
    ])
}
