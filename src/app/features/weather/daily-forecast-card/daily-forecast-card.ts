import {Component, computed, effect, inject} from '@angular/core';
import {Card} from "../../../shared/components/card/card";
import {OpenMeteoService} from "../../../core/services/open-meteo-service";
import {DatePipe} from "@angular/common";
import {WeatherIconPipe} from "../../../shared/pipes/weather-icon-pipe";

@Component({
    selector: 'app-daily-forecast-card',
    imports: [
        Card,
        DatePipe,
        WeatherIconPipe
    ],
    template: `
        <div class="daily-forecast-wrapper">
            <h3>Daily forecast</h3>

            <div class="daily-forecast-content">
                @for (date of this.openMeteoService.weatherState()?.daily?.time; track date.getDate(); let index = $index) {
                    <app-card padding="var(--spacing-2)">
                        <div class="card__content">
                            <div class="card__title">
                                {{ date | date: 'EEE' }}
                            </div>

                            <div class="card__icon">
                                @if (this.weatherCodes(); as weatherCodes) {
                                    <img src="/assets/icons/{{ weatherCodes[index] | weatherIcon}}" alt="WWO">
                                }
                            </div>

                            <div class="card__value">
                                <div class="max">
                                    @if (this.maxTemperatures(); as maxTemperatures) {
                                        {{ maxTemperatures[index] }}
                                    }
                                </div>
                                <div class="min">
                                    @if (this.minTemperatures(); as minTemperatures) {
                                        {{ minTemperatures[index] }}
                                    }
                                </div>
                            </div>
                        </div>
                    </app-card>
                }
            </div>

        </div>
    `,
    styles: `
      h3 {
        margin-bottom: var(--spacing-4);
        font-size: var(--font-size-fluid-lg);
        font-family: var(--font-family-sans);
        font-weight: 400;
      }

      .daily-forecast-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
        gap: var(--spacing-4);
      }

      .card {
        &__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-2);
        }

        &__value {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          .min {
            color: var(--color-text-tertiary);
          }
        }
      }
    `,
})
export class DailyForecastCard {
    protected readonly openMeteoService = inject(OpenMeteoService);
    maxTemperatures = computed(() => this.openMeteoService.weatherState()?.daily?.temperature_2m_max)
    minTemperatures = computed(() => this.openMeteoService.weatherState()?.daily?.temperature_2m_min)
    weatherCodes = computed(() => this.openMeteoService.weatherState()?.daily?.weather_code)

    constructor() {
        effect(() => {
            console.log(this.openMeteoService.weatherState()?.daily?.weather_code);
        });
    }

}
