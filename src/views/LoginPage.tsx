// LoginPage.tsx
import { Login, LoginForm, TextInput, SelectInput } from "react-admin";
import { useSistemas } from "../common/usesistemas";

const CustomLoginForm = () => {
    const { choices, loading, error } = useSistemas();

    return (
        <LoginForm>
            <TextInput
                source="username"
                label="Usuario"
                fullWidth
            />

            <TextInput
                source="password"
                label="Contraseña"
                type="password"
                fullWidth
            />

            <SelectInput
                source="sistema"
                label="Sistema"
                choices={choices}
                fullWidth
                disabled={loading || error}
            />

            {error && (
                <p style={{ color: "red" }}>
                    Error cargando sistemas
                </p>
            )}
        </LoginForm>
    );
};

export const CustomLoginPage = () => (
    <Login>
        <CustomLoginForm />
    </Login>
);
