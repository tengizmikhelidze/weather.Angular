import {MenuItemTypeEnum} from "../enums/menu-item-enum";

export interface MenuItem {
    label?: string
    items?: Omit<MenuItem, 'items'>[];
    MenuItemTypeEnum?: MenuItemTypeEnum;
    command?: (event: MenuItemCommandEvent) => void;
}

export interface MenuItemCommandEvent {
    originalEvent?: Event;
    item?: MenuItem;
    index?: number;
}
