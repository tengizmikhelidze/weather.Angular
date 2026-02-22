import {Component, effect, input, signal} from '@angular/core';
import {Menu} from "../menu/menu";
import {MenuOverlayService} from "../menu/menu-overlay-service";
import {MenuItem, MenuItemCommandEvent} from "../interfaces/menu-item";
import {Button, ButtonVariant} from "../../buttons";
import {NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {MenuItemTypeEnum} from "../enums/menu-item-enum";
import {PrecipitationUnitsEnums, TemperatureUnitsEnums, UnitsState, WindUnitsEnums} from "../enums/units-enums";
import {loadFromStorage, UNITS_STORAGE_KEY} from "../utils/units-utils";

@Component({
    selector: 'app-units',
    imports: [
        Menu,
        Button,
        NgOptimizedImage,
        NgTemplateOutlet
    ],
    providers: [MenuOverlayService],
    template: `
        <app-button [variant]="buttonVariant()" (click)="menu.toggle($event)">
            <img ngSrc="/assets/icons/icon-units.svg" alt="<" height="16" width="16">
            Units
            <img ngSrc="/assets/icons/icon-dropdown.svg" alt="<" height="8" width="13">
        </app-button>
        <app-menu [popup]="true" #menu>
            <ng-template #menuItemTemplate>
                <div class="menu">
                    <div class="menu__content">
                        @for (item of items; track item; let isLast = $last) {
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                            @for (subItem of item.items; track subItem) {
                                <ng-container
                                        *ngTemplateOutlet="itemTemplate; context: {$implicit: subItem}"></ng-container>
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
            <button class="menu__item" (click)="item.command ? item.command({item}) : null"
                    [class.parent]="item.items"
                    [class.child]="!item.items"
                    [class.button]="item.MenuItemTypeEnum === MenuItemTypeEnum.BUTTON"
                    [class.selected]="item.controller ? item.controller() === item.value : false">
                <p>{{ item.label }}</p>
                @if (item.controller && item.controller() === item.value) {
                    <img ngSrc="/assets/icons/icon-checkmark.svg" alt="✓" height="12" width="12">
                }
            </button>
        </ng-template>
    `,
    styleUrl: './units.scss',
})
export class Units {
    protected readonly MenuItemTypeEnum = MenuItemTypeEnum;

    buttonVariant = input<ButtonVariant>('secondary')

    temperature = signal<TemperatureUnitsEnums>(loadFromStorage().temperature)
    wind = signal<WindUnitsEnums>(loadFromStorage().wind)
    precipitation = signal<PrecipitationUnitsEnums>(loadFromStorage().precipitation)

    protected readonly items: MenuItem[] = [
        {
            label: 'Switch To Imperial',
            MenuItemTypeEnum: MenuItemTypeEnum.BUTTON,
            command: (event: MenuItemCommandEvent) => this.switchToImperial(event)
        },
        {
            label: 'Switch To Metric',
            MenuItemTypeEnum: MenuItemTypeEnum.BUTTON,
            command: (event: MenuItemCommandEvent) => this.switchToMetric(event)
        },
        {
            label: 'Temperature',
            MenuItemTypeEnum: MenuItemTypeEnum.TOGGLE,
            items: [
                {
                    label: 'Celsius (°C)',
                    value: TemperatureUnitsEnums.CELSIUS,
                    controller: this.temperature,
                    command: (event: MenuItemCommandEvent) => this.selectTemperatureUnit(event.item)
                },
                {
                    label: 'Fahrenheit (°F)',
                    value: TemperatureUnitsEnums.FAHRENHEIT,
                    controller: this.temperature,
                    command: (event: MenuItemCommandEvent) => this.selectTemperatureUnit(event.item)
                }
            ]
        },
        {
            label: 'Wind Speed',
            MenuItemTypeEnum: MenuItemTypeEnum.TOGGLE,
            command: (event: MenuItemCommandEvent) => this.selectWindUnit(event.item),
            items: [
                {
                    label: 'km/h',
                    value: WindUnitsEnums.KMH,
                    controller: this.wind,
                    command: (event: MenuItemCommandEvent) => this.selectWindUnit(event.item)
                },
                {
                    label: 'mph',
                    value: WindUnitsEnums.MPH,
                    controller: this.wind,
                    command: (event: MenuItemCommandEvent) => this.selectWindUnit(event.item)
                }
            ]
        },
        {
            label: 'Precipitation',
            MenuItemTypeEnum: MenuItemTypeEnum.TOGGLE,
            items: [
                {
                    label: 'Millimeters (mm)',
                    value: PrecipitationUnitsEnums.MM,
                    controller: this.precipitation,
                    command: (event: MenuItemCommandEvent) => this.selectPrecipitationUnit(event.item)
                },
                {
                    label: 'Inches (in)',
                    value: PrecipitationUnitsEnums.IN,
                    controller: this.precipitation,
                    command: (event: MenuItemCommandEvent) => this.selectPrecipitationUnit(event.item)
                }
            ]
        },
    ];

    constructor() {
        effect(() => {
            const state: UnitsState = {
                temperature: this.temperature(),
                wind: this.wind(),
                precipitation: this.precipitation(),
            };
            localStorage.setItem(UNITS_STORAGE_KEY, JSON.stringify(state));
        });
    }

    switchToImperial = (event: MenuItemCommandEvent) => {
        this.temperature.set(TemperatureUnitsEnums.FAHRENHEIT)
        this.wind.set(WindUnitsEnums.MPH)
        this.precipitation.set(PrecipitationUnitsEnums.IN)
    }

    switchToMetric = (event: MenuItemCommandEvent) => {
        this.temperature.set(TemperatureUnitsEnums.CELSIUS)
        this.wind.set(WindUnitsEnums.KMH)
        this.precipitation.set(PrecipitationUnitsEnums.MM)
    }

    selectTemperatureUnit(menuItem: MenuItem | undefined) {
        const value = menuItem ? menuItem["value"] as TemperatureUnitsEnums : TemperatureUnitsEnums.CELSIUS
        this.temperature.set(value)
    }

    selectWindUnit(menuItem: MenuItem | undefined) {
        const value = menuItem ? menuItem["value"] as WindUnitsEnums : WindUnitsEnums.KMH
        this.wind.set(value)
    }

    selectPrecipitationUnit(menuItem: MenuItem | undefined) {
        const value = menuItem ? menuItem["value"] as PrecipitationUnitsEnums : PrecipitationUnitsEnums.MM
        this.precipitation.set(value)
    }
}
