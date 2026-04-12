// src/theme.ts
import { deepmerge } from '@mui/utils';
import { defaultLightTheme, defaultDarkTheme } from 'react-admin';
import { ThemeOptions } from '@mui/material/styles';

//
// ─────────────────────────────────────────────────────────────
//   TEMA CLARO — sidebar NEGRA
// ─────────────────────────────────────────────────────────────
//
export const solprintTheme: ThemeOptions = deepmerge(defaultLightTheme, {
    palette: {
        mode: 'light',
        primary: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
            contrastText: '#0f172a',
        },
        secondary: {
            main: '#1e2937',
            contrastText: '#f1f5f9',
        },
        background: {
            default: '#f0f2f6',
            paper: '#ffffff',
        },
        text: {
            primary: '#0d1117',
            secondary: '#3a4558',
        },
        divider: '#e2e6ed',
    },

    typography: {
        fontFamily: "'DM Sans', system-ui, sans-serif",
        h6: { fontWeight: 600 },
        body1: { fontSize: '13.5px' },
        button: { fontWeight: 600, textTransform: 'none' },
    },

    sidebar: {
        width: 262,
        closedWidth: 52,
    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: '#0d1117',
                    borderBottom: '1px solid #e2e6ed',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                },
            },
        },

        //
        //  SIDEBAR NEGRA
        //
        RaSidebar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0b0e17 !important',
                },
                paper: {
                    backgroundColor: '#0b0e17 !important',
                    color: '#7a8aa8',
                    borderRight: 'none',
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#0b0e17 !important',
                    color: '#7a8aa8',
                    borderRight: 'none',
                },
            },
        },

        //
        //  ITEM ACTIVO DEL MENÚ (RaMenuItemLink)
        //
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    '&.RaMenuItemLink-active': {
                        backgroundColor: 'rgba(245, 158, 11, 0.12)',
                        borderLeft: '3px solid #f59e0b',
                        color: '#f59e0b',
                        fontWeight: 700,

                        '& .MuiTypography-root': {
                            color: '#f59e0b',
                            fontWeight: 700,
                        },

                        '& .MuiListItemIcon-root': {
                            color: '#f59e0b',
                        },
                    },
                },
            },
        },

        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f8fafc',
                    '&:hover': { backgroundColor: '#f1f5f9' },
                    '&.Mui-focused': {
                        backgroundColor: '#ffffff',
                        borderColor: '#f59e0b',
                    },
                },
            },
        },

        RaToolbar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f8fafc',
                    borderTop: '1px solid #e2e6ed',
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    '&:hover': { filter: 'brightness(1.08)' },
                },
            },
        },
    },
});


//
// ─────────────────────────────────────────────────────────────
//   TEMA OSCURO — sidebar CLARA
// ─────────────────────────────────────────────────────────────
//
export const solprintDarkTheme: ThemeOptions = deepmerge(defaultDarkTheme, {
    palette: {
        mode: 'dark',
        primary: {
            main: '#fbbf24',
            light: '#fcd34d',
            dark: '#d97706',
        },
        background: {
            default: '#0b0e17',
            paper: '#141824',
        },
        text: {
            primary: '#e2e8f0',
            secondary: '#94a3b8',
        },
        divider: '#1e2937',
    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#141824',
                    borderBottom: '1px solid #1e2937',
                },
            },
        },

        //
        //  SIDEBAR CLARA
        //
        RaSidebar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f8fafc !important',
                },
                paper: {
                    backgroundColor: '#f8fafc !important',
                    color: '#1e293b',
                    borderRight: 'none',
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#f8fafc !important',
                    color: '#1e293b',
                    borderRight: 'none',
                },
            },
        },

        //
        //  ITEM ACTIVO DEL MENÚ (RaMenuItemLink)
        //
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    '&.RaMenuItemLink-active': {
                        backgroundColor: 'rgba(245, 158, 11, 0.12)',
                        borderLeft: '3px solid #f59e0b',
                        color: '#f59e0b',
                        fontWeight: 700,

                        '& .MuiTypography-root': {
                            color: '#f59e0b',
                            fontWeight: 700,
                        },

                        '& .MuiListItemIcon-root': {
                            color: '#f59e0b',
                        },
                    },
                },
            },
        },

        RaToolbar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1b2238',
                },
            },
        },
    },
});
