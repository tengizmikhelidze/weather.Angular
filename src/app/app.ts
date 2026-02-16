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
    
    .app {
      &__header {
        width: 100%;
      }
    }
  `,
})
export class App {}
