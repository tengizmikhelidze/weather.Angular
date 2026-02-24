import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CurrentWeatherCard} from "./current-weather-card/current-weather-card";
import {HourlyForecastCard} from "./hourly-forecast-card/hourly-forecast-card";
import {DailyForecastCard} from "./daily-forecast-card/daily-forecast-card";

@Component({
    selector: 'app-weather',
    imports: [
        CurrentWeatherCard,
        HourlyForecastCard,
        DailyForecastCard
    ],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <main>
            @defer {
                <app-current-weather-card></app-current-weather-card>
                <app-hourly-forecast-card></app-hourly-forecast-card>
                <app-daily-forecast-card></app-daily-forecast-card>
            }
        </main>
    `,
    styles: [
        `
        `
    ],
})
export class Weather {

}
