import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {WeatherFacadeService} from "./weather-facade-service";
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
    providers: [WeatherFacadeService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <main>
            <app-current-weather-card></app-current-weather-card>
            @defer {
                <app-hourly-forecast-card></app-hourly-forecast-card>
            }
            @defer {
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
    protected readonly weatherFacadeService = inject(WeatherFacadeService);

    constructor() {
        console.log(this.weatherFacadeService.weatherData())
    }

}
