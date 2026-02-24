import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IpLocation} from "../interfaces/ip-location-interfaces";
import {Observable, take, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class GeolocationService {
    private readonly https = inject(HttpClient);

    readonly #ipLocation = signal<IpLocation>(<IpLocation>{});
    readonly ipLocation = computed(() => this.#ipLocation());

    #geolocationPosition = signal<GeolocationPosition>(<GeolocationPosition>{});
    geolocationPosition = computed(() => this.#geolocationPosition())

    private permissionStatus: PermissionStatus | null = null;

    init(): Observable<IpLocation> {
        void this.bindPermissionListener();

        return this.https.get<IpLocation>(environment.ipAPI)
            .pipe(
                take(1),
                tap((location) => {
                    this.#ipLocation.set(location);
                    this.mapIPLocationToGeolocation(location);
                    this.requestPosition();
                })
            )
    }

    mapIPLocationToGeolocation(ipLocation: IpLocation) {
        this.#geolocationPosition.set(
            {
                coords: {
                    latitude: ipLocation.lat,
                    longitude: ipLocation.lon
                }
            } as GeolocationPosition
        )
    }

    private async bindPermissionListener(): Promise<void> {
        if (!('permissions' in navigator)) {
            this.requestPosition();
            return;
        }

        try {
            this.permissionStatus = await navigator.permissions.query({name: 'geolocation'} as PermissionDescriptor);
            this.permissionStatus.onchange = () => {
                if (this.permissionStatus?.state === 'granted') {
                    this.requestPosition();
                }
            };
        } catch {
            this.requestPosition();
        }
    }

    requestPosition(): void {
        if (!('geolocation' in navigator)) return;

        navigator.geolocation.getCurrentPosition((location) => {
            console.log(location)
            this.#geolocationPosition.set(location);
        });
    }
}

export function geolocationFactory() {
    const geolocationService = inject(GeolocationService);

    return geolocationService.init();
}
