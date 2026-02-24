import {computed, Injectable, signal} from '@angular/core';
import {loadUnitsFromStorage} from "../utils/units-utils";
import {PrecipitationUnitsEnums, TemperatureUnitsEnums, WindUnitsEnums} from "../enums/units-enums";

@Injectable({
    providedIn: 'root',
})
export class UnitsService {
    #temperature_unit = signal(loadUnitsFromStorage().temperature)
    #wind_speed_unit = signal(loadUnitsFromStorage().wind)
    #precipitation_unit = signal(loadUnitsFromStorage().precipitation)

    temperature_unit = computed(() => this.#temperature_unit())
    wind_speed_unit = computed(() => this.#wind_speed_unit())
    precipitation_unit = computed(() => this.#precipitation_unit())

    setTemperatureUnit(unit: TemperatureUnitsEnums) {
        this.#temperature_unit.set(unit)
    }

    setWindSpeedUnit(unit: WindUnitsEnums) {
        this.#wind_speed_unit.set(unit)
    }

    setPrecipitationUnit(unit: PrecipitationUnitsEnums) {
        this.#precipitation_unit.set(unit)
    }
}
