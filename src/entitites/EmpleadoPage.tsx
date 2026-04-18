import {
    TextField,
    BooleanField,
    DateField,
    ReferenceField,
    TextInput,
    BooleanInput,
    DateInput,
    SelectInput,
    ReferenceInput,
    useTranslate,
} from "react-admin";
import { TabbedCrudView } from "../views/TabbedCrudView";
import {
    SEXO,
    ESTADO_CIVIL,
    AREA_EMPLEADO,
} from "../common/constants";
import { EnumField } from "../common/EnumField";
import { ImageBase64Input } from "../common/ImageBase64Input";
import { md5 } from "../common/md5";

/////////////////////////////////////////////////////////////
// Transform: antes de enviar, si el usuario ha escrito una
// nueva contraseña la hasheamos con MD5 (así es como la espera
// el backend).  Si no la ha tocado, la quitamos del payload
// para no sobreescribir la existente con vacío.
const empleadoTransform = (
    values: any,
    opts: { previousData?: any; isEdit: boolean }
): any => {
    const next = { ...values };
    const raw: string = next.clave ?? "";
    const prev: string = opts.previousData?.clave ?? "";

    if (!raw) {
        // Campo vacío -> no tocar la clave en BD.
        delete next.clave;
    } else if (raw !== prev) {
        // El usuario ha cambiado la clave -> hashearla.
        next.clave = md5(raw);
    } else {
        // Valor intacto (hash existente) -> tampoco re-enviar.
        delete next.clave;
    }
    return next;
};

/////////////////////////////////////////////////////////////
// Choices + maps (id -> clave i18n) para SelectInput/EnumField
const SEXO_CHOICES = SEXO.map((c) => ({ id: c.id, name: c.name }));
const ESTADO_CIVIL_CHOICES = ESTADO_CIVIL.map((c) => ({ id: c.id, name: c.name }));
const AREA_EMPLEADO_CHOICES = AREA_EMPLEADO.map((c) => ({ id: c.id, name: c.name }));

const SEXO_MAP = Object.fromEntries(SEXO.map((s) => [s.id, s.name])) as Record<
    number,
    string
>;
const AREA_EMPLEADO_MAP = Object.fromEntries(
    AREA_EMPLEADO.map((a) => [a.id, a.name])
) as Record<number, string>;

/////////////////////////////////////////////////////////////
// COLUMNS (lista)
export const empleadoColumns = [
    { type: TextField, props: { source: "numero", label: "empleado.fields.numero" } },
    { type: TextField, props: { source: "nombre", label: "empleado.fields.nombre" } },
    { type: TextField, props: { source: "apellidos", label: "empleado.fields.apellidos" } },
    { type: TextField, props: { source: "cargo", label: "empleado.fields.cargo" } },
    {
        type: EnumField,
        props: {
            source: "areaempleado",
            label: "empleado.fields.area",
            map: AREA_EMPLEADO_MAP,
        },
    },
    {
        type: EnumField,
        props: {
            source: "sexo",
            label: "empleado.fields.sexo",
            map: SEXO_MAP,
        },
    },
    {
        type: TextField,
        props: {
            source: "correoelectronico",
            label: "empleado.fields.correoelectronico",
        },
    },
    { type: TextField, props: { source: "telefono1", label: "empleado.fields.telefono1" } },
    {
        type: DateField,
        props: {
            source: "fechaacceso",
            label: "empleado.fields.fechaacceso",
            showTime: true,
        },
    },
    { type: BooleanField, props: { source: "esactivo", label: "empleado.fields.esactivo" } },
    { type: BooleanField, props: { source: "bloqueado", label: "empleado.fields.bloqueado" } },
    {
        type: ReferenceField,
        props: {
            source: "sistemaid",
            reference: "sistema",
            label: "empleado.fields.sistemaid",
            link: false,
        },
    },
];

