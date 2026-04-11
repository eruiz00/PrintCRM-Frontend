import { LayoutProps, Layout, Notification } from "react-admin";
import { MyAppBar } from "./MyAppBar";
import { MyMenu } from "./MyMenu";

export const MyLayout = (props: LayoutProps) => (
  <Layout
    {...props}
    menu={MyMenu}
    appBar={MyAppBar}
    sx={{
      "& .RaLayout-content": {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3
      },
    }}
  />
);
