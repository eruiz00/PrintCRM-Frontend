import { useState } from "react";
import { Menu, MenuItemLink } from "react-admin";
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
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from "@mui/icons-material/People";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const MyMenu = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <Menu>

      {/* CONFIGURACIÓN */}
      <ListItemButton onClick={() => toggle("config")}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configuración" />
        {openSection === "config" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton> 

      <Collapse in={openSection === "config"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink to="/sistema" primaryText="Sistemas" leftIcon={<StorageIcon />} />
          <MenuItemLink to="/tipotrabajo" primaryText="Tipos de trabajo" leftIcon={<WorkIcon />} />
        </List>
      </Collapse>

      {/* ADMINISTRACIÓN */}
      <ListItemButton onClick={() => toggle("admin")}>
        <ListItemIcon>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Administración" />
        {openSection === "admin" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openSection === "admin"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink to="/users" primaryText="Agentes" leftIcon={<EngineeringIcon />} />
        </List>
      </Collapse>

      {/* CRM */}
      <ListItemButton onClick={() => toggle("crm")}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Relaciones" />
        {openSection === "crm" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openSection === "crm"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink to="/clientes" primaryText="Clientes" leftIcon={<PeopleIcon />} />
        </List>
      </Collapse>

      {/* PRODUCCIÓN */}
      <ListItemButton onClick={() => toggle("produccion")}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Producción" />
        {openSection === "produccion" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openSection === "produccion"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink to="/presupuesto" primaryText="Presupuestos" leftIcon={<DesignServicesIcon />} />
        </List>
      </Collapse>

      {/* REPORTES */}
      <ListItemButton onClick={() => toggle("reportes")}>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Reportes" />
        {openSection === "reportes" ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openSection === "reportes"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItemLink to="/reportes/diario" primaryText="Diario" />
          <MenuItemLink to="/reportes/mensual" primaryText="Mensual" />
        </List>
      </Collapse>

    </Menu>
  );
};