/////////////////////////////////////////////////////////////
// FILTERS
export const empleadoFilters = [
    <TextInput label="presupuesto.fields.busqueda" source="q" alwaysOn resettable />,
    <TextInput label="empleado.fields.nombre" source="nombre" alwaysOn resettable />,
    <TextInput label="empleado.fields.apellidos" source="apellidos" alwaysOn resettable />,
    <TextInput label="empleado.fields.cargo" source="cargo" alwaysOn resettable />,
    <SelectInput
        source="areaempleado_eq"
        label="empleado.fields.area"
        choices={AREA_EMPLEADO_CHOICES}
        alwaysOn
        resettable
        translateChoice
    />,
    <SelectInput
        source="esactivo_eq"
        label="empleado.fields.esactivo"
        choices={[
            { id: 1, name: "common.yes" },
            { id: 0, name: "common.no" },
        ]}
        alwaysOn
        resettable
        translateChoice
    />,
];

/////////////////////////////////////////////////////////////
// PAGE
export const empleadoPage = () => {
    const translate = useTranslate();
    return (
        <TabbedCrudView
            resource="empleado"
            title={translate("empleado.page_title")}
            columns={empleadoColumns}
            filters={empleadoFilters}
            transform={empleadoTransform}

            /* ─────────────────────────────────────────────────────────
               Formulario repartido en sub-pestañas dentro de la
               pestaña superior "Formulario", mismo orden que MyProfile.
               ───────────────────────────────────────────────────────── */
            formTabs={[
                /* -------- PERSONAL -------- */
                {
                    label: translate("empleado.tabs.personal"),
                    fields: [
                        <TextInput source="numero" label="empleado.fields.numero" data-colspan="2" />,
                        <TextInput source="nombre" label="empleado.fields.nombre" data-colspan="5" />,
                        <TextInput source="apellidos" label="empleado.fields.apellidos" data-colspan="5" />,
                        <TextInput source="usuario" label="empleado.fields.usuario" data-colspan="4" />,
                        <TextInput
                            source="clave"
                            label="empleado.fields.clave"
                            type="password"
                            autoComplete="new-password"
                            helperText="empleado.fields.clave_help"
                            data-colspan="4"
                        />,
                        <TextInput source="cif" label="empleado.fields.nif" data-colspan="4" />,
                        <TextInput source="nacionalidad" label="empleado.fields.nacionalidad" data-colspan="4" />,
                        <DateInput source="fechanacimiento" label="empleado.fields.fechanacimiento" data-colspan="3" />,
                        <SelectInput
                            source="sexo"
                            label="empleado.fields.sexo"
                            choices={SEXO_CHOICES}
                            translateChoice
                            data-colspan="3"
                        />,
                        <SelectInput
                            source="estadocivil"
                            label="empleado.fields.estadocivil"
                            choices={ESTADO_CIVIL_CHOICES}
                            translateChoice
                            data-colspan="3"
                        />,
                        <TextInput source="estudios" label="empleado.fields.estudios" data-colspan="3" />,
                    ],
                },

                /* -------- CONTACTO -------- */
                {
                    label: translate("empleado.tabs.contact"),
                    fields: [
                        <TextInput source="correoelectronico" label="empleado.fields.correoelectronico" data-colspan="6" />,
                        <TextInput source="telefono1" label="empleado.fields.telefono1" data-colspan="2" />,
                        <TextInput source="telefono2" label="empleado.fields.telefono2" data-colspan="2" />,
                        <TextInput source="fax" label="empleado.fields.fax" data-colspan="2" />,
                    ],
                },

                /* -------- DIRECCIÓN -------- */
                {
                    label: translate("empleado.tabs.address"),
                    fields: [
                        <TextInput source="domicilio" label="empleado.fields.domicilio" data-colspan="8" />,
                        <TextInput source="codigopostal" label="empleado.fields.codigopostal" data-colspan="4" />,
                        <TextInput source="localidad" label="empleado.fields.localidad" data-colspan="4" />,
                        <TextInput source="provincia" label="empleado.fields.provincia" data-colspan="4" />,
                        <TextInput source="pais" label="empleado.fields.pais" data-colspan="4" />,
                    ],
                },

                /* -------- LABORAL -------- */
                {
                    label: translate("empleado.tabs.work"),
                    fields: [
                        <TextInput source="cargo" label="empleado.fields.cargo" data-colspan="4" />,
                        <TextInput source="categoriaprofesional" label="empleado.fields.categoriaprofesional" data-colspan="4" />,
                        <SelectInput
                            source="areaempleado"
                            label="empleado.fields.area"
                            choices={AREA_EMPLEADO_CHOICES}
                            translateChoice
                            data-colspan="4"
                        />,
                        <TextInput source="tipocontrato" label="empleado.fields.tipocontrato" data-colspan="4" />,
                        <DateInput source="fechafincontrato" label="empleado.fields.fechafincontrato" data-colspan="4" />,
                        <DateInput source="fechaacceso" label="empleado.fields.fechaacceso" data-colspan="4" />,
                        <BooleanInput source="esactivo" label="empleado.fields.esactivo" data-colspan="3" />,
                        <BooleanInput source="bloqueado" label="empleado.fields.bloqueado" data-colspan="3" />,
                        <ReferenceInput source="sistemaid" reference="sistema">
                            <SelectInput
                                label="empleado.fields.sistemaid"
                                optionText="empresa"
                                fullWidth
                                data-colspan="6"
                            />
                        </ReferenceInput>,
                    ],
                },

                /* -------- FAMILIA -------- */
                {
                    label: translate("empleado.tabs.family"),
                    fields: [
                        <TextInput source="nombreesposa" label="empleado.fields.nombreesposa" data-colspan="6" />,
                        <TextInput source="nifesposa" label="empleado.fields.nifesposa" data-colspan="3" />,
                        <DateInput
                            source="fechanacimientoesposa"
                            label="empleado.fields.fechanacimientoesposa"
                            data-colspan="3"
                        />,
                    ],
                },

                /* -------- BANCO -------- */
                {
                    label: translate("empleado.tabs.bank"),
                    fields: [
                        <TextInput source="banco" label="empleado.fields.banco" data-colspan="6" />,
                        <TextInput source="bancodomicilio" label="empleado.fields.bancodomicilio" data-colspan="6" />,
                        <TextInput source="bancoiban" label="empleado.fields.bancoiban" data-colspan="12" />,
                        <TextInput source="bancoentidad" label="empleado.fields.bancoentidad" data-colspan="3" />,
                        <TextInput source="bancosucursal" label="empleado.fields.bancosucursal" data-colspan="3" />,
                        <TextInput source="bancodigitocontrol" label="empleado.fields.bancodigitocontrol" data-colspan="2" />,
                        <TextInput source="bancocuenta" label="empleado.fields.bancocuenta" data-colspan="4" />,
                    ],
                },

                /* -------- TALLAS -------- */
                {
                    label: translate("empleado.tabs.sizes"),
                    fields: [
                        <TextInput source="tallapantalon" label="empleado.fields.tallapantalon" data-colspan="4" />,
                        <TextInput source="tallacamisa" label="empleado.fields.tallacamisa" data-colspan="4" />,
                        <TextInput source="tallacalzado" label="empleado.fields.tallacalzado" data-colspan="4" />,
                    ],
                },

                /* -------- NOTIFICACIONES -------- */
                {
                    label: translate("empleado.tabs.notifications"),
                    fields: [
                        <BooleanInput
                            source="usamailpresupuesto"
                            label="empleado.fields.usamailpresupuesto"
                            data-colspan="3"
                        />,
                        <BooleanInput
                            source="usamailadministracion"
                            label="empleado.fields.usamailadministracion"
                            data-colspan="3"
                        />,
                        <BooleanInput
                            source="usamailproduccion"
                            label="empleado.fields.usamailproduccion"
                            data-colspan="3"
                        />,
                        <BooleanInput
                            source="usamailcompras"
                            label="empleado.fields.usamailcompras"
                            data-colspan="3"
                        />,
                    ],
                },

                /* -------- IMAGEN -------- */
                {
                    label: translate("empleado.tabs.image"),
                    fields: [
                        <ImageBase64Input
                            source="imagen"
                            label="empleado.fields.imagen"
                            data-colspan="12"
                        />,
                    ],
                },
            ]}
        />
    );
};

export default empleadoPage;
