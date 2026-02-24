import {Component, inject} from '@angular/core';
import {Card} from "../../../../shared/components/card/card";
import {OpenMeteoService} from "../../../../core/services/open-meteo-service";
import {UnitsService} from "../../../../shared/components/menus/units/units-service";
import {TemperaturePipe} from "../../../../shared/pipes/temperature-pipe";

@Component({
  selector: 'app-current-weather-data-cards',
  imports: [
    Card,
    TemperaturePipe
  ],
  template: `
    <div class="current-weather-data-cards">
      <app-card>
        <div class="card__content">
          <div id="card__title">
            Feels Like
          </div>
          <div id="card__value">
            {{openMeteoService.weatherState()?.current?.apparent_temperature}}
            {{unitsService.temperature_unit() | temperature}}
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="card__content">
          <div id="card__title">
            Humidity
          </div>
          <div id="card__value">
            {{openMeteoService.weatherState()?.current?.relative_humidity_2m}} %
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="card__content">
          <div id="card__title">
            Wind
          </div>
          <div id="card__value">
            {{openMeteoService.weatherState()?.current?.wind_speed_10m}}
            {{unitsService.wind_speed_unit()}}
          </div>
        </div>
      </app-card>

      <app-card>
        <div class="card__content">
          <div id="card__title">
            Precipitation
          </div>
          <div id="card__value">
            {{openMeteoService.weatherState()?.current?.precipitation ?? 0}}
            {{unitsService.precipitation_unit()}}
          </div>
        </div>
      </app-card>
    </div>
  `,
  styles: `
    .current-weather-data-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: var(--spacing-4);
    }
  `,
})
export class CurrentWeatherDataCards {
  protected readonly unitsService = inject(UnitsService);
  protected readonly openMeteoService = inject(OpenMeteoService);
}
