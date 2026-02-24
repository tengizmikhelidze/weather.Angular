import {
    ApplicationConfig,
    provideAppInitializer,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {themeInitializerFn} from "./core/theme/theme.initializer";
import {geolocationFactory} from "./core/services/geolocation-service";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes),
        provideHttpClient(),
        provideAppInitializer(themeInitializerFn),
        provideAppInitializer(geolocationFactory)
    ]
};
