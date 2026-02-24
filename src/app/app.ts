import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from "./features/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <div class="app-container">
      <div class="app__header">
        <app-header></app-header>
      </div>
      <main class="app__main">
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    @use 'mixins/responsive.mixins' as responsive;
    
    .app-container {
      min-height: 100vh;
      background-color: var(--color-background);
      color: var(--color-text-primary);
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    .app {
      &__header, &__main {
        width: 100%;
        padding: var(--spacing-8) var(--spacing-16);

        @include responsive.responsive_until('sm') {
          padding: var(--spacing-2) var(--spacing-8);
        }

        @include responsive.responsive_until('xs') {
          padding: var(--spacing-4) var(--spacing-4);
        }
      }
    }
  `,
})
export class App {}
