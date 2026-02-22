import {MenuItemTypeEnum} from "../enums/menu-item-enum";

export interface MenuItem {
    label?: string
    childItems?: Omit<MenuItem, 'childItems'>[];
    MenuItemTypeEnum?: MenuItemTypeEnum;
}
