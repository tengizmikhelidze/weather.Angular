import { Component } from '@angular/core';
import {Card} from "../../../shared/components/card/card";

@Component({
  selector: 'app-daily-forecast-card',
  imports: [
    Card
  ],
  template: `
    <app-card></app-card>
  `,
  styles: ``,
})
export class DailyForecastCard {

}
