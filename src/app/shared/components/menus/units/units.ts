import {Component} from '@angular/core';
import {Menu} from "../menu/menu";
import {MenuOverlayService} from "../menu/menu-overlay-service";
import {MenuItem, MenuItemCommandEvent} from "../interfaces/menu-item";
import {Button} from "../../buttons";
import {NgClass, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {MenuItemTypeEnum} from "../enums/menu-item-enum";

@Component({
    selector: 'app-units',
    imports: [
        Menu,
        Button,
        NgOptimizedImage,
        NgClass,
        NgTemplateOutlet
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
                        @for (item of items; track item; let isLast = $last) {
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}" ></ng-container>
                            @for (subItem of item.items; track subItem) {
                                <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: subItem}" ></ng-container>
                            }
                            @if (item.items && !isLast) {
                                <div class="splitter"></div>
                            }
                        }
                    </div>
                </div>
            </ng-template>

        </app-menu>

        <ng-template #itemTemplate let-item>
            <button class="menu__item"
                 [ngClass]="{parent: item.items, child: !item.items, button: item.MenuItemTypeEnum === MenuItemTypeEnum.BUTTON }">
                <p>{{ item.label }}</p>
            </button>
        </ng-template>
    `,
    styleUrl: './units.scss',
})
export class Units {
    protected readonly MenuItemTypeEnum = MenuItemTypeEnum;
    readonly items: MenuItem[] = [
        {
            label: 'Switch To Imperial',
            MenuItemTypeEnum: MenuItemTypeEnum.BUTTON,
            command: (event: MenuItemCommandEvent) => this.switchToImperial(event)
        },
        {
            label: 'Temperature',
            MenuItemTypeEnum: MenuItemTypeEnum.TOGGLE,
            items: [
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
            items: [
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
            items: [
                {
                    label: 'Millimeters (mm)'
                },
                {
                    label: 'Inches (in)'
                }
            ]
        },
    ];

    switchToImperial = (event: MenuItemCommandEvent) => {
        console.log(event)
    }
}
