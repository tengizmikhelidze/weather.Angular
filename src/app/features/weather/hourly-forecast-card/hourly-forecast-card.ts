import {Component, inject} from '@angular/core';
import {Card} from "../../../shared/components/card/card";
import {OpenMeteoService} from "../../../core/services/open-meteo-service";
import {WeatherIconPipe} from "../../../shared/pipes/weather-icon-pipe";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-hourly-forecast-card',
    imports: [
        Card,
        WeatherIconPipe,
        DatePipe
    ],
    template: `
        <app-card>
            <div class="hourly-forecast-wrapper">
                <h3>Hourly forecast</h3>

                <div class="hourly-forecast-content">
                    @for (date of this.openMeteoService.weatherState()?.hourly?.time; track date.getTime()) {
                        <div class="hourly-forecast-item">
                            <div class="left">
                                <div class="hourly-forecast-icon">
                                    @if (this.openMeteoService.weatherState()?.hourly?.weather_code; as weatherCodes) {
                                        <img class="hourly-weather-icon"
                                             src="/assets/icons/{{ weatherCodes[$index] | weatherIcon}}" alt="WWO">
                                    }
                                </div>
                                <div class="hourly-forecast-time">
                                    {{ date | date: 'h a' }}
                                </div>
                            </div>

                            <div class="hourly-forecast-temperature">
                                @if (this.openMeteoService.weatherState()?.hourly?.temperature_2m; as temperatures) {
                                    {{ temperatures[$index] }}°
                                }
                            </div>
                        </div>
                    }

                </div>

            </div>
        </app-card>
    `,
    styles: `
      h3 {
        margin-bottom: var(--spacing-4);
        font-size: var(--font-size-fluid-xl);
        font-family: var(--font-family-sans);
        font-weight: 500;
      }
      
      .hourly-forecast-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: var(--spacing-2);
      }

      .hourly-forecast-item {
        padding: var(--spacing-1) var(--spacing-3);
        background-color: var(--color-background-tertiary);
        border-radius: var(--border-radius-sm);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-4);
        width: 100%;
      }
      
      .hourly-weather-icon {
        width: 35px;
        height: 35px;
      }

      .left {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
      }
      
      .hourly-forecast-time {
        font-weight: 600;
      }
    `,
})
export class HourlyForecastCard {
    protected readonly openMeteoService = inject(OpenMeteoService);
}
