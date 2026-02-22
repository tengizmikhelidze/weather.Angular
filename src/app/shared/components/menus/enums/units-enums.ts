export enum TemperatureUnitsEnums {
    CELSIUS = 'celsius',
    FAHRENHEIT = 'fahrenheit'
}

export enum WindUnitsEnums {
    KMH = 'kmh',
    MPH = 'mph'
}

export enum PrecipitationUnitsEnums {
    MM = 'mm',
    IN = 'in'
}

export interface UnitsState {
    temperature: TemperatureUnitsEnums;
    wind: WindUnitsEnums;
    precipitation: PrecipitationUnitsEnums;
}
