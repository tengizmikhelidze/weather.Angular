import {MenuItemTypeEnum} from "../enums/menu-item-enum";

export interface MenuItem {
    label?: string
    items?: Omit<MenuItem, 'items'>[];
    MenuItemTypeEnum?: MenuItemTypeEnum;
    command?: (event: MenuItemCommandEvent) => void;
    [propName: string]: unknown;
}

export interface MenuItemCommandEvent {
    item?: MenuItem;
}
