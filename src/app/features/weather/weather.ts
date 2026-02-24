import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CurrentForecastCard} from "./current-weather-card/current-forecast-card";
import {HourlyForecastCard} from "./hourly-forecast-card/hourly-forecast-card";
import {DailyForecastCard} from "./daily-forecast-card/daily-forecast-card";

@Component({
    selector: 'app-weather',
    imports: [
        CurrentForecastCard,
        HourlyForecastCard,
        DailyForecastCard
    ],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <main>
            @defer {
                <app-current-weather-card></app-current-weather-card>
                <app-daily-forecast-card></app-daily-forecast-card>
                <app-hourly-forecast-card></app-hourly-forecast-card>
            }
        </main>
    `,
    styles: [
        `
            main {
              display: grid;
              grid-template-columns: 1fr;
              grid-gap: var(--spacing-6);
            }
        `
    ],
})
export class Weather {

}
