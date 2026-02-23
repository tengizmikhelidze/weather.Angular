import {inject, Injectable} from '@angular/core';
import {OpenMeteoService} from "../../shared/services/open-meteo-service";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable()
export class WeatherFacadeService {
  readonly openMeteoService = inject(OpenMeteoService);
  readonly weatherData = toSignal(this.openMeteoService.weatherState)

  constructor() {
    this.openMeteoService.getWeather()
        .subscribe()
  }
}
