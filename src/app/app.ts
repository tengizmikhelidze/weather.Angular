import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <router-outlet />
    </div>
  `,
  styles: `
    .app-container {
      min-height: 100vh;
      background-color: var(--color-background);
      color: var(--color-text-primary);
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  `,
})
export class App {}
