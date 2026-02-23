import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-card',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <section class="card" role="group" aria-label="card">
            <ng-content></ng-content>
        </section>
    `,
    styles: [`
      .card {
        display: block;
        padding: var(--spacing-8);
        border-radius: var(--border-radius-sm);
        background: var(--color-background-secondary);
      }
    `],
    host: {'class': 'app-card'}
})
export class Card {

}
