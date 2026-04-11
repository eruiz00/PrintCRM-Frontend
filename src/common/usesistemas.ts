// useSistemas.ts
import { useEffect, useState } from "react";
import { Sistema } from "./types";

interface UseSistemasResult {
    choices: { id: number; name: string }[];
    loading: boolean;
    error: boolean;
}

export const useSistemas = (): UseSistemasResult => {
    const [choices, setChoices] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/public/sistemas")
            .then(res => {
                if (!res.ok) throw new Error("Error al cargar sistemas");
                return res.json();
            })
            .then((data: Sistema[]) => {
                setChoices(
                    data.map(s => ({
                        id: s.id,
                        name: s.nombre
                    }))
                );
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    return { choices, loading, error };
};
