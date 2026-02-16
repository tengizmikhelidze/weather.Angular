import {inject} from "@angular/core";
import {ThemeService} from "./theme.service";
import {ThemeConfig} from "./theme.types";
import {Observable, of} from "rxjs";

export function themeInitializerFn (): Observable<ThemeConfig> {
    const theme = inject(ThemeService)

    return of(theme.themeConfig())
}
