import {inject, Injectable, signal} from '@angular/core';
import {OpenMeteoService} from "../../shared/services/open-meteo-service";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable()
export class WeatherFacadeService {
  readonly openMeteoService = inject(OpenMeteoService);
  readonly weatherData = toSignal(this.openMeteoService.weatherState)

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
