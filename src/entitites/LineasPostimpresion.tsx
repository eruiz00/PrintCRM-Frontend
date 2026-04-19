import {
    TextField,
    NumberField,
    BooleanField,
    ReferenceField,
    TextInput,
    NumberInput,
    BooleanInput,
    AutocompleteInput,
    useGetList,
    useTranslate,
} from "react-admin";
import { SubCrudView } from "../views/SubCrudView";
import {
    TIPO_PROCESO_PLANTA_POSTIMP_IDS,
} from "../common/constants";

/////////////////////////////////////////////////////////////
// PostimpresionClaseInput
//
// Selector de postimpresionclase filtrado a los `tipoproceso`
// de postimpresión (20-23).  Usamos useGetList + AutocompleteInput
// para aplicar el filtro `tipoproceso_in` directamente al
// dataProvider — así evitamos traer todas las clases.
const PostimpresionClaseInput = (props: {
    source: string;
    label: string;
    "data-colspan"?: string;
}) => {
    const { data = [], isPending } = useGetList("postimpresionclase", {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: "nombre", order: "ASC" },
        filter: { tipoproceso_in: [...TIPO_PROCESO_PLANTA_POSTIMP_IDS] },
    });
    const choices = data.map((c: any) => ({
        id: c.id,
        name: c.nombre || c.descripcion || `#${c.id}`,
    }));
    return (
        <AutocompleteInput
            source={props.source}
            label={props.label}
            choices={choices}
            isPending={isPending}
            fullWidth
        />
    );
};

/////////////////////////////////////////////////////////////
// COLUMNAS
const columns = [
    { type: TextField, props: { source: "id", label: "lineapostimp.fields.id" } },
    {
        type: ReferenceField,
        props: {
            source: "postimpresionclaseid",
            reference: "postimpresionclase",
            label: "lineapostimp.fields.postimpresionclase",
            link: false,
            children: <TextField source="nombre" />,
        },
    },
    {
        type: BooleanField,
        props: { source: "conreserva", label: "lineapostimp.fields.conreserva" },
    },
    {
        type: NumberField,
        props: { source: "cobertura", label: "lineapostimp.fields.cobertura" },
    },
    {
        type: NumberField,
        props: {
            source: "aplicacionesmodelo",
            label: "lineapostimp.fields.aplicacionesmodelo",
        },
    },
    {
        type: BooleanField,
        props: { source: "quitarretal", label: "lineapostimp.fields.quitarretal" },
    },
    {
        type: TextField,
        props: { source: "observaciones", label: "lineapostimp.fields.observaciones" },
    },
];

/////////////////////////////////////////////////////////////
// FORM
const form = [
    <PostimpresionClaseInput
        source="postimpresionclaseid"
        label="lineapostimp.fields.postimpresionclase"
        data-colspan="12"
    />,

    <BooleanInput
        source="conreserva"
        label="lineapostimp.fields.conreserva"
        data-colspan="3"
    />,
    <NumberInput
        source="cobertura"
        label="lineapostimp.fields.cobertura"
        data-colspan="3"
    />,
    <NumberInput
        source="aplicacionesmodelo"
        label="lineapostimp.fields.aplicacionesmodelo"
        data-colspan="3"
    />,
    <TextInput
        source="ordenacion"
        label="lineapostimp.fields.ordenacion"
        data-colspan="3"
    />,

    <TextInput
        source="codigotroquel"
        label="lineapostimp.fields.codigotroquel"
        data-colspan="4"
    />,
    <TextInput
        source="referenciatroquel"
        label="lineapostimp.fields.referenciatroquel"
        data-colspan="4"
    />,
    <BooleanInput
        source="troquelenstock"
        label="lineapostimp.fields.troquelenstock"
        data-colspan="2"
    />,
    <BooleanInput
        source="quitarretal"
        label="lineapostimp.fields.quitarretal"
        data-colspan="2"
    />,

    <BooleanInput
        source="omitirpreparacion"
        label="lineapostimp.fields.omitirpreparacion"
        data-colspan="3"
    />,
    <TextInput
        source="observaciones"
        label="lineapostimp.fields.observaciones"
        data-colspan="9"
    />,
];

/////////////////////////////////////////////////////////////
// Transform: actualiza fechamodificacion en cada submit.
const transform = (data: any) => ({
    ...data,
    fechamodificacion: new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
});

/////////////////////////////////////////////////////////////
// COMPONENT
export const LineasPostimpresion = ({ lineaId }: { lineaId: number | string }) => {
    const translate = useTranslate();
    return (
        <SubCrudView
            resource="lineapresrecogidapostimp"
            parentField="lineapresrecogidadatosid"
            parentId={lineaId}
            title={translate("lineapostimp.list_title")}
            columns={columns}
            form={form}
            transform={transform}
        />
    );
};
