import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {Card} from "../../../shared/components/card/card";
import {WeatherFacadeService} from "../weather-facade-service";

@Component({
  selector: 'app-current-weather-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card],
  template: `
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
        <div id="geolocation">Tbilisi, Georgia</div>
        <div id="temperature">{{ currentWeatherData()?.temperature_2m }}&deg;</div>
      </div>
    </app-card>
  `,
  styleUrl: './current-weather-card.scss',
})
export class CurrentWeatherCard {
  protected readonly weatherFacadeService = inject(WeatherFacadeService);

  currentWeatherData = computed(()=> this.weatherFacadeService.weatherData()?.current);

}
