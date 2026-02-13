export type ThemeType = 'dark' | 'light';
export type PaletteType = 'default' | 'peach' | 'summer';

export interface ThemeConfig {
  theme: ThemeType;
  palette: PaletteType;
}

export interface ThemeStorageKeys {
  theme: string;
  palette: string;
}

