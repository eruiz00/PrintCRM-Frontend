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
            default: '#e6eaf2',
            paper: '#ffffff',
        },
        text: {
            primary: '#0d1117',
            secondary: '#27364d',
        },
        divider: '#b7c1d1',
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
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit !important',
                    minWidth: 32,
                },
            },
        },

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

        // ==================== SIDEBAR NEGRA ====================
        RaSidebar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0b0e17 !important',
                },
                fixed: {
                    height: '100vh !important',
                    minHeight: '100vh !important',
                    position: 'sticky',
                    top: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1200,
                },
                paper: {
                    backgroundColor: '#0b0e17 !important',
                    color: '#7a8aa8 !important',
                    borderRight: 'none',
                    height: '100vh !important',
                    minHeight: '100vh !important',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#0b0e17 !important',
                    color: '#7a8aa8 !important',
                    borderRight: 'none',
                    height: '100vh !important',
                    minHeight: '100vh !important',
                    display: 'flex',
                    flexDirection: 'column',
                },
            },
        },

        RaLayout: {
            styleOverrides: {
                root: {
                    '& .RaSidebar-fixed': {
                        backgroundColor: '#0b0e17 !important',
                        height: '100% !important',
                        minHeight: '100vh !important',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                },
            },
        },

        // ITEM ACTIVO DEL MENÚ
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    '&.RaMenuItemLink-active, &.Mui-selected': {
                        backgroundColor: 'rgba(245, 158, 11, 0.12)',
                        borderLeft: '3px solid #f59e0b',
                        color: '#f59e0b',
                        fontWeight: 700,

                        '& .MuiTypography-root': {
                            color: '#f59e0b',
                            fontWeight: 700,
                        },

                        '& .MuiListItemIcon-root': {
                            color: '#f59e0b !important',
                        },
                    },
                },
            },
        },

        RaDashboardMenuItem: {
            styleOverrides: {
                root: {
                    '& .MuiListItemIcon-root': {
                        color: 'inherit !important',
                    },
                },
            },
        },

        // Inputs "filled" (react-admin TextInput / NumberInput / SelectInput…).
        // Usamos box-shadow inset (NO border) para no cambiar la altura
        // del control y no descolocar la label flotante.
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    borderRadius: 6,
                    boxShadow: 'inset 0 0 0 1px #94a3b8',
                    transition:
                        'background-color 120ms ease, box-shadow 120ms ease',
                    '&:hover': {
                        backgroundColor: '#f4f6fa',
                        boxShadow: 'inset 0 0 0 1px #64748b',
                    },
                    '&.Mui-focused': {
                        backgroundColor: '#ffffff',
                        boxShadow: 'inset 0 0 0 2px #f59e0b',
                    },
                    '&.Mui-error': {
                        boxShadow: 'inset 0 0 0 1px #dc2626',
                    },
                    // Quita la barra inferior "underline" de la variante filled
                    '&:before, &:after': { display: 'none' },
                },
            },
        },

        // Inputs "outlined" (MUI TextField con variant="outlined",
        // como el buscador del modal de papel). Tocamos sólo el color
        // del notchedOutline y el radio; el border lo pinta el propio
        // fieldset, así que no altera el tamaño.
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#94a3b8',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#64748b',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#f59e0b',
                        borderWidth: 2,
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

        // Fondo grisáceo para el Datagrid (listas de presupuestos, sistemas…)
        RaDatagrid: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f4f6f9',
                },
            },
        },

        // Línea entre filas muy fina y apenas perceptible.
        // Sólo tocamos el color; el grosor (1px solid) lo aplica MUI.
        MuiTableCell: {
            styleOverrides: {
                body: {
                    borderBottomColor: '#e4e7ec',
                },
            },
        },
    },
});


//
// ─────────────────────────────────────────────────────────────
//   TEMA OSCURO — igual que el claro, pero con colores oscuros
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
            paper: '#1a2032',
        },
        text: {
            primary: '#f1f5f9',
            secondary: '#b7c3d6',
        },
        divider: '#3a4660',
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
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit !important',
                    minWidth: 32,
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#141824',
                    borderBottom: '1px solid #1e2937',
                },
            },
        },

        // ==================== SIDEBAR OSCURA SUAVE ====================
        RaSidebar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1a1f2b !important',
                },
                fixed: {
                    height: '100vh !important',
                    minHeight: '100vh !important',
                    position: 'sticky',
                    top: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1200,
                },
                paper: {
                    backgroundColor: '#1a1f2b !important',
                    color: '#cbd5e1 !important',
                    borderRight: 'none',
                    height: '100vh !important',
                    minHeight: '100vh !important',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1a1f2b !important',
                    color: '#cbd5e1 !important',
                    borderRight: 'none',
                    height: '100vh !important',
                    minHeight: '100vh !important',
                    display: 'flex',
                    flexDirection: 'column',
                },
            },
        },

        RaLayout: {
            styleOverrides: {
                root: {
                    '& .RaSidebar-fixed': {
                        backgroundColor: '#1a1f2b !important',
                        height: '100vh !important',
                        minHeight: '100vh !important',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                },
            },
        },

        // ITEM ACTIVO DEL MENÚ
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    '&.RaMenuItemLink-active, &.Mui-selected': {
                        backgroundColor: 'rgba(245, 158, 11, 0.12)',
                        borderLeft: '3px solid #f59e0b',
                        color: '#f59e0b',
                        fontWeight: 700,

                        '& .MuiTypography-root': {
                            color: '#f59e0b',
                            fontWeight: 700,
                        },

                        '& .MuiListItemIcon-root': {
                            color: '#f59e0b !important',
                        },
                    },
                },
            },
        },

        RaDashboardMenuItem: {
            styleOverrides: {
                root: {
                    '& .MuiListItemIcon-root': {
                        color: 'inherit !important',
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

        // Inputs "filled": borde pintado con box-shadow inset
        // para no alterar la altura del control.
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1c2233',
                    borderRadius: 6,
                    boxShadow: 'inset 0 0 0 1px #4a5876',
                    transition:
                        'background-color 120ms ease, box-shadow 120ms ease',
                    '&:hover': {
                        backgroundColor: '#1f273b',
                        boxShadow: 'inset 0 0 0 1px #6b7a99',
                    },
                    '&.Mui-focused': {
                        backgroundColor: '#1f273b',
                        boxShadow: 'inset 0 0 0 2px #fbbf24',
                    },
                    '&.Mui-error': {
                        boxShadow: 'inset 0 0 0 1px #ef4444',
                    },
                    '&:before, &:after': { display: 'none' },
                },
            },
        },

        // Inputs "outlined": sólo color del notchedOutline y radio.
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4a5876',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6b7a99',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#fbbf24',
                        borderWidth: 2,
                    },
                },
            },
        },

        // Fondo grisáceo para el Datagrid.
        RaDatagrid: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1d2438',
                },
            },
        },

        // Línea entre filas muy fina y apenas perceptible.
        MuiTableCell: {
            styleOverrides: {
                body: {
                    borderBottomColor: '#2a334b',
                },
            },
        },
    },
});
