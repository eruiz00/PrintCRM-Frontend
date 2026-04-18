import { AppBar, useTranslate } from "react-admin";
import { Typography } from "@mui/material";
import { MyUserMenu } from "./MyUserMenu";
import { AppBarToolbar } from "./AppBarToolbar";

export const MyAppBar = () => {
  const translate = useTranslate();
  return (
    <AppBar toolbar={<AppBarToolbar />} userMenu={<MyUserMenu />}>
      <Typography
        variant="h6"
        color="inherit"
        sx={{ flex: 1, fontWeight: 600 }}
      >
        {translate("app.title")}
      </Typography>
    </AppBar>
  );
};
