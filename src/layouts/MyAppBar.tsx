import { AppBar } from "react-admin";
import { Typography } from "@mui/material";
import { MyUserMenu } from "./MyUserMenu";
import { AppBarToolbar } from "./AppBarToolbar";

export const MyAppBar = () => (
  <AppBar toolbar={<AppBarToolbar />} userMenu={<MyUserMenu />}>
    <Typography
      variant="h6"
      color="inherit"
      sx={{ flex: 1, fontWeight: 600 }}
    >
      Print CRM
    </Typography>
  </AppBar>
);
