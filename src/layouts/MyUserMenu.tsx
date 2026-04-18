import { UserMenu, MenuItemLink, useGetIdentity, Logout, useTranslate } from "react-admin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const MyUserMenu = () => {
  const { data: identity } = useGetIdentity();
  const translate = useTranslate();

  return (
    <UserMenu icon={<AccountCircleIcon />}>
      <MenuItemLink
        to="/profile"
        primaryText={identity?.name || translate("menu.my_profile")}
        leftIcon={<AccountCircleIcon />}
      />
      <Logout />
    </UserMenu>
  );
};
  