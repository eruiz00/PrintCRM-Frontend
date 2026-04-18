import {
    TextField,
    DateField,
    ReferenceField,
    TextInput,
    DateInput,
    SelectInput,
    ReferenceInput,
    AutocompleteInput,
    useTranslate,
} from "react-admin";
import { TabbedCrudView } from "../views/TabbedCrudView";
import {
    ESTADO_PRESUPUESTO_CHOICES,
    ESTADO_PRESUPUESTO_MAP,
} from "../common/constants";
import { EnumField } from "../common/EnumField";
import { LineasPresupuesto } from "./LineasPresupuesto";

/////////////////////////////////////////////////////////////
// COLUMNS (lista)
//
// TabbedCrudView renderiza los columns como  <col.type {...col.props} />,
// así que pasamos { type, props }.  Los labels son claves i18n y
// react-admin los traduce automáticamente.
export const presupuestoColumns = [
    { type: TextField, props: { source: "numpresupuesto", label: "presupuesto.fields.num_short" } },
    { type: DateField, props: { source: "fechaentrada", label: "presupuesto.fields.fechaentrada_short" } },
    { type: DateField, props: { source: "fechaconfeccion", label: "presupuesto.fields.fechaconfeccion_short" } },
    { type: DateField, props: { source: "fechasalida", label: "presupuesto.fields.fechasalida_short" } },
    {
        type: ReferenceField,
        props: {
            source: "clienteid",
            reference: "cliente",
            label: "presupuesto.fields.clienteid",
            link: false,
        },
    },
    {
        type: ReferenceField,
        props: {
            source: "comercialid",
            reference: "comercial",
            label: "presupuesto.fields.comercialid",
            link: false,
        },
    },
    { type: TextField, props: { source: "descripcion", label: "presupuesto.fields.descripcion" } },
    { type: TextField, props: { source: "referencia", label: "presupuesto.fields.referencia" } },
    {
        type: EnumField,
        props: {
            source: "estado",
            label: "presupuesto.fields.estado",
            map: ESTADO_PRESUPUESTO_MAP,
        },
    },
    {
        type: ReferenceField,
        props: {
            source: "tipotrabajo",
            reference: "tipotrabajo",
            label: "presupuesto.fields.tipotrabajo",
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
    <TextInput label="presupuesto.fields.busqueda" source="q" alwaysOn resettable />,
    <TextInput label="presupuesto.fields.numpresupuesto" source="numpresupuesto" alwaysOn resettable />,
    <TextInput label="presupuesto.fields.referencia" source="referencia" alwaysOn resettable />,

    <ReferenceInput source="clienteid_eq" reference="cliente" alwaysOn>
        <AutocompleteInput
            label="presupuesto.fields.clienteid"
            optionText="empresa"
            filterToQuery={(q: string) => ({ empresa: q })}
        />
    </ReferenceInput>,

    <ReferenceInput source="comercialid_eq" reference="comercial" alwaysOn>
        <AutocompleteInput
            label="presupuesto.fields.comercialid"
            optionText="nombre"
            filterToQuery={(q: string) => ({ nombre: q })}
        />
    </ReferenceInput>,

    <DateInput source="fechaentrada_ge" label="presupuesto.fields.entrada_desde" alwaysOn />,
    <DateInput source="fechaentrada_le" label="presupuesto.fields.entrada_hasta" alwaysOn />,

    <SelectInput
        source="estado_eq"
        label="presupuesto.fields.estado"
        choices={ESTADO_PRESUPUESTO_CHOICES}
        alwaysOn
        resettable
        translateChoice
    />,

    <ReferenceInput source="tipotrabajo_eq" reference="tipotrabajo" alwaysOn>
        <SelectInput label="presupuesto.fields.tipotrabajo" optionText="tipotrabajo" resettable />
    </ReferenceInput>,
];

/////////////////////////////////////////////////////////////
// FORM (solo cabecera)
export const presupuestoForm = [
    <TextInput source="numpresupuesto" label="presupuesto.fields.numpresupuesto" data-colspan="3" />,
    <DateInput source="fechaentrada" label="presupuesto.fields.fechaentrada" data-colspan="3" />,
    <DateInput source="fechaconfeccion" label="presupuesto.fields.fechaconfeccion" data-colspan="3" />,
    <DateInput source="fechasalida" label="presupuesto.fields.fechasalida" data-colspan="3" />,

    <ReferenceInput source="clienteid" reference="cliente">
        <AutocompleteInput
            label="presupuesto.fields.clienteid"
            optionText="empresa"
            filterToQuery={(q: string) => ({ empresa: q })}
            fullWidth
        />
    </ReferenceInput>,
    <ReferenceInput source="contactoid" reference="contactocliente">
        <AutocompleteInput
            label="presupuesto.fields.contactoid"
            optionText="nombre"
            filterToQuery={(q: string) => ({ nombre: q })}
            fullWidth
        />
    </ReferenceInput>,
    <ReferenceInput source="comercialid" reference="comercial">
        <AutocompleteInput
            label="presupuesto.fields.comercialid"
            optionText="nombre"
            filterToQuery={(q: string) => ({ nombre: q })}
            fullWidth
        />
    </ReferenceInput>,
    <ReferenceInput source="atencionclienteid" reference="empleado">
        <AutocompleteInput
            label="presupuesto.fields.atencionclienteid"
            optionText="nombre"
            filterToQuery={(q: string) => ({ nombre: q })}
            fullWidth
        />
    </ReferenceInput>,

    <ReferenceInput source="tipotrabajo" reference="tipotrabajo">
        <SelectInput label="presupuesto.fields.tipotrabajo" optionText="tipotrabajo" fullWidth />
    </ReferenceInput>,
    <TextInput source="referencia" label="presupuesto.fields.referencia" data-colspan="4" />,
    <SelectInput
        source="estado"
        label="presupuesto.fields.estado"
        choices={ESTADO_PRESUPUESTO_CHOICES}
        data-colspan="4"
        translateChoice
    />,

    <TextInput
        source="ejemplares"
        label="presupuesto.fields.ejemplares"
        helperText="presupuesto.fields.ejemplares_help"
        data-colspan="4"
    />,
    <DateInput
        source="fechasolicitudentrega"
        label="presupuesto.fields.fechasolicitudentrega"
        data-colspan="4"
    />,

    <TextInput
        source="descripcion"
        label="presupuesto.fields.descripcion"
        multiline
        minRows={2}
        data-colspan="12"
    />,
    <TextInput
        source="descripcioncliente"
        label="presupuesto.fields.descripcioncliente"
        multiline
        minRows={2}
        data-colspan="12"
    />,
    <TextInput
        source="nota"
        label="presupuesto.fields.nota"
        multiline
        minRows={2}
        data-colspan="12"
    />,
];

/////////////////////////////////////////////////////////////
// PAGE
export const presupuestoPage = () => {
    const translate = useTranslate();
    return (
        <TabbedCrudView
            resource="presupuesto"
            title={translate("presupuesto.page_title")}
            columns={presupuestoColumns}
            filters={presupuestoFilters}
            form={presupuestoForm}
            tabs={[
                {
                    label: translate("presupuesto.tab_lines"),
                    content: (record: any) =>
                        record?.id ? (
                            <LineasPresupuesto presupuestoId={record.id} />
                        ) : null,
                },
                {
                    label: translate("presupuesto.tab_details"),
                    content: (record: any) => (
                        <div>
                            <h3>{translate("presupuesto.details_header")}</h3>
                            <pre>{JSON.stringify(record, null, 2)}</pre>
                        </div>
                    ),
                },
            ]}
        />
    );
};
