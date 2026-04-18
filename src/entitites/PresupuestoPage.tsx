import {
    TextField,
    DateField,
    FunctionField,
    ReferenceField,
    TextInput,
    DateInput,
    SelectInput,
    ReferenceInput,
    AutocompleteInput,
} from "react-admin";
import { TabbedCrudView } from "../views/TabbedCrudView";
import {
    ESTADO_PRESUPUESTO_CHOICES,
    ESTADO_PRESUPUESTO_MAP,
} from "../common/constants";
import { LineasPresupuesto } from "./LineasPresupuesto";

/////////////////////////////////////////////////////////////
// COLUMNS (lista)
//
// TabbedCrudView renderiza los columns como  <col.type {...col.props} />,
// así que pasamos { type, props }.
export const presupuestoColumns = [
    { type: TextField, props: { source: "numpresupuesto", label: "Nº" } },
    { type: DateField, props: { source: "fechaentrada", label: "Entrada" } },
    { type: DateField, props: { source: "fechaconfeccion", label: "Confección" } },
    { type: DateField, props: { source: "fechasalida", label: "Salida" } },
    {
        type: ReferenceField,
        props: {
            source: "clienteid",
            reference: "cliente",
            label: "Cliente",
            link: false,
        },
    },
    {
        type: ReferenceField,
        props: {
            source: "comercialid",
            reference: "comercial",
            label: "Comercial",
            link: false,
        },
    },
    { type: TextField, props: { source: "descripcion", label: "Descripción" } },
    { type: TextField, props: { source: "referencia", label: "Referencia" } },
    {
        type: FunctionField,
        props: {
            source: "estado",
            label: "Estado",
            render: (record: any) =>
                record?.estado != null
                    ? ESTADO_PRESUPUESTO_MAP[record.estado] ?? record.estado
                    : "",
        },
    },
    {
        type: ReferenceField,
        props: {
            source: "tipotrabajo",
            reference: "tipotrabajo",
            label: "Tipo trabajo",
            link: false,
        },
    },
];

/////////////////////////////////////////////////////////////
// FILTERS
//
// El treeqlDataProvider usa sufijos _xx de 2 letras como operador
// (cs=contains -default-, eq, ge, le, gt, lt, bt, in, is).
// `q` se traduce a ?search= (búsqueda libre global).
export const presupuestoFilters = [
    <TextInput label="Búsqueda" source="q" alwaysOn resettable />,
    <TextInput label="Nº presupuesto" source="numpresupuesto" alwaysOn resettable />,
    <TextInput label="Referencia" source="referencia" alwaysOn resettable />,

    <ReferenceInput source="clienteid_eq" reference="cliente" alwaysOn>
        <AutocompleteInput
            label="Cliente"
            optionText="empresa"
            filterToQuery={(q: string) => ({ empresa: q })}
        />
    </ReferenceInput>,

    <ReferenceInput source="comercialid_eq" reference="comercial" alwaysOn>
        <AutocompleteInput
            label="Comercial"
            optionText="nombre"
            filterToQuery={(q: string) => ({ nombre: q })}
        />
    </ReferenceInput>,

    <DateInput source="fechaentrada_ge" label="Entrada desde" alwaysOn />,
    <DateInput source="fechaentrada_le" label="Entrada hasta" alwaysOn />,

    <SelectInput
        source="estado_eq"
        label="Estado"
        choices={ESTADO_PRESUPUESTO_CHOICES}
        alwaysOn
        resettable
    />,

    <ReferenceInput source="tipotrabajo_eq" reference="tipotrabajo" alwaysOn>
        <SelectInput label="Tipo trabajo" optionText="tipotrabajo" resettable />
    </ReferenceInput>,
];

/////////////////////////////////////////////////////////////
// FORM (solo cabecera)
export const presupuestoForm = [
    <TextInput source="numpresupuesto" label="Nº presupuesto" data-colspan="3" />,
    <DateInput source="fechaentrada" label="Fecha entrada" data-colspan="3" />,
    <DateInput source="fechaconfeccion" label="Fecha confección" data-colspan="3" />,
    <DateInput source="fechasalida" label="Fecha salida" data-colspan="3" />,

    <ReferenceInput source="clienteid" reference="cliente">
        <AutocompleteInput
            label="Cliente"
            optionText="empresa"
            filterToQuery={(q: string) => ({ empresa: q })}
            fullWidth
        />
    </ReferenceInput>,
    <ReferenceInput source="contactoid" reference="contactocliente">
        <AutocompleteInput
            label="Contacto"
            optionText="nombre"
            filterToQuery={(q: string) => ({ nombre: q })}
            fullWidth
        />
    </ReferenceInput>,
    <ReferenceInput source="comercialid" reference="comercial">
        <AutocompleteInput
            label="Comercial"
            optionText="nombre"
            filterToQuery={(q: string) => ({ nombre: q })}
            fullWidth
        />
    </ReferenceInput>,
    <ReferenceInput source="atencionclienteid" reference="empleado">
        <AutocompleteInput
            label="Atención cliente"
            optionText="nombre"
            filterToQuery={(q: string) => ({ nombre: q })}
            fullWidth
        />
    </ReferenceInput>,

    <ReferenceInput source="tipotrabajo" reference="tipotrabajo">
        <SelectInput label="Tipo trabajo" optionText="tipotrabajo" fullWidth />
    </ReferenceInput>,
    <TextInput source="referencia" label="Referencia" data-colspan="4" />,
    <SelectInput
        source="estado"
        label="Estado"
        choices={ESTADO_PRESUPUESTO_CHOICES}
        data-colspan="4"
    />,

    <TextInput
        source="ejemplares"
        label="Ejemplares"
        helperText="Separar con / si son varios"
        data-colspan="4"
    />,
    <DateInput
        source="fechasolicitudentrega"
        label="Solicitud de entrega"
        data-colspan="4"
    />,

    <TextInput
        source="descripcion"
        label="Descripción"
        multiline
        minRows={2}
        data-colspan="12"
    />,
    <TextInput
        source="descripcioncliente"
        label="Descripción cliente"
        multiline
        minRows={2}
        data-colspan="12"
    />,
    <TextInput
        source="nota"
        label="Nota interna"
        multiline
        minRows={2}
        data-colspan="12"
    />,
];

/////////////////////////////////////////////////////////////
// PAGE
export const presupuestoPage = () => (
    <TabbedCrudView
        resource="presupuesto"
        title="Gestión de Presupuestos"
        columns={presupuestoColumns}
        filters={presupuestoFilters}
        form={presupuestoForm}
        tabs={[
            {
                label: "Líneas",
                content: (record: any) =>
                    record?.id ? (
                        <LineasPresupuesto presupuestoId={record.id} />
                    ) : null,
            },
            {
                label: "Detalles",
                content: (record: any) => (
                    <div>
                        <h3>Detalles del presupuesto</h3>
                        <pre>{JSON.stringify(record, null, 2)}</pre>
                    </div>
                ),
            },
        ]}
    />
);
