import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService, ThemeType, PaletteType } from '../../core/theme';

@Component({
  selector: 'app-theme-picker',
  imports: [],
  templateUrl: './theme-picker.html',
  styleUrl: './theme-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePicker {
  protected readonly theme = inject(ThemeService);

  protected setTheme(theme: ThemeType): void {
    this.theme.setTheme(theme);
  }

  protected setPalette(palette: PaletteType): void {
    this.theme.setPalette(palette);
  }
}
