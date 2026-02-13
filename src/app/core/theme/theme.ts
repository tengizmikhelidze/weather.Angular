import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeType, PaletteType, ThemeStorageKeys } from './theme.types';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKeys: ThemeStorageKeys = {
    theme: 'app-theme',
    palette: 'app-palette',
  };

  readonly currentTheme = signal<ThemeType>(this.getInitialTheme());
  readonly currentPalette = signal<PaletteType>(this.getInitialPalette());

  constructor() {
    effect(() => {
      this.applyTheme(this.currentTheme());
    });

    effect(() => {
      this.applyPalette(this.currentPalette());
    });
  }

  setTheme(theme: ThemeType): void {
    this.currentTheme.set(theme);
    this.saveThemeToStorage(theme);
  }

  setPalette(palette: PaletteType): void {
    this.currentPalette.set(palette);
    this.savePaletteToStorage(palette);
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  private getInitialTheme(): ThemeType {
    if (!isPlatformBrowser(this.platformId)) {
      return 'dark';
    }

    const savedTheme = this.getThemeFromStorage();
    if (savedTheme) {
      return savedTheme;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (prefersDark) {
      return 'dark';
    } else if (prefersLight) {
      return 'light';
    }

    return 'dark';
  }

  private getInitialPalette(): PaletteType {
    if (!isPlatformBrowser(this.platformId)) {
      return 'default';
    }

    const savedPalette = this.getPaletteFromStorage();
    return savedPalette || 'default';
  }

  private applyTheme(theme: ThemeType): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const html = document.documentElement;
    html.classList.remove('theme-dark', 'theme-light');
    html.classList.add(`theme-${theme}`);
    html.setAttribute('data-theme', theme);
  }

  private applyPalette(palette: PaletteType): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const html = document.documentElement;
    html.classList.remove('palette-default', 'palette-peach', 'palette-summer');

    if (palette !== 'default') {
      html.classList.add(`palette-${palette}`);
    }

    html.setAttribute('data-palette', palette);
  }

  private saveThemeToStorage(theme: ThemeType): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.storageKeys.theme, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }

  private savePaletteToStorage(palette: PaletteType): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.storageKeys.palette, palette);
    } catch (error) {
      console.warn('Failed to save palette to localStorage:', error);
    }
  }

  private getThemeFromStorage(): ThemeType | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      const saved = localStorage.getItem(this.storageKeys.theme);
      if (saved && this.isValidTheme(saved)) {
        return saved as ThemeType;
      }
    } catch (error) {
      console.warn('Failed to get theme from localStorage:', error);
    }

    return null;
  }

  private getPaletteFromStorage(): PaletteType | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      const saved = localStorage.getItem(this.storageKeys.palette);
      if (saved && this.isValidPalette(saved)) {
        return saved as PaletteType;
      }
    } catch (error) {
      console.warn('Failed to get palette from localStorage:', error);
    }

    return null;
  }

  private isValidTheme(theme: string): theme is ThemeType {
    return ['dark', 'light'].includes(theme);
  }

  private isValidPalette(palette: string): palette is PaletteType {
    return ['default', 'peach', 'summer'].includes(palette);
  }
}
