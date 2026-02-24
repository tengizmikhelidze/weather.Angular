import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {Card} from "../../../shared/components/card/card";
import {OpenMeteoService} from "../../../core/services/open-meteo-service";
import {GeolocationService} from "../../../core/services/geolocation-service";
import {DatePipe} from "@angular/common";
import {CurrentWeatherDataCards} from "./current-weather-data-cards/current-weather-data-cards";

@Component({
    selector: 'app-current-weather-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Card, DatePipe, CurrentWeatherDataCards],
    template: `
        <section>
            <app-card [noPadding]="true" borderRadius="var(--border-radius-2xl)">
                <picture class="weather-bg">
                    <source media="(min-width: 640px)" srcset="/assets/images/bg-today-large.svg"/>
                    <source media="(max-width: 639px)" srcset="/assets/images/bg-today-small.svg"/>
                    <img
                            class="weather-bg__img"
                            src="/assets/images/bg-today-small.svg"
                            alt=""
                            role="presentation"
                            aria-hidden="true"
                    />
                </picture>
                
                <div class="content">
                    <div class="content__box">
                        <div id="geolocation">
                            {{ geolocationService.ipLocation().city }}
                            , {{ geolocationService.ipLocation().country }}
                        </div>

                        <div id="date">
                            {{currentDate() | date: 'EEEE, MMM d, yyyy'}}
                        </div>
                    </div>

                    <div id="temperature">{{ currentWeatherData()?.temperature_2m }}&deg;</div>
                </div>
            </app-card>

            <app-current-weather-data-cards></app-current-weather-data-cards>
        </section>
    `,
    styleUrl: './current-forecast-card.scss',
})
export class CurrentForecastCard {
    protected readonly geolocationService = inject(GeolocationService)
    protected readonly openMeteoService = inject(OpenMeteoService);

    currentWeatherData = computed(() => this.openMeteoService.weatherState()?.current);
    currentDate = signal(new Date())
}
