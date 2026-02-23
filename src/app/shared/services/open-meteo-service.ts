import {Injectable} from '@angular/core';
import {fetchWeatherApi} from "openmeteo";
import {BehaviorSubject, from, map, Observable, shareReplay, tap} from "rxjs";
import {WeatherApiResponse} from "@openmeteo/sdk/weather-api-response";


@Injectable({
    providedIn: 'root',
})
export class OpenMeteoService {
    #weatherState = new BehaviorSubject<WeatherApiResponse | undefined>(undefined);
    weatherState = this.#weatherState.asObservable().pipe(shareReplay(1));

    getWeather(): Observable<WeatherApiResponse> {
        const params = {
            latitude: 52.52,
            longitude: 13.41,
            hourly: ["temperature_2m", "weather_code"],
        };
        const url = "https://api.open-meteo.com/v1/forecast";

        return from(fetchWeatherApi(url, params))
            .pipe(
                shareReplay({bufferSize:1, refCount: true}),
                map(data=> data[0]),
                tap(transformedData => {
                    this.#weatherState.next(transformedData)
                })
            )
    }

}
