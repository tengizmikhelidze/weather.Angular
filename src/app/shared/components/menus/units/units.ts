import {Component} from '@angular/core';
import {Menu} from "../menu/menu";
import {MenuOverlayService} from "../menu/menu-overlay-service";
import {MenuItem} from "../interfaces/menu-item";
import {Button} from "../../buttons";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {MenuItemTypeEnum} from "../enums/menu-item-enum";

@Component({
    selector: 'app-units',
    imports: [
        Menu,
        Button,
        NgOptimizedImage,
        NgClass
    ],
    providers: [MenuOverlayService],
    template: `
        <app-button (click)="menu.toggle($event)">
            <img ngSrc="/assets/icons/icon-dropdown.svg" alt="<" height="8" width="13">
            Units
        </app-button>
        <app-menu [popup]="true" #menu>
            <ng-template #menuItemTemplate>
                <div class="menu">
                    <div class="menu__content">
                        @for (item of items; track item; let last = $last) {
                            <div class="menu__item"
                                 [ngClass]="{parent: item.childItems, button: item.MenuItemTypeEnum === MenuItemTypeEnum.BUTTON }">
                                <p>{{ item.label }}</p>
                                @if (item.childItems) {
                                    @for (subItem of item.childItems; track subItem) {
                                        <div class="menu__item menu__item__child">{{ subItem.label }}</div>
                                    }
                                }
                            </div>
                            @if (item.childItems && !last) {
                                <div class="splitter"></div>
                            }
                        }
                    </div>
                </div>
            </ng-template>
        </app-menu>
    `,
    styleUrl: './units.scss',
})
export class Units {
    protected readonly MenuItemTypeEnum = MenuItemTypeEnum;
    readonly items: MenuItem[] = [
        {
            label: 'Switch To Imperial',
            MenuItemTypeEnum: MenuItemTypeEnum.BUTTON,
        },
        {
            label: 'Temperature',
            MenuItemTypeEnum: MenuItemTypeEnum.TOGGLE,
            childItems: [
                {
                    label: 'Celsius (°C)'
                },
                {
                    label: 'Fahrenheit (°F)'
                }
            ]
        },
        {
            label: 'Wind Speed',
            MenuItemTypeEnum: MenuItemTypeEnum.TOGGLE,
            childItems: [
                {
                    label: 'km/h'
                },
                {
                    label: 'mph'
                }
            ]
        },
        {
            label: 'Precipitation',
            MenuItemTypeEnum: MenuItemTypeEnum.TOGGLE,
            childItems: [
                {
                    label: 'Millimeters (mm)'
                },
                {
                    label: 'Inches (in)'
                }
            ]
        },
    ];
}
