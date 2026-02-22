import {inject, Injectable, signal, TemplateRef, ViewContainerRef} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef, PositionStrategy} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";

@Injectable()
export class MenuOverlayService {
    private readonly overlay = inject(Overlay);
    private readonly viewContainerRef = inject(ViewContainerRef);

    overlayRef = signal<OverlayRef | null>(null)
    show = signal<boolean>(false);

    showOverlay(event: Event, menuTemplate: TemplateRef<unknown>) {
        if (this.overlayRef()) return;

        const newOverlayRef = this.createOverlay(event);
        this.overlayRef.update(v => v ?? newOverlayRef);

        newOverlayRef.backdropClick().subscribe(() => this.hideOverlay());
        newOverlayRef.attach(new TemplatePortal(menuTemplate, this.viewContainerRef))
    }

    hideOverlay() {
        this.overlayRef()?.detach()
        this.overlayRef()?.dispose()
        this.overlayRef.set(null);
        this.show.set(false);
    }

    private createOverlay(event: Event): OverlayRef {
        return this.overlay.create(this.createOverlayConfig(event));
    }

    private createOverlayConfig(event: Event): OverlayConfig {
        return {
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.createOverlayPositionStrategy(event)
        }
    }

    private createOverlayPositionStrategy(event: Event): PositionStrategy {
        const triggerElement = event.target as HTMLElement;

        return this.overlay
            .position()
            .flexibleConnectedTo(triggerElement)
            .withPositions([
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top'
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom'
                },
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom'
                }
            ])
            .withDefaultOffsetY(8)
    }
}
