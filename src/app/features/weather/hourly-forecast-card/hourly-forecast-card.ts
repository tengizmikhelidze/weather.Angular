import { Component } from '@angular/core';
import {Card} from "../../../shared/components/card/card";

@Component({
  selector: 'app-hourly-forecast-card',
  imports: [
    Card
  ],
  template: `
    <app-card></app-card>
  `,
  styles: ``,
})
export class HourlyForecastCard {

}
