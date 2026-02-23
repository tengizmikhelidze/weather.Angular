import {Component, inject} from '@angular/core';
import {Card} from "../../../shared/components/card/card";
import {WeatherFacadeService} from "../weather-facade-service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-current-weather-card',
  imports: [
    Card,
    NgOptimizedImage
  ],
  template: `
    <app-card>
      <picture>
        <source srcset="/assets/images/bg-today-large.svg, /assets/images/bg-today-large.svg" />
        <img ngSrc="/assets/images/bg-today-large.svg" alt="Sun" />
      </picture>
    </app-card>
  `,
  styles: `
    .app-card {
      background: red;
    }
  `,
})
export class CurrentWeatherCard {
  protected readonly weatherFacadeService = inject(WeatherFacadeService);

  constructor() {
    console.log(this.weatherFacadeService.weatherData())
  }
}
