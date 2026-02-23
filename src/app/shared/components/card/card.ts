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
  styles: ``,
})
export class Card {

}
