import { useInput, useTranslate } from "react-admin";
import { Box, Button, Typography } from "@mui/material";

/////////////////////////////////////////////////////////////
// ImageBase64Input
//
// Componente compartido para campos de imagen almacenados como
// LONGBLOB en la BD.  PHP-CRUD-API devuelve/acepta el contenido
// codificado en base64 (sin el prefijo `data:xxx;base64,`), así
// que aquí:
//   - Al seleccionar un archivo lo leemos como DataURL y guardamos
//     sólo la parte base64 en el valor del formulario.
//   - Al mostrar preview, re-añadimos el prefijo para el <img>.
//
// Se usa desde varios CRUDs (TipoTrabajos, Empleado, ...).
export const ImageBase64Input = ({
    source,
    label,
    width = 260,
    height = 180,
}: {
    source: string;
    label?: string;
    width?: number;
    height?: number;
    "data-colspan"?: string;
}) => {
    const { field } = useInput({ source });
    const translate = useTranslate();
    const value: string = field.value || "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.includes(",") ? result.split(",")[1] : result;
            field.onChange(base64);
        };
        reader.readAsDataURL(file);
    };

    const previewSrc = value
        ? value.startsWith("data:")
            ? value
            : `data:image/*;base64,${value}`
        : null;

    return (
        <Box sx={{ mt: 1 }}>
            {label && (
                <Typography
                    variant="caption"
                    sx={{ display: "block", mb: 0.5, color: "text.secondary" }}
                >
                    {translate(label)}
                </Typography>
            )}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                <Box
                    sx={{
                        width,
                        height,
                        border: "1px dashed",
                        borderColor: "divider",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        backgroundColor: "background.default",
                    }}
                >
                    {previewSrc ? (
                        <Box
                            component="img"
                            src={previewSrc}
                            alt="preview"
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                            }}
                        />
                    ) : (
                        <Typography
                            variant="body2"
                            sx={{ color: "text.disabled" }}
                        >
                            {translate("image.preview_empty")}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Button variant="outlined" component="label">
                        {previewSrc
                            ? translate("image.change")
                            : translate("image.select")}
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </Button>
                    {previewSrc && (
                        <Button
                            variant="text"
                            size="small"
                            color="error"
                            onClick={() => field.onChange("")}
                        >
                            {translate("image.remove")}
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ImageBase64Input;
