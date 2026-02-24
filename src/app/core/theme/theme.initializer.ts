import {inject} from "@angular/core";
import {ThemeService} from "./theme.service";

export function themeInitializerFn() {
    const theme = inject(ThemeService)
}
