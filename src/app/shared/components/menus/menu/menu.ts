import {Component, computed, contentChild, inject, input, OnInit, signal, TemplateRef, viewChild} from '@angular/core';
import {MenuItem} from "../interfaces/menu-item";
import {NgTemplateOutlet} from "@angular/common";
import {MenuOverlayService} from "./menu-overlay-service";

@Component({
    selector: 'app-menu',
    imports: [
        NgTemplateOutlet
    ],
    providers: [MenuOverlayService],
    template: `
        @if (!popup()) {
            <ng-container *ngTemplateOutlet="menuTemplateRef"></ng-container>/
        }
        <ng-template #menuTemplateRef>
            <div class="menu">
                <div class="menu__content">
                    @for (item of menuItems(); track item) {
                        <div class="menu__item">
                            {{ item.label }}
                        </div>
                    }
                </div>
            </div>
        </ng-template>
    `,
    styleUrl: './menu.scss',
    standalone: true
})
export class Menu implements OnInit {
    private readonly menuOverlayService = inject(MenuOverlayService, {self: true});
    private readonly menuTemplate = viewChild.required<TemplateRef<unknown>>("menuTemplateRef")
    readonly customTemplate = contentChild<TemplateRef<unknown>>("menuItemTemplate");

    menuItems = input<MenuItem[]>([]);
    popup = input<boolean>(false);

    show = signal<boolean>(false);

    activeTemplate = computed(() => {
        return this.customTemplate() ?? this.menuTemplate()
    })

    ngOnInit() {
        this.setInitialShowValue();
    }

    setInitialShowValue() {
        if (!this.popup()) this.show.set(true)
    }

    toggle(event?: Event): void {
        const popup = this.popup();
        const show = this.show();

        if (popup) {
            if (event) {
                show ? this.hideOverlay() : this.showOverlay(event);
            }
            return;
        } else this.show.update(v => !v);
    }

    private showOverlay(event: Event) {
        this.menuOverlayService.showOverlay(event, this.activeTemplate());
        this.show.set(true);
    }

    private hideOverlay() {
        this.menuOverlayService.hideOverlay()
        this.show.set(false);
    }
}
