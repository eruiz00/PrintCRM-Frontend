import {
    TextField,
    BooleanField,
    NumberField,
    FunctionField,
    TextInput,
    BooleanInput,
    NumberInput,
    SelectInput,
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
import { ImageBase64Input } from "../common/ImageBase64Input";
import { Box } from "@mui/material";

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
// MAESTRO (tipotrabajo) — columnas de la lista
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
            formTabs={[
                {
                    label: translate("tipotrabajo.tab_general"),
                    fields: [
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
                    ],
                },
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
