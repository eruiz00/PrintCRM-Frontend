import {
    TextField,
    NumberField,
    FunctionField,
    BooleanField,
    TextInput,
    NumberInput,
    BooleanInput,
    SelectInput,
    AutocompleteInput,
    useGetList,
    useTranslate,
} from "react-admin";
import { SubCrudView } from "../views/SubCrudView";
import {
    PARTE_TRABAJO_CHOICES,
    PARTE_TRABAJO_MAP,
} from "../common/constants";
import { EnumField } from "../common/EnumField";
import { PapelSelector } from "../common/PapelSelector";
import { LineasPostimpresion } from "./LineasPostimpresion";

/////////////////////////////////////////////////////////////
// Input para gruposelecciontinta*.
//
// OJO: la columna en lineapresrecogidadatos es varchar y
// almacena el NOMBRE del grupo (campo `grupo`), no un id.
// Por eso NO podemos usar <ReferenceInput>, que intentaría
// hacer getOne(gruposelecciontinta, {id: nombre}) y falla
// con "Not found" / "Cannot read properties of null".
const GrupoTintaInput = (props: {
    source: string;
    label: string;
    "data-colspan"?: string;
}) => {
    const { data = [], isPending } = useGetList("gruposelecciontinta", {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: "grupo", order: "ASC" },
    });
    const choices = data.map((g: any) => ({ id: g.grupo, name: g.grupo }));
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
// Opciones auxiliares
//
// `orientacion` es int en la DDL; sin catálogo claro, asumimos
// 0 = vertical, 1 = horizontal.  Usamos claves i18n como name.
const ORIENTACION_CHOICES = [
    { id: 0, name: "linea.orientacion.vertical" },
    { id: 1, name: "linea.orientacion.horizontal" },
];

/////////////////////////////////////////////////////////////
// COLUMNAS
const columns = [
    { type: TextField, props: { source: "id", label: "linea.fields.id" } },
    {
        type: EnumField,
        props: {
            source: "partetrabajo",
            label: "linea.fields.partetrabajo",
            map: PARTE_TRABAJO_MAP,
        },
    },
    { type: TextField, props: { source: "descripcion", label: "linea.fields.descripcion" } },
    { type: NumberField, props: { source: "paginas", label: "linea.fields.paginas" } },
    {
        type: FunctionField,
        props: {
            source: "anchofinal",
            label: "linea.fields.formato",
            render: (r: any) =>
                r?.anchofinal && r?.altofinal
                    ? `${r.anchofinal} × ${r.altofinal}`
                    : "",
        },
    },
    { type: NumberField, props: { source: "sangrado", label: "linea.fields.sangrado" } },
    {
        type: NumberField,
        props: { source: "ejemplaresextra", label: "linea.fields.ejemplares_extra" },
    },
    { type: BooleanField, props: { source: "ocultar", label: "linea.fields.ocultar" } },
];

/////////////////////////////////////////////////////////////
// FORM
const form = [
    // --- Cabecera de la línea
    <SelectInput
        source="partetrabajo"
        label="linea.fields.partetrabajo"
        choices={PARTE_TRABAJO_CHOICES}
        data-colspan="4"
        translateChoice
    />,
    <TextInput source="descripcion" label="linea.fields.descripcion" data-colspan="5" />,
    <SelectInput
        source="orientacion"
        label="linea.fields.orientacion"
        choices={ORIENTACION_CHOICES}
        data-colspan="3"
        translateChoice
    />,

    // --- Tirada / páginas
    <NumberInput source="paginas" label="linea.fields.paginas" data-colspan="3" />,
    <NumberInput
        source="ejemplaresextra"
        label="linea.fields.ejemplares_extra"
        data-colspan="3"
    />,
    <NumberInput
        source="modificadortirada"
        label="linea.fields.modificador_tirada"
        data-colspan="3"
    />,
    <NumberInput
        source="multiplicidad"
        label="linea.fields.multiplicidad"
        data-colspan="3"
    />,

    // --- Formato cerrado
    <NumberInput source="anchofinal" label="linea.fields.anchofinal" data-colspan="3" />,
    <NumberInput source="altofinal" label="linea.fields.altofinal" data-colspan="3" />,
    <NumberInput source="sangrado" label="linea.fields.sangrado" data-colspan="3" />,
    <NumberInput source="lomo" label="linea.fields.lomo" data-colspan="3" />,

    // --- Formato abierto
    <NumberInput
        source="anchoabierto"
        label="linea.fields.anchoabierto"
        data-colspan="3"
    />,
    <NumberInput source="altoabierto" label="linea.fields.altoabierto" data-colspan="3" />,
    <BooleanInput
        source="forzartamanoabierto"
        label="linea.fields.forzar_tamano_abierto"
        data-colspan="3"
    />,
    <NumberInput source="anchohoja" label="linea.fields.anchohoja" data-colspan="3" />,

    // --- Montaje (cuerpos)
    <NumberInput source="altohoja" label="linea.fields.altohoja" data-colspan="3" />,
    <NumberInput
        source="cuerposhorizontal"
        label="linea.fields.cuerposhorizontal"
        data-colspan="3"
    />,
    <NumberInput
        source="cuerposvertical"
        label="linea.fields.cuerposvertical"
        data-colspan="3"
    />,
    <div data-colspan="3" />,

    // --- Solapas
    <NumberInput
        source="anchosolapaizquierda"
        label="linea.fields.solapa_izquierda"
        data-colspan="3"
    />,
    <NumberInput
        source="anchosolapaderecha"
        label="linea.fields.solapa_derecha"
        data-colspan="3"
    />,
    <NumberInput
        source="altosolapasuperior"
        label="linea.fields.solapa_superior"
        data-colspan="3"
    />,
    <NumberInput
        source="altosolapainferior"
        label="linea.fields.solapa_inferior"
        data-colspan="3"
    />,

    // --- Soporte (papel) y tintas
    <PapelSelector
        source="soporteid"
        label="linea.fields.soporte"
        data-colspan="12"
    />,
    <GrupoTintaInput
        source="gruposelecciontintacara"
        label="linea.fields.tintas_cara"
        data-colspan="6"
    />,
    <GrupoTintaInput
        source="gruposelecciontintadorso"
        label="linea.fields.tintas_dorso"
        data-colspan="6"
    />,

    // --- Flags finales
    <BooleanInput
        source="paginasiguales"
        label="linea.fields.paginasiguales"
        data-colspan="3"
    />,
    <BooleanInput source="subcontrata" label="linea.fields.subcontrata" data-colspan="3" />,
    <BooleanInput source="ocultar" label="linea.fields.ocultar" data-colspan="3" />,
    <BooleanInput
        source="sinplanchas"
        label="linea.fields.sinplanchas"
        data-colspan="3"
    />,

    <TextInput
        source="notastintaweb"
        label="linea.fields.notastintaweb"
        data-colspan="12"
    />,
];

/////////////////////////////////////////////////////////////
// COMPONENT
export const LineasPresupuesto = ({
    presupuestoId,
}: {
    presupuestoId: number | string;
}) => {
    const translate = useTranslate();

    const formTabs = [
        {
            label: translate("linea.tab_general"),
            fields: form,
        },
        {
            label: translate("linea.tab_postimp"),
            content: (lineaRecord: any) => (
                <LineasPostimpresion lineaId={lineaRecord.id} />
            ),
        },
    ];

    return (
        <SubCrudView
            resource="lineapresrecogidadatos"
            parentField="presupuestoid"
            parentId={presupuestoId}
            title={translate("linea.list_title")}
            columns={columns}
            formTabs={formTabs}
        />
    );
};
