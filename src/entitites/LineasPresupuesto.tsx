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
} from "react-admin";
import { SubCrudView } from "../views/SubCrudView";
import {
    PARTE_TRABAJO_CHOICES,
    PARTE_TRABAJO_MAP,
} from "../common/constants";
import { PapelSelector } from "../common/PapelSelector";

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
// 0 = vertical, 1 = horizontal. Ajustar si no coincide.
const ORIENTACION_CHOICES = [
    { id: 0, name: "Vertical" },
    { id: 1, name: "Horizontal" },
];

/////////////////////////////////////////////////////////////
// COLUMNAS
const columns = [
    { type: TextField, props: { source: "id", label: "Id" } },
    {
        type: FunctionField,
        props: {
            source: "partetrabajo",
            label: "Parte trabajo",
            render: (r: any) =>
                r?.partetrabajo != null
                    ? PARTE_TRABAJO_MAP[r.partetrabajo] ?? r.partetrabajo
                    : "",
        },
    },
    { type: TextField, props: { source: "descripcion", label: "Descripción" } },
    { type: NumberField, props: { source: "paginas", label: "Páginas" } },
    {
        type: FunctionField,
        props: {
            source: "anchofinal",
            label: "Formato (A×A)",
            render: (r: any) =>
                r?.anchofinal && r?.altofinal
                    ? `${r.anchofinal} × ${r.altofinal}`
                    : "",
        },
    },
    { type: NumberField, props: { source: "sangrado", label: "Sangrado" } },
    {
        type: NumberField,
        props: { source: "ejemplaresextra", label: "Ejemp. extra" },
    },
    { type: BooleanField, props: { source: "ocultar", label: "Ocultar" } },
];

/////////////////////////////////////////////////////////////
// FORM
const form = [
    // --- Cabecera de la línea
    <SelectInput
        source="partetrabajo"
        label="Parte trabajo"
        choices={PARTE_TRABAJO_CHOICES}
        data-colspan="4"
    />,
    <TextInput source="descripcion" label="Descripción" data-colspan="5" />,
    <SelectInput
        source="orientacion"
        label="Orientación"
        choices={ORIENTACION_CHOICES}
        data-colspan="3"
    />,

    // --- Tirada / páginas
    <NumberInput source="paginas" label="Páginas" data-colspan="3" />,
    <NumberInput
        source="ejemplaresextra"
        label="Ejemp. extra"
        data-colspan="3"
    />,
    <NumberInput
        source="modificadortirada"
        label="Modif. tirada"
        data-colspan="3"
    />,
    <NumberInput
        source="multiplicidad"
        label="Multiplicidad"
        data-colspan="3"
    />,

    // --- Formato cerrado
    <NumberInput source="anchofinal" label="Ancho final" data-colspan="3" />,
    <NumberInput source="altofinal" label="Alto final" data-colspan="3" />,
    <NumberInput source="sangrado" label="Sangrado" data-colspan="3" />,
    <NumberInput source="lomo" label="Lomo" data-colspan="3" />,

    // --- Formato abierto
    <NumberInput
        source="anchoabierto"
        label="Ancho abierto"
        data-colspan="3"
    />,
    <NumberInput source="altoabierto" label="Alto abierto" data-colspan="3" />,
    <BooleanInput
        source="forzartamanoabierto"
        label="Forzar tamaño abierto"
        data-colspan="3"
    />,
    <NumberInput source="anchohoja" label="Ancho hoja" data-colspan="3" />,

    // --- Montaje (cuerpos)
    <NumberInput source="altohoja" label="Alto hoja" data-colspan="3" />,
    <NumberInput
        source="cuerposhorizontal"
        label="Cuerpos horizontal"
        data-colspan="3"
    />,
    <NumberInput
        source="cuerposvertical"
        label="Cuerpos vertical"
        data-colspan="3"
    />,
    <div data-colspan="3" />,

    // --- Solapas
    <NumberInput
        source="anchosolapaizquierda"
        label="Solapa izquierda"
        data-colspan="3"
    />,
    <NumberInput
        source="anchosolapaderecha"
        label="Solapa derecha"
        data-colspan="3"
    />,
    <NumberInput
        source="altosolapasuperior"
        label="Solapa superior"
        data-colspan="3"
    />,
    <NumberInput
        source="altosolapainferior"
        label="Solapa inferior"
        data-colspan="3"
    />,

    // --- Soporte (papel) y tintas
    <PapelSelector
        source="soporteid"
        label="Soporte (papel)"
        data-colspan="12"
    />,
    <GrupoTintaInput
        source="gruposelecciontintacara"
        label="Tintas cara"
        data-colspan="6"
    />,
    <GrupoTintaInput
        source="gruposelecciontintadorso"
        label="Tintas dorso"
        data-colspan="6"
    />,

    // --- Flags finales
    <BooleanInput
        source="paginasiguales"
        label="Páginas iguales"
        data-colspan="3"
    />,
    <BooleanInput source="subcontrata" label="Subcontrata" data-colspan="3" />,
    <BooleanInput source="ocultar" label="Ocultar" data-colspan="3" />,
    <BooleanInput
        source="sinplanchas"
        label="Sin planchas"
        data-colspan="3"
    />,

    <TextInput
        source="notastintaweb"
        label="Notas tinta web"
        data-colspan="12"
    />,
];

/////////////////////////////////////////////////////////////
// COMPONENT
export const LineasPresupuesto = ({
    presupuestoId,
}: {
    presupuestoId: number | string;
}) => (
    <SubCrudView
        resource="lineapresrecogidadatos"
        parentField="presupuestoid"
        parentId={presupuestoId}
        title="Líneas del presupuesto"
        columns={columns}
        form={form}
    />
);
