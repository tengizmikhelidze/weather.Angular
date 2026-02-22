import {PrecipitationUnitsEnums, TemperatureUnitsEnums, UnitsState, WindUnitsEnums} from "../enums/units-enums";

export const UNITS_STORAGE_KEY = 'units';

export const defaultState: UnitsState = {
    temperature: TemperatureUnitsEnums.CELSIUS,
    wind: WindUnitsEnums.KMH,
    precipitation: PrecipitationUnitsEnums.MM,
};

export function loadFromStorage(): UnitsState {
    try {
        const raw = localStorage.getItem(UNITS_STORAGE_KEY);
        return raw ? {...defaultState, ...JSON.parse(raw)} : defaultState;
    } catch {
        return defaultState;
    }
}
