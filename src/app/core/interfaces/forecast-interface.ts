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
    [ForecastVariablesEnum.weather_code]?: number[] | null
    [ForecastVariablesEnum.temperature_2m_mean]?: number[] | null
    [ForecastVariablesEnum.temperature_2m_min]?: number[] | null
    [ForecastVariablesEnum.temperature_2m_max]?: number[] | null
    [ForecastVariablesEnum.time]: Date[]  | null
}

export interface HourlyForecast {
    [ForecastVariablesEnum.temperature_2m]?:   null | number[],
    [ForecastVariablesEnum.weather_code]?:  null | number[]
    [ForecastVariablesEnum.time]: Date[]  | null
}

export interface CurrentForecast {
    [ForecastVariablesEnum.temperature_2m]?: null | number,
    [ForecastVariablesEnum.weather_code]?: null | number
    [ForecastVariablesEnum.time]:  Date | null
    [ForecastVariablesEnum.apparent_temperature]?: null | number
    [ForecastVariablesEnum.wind_speed_10m]?: null | number
    [ForecastVariablesEnum.relative_humidity_2m]?: null | number
    [ForecastVariablesEnum.precipitation]?: null | number
}

export interface ForecastParams {
    latitude: number
    longitude: number
    timezone: string
    daily: ForecastVariablesEnum[]
    hourly: ForecastVariablesEnum[]
    current: ForecastVariablesEnum[]
    temperature_unit: TemperatureUnitsEnums
    wind_speed_unit: WindUnitsEnums
    precipitation_unit: PrecipitationUnitsEnums
}

export type ForecastParamsArrayKeys = 'daily' | 'hourly' | 'current';
