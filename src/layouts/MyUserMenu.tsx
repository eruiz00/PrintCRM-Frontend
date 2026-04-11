import { UserMenu, MenuItemLink, useGetIdentity, Logout } from "react-admin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const MyUserMenu = () => {
  const { data: identity } = useGetIdentity();

  return (
    <UserMenu icon={<AccountCircleIcon />}>
      <MenuItemLink
        to="/profile"
        primaryText={identity?.name || "Mi perfil"}
        leftIcon={<AccountCircleIcon />}
      />

      <Logout />
    </UserMenu>
  );
};
