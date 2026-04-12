import {
    RaThemeOptions,
    defaultLightTheme,
    defaultDarkTheme,
    nanoDarkTheme,
    nanoLightTheme,
    radiantDarkTheme,
    radiantLightTheme,
    houseDarkTheme,
    houseLightTheme,
    bwLightTheme,
    bwDarkTheme,
} from 'react-admin';
import { solprintTheme, solprintDarkTheme } from './solprinttheme';

export type ThemeName =
    | 'B&W'
    | 'default'
    | 'nano'
    | 'radiant'
    | 'house'
    | 'solprint';

export type Theme = {
    name: ThemeName;
    light?: RaThemeOptions;
    dark?: RaThemeOptions;
    single?: RaThemeOptions;
};

const BW_SIDEBAR_OVERRIDE = {
    styleOverrides: {
        root: {
            '& .SubMenu .MuiMenuItem-root': {
                paddingLeft: 24,
            },
            '& .RaMenu-closed .SubMenu .MuiMenuItem-root': {
                paddingLeft: 8,
            },
        },
    },
};

export const themes: Theme[] = [
    { name: 'default', light: defaultLightTheme, dark: defaultDarkTheme },
    {
        name: 'B&W',
        light: {
            ...bwLightTheme,
            components: {
                ...bwLightTheme.components,
                RaSidebar: BW_SIDEBAR_OVERRIDE,
            },
        },
        dark: {
            ...bwDarkTheme,
            components: {
                ...bwDarkTheme.components,
                RaSidebar: BW_SIDEBAR_OVERRIDE,
            },
        },
    },
    { name: 'nano', light: nanoLightTheme, dark: nanoDarkTheme },
    { name: 'radiant', light: radiantLightTheme, dark: radiantDarkTheme },
    { name: 'house', light: houseLightTheme, dark: houseDarkTheme },
    { name: 'solprint', light: solprintTheme, dark: solprintDarkTheme },
];
