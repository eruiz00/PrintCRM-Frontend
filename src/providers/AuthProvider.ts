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
        const token = localStorage.getItem("token");
        if (!token) {
            return Promise.reject();
        }
        try {
            // Decodifica el payload del JWT (parte central, base64-url)
            const base64 = token
                .split(".")[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/");
            const json = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
                    .join("")
            );
            const payload: any = JSON.parse(json);

            // El backend mete el id del empleado en `usuario` (ver JWT emitido
            // por /login). Probamos varias convenciones por robustez.
            const id =
                payload.empleadoid ??
                payload.empleado_id ??
                payload.id ??
                payload.usuario ??
                payload.user_id ??
                payload.uid ??
                "user";

            // El username va normalmente en `sub`.
            const username = payload.username ?? payload.sub;

            const fullName =
                payload.nombre ??
                payload.fullName ??
                payload.name ??
                username ??
                "Usuario";

            return Promise.resolve({
                id,
                fullName,
                username,
                sistema: payload.sistema ?? payload.sistemaid,
            });
        } catch {
            return Promise.resolve({ id: "user", fullName: "Usuario" });
        }
    },

    getPermissions: () => Promise.resolve(),
};
