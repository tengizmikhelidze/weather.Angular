import {inject, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {OpenMeteoService} from "../../core/services/open-meteo-service";

@Injectable()
export class WeatherFacadeService {
    readonly openMeteoService = inject(OpenMeteoService);
    readonly weatherData = this.openMeteoService.weatherState

    loading = signal(true);

    constructor() {
        this.openMeteoService.getWeather()
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: () => this.loading.set(false),
                error: () => this.loading.set(false)
            })
    }
}
