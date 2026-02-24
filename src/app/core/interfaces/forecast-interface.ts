import {ForecastVariablesEnum} from "../enums/forecast-variables-enums";
import {
    PrecipitationUnitsEnums,
    TemperatureUnitsEnums,
    WindUnitsEnums
} from "../../shared/components/menus/enums/units-enums";

export interface WeatherForecast {
    daily: DailyForecast | null
    hourly: HourlyForecast | null
    current: CurrentForecast | null
}

export interface DailyForecast {
    [ForecastVariablesEnum.weather_code]?: Float32Array | null | number
    [ForecastVariablesEnum.temperature_2m_mean]?: Float32Array | null | number
    [ForecastVariablesEnum.time]: Date[]  | null
}

export interface HourlyForecast {
    [ForecastVariablesEnum.temperature_2m]?: Float32Array | null | number,
    [ForecastVariablesEnum.weather_code]?: Float32Array | null | number
    [ForecastVariablesEnum.time]: Date[]  | null
}

export interface CurrentForecast {
    [ForecastVariablesEnum.temperature_2m]?: null | number,
    [ForecastVariablesEnum.weather_code]?: null | number
    [ForecastVariablesEnum.time]:  Date | null
    [ForecastVariablesEnum.apparent_temperature]?: null | number
}

export interface ForecastParams {
    latitude: number
    longitude: number
    daily: ForecastVariablesEnum[]
    hourly: ForecastVariablesEnum[]
    current: ForecastVariablesEnum[]
    temperature_unit: TemperatureUnitsEnums
    wind_speed_unit: WindUnitsEnums
    precipitation_unit: PrecipitationUnitsEnums
}

export type ForecastParamsArrayKeys = 'daily' | 'hourly' | 'current';
