import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
    selector: 'app-card',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <section class="card"
                 [class.card--no-padding]="noPadding()"
                 [style.padding]="padding()"
                 [style.border-radius]="borderRadius()"
                 role="group" aria-label="card">
            <ng-content></ng-content>
        </section>
    `,
    styles: [`
      :host {
        display: block;
        width: 100%;
      }

      .card {
        position: relative;
        display: block;
        padding: var(--spacing-4);
        border: 2px solid var(--color-borde-tertiary);
        border-radius: var(--border-radius-sm);
        background: var(--color-background-secondary);
        overflow: hidden;

        &--no-padding {
          padding: 0;
        }
      }
    `],
    host: {'class': 'app-card'}
})
export class Card {
    noPadding = input(false);
    borderRadius = input<string>('var(--border-radius-sm)');
    padding = input<string>('var(--spacing-4)');
}
