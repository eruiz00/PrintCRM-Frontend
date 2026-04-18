import {
    BooleanInput,
    NumberInput,
    required,
    TextField,
    TextInput,
    useTranslate,
} from "react-admin";
import { TabbedCrudView } from "../views/TabbedCrudView";

/////////////////////////////////////////////////////////////
// COLUMNS (lista)
// TabbedCrudView acepta tanto JSX como { type, props }; aquí
// pasamos JSX directamente.
const sistemaColumns = [
    <TextField source="numero" label="sistema.fields.numero" />,
    <TextField source="empresa" label="sistema.fields.empresa" />,
    <TextField source="cif" label="sistema.fields.nif" />,
    <TextField source="localidad" label="sistema.fields.localidad" />,
    <TextField source="provincia" label="sistema.fields.provincia" />,
    <TextField source="pais" label="sistema.fields.pais" />,
];

/////////////////////////////////////////////////////////////
// PAGE
export const sistemaPage = () => {
    const translate = useTranslate();
    return (
        <TabbedCrudView
            resource="sistema"
            title={translate("sistema.page_title")}
            columns={sistemaColumns}

            /* ─────────────────────────────────────────────────────────
               Cada apartado del sistema en una sub-pestaña del
               formulario.  Grid de 12 columnas.
               ───────────────────────────────────────────────────────── */
            formTabs={[
                {
                    label: translate("sistema.tabs.empresa"),
                    fields: [
                        <TextInput source="numero" label="sistema.fields.numero" fullWidth data-colspan="2" />,
                        <TextInput source="empresa" label="sistema.fields.empresa" fullWidth data-colspan="6" validate={[required()]} />,
                        <TextInput source="cif" label="sistema.fields.cif" fullWidth data-colspan="4" validate={[required()]} />,
                        <TextInput source="domicilio" label="sistema.fields.domicilio" fullWidth data-colspan="8" />,
                        <TextInput source="codigopostal" label="sistema.fields.codigopostal" fullWidth data-colspan="4" />,
                        <TextInput source="localidad" label="sistema.fields.localidad" fullWidth data-colspan="4" />,
                        <TextInput source="provincia" label="sistema.fields.provincia" fullWidth data-colspan="4" />,
                        <TextInput source="pais" label="sistema.fields.pais" fullWidth data-colspan="4" />,
                    ],
                },
                {
                    label: translate("sistema.tabs.contacto"),
                    fields: [
                        <TextInput source="telefono1" label="sistema.fields.telefono1" fullWidth data-colspan="4" />,
                        <TextInput source="telefono2" label="sistema.fields.telefono2" fullWidth data-colspan="4" />,
                        <TextInput source="rdsi" label="sistema.fields.rdsi" fullWidth data-colspan="4" />,
                        <TextInput source="fax1" label="sistema.fields.fax1" fullWidth data-colspan="4" />,
                        <TextInput source="fax2" label="sistema.fields.fax2" fullWidth data-colspan="4" />,
                        <div data-colspan="4" />,
                        <TextInput source="correoelectronico" label="sistema.fields.correoelectronico" fullWidth data-colspan="6" />,
                        <TextInput source="web" label="sistema.fields.web" fullWidth data-colspan="6" />,
                    ],
                },
                {
                    label: translate("sistema.tabs.bancarios"),
                    fields: [
                        <TextInput source="banco" label="sistema.fields.banco" fullWidth data-colspan="6" />,
                        <TextInput source="bancodomicilio" label="sistema.fields.bancodomicilio" fullWidth data-colspan="6" />,
                        <TextInput source="bancoentidad" label="sistema.fields.bancoentidad" fullWidth data-colspan="2" />,
                        <TextInput source="bancosucursal" label="sistema.fields.bancosucursal" fullWidth data-colspan="2" />,
                        <TextInput source="bancodigitocontrol" label="sistema.fields.bancodigitocontrol" fullWidth data-colspan="2" />,
                        <TextInput source="bancocuenta" label="sistema.fields.bancocuenta" fullWidth data-colspan="3" />,
                        <TextInput source="bancoiban" label="sistema.fields.bancoiban" fullWidth data-colspan="3" />,
                        <TextInput source="bancoidpresentador" label="sistema.fields.bancoidpresentador" fullWidth data-colspan="12" />,
                    ],
                },
                {
                    label: translate("sistema.tabs.emails"),
                    fields: [
                        <TextInput source="emailprincipal" label="sistema.fields.emailprincipal" fullWidth data-colspan="6" />,
                        <TextInput source="emailpresupuesto" label="sistema.fields.emailpresupuesto" fullWidth data-colspan="6" />,
                        <TextInput source="emailproduccion" label="sistema.fields.emailproduccion" fullWidth data-colspan="4" />,
                        <TextInput source="emailadministracion" label="sistema.fields.emailadministracion" fullWidth data-colspan="4" />,
                        <TextInput source="emailcompras" label="sistema.fields.emailcompras" fullWidth data-colspan="4" />,
                    ],
                },
                {
                    label: translate("sistema.tabs.smtp"),
                    fields: [
                        <TextInput source="smtpservidor" label="sistema.fields.smtpservidor" fullWidth data-colspan="6" />,
                        <NumberInput source="smtppuerto" label="sistema.fields.smtppuerto" fullWidth data-colspan="2" />,
                        <div data-colspan="4" />,
                        <TextInput source="smtpusuario" label="sistema.fields.smtpusuario" fullWidth data-colspan="6" />,
                        <TextInput source="smtpclave" label="sistema.fields.smtpclave" type="password" fullWidth data-colspan="6" />,
                        <BooleanInput source="smtpautentificar" label="sistema.fields.smtpautentificar" fullWidth data-colspan="3" />,
                        <BooleanInput source="smtpusarssl" label="sistema.fields.smtpusarssl" fullWidth data-colspan="3" />,
                    ],
                },
                {
                    label: translate("sistema.tabs.impuestos"),
                    fields: [
                        <NumberInput source="iva1" label="sistema.fields.iva1" fullWidth data-colspan="3" />,
                        <NumberInput source="iva2" label="sistema.fields.iva2" fullWidth data-colspan="3" />,
                        <NumberInput source="retencion1" label="sistema.fields.retencion1" fullWidth data-colspan="3" />,
                        <NumberInput source="retencion2" label="sistema.fields.retencion2" fullWidth data-colspan="3" />,
                    ],
                },
                {
                    label: translate("sistema.tabs.configuracion"),
                    fields: [
                        <NumberInput source="diascaducidadpresupuesto" label="sistema.fields.diascaducidadpresupuesto" fullWidth data-colspan="3" />,
                        <NumberInput source="diaspurgaeliminados" label="sistema.fields.diaspurgaeliminados" fullWidth data-colspan="3" />,
                        <NumberInput source="maxejemplarespresupuesto" label="sistema.fields.maxejemplarespresupuesto" fullWidth data-colspan="3" />,
                        <NumberInput source="maxejemplarestarifa" label="sistema.fields.maxejemplarestarifa" fullWidth data-colspan="3" />,
                        <BooleanInput source="avisarriesgo" label="sistema.fields.avisarriesgo" fullWidth data-colspan="3" />,
                        <BooleanInput source="bloqueado" label="sistema.fields.bloqueado" fullWidth data-colspan="3" />,
                        <BooleanInput source="visible" label="sistema.fields.visible" fullWidth data-colspan="3" />,
                    ],
                },
            ]}
        />
    );
};
