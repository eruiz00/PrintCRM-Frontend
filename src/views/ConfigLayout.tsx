import { ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslate } from "react-admin";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import WorkIcon from "@mui/icons-material/Work";

/**
 * Enlaces del panel lateral de configuración.
 * Cada vez que se añada una nueva sección basta con meter
 * una entrada aquí y una <Route> hija correspondiente en App.tsx.
 */
type ConfigLink = {
    to: string;
    labelKey: string;
    icon: ReactNode;
};

const CONFIG_LINKS: ConfigLink[] = [
    { to: "sistema", labelKey: "config.systems", icon: <StorageIcon /> },
    { to: "tipotrabajo", labelKey: "config.work_types", icon: <WorkIcon /> },
];

/**
 * Layout de /configuracion.
 *   - Izquierda: listado de enlaces a cada sub-sección.
 *   - Derecha: <Outlet/> con el contenido de la ruta hija.
 */
export const ConfigLayout = () => {
    const translate = useTranslate();
    return (
    <Box sx={{ display: "flex", gap: 2, minHeight: "75vh", mt: 1 }}>
        {/* ---------- Sub-nav izquierda ---------- */}
        <Paper
            elevation={0}
            sx={{
                width: 240,
                flexShrink: 0,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                alignSelf: "flex-start",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1.5,
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                <SettingsIcon fontSize="small" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {translate("config.title")}
                </Typography>
            </Box>

            <List disablePadding>
                {CONFIG_LINKS.map((link) => (
                    <ListItemButton
                        key={link.to}
                        component={NavLink}
                        to={link.to}
                        end
                        sx={{
                            py: 1,
                            "&.active": {
                                backgroundColor: "action.selected",
                                borderLeft: "3px solid",
                                borderLeftColor: "primary.main",
                                "& .MuiListItemText-primary": {
                                    fontWeight: 700,
                                    color: "primary.main",
                                },
                                "& .MuiListItemIcon-root": {
                                    color: "primary.main",
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            {link.icon}
                        </ListItemIcon>
                        <ListItemText primary={translate(link.labelKey)} />
                    </ListItemButton>
                ))}
            </List>
        </Paper>

        {/* ---------- Contenido derecha ---------- */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Outlet />
        </Box>
    </Box>
    );
};

/**
 * Contenido por defecto cuando se entra a /configuracion
 * sin ninguna sub-sección seleccionada.
 */
export const ConfigIndex = () => {
    const translate = useTranslate();
    return (
    <Paper
        elevation={0}
        sx={{
            p: 4,
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            textAlign: "center",
            color: "text.secondary",
        }}
    >
        <Typography variant="body1">
            {translate("config.pick_section")}
        </Typography>
    </Paper>
    );
};
