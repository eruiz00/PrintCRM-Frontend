import { useState } from "react";
import { Menu, MenuItemLink, useTranslate } from "react-admin";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import BuildIcon from "@mui/icons-material/Build";
import StorageIcon from "@mui/icons-material/Storage";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleIcon from "@mui/icons-material/People";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from '@mui/icons-material/Dashboard';

export const MyMenu = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const translate = useTranslate();

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <Menu>

      {/* DASHBOARD */}
      <List component="div" disablePadding>
        <MenuItemLink to="/dashboard" primaryText={translate("menu.dashboard")} leftIcon={<DashboardIcon />} />
      </List>

      {/* CONFIGURACIÓN — enlace único a /configuracion, la sub-navegación
          (Sistemas, Tipos de trabajo, …) se muestra dentro de esa vista. */}
      <List component="div" disablePadding>
        <MenuItemLink
          to="/configuracion"
          primaryText={translate("menu.config")}
          leftIcon={<SettingsIcon />}
        />
      </List>

      {/* ADMINISTRACIÓN */}
      <ListItemButton onClick={() => toggle("admin")}>
        <ListItemIcon>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary={translate("menu.admin")} />
        {openSection === "admin" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openSection === "admin"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink to="/empleado" primaryText={translate("menu.employees")} leftIcon={<EngineeringIcon />} />
        </List>
      </Collapse>

      {/* CRM */}
      <ListItemButton onClick={() => toggle("crm")}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary={translate("menu.relations")} />
        {openSection === "crm" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openSection === "crm"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink to="/cliente" primaryText={translate("menu.clients")} leftIcon={<PeopleIcon />} />
        </List>
      </Collapse>

      {/* PRODUCCIÓN */}
      <ListItemButton onClick={() => toggle("produccion")}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary={translate("menu.production")} />
        {openSection === "produccion" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openSection === "produccion"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink to="/presupuesto" primaryText={translate("menu.estimates")} leftIcon={<DesignServicesIcon />} />
        </List>
      </Collapse>

      {/* REPORTES */}
      <ListItemButton onClick={() => toggle("reportes")}>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary={translate("menu.reports")} />
        {openSection === "reportes" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openSection === "reportes"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink to="/reportes/diario" primaryText={translate("menu.daily")} />
          <MenuItemLink to="/reportes/semanal" primaryText={translate("menu.weekly")} />
          <MenuItemLink to="/reportes/mensual" primaryText={translate("menu.monthly")} />
        </List>
      </Collapse>
    </Menu>
  );
};
