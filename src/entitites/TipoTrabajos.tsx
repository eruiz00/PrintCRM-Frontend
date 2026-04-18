import {
    TextField,
    BooleanField,
    NumberField,
    FunctionField,
    TextInput,
    BooleanInput,
    NumberInput,
    SelectInput,
    useInput,
    useTranslate,
} from "react-admin";
import { TabbedCrudView } from "../views/TabbedCrudView";
import { SubCrudView } from "../views/SubCrudView";
import {
    PARTE_TRABAJO_CHOICES,
    PARTE_TRABAJO_MAP,
    TIPO_ASISTENTE_PRESUPUESTO_CHOICES,
    TIPO_ASISTENTE_PRESUPUESTO_MAP,
} from "../common/constants";
import { EnumField } from "../common/EnumField";
import { Box, Button, Typography } from "@mui/material";

/////////////////////////////////////////////////////////////
// ImageBase64Input
//
// El campo `imagen` de tipotrabajoimagen es longblob.  PHP-CRUD-API
// devuelve/acepta ese contenido codificado en base64 (sin el prefijo
// `data:xxx;base64,`), así que aquí:
//   - Al seleccionar un archivo lo leemos como DataURL y guardamos
//     sólo la parte base64 en el valor del formulario.
//   - Al mostrar preview, re-añadimos el prefijo para el <img>.
const ImageBase64Input = ({
    source,
    label,
}: {
    source: string;
    label?: string;
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
                        width: 260,
                        height: 180,
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

/////////////////////////////////////////////////////////////
// Helper: fecha/hora en el formato que espera MariaDB
const nowForDB = () => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return (
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
        `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    );
};

const stampFechaModificacion = (data: any) => ({
    ...data,
    fechamodificacion: nowForDB(),
});

/////////////////////////////////////////////////////////////
// MAESTRO (tipotrabajo) — columnas lista + formulario
const columns = [
    { type: TextField, props: { source: "tipotrabajo", label: "tipotrabajo.fields.tipotrabajo" } },
    {
        type: EnumField,
        props: {
            source: "asistente",
            label: "tipotrabajo.fields.asistente",
            map: TIPO_ASISTENTE_PRESUPUESTO_MAP,
        },
    },
    {
        type: TextField,
        props: { source: "descripcion", label: "tipotrabajo.fields.descripcion" },
    },
    {
        type: NumberField,
        props: { source: "descuento", label: "tipotrabajo.fields.descuento_short" },
    },
    { type: BooleanField, props: { source: "activo", label: "tipotrabajo.fields.activo" } },
    { type: BooleanField, props: { source: "original", label: "tipotrabajo.fields.original" } },
];

const form = [
    <TextInput source="tipotrabajo" label="tipotrabajo.fields.tipotrabajo" data-colspan="12" />,

    <TextInput
        source="descripcion"
        label="tipotrabajo.fields.descripcion"
        multiline
        minRows={2}
        data-colspan="12"
    />,

    <SelectInput
        source="asistente"
        label="tipotrabajo.fields.asistente"
        choices={TIPO_ASISTENTE_PRESUPUESTO_CHOICES}
        data-colspan="3"
        translateChoice
    />,
    <NumberInput source="descuento" label="tipotrabajo.fields.descuento" data-colspan="3" />,
    <BooleanInput source="activo" label="tipotrabajo.fields.activo" data-colspan="3" />,
    <BooleanInput source="original" label="tipotrabajo.fields.original" data-colspan="3" />,
];

/////////////////////////////////////////////////////////////
// SUB: IMÁGENES (tipotrabajoimagen)
const imagenColumns = [
    { type: TextField, props: { source: "id", label: "tipotrabajo.fields.id" } },
    {
        type: FunctionField,
        props: {
            source: "imagen",
            label: "tipotrabajo.fields.miniatura",
            render: (r: any) =>
                r?.imagen ? (
                    <Box
                        component="img"
                        src={
                            String(r.imagen).startsWith("data:")
                                ? r.imagen
                                : `data:image/*;base64,${r.imagen}`
                        }
                        sx={{
                            maxHeight: 50,
                            maxWidth: 80,
                            borderRadius: 1,
                            border: 1,
                            borderColor: "divider",
                        }}
                    />
                ) : null,
        },
    },
    {
        type: TextField,
        props: { source: "descripcion", label: "tipotrabajo.fields.descripcion" },
    },
    {
        type: BooleanField,
        props: { source: "pordefecto", label: "tipotrabajo.fields.pordefecto" },
    },
];

const imagenForm = [
    <TextInput
        source="descripcion"
        label="tipotrabajo.fields.descripcion"
        defaultValue=""
        data-colspan="9"
    />,
    <BooleanInput
        source="pordefecto"
        label="tipotrabajo.fields.pordefecto"
        defaultValue={false}
        data-colspan="3"
    />,
    <ImageBase64Input source="imagen" label="image.label" data-colspan="12" />,
];

/////////////////////////////////////////////////////////////
// SUB: PARTES (tipotrabajopartetrabajo)
//
// La columna `partetrabajo` es int(11) y mapea al enum
// PARTE_TRABAJO (0..16) — mismo catálogo que usa
// lineapresrecogidadatos.
const parteColumns = [
    {
        type: EnumField,
        props: {
            source: "partetrabajo",
            label: "tipotrabajo.fields.partetrabajo",
            map: PARTE_TRABAJO_MAP,
        },
    },
    {
        type: TextField,
        props: { source: "descripcion", label: "tipotrabajo.fields.descripcion" },
    },
];

const parteForm = [
    <SelectInput
        source="partetrabajo"
        label="tipotrabajo.fields.partetrabajo"
        choices={PARTE_TRABAJO_CHOICES}
        defaultValue={0}
        data-colspan="4"
        translateChoice
    />,
    <TextInput
        source="descripcion"
        label="tipotrabajo.fields.descripcion"
        defaultValue=""
        data-colspan="8"
    />,
];

/////////////////////////////////////////////////////////////
// PAGE
export const tipoTrabajoPage = () => {
    const translate = useTranslate();
    return (
        <TabbedCrudView
            resource="tipotrabajo"
            title={translate("tipotrabajo.page_title")}
            columns={columns}
            form={form}
            tabs={[
                {
                    label: translate("tipotrabajo.tab_images"),
                    content: (record: any) =>
                        record?.id ? (
                            <SubCrudView
                                resource="tipotrabajoimagen"
                                parentField="tipotrabajoid"
                                parentId={record.id}
                                title={translate("tipotrabajo.images_subtitle")}
                                columns={imagenColumns}
                                form={imagenForm}
                            />
                        ) : null,
                },
                {
                    label: translate("tipotrabajo.tab_parts"),
                    content: (record: any) =>
                        record?.id ? (
                            <SubCrudView
                                resource="tipotrabajopartetrabajo"
                                parentField="tipotrabajoid"
                                parentId={record.id}
                                title={translate("tipotrabajo.parts_subtitle")}
                                columns={parteColumns}
                                form={parteForm}
                                transform={stampFechaModificacion}
                            />
                        ) : null,
                },
            ]}
        />
    );
};
