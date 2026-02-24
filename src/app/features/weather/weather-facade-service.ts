import {inject, Injectable, signal} from '@angular/core';
import {OpenMeteoService} from "../../core/services/open-meteo-service";

@Injectable()
export class WeatherFacadeService {
    readonly openMeteoService = inject(OpenMeteoService);
    readonly weatherData = this.openMeteoService.weatherState

    loading = signal<boolean>(false);

    constructor() {
        this.loading.set(true);

        this.openMeteoService.getWeather()
            .subscribe(
                {
                    next: () => this.loading.set(false),
                    error: () => this.loading.set(false)
                }
            )
    }
}
