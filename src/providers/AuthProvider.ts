import { AuthProvider } from "react-admin";

interface LoginParams {
    username: string;
    password: string;
    sistema: string;
}

export const authProvider: AuthProvider = {
    login: async ({ username, password, sistema }: LoginParams) => {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, sistema }),
        });

        if (!response.ok) {
            throw new Error("Credenciales incorrectas");
        }

        const data: { token: string } = await response.json();
        localStorage.setItem("token", data.token);

        return Promise.resolve();
    },

    logout: () => {
        localStorage.removeItem("token");
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem("token")
            ? Promise.resolve()
            : Promise.reject();
    },

    checkError: (error: { status?: number }) => {
        if (error.status === 401 || error.status === 403) {
            localStorage.removeItem("token");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getIdentity: () => {
        return Promise.resolve({
            id: "user",
            fullName: "Usuario",
        });
    },

    getPermissions: () => Promise.resolve(),
};
