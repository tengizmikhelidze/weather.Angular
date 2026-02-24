import { Pipe, PipeTransform } from '@angular/core';
import {TemperatureUnitsEnums} from "../components/menus/enums/units-enums";

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: TemperatureUnitsEnums): unknown {
    if(value === TemperatureUnitsEnums.CELSIUS) return '°C'
    return '°F'
  }

}
