import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
    selector: 'app-card',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <section class="card"
                 [class.card--no-padding]="noPadding()"
                 [style.border-radius]="borderRadius()"
                 role="group" aria-label="card">
            <ng-content></ng-content>
        </section>
    `,
    styles: [`
      .card {
        display: block;
        padding: var(--spacing-8);
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
    borderRadius = input<string>('--border-radius-sm');
}
