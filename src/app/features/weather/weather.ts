import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {WeatherFacadeService} from "./weather-facade-service";

@Component({
  selector: 'app-weather',
  imports: [],
  providers: [WeatherFacadeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    
  `,
  styles: ``,
})
export class Weather {
  protected readonly weatherFacadeService = inject(WeatherFacadeService);

  constructor() {
    console.log(this.weatherFacadeService.weatherData())
  }

}
