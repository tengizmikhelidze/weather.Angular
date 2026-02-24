export enum TemperatureUnitsEnums {
    CELSIUS = 'celsius',
    FAHRENHEIT = 'fahrenheit'
}

export enum WindUnitsEnums {
    KMH = 'kmh',
    MPH = 'mph',
    KN = 'kn',
    MS = 'ms'
}

export enum PrecipitationUnitsEnums {
    MM = 'mm',
    IN = 'inch'
}

export interface UnitsState {
    temperature: TemperatureUnitsEnums;
    wind: WindUnitsEnums;
    precipitation: PrecipitationUnitsEnums;
}
