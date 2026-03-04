import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {fetchWeatherApi} from "openmeteo";
import {from, map, Observable, shareReplay, tap} from "rxjs";
import {WeatherApiResponse} from "@openmeteo/sdk/weather-api-response";
import {
    CurrentForecast,
    DailyForecast,
    ForecastParams,
    ForecastParamsArrayKeys,
    HourlyForecast,
    WeatherForecast
} from "../interfaces/forecast-interface";
import {VariablesWithTime} from "@openmeteo/sdk/variables-with-time";
import {ForecastVariablesEnum} from "../enums/forecast-variables-enums";
import {MathUtils} from "../utils/math-utils";
import {UnitsService} from "../../shared/components/menus/units/units-service";
import {GeolocationService} from "./geolocation-service";

@Injectable({
    providedIn: 'root',
})
export class OpenMeteoService {
    private readonly unitsService = inject(UnitsService);
    private readonly geolocationService = inject(GeolocationService);

    #weatherState = signal<WeatherForecast | undefined>(undefined);
    readonly weatherState = computed(() => this.#weatherState());

    constructor() {
        effect(() => {
            this.getWeather().subscribe();
        });
    }

    getWeather(): Observable<WeatherForecast> {
        const temperature_unit = this.unitsService.temperature_unit();
        const wind_speed_unit = this.unitsService.wind_speed_unit();
        const precipitation_unit = this.unitsService.precipitation_unit();
        const locationPosition: GeolocationPosition | null = this.geolocationService.geolocationPosition();

        const params: ForecastParams = {
            latitude: locationPosition.coords.latitude,
            longitude: locationPosition.coords.longitude,
            forecast_hours: 12,
            daily: [
                ForecastVariablesEnum.weather_code,
                ForecastVariablesEnum.temperature_2m_mean,
                ForecastVariablesEnum.temperature_2m_min,
                ForecastVariablesEnum.temperature_2m_max,
            ],
            hourly: [ForecastVariablesEnum.weather_code, ForecastVariablesEnum.temperature_2m],
            current: [
                ForecastVariablesEnum.weather_code,
                ForecastVariablesEnum.temperature_2m,
                ForecastVariablesEnum.apparent_temperature,
                ForecastVariablesEnum.wind_speed_10m,
                ForecastVariablesEnum.relative_humidity_2m,
                ForecastVariablesEnum.precipitation,
            ],
            temperature_unit,
            wind_speed_unit,
            precipitation_unit,
        };
        const url = "https://api.open-meteo.com/v1/forecast";

        return from(fetchWeatherApi(url, params))
            .pipe(
                shareReplay(1),
                map(data => this.transformWeatherApiToForecast(data[0], params)),
                tap(transformedData => {
                    this.#weatherState.set(transformedData)
                })
            )
    }

    transformWeatherApiToForecast(weatherApi: WeatherApiResponse, params: ForecastParams): WeatherForecast {
        const utcOffsetSeconds = weatherApi.utcOffsetSeconds();

        return {
            daily: this.getDailyForecast(weatherApi.daily(), utcOffsetSeconds, params),
            hourly: this.getHourlyForecast(weatherApi.hourly(), utcOffsetSeconds, params),
            current: this.getCurrentForecast(weatherApi.current(), utcOffsetSeconds, params)
        };
    }

    getDailyForecast(weatherApi: VariablesWithTime | null, utcOffsetSeconds: number, params: ForecastParams): DailyForecast {
        return {
            [ForecastVariablesEnum.temperature_2m_mean]: this.getVariableValueArray(weatherApi, params, 'daily', ForecastVariablesEnum.temperature_2m_mean),
            [ForecastVariablesEnum.temperature_2m_min]: this.getVariableValueArray(weatherApi, params, 'daily', ForecastVariablesEnum.temperature_2m_min),
            [ForecastVariablesEnum.temperature_2m_max]: this.getVariableValueArray(weatherApi, params, 'daily', ForecastVariablesEnum.temperature_2m_max),
            [ForecastVariablesEnum.weather_code]: this.getVariableValueArray(weatherApi, params, 'daily', ForecastVariablesEnum.weather_code),
            [ForecastVariablesEnum.time]: this.getTimeArray(weatherApi, utcOffsetSeconds)
        }
    }

    getCurrentForecast(weatherApi: VariablesWithTime | null, utcOffsetSeconds: number, params: ForecastParams): CurrentForecast {
        return {
            [ForecastVariablesEnum.temperature_2m]: this.getVariableValue(weatherApi, params, 'current', ForecastVariablesEnum.temperature_2m),
            [ForecastVariablesEnum.weather_code]: this.getVariableValue(weatherApi, params, 'current', ForecastVariablesEnum.weather_code),
            [ForecastVariablesEnum.time]: this.getTimeSingle(weatherApi, utcOffsetSeconds),
            [ForecastVariablesEnum.apparent_temperature]: this.getVariableValue(weatherApi, params, 'current', ForecastVariablesEnum.apparent_temperature),
            [ForecastVariablesEnum.relative_humidity_2m]: this.getVariableValue(weatherApi, params, 'current', ForecastVariablesEnum.relative_humidity_2m),
            [ForecastVariablesEnum.wind_speed_10m]: this.getVariableValue(weatherApi, params, 'current', ForecastVariablesEnum.wind_speed_10m),
            [ForecastVariablesEnum.precipitation]: this.getVariableValue(weatherApi, params, 'current', ForecastVariablesEnum.precipitation)
        }
    }

    getHourlyForecast(weatherApi: VariablesWithTime | null, utcOffsetSeconds: number, params: ForecastParams): HourlyForecast {
        return {
            [ForecastVariablesEnum.temperature_2m]: this.getVariableValueArray(weatherApi, params, 'hourly', ForecastVariablesEnum.temperature_2m),
            [ForecastVariablesEnum.weather_code]: this.getVariableValueArray(weatherApi, params, 'hourly', ForecastVariablesEnum.weather_code),
            [ForecastVariablesEnum.time]: this.getTimeArray(weatherApi, utcOffsetSeconds)
        }
    }

    getVariableValue(weatherApi: VariablesWithTime | null, params: ForecastParams, paramKey: ForecastParamsArrayKeys, variable: ForecastVariablesEnum): number | null {
        const index = this.getVariableIndex(params, paramKey, variable);
        if (index === undefined || index === -1) return null;

        const variables = weatherApi?.variables(index)

        return variables?.value() ? MathUtils.roundToNearestInteger(variables.value()) : null;
    }

    getVariableValueArray(
        weatherApi: VariablesWithTime | null,
        params: ForecastParams,
        paramKey: ForecastParamsArrayKeys,
        variable: ForecastVariablesEnum
    ): number[] {
        const index = this.getVariableIndex(params, paramKey, variable);
        if (index === undefined || index === -1) return [];

        const values = weatherApi?.variables(index)?.valuesArray();
        if (!values) return [];

        const toNumbers = Array.from(values, value => Number(value));
        return MathUtils.roundArray(toNumbers);
    }

    getVariableIndex(params: ForecastParams, paramKey: ForecastParamsArrayKeys, variable: ForecastVariablesEnum): number | undefined {
        return params[paramKey]?.findIndex(v => v === variable)
    }

    getTimeSingle(weatherApi: VariablesWithTime | null, utcOffsetSeconds: number): Date | null {
        if (!weatherApi) return null;

        return new Date((Number(weatherApi.time()) + utcOffsetSeconds) * 1000)
    }

    getTimeArray(weatherApi: VariablesWithTime | null, utcOffsetSeconds: number): Date[] | null {
        if (!weatherApi) return null;

        return Array.from(
            {length: (Number(weatherApi.timeEnd()) - Number(weatherApi.time())) / weatherApi.interval()},
            (_, i) => new Date((Number(weatherApi.time()) + i * weatherApi.interval() + utcOffsetSeconds) * 1000)
        )
    }

}
