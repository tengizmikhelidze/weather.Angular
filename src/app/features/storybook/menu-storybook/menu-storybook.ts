import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {Menu} from "../../../shared/components/menus/menu/menu";
import {Button} from "../../../shared/components/buttons";
import {NgOptimizedImage} from "@angular/common";
import {MenuItem} from "../../../shared/components/menus/interfaces/menu-item";

@Component({
    selector: 'app-menu-storybook',
    imports: [
        Menu,
        Button,
        NgOptimizedImage
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './menu-storybook.html',
    styleUrl: './menu-storybook.scss',
    standalone: true
})
export class MenuStorybook {
    menuItems = signal<MenuItem[]>([
        {
            label: 'Home',
        },
        {
            label: 'About',
        }
    ])
}
