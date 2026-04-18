// LoginPage.tsx
import { Login, LoginForm, TextInput, SelectInput, useTranslate } from "react-admin";
import { useSistemas } from "../common/usesistemas";

const CustomLoginForm = () => {
    const { choices, loading, error } = useSistemas();
    const translate = useTranslate();

    return (
        <LoginForm>
            <TextInput
                source="username"
                label={translate("login.username")}
                fullWidth
            />

            <TextInput
                source="password"
                label={translate("login.password")}
                type="password"
                fullWidth
            />

            <SelectInput
                source="sistema"
                label={translate("login.system")}
                choices={choices}
                fullWidth
                disabled={loading || error}
            />

            {error && (
                <p style={{ color: "red" }}>
                    {translate("login.error_loading_systems")}
                </p>
            )}
        </LoginForm>
    );
};

export const CustomLoginPage = (props: any) => (
    <Login {...props}>
        <CustomLoginForm />
    </Login>
);
