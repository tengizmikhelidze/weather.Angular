import {Pipe, PipeTransform} from '@angular/core';
import {WMO} from "../../core/enums/weather-interpretation-codes-enum";

@Pipe({
    name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {

    transform(value: WMO): string {

        if (WMO.ClearSky === value) {
            return "icon-sunny.webp"
        }

        if (
            WMO.MainlyClear === value
            || WMO.PartlyCloudy === value
            || WMO.Overcast === value
        ) {
            return "icon-partly-cloudy.webp"
        }

        if (
            WMO.DepositingRimeFog === value
            || WMO.Fog === value
        ) {
            return "icon-fog.webp"
        }

        if (
            WMO.DrizzleDense === value
            || WMO.DrizzleLight === value
            || WMO.DrizzleModerate === value
            || WMO.FreezingDrizzleLight === value
            || WMO.FreezingDrizzleDense === value
        ) {
            return "icon-drizzle.webp"
        }

        if (
            WMO.RainHeavy === value
            || WMO.RainSlight === value
            || WMO.RainModerate === value
            || WMO.FreezingRainLight === value
            || WMO.FreezingRainHeavy === value
            || WMO.RainShowersSlight === value
            || WMO.RainShowersModerate === value
            || WMO.RainShowersViolent === value
        ) {
            return "icon-rain.webp"
        }

        if (
            WMO.SnowFallHeavy === value
            || WMO.SnowFallModerate === value
            || WMO.SnowFallSlight === value
            || WMO.SnowGrains === value
            || WMO.SnowShowersSlight === value
            || WMO.SnowShowersHeavy === value
        ) {
            return "icon-snow.webp"
        }

        if (
            WMO.ThunderstormSlightOrModerate === value
            || WMO.ThunderstormWithSlightHail === value
            || WMO.ThunderstormWithHeavyHail === value
        ) {
            return "icon-thunderstorm.webp"
        }

        return "icon-cloudy.webp"
    }

}
