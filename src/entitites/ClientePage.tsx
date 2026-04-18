import {
    TextField,
    BooleanField,
    DateField,
    NumberField,
    ReferenceField,
    List,
    Datagrid,
    TextInput,
    BooleanInput,
    NumberInput,
    DateInput,
    ReferenceInput,
    AutocompleteInput,
    SelectInput,
    useTranslate,
} from "react-admin";
import { TabbedCrudView } from "../views/TabbedCrudView";
import { ESTADO_PRESUPUESTO_MAP } from "../common/constants";
import { EnumField } from "../common/EnumField";
import { Box, Paper, Typography } from "@mui/material";

/////////////////////////////////////////////////////////////
// LISTADO DE PRESUPUESTOS DEL CLIENTE (sub-pestaña)
//
// Vista sólo-lectura: muestra los presupuestos cuya
// `clienteid` coincide con el cliente seleccionado.
// Reutiliza las columnas básicas que usa PresupuestoPage
// pero sin edición dentro de esta pestaña.
const PresupuestosDelCliente = ({ clienteId }: { clienteId: number | string }) => {
    const translate = useTranslate();
    return (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, width: "100%" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {translate("cliente.presupuestos_subtitle")}
            </Typography>

            <List
                resource="presupuesto"
                filter={{ clienteid_eq: clienteId }}
                actions={false}
                disableSyncWithLocation
                exporter={false}
                storeKey={`cliente.${clienteId}.presupuestos`}
                empty={false}
                sort={{ field: "fechaentrada", order: "DESC" }}
            >
                <Datagrid bulkActionButtons={false} rowClick={false}>
                    <TextField source="numpresupuesto" label="presupuesto.fields.num_short" />
                    <DateField source="fechaentrada" label="presupuesto.fields.fechaentrada_short" />
                    <DateField source="fechaconfeccion" label="presupuesto.fields.fechaconfeccion_short" />
                    <DateField source="fechasalida" label="presupuesto.fields.fechasalida_short" />
                    <TextField source="referencia" label="presupuesto.fields.referencia" />
                    <TextField source="descripcion" label="presupuesto.fields.descripcion" />
                    <ReferenceField
                        source="comercialid"
                        reference="comercial"
                        label="presupuesto.fields.comercialid"
                        link={false}
                    />
                    <ReferenceField
                        source="tipotrabajo"
                        reference="tipotrabajo"
                        label="presupuesto.fields.tipotrabajo"
                        link={false}
                    />
                    <EnumField
                        source="estado"
                        label="presupuesto.fields.estado"
                        map={ESTADO_PRESUPUESTO_MAP}
                    />
                </Datagrid>
            </List>
        </Paper>
    );
};

/////////////////////////////////////////////////////////////
// Helper: hueco en el grid (para forzar wrap)
const Spacer = ({ colspan = 4 }: { colspan?: number }) => (
    <Box data-colspan={String(colspan)} />
);

/////////////////////////////////////////////////////////////
// COLUMNS (lista maestra)
export const clienteColumns = [
    { type: TextField, props: { source: "numero", label: "cliente.fields.numero" } },
    { type: TextField, props: { source: "empresa", label: "cliente.fields.empresa" } },
    { type: TextField, props: { source: "cif", label: "cliente.fields.cif" } },
    { type: TextField, props: { source: "localidad", label: "cliente.fields.localidad" } },
    { type: TextField, props: { source: "provincia", label: "cliente.fields.provincia" } },
    { type: TextField, props: { source: "telefono1", label: "cliente.fields.telefono1" } },
    { type: TextField, props: { source: "correoelectronico", label: "cliente.fields.correoelectronico" } },
    {
        type: ReferenceField,
        props: {
            source: "comercialid",
            reference: "comercial",
            label: "cliente.fields.comercialid",
            link: false,
        },
    },
    { type: BooleanField, props: { source: "denegado", label: "cliente.fields.denegado" } },
    { type: BooleanField, props: { source: "marketing", label: "cliente.fields.marketing" } },
    { type: DateField, props: { source: "fechaalta", label: "cliente.fields.fechaalta" } },
    { type: NumberField, props: { source: "retencion", label: "cliente.fields.retencion" } },
];

/////////////////////////////////////////////////////////////
// FILTERS
export const clienteFilters = [
    <TextInput label="presupuesto.fields.busqueda" source="q" alwaysOn resettable />,
    <TextInput label="cliente.fields.empresa" source="empresa" alwaysOn resettable />,
    <TextInput label="cliente.fields.cif" source="cif" alwaysOn resettable />,
    <TextInput label="cliente.fields.localidad" source="localidad" alwaysOn resettable />,
    <TextInput label="cliente.fields.provincia" source="provincia" alwaysOn resettable />,
    <ReferenceInput source="comercialid_eq" reference="comercial" alwaysOn>
        <AutocompleteInput
            label="cliente.fields.comercialid"
            optionText="nombre"
            filterToQuery={(q: string) => ({ nombre: q })}
        />
    </ReferenceInput>,
    <SelectInput
        source="denegado_eq"
        label="cliente.fields.denegado"
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
export const clientePage = () => {
    const translate = useTranslate();
    return (
        <TabbedCrudView
            resource="cliente"
            title={translate("cliente.page_title")}
            columns={clienteColumns}
            filters={clienteFilters}
            formTabs={[
                /* -------- GENERAL -------- */
                {
                    label: translate("cliente.tabs.general"),
                    fields: [
                        <TextInput source="numero" label="cliente.fields.numero" data-colspan="2" />,
                        <TextInput source="empresa" label="cliente.fields.empresa" data-colspan="6" />,
                        <TextInput source="cif" label="cliente.fields.cif" data-colspan="4" />,
                        <TextInput source="razonsocial" label="cliente.fields.razonsocial" data-colspan="8" />,
                        <TextInput source="tipo" label="cliente.fields.tipo" data-colspan="4" />,
                        <TextInput source="sector" label="cliente.fields.sector" data-colspan="4" />,
                        <TextInput source="zona" label="cliente.fields.zona" data-colspan="4" />,
                        <TextInput source="cnae" label="cliente.fields.cnae" data-colspan="4" />,
                        <ReferenceInput source="comercialid" reference="comercial">
                            <AutocompleteInput
                                label="cliente.fields.comercialid"
                                optionText="nombre"
                                filterToQuery={(q: string) => ({ nombre: q })}
                                fullWidth
                                data-colspan="6"
                            />
                        </ReferenceInput>,
                        <ReferenceInput source="recomendadoporclienteid" reference="cliente">
                            <AutocompleteInput
                                label="cliente.fields.recomendadoporclienteid"
                                optionText="empresa"
                                filterToQuery={(q: string) => ({ empresa: q })}
                                fullWidth
                                data-colspan="6"
                            />
                        </ReferenceInput>,
                        <TextInput source="origencliente" label="cliente.fields.origencliente" data-colspan="6" />,
                        <BooleanInput source="denegado" label="cliente.fields.denegado" data-colspan="2" />,
                        <BooleanInput source="marketing" label="cliente.fields.marketing" data-colspan="2" />,
                        <BooleanInput source="clientealtaweb" label="cliente.fields.clientealtaweb" data-colspan="2" />,
                        <DateInput source="fechaalta" label="cliente.fields.fechaalta" data-colspan="4" />,
                        <DateInput source="fechamodificacion" label="cliente.fields.fechamodificacion" data-colspan="4" disabled />,
                        <DateInput source="ultimopresupuesto" label="cliente.fields.ultimopresupuesto" data-colspan="4" disabled />,
                    ],
                },

                /* -------- DIRECCIÓN FISCAL -------- */
                {
                    label: translate("cliente.tabs.direccion_fiscal"),
                    fields: [
                        <TextInput source="domicilio" label="cliente.fields.domicilio" data-colspan="8" />,
                        <TextInput source="codigopostal" label="cliente.fields.codigopostal" data-colspan="4" />,
                        <TextInput source="localidad" label="cliente.fields.localidad" data-colspan="4" />,
                        <TextInput source="provincia" label="cliente.fields.provincia" data-colspan="4" />,
                        <TextInput source="pais" label="cliente.fields.pais" data-colspan="4" />,
                        <NumberInput source="zonatransporteid" label="cliente.fields.zonatransporteid" data-colspan="4" />,
                        <TextInput source="notadireccion" label="cliente.fields.notadireccion" multiline minRows={2} data-colspan="12" />,
                    ],
                },

                /* -------- DIRECCIÓN ENVÍO -------- */
                {
                    label: translate("cliente.tabs.direccion_envio"),
                    fields: [
                        <TextInput source="domiciliob" label="cliente.fields.domicilio" data-colspan="8" />,
                        <TextInput source="codigopostalb" label="cliente.fields.codigopostal" data-colspan="4" />,
                        <TextInput source="localidadb" label="cliente.fields.localidad" data-colspan="4" />,
                        <TextInput source="provinciab" label="cliente.fields.provincia" data-colspan="4" />,
                        <TextInput source="paisb" label="cliente.fields.pais" data-colspan="4" />,
                        <NumberInput source="zonatransportebid" label="cliente.fields.zonatransporteid" data-colspan="4" />,
                        <TextInput source="zonatransporteb" label="cliente.fields.zonatransporte" data-colspan="4" />,
                        <Spacer colspan={4} />,
                        <TextInput source="notadireccionb" label="cliente.fields.notadireccion" multiline minRows={2} data-colspan="12" />,
                    ],
                },

                /* -------- CONTACTO -------- */
                {
                    label: translate("cliente.tabs.contacto"),
                    fields: [
                        <TextInput source="telefono1" label="cliente.fields.telefono1" data-colspan="3" />,
                        <TextInput source="telefono2" label="cliente.fields.telefono2" data-colspan="3" />,
                        <TextInput source="fax" label="cliente.fields.fax" data-colspan="3" />,
                        <TextInput source="rdsi" label="cliente.fields.rdsi" data-colspan="3" />,
                        <TextInput source="correoelectronico" label="cliente.fields.correoelectronico" data-colspan="6" />,
                        <TextInput source="web" label="cliente.fields.web" data-colspan="6" />,
                    ],
                },

                /* -------- FACTURACIÓN / PAGOS -------- */
                {
                    label: translate("cliente.tabs.facturacion"),
                    fields: [
                        <NumberInput source="tipofacturacion" label="cliente.fields.tipofacturacion" data-colspan="4" />,
                        <NumberInput source="tipocorrespondencia" label="cliente.fields.tipocorrespondencia" data-colspan="4" />,
                        <NumberInput source="retencion" label="cliente.fields.retencion" data-colspan="4" />,
                        <NumberInput source="diapago1" label="cliente.fields.diapago1" data-colspan="3" />,
                        <NumberInput source="diapago2" label="cliente.fields.diapago2" data-colspan="3" />,
                        <NumberInput source="diapago3" label="cliente.fields.diapago3" data-colspan="3" />,
                        <NumberInput source="diapago4" label="cliente.fields.diapago4" data-colspan="3" />,
                        <NumberInput source="descuentoprontopago" label="cliente.fields.descuentoprontopago" data-colspan="4" />,
                        <BooleanInput source="aplicardescuentopp" label="cliente.fields.aplicardescuentopp" data-colspan="4" />,
                    ],
                },

                /* -------- BANCO -------- */
                {
                    label: translate("cliente.tabs.banco"),
                    fields: [
                        <TextInput source="banco" label="cliente.fields.banco" data-colspan="6" />,
                        <TextInput source="bancodomicilio" label="cliente.fields.bancodomicilio" data-colspan="6" />,
                        <TextInput source="bancoiban" label="cliente.fields.bancoiban" data-colspan="12" />,
                        <TextInput source="bancoentidad" label="cliente.fields.bancoentidad" data-colspan="3" />,
                        <TextInput source="bancosucursal" label="cliente.fields.bancosucursal" data-colspan="3" />,
                        <TextInput source="bancodigitocontrol" label="cliente.fields.bancodigitocontrol" data-colspan="2" />,
                        <TextInput source="bancocuenta" label="cliente.fields.bancocuenta" data-colspan="4" />,
                        <TextInput
                            source="banconumerocuenta"
                            label="cliente.fields.banconumerocuenta"
                            multiline
                            minRows={2}
                            data-colspan="12"
                        />,
                    ],
                },

                /* -------- TRANSPORTE / EMBALAJE -------- */
                {
                    label: translate("cliente.tabs.transporte"),
                    fields: [
                        <BooleanInput source="pruebafisica" label="cliente.fields.pruebafisica" data-colspan="3" />,
                        <BooleanInput source="pruebafisicatransporte" label="cliente.fields.pruebafisicatransporte" data-colspan="3" />,
                        <BooleanInput source="pruebafisicatransportevuelta" label="cliente.fields.pruebafisicatransportevuelta" data-colspan="3" />,
                        <NumberInput source="pruebafisicanum" label="cliente.fields.pruebafisicanum" data-colspan="3" />,
                        <BooleanInput source="paleteuropeo" label="cliente.fields.paleteuropeo" data-colspan="3" />,
                        <BooleanInput source="reforzado" label="cliente.fields.reforzado" data-colspan="3" />,
                        <NumberInput source="pesolimite" label="cliente.fields.pesolimite" data-colspan="3" />,
                        <NumberInput source="alturalimite" label="cliente.fields.alturalimite" data-colspan="3" />,
                        <NumberInput source="controlfirmaalbaran" label="cliente.fields.controlfirmaalbaran" data-colspan="4" />,
                        <NumberInput source="valoracionalbaran" label="cliente.fields.valoracionalbaran" data-colspan="4" />,
                    ],
                },

                /* -------- PROVEEDOR Y MARCADOR -------- */
                {
                    label: translate("cliente.tabs.proveedor"),
                    fields: [
                        <NumberInput source="proveedorpordefectoid" label="cliente.fields.proveedorpordefectoid" data-colspan="4" />,
                        <NumberInput source="proveedorstockpropioid" label="cliente.fields.proveedorstockpropioid" data-colspan="4" />,
                        <TextInput source="proveedormarcador" label="cliente.fields.proveedormarcador" data-colspan="4" />,
                    ],
                },

                /* -------- AVISOS -------- */
                {
                    label: translate("cliente.tabs.avisos"),
                    fields: [
                        <TextInput source="avisofactura" label="cliente.fields.avisofactura" multiline minRows={2} data-colspan="12" />,
                        <TextInput source="avisoalbaran" label="cliente.fields.avisoalbaran" multiline minRows={2} data-colspan="12" />,
                        <TextInput source="avisopresupuesto" label="cliente.fields.avisopresupuesto" multiline minRows={2} data-colspan="12" />,
                        <TextInput source="avisopresupuestos" label="cliente.fields.avisopresupuestos" multiline minRows={2} data-colspan="12" />,
                        <TextInput source="avisoordentaller" label="cliente.fields.avisoordentaller" multiline minRows={2} data-colspan="12" />,
                    ],
                },

                /* -------- NOTAS -------- */
                {
                    label: translate("cliente.tabs.notas"),
                    fields: [
                        <TextInput source="nota" label="cliente.fields.nota" multiline minRows={4} data-colspan="12" />,
                        <TextInput source="notacartapordefecto" label="cliente.fields.notacartapordefecto" multiline minRows={2} data-colspan="12" />,
                        <TextInput source="notacartapordefecto_1" label="cliente.fields.notacartapordefecto_1" multiline minRows={2} data-colspan="12" />,
                        <TextInput source="campousuario1" label="cliente.fields.campousuario1" data-colspan="4" />,
                        <TextInput source="campousuario2" label="cliente.fields.campousuario2" data-colspan="4" />,
                        <TextInput source="campousuario3" label="cliente.fields.campousuario3" data-colspan="4" />,
                    ],
                },

                /* -------- PRESUPUESTOS DEL CLIENTE -------- */
                {
                    label: translate("cliente.tabs.presupuestos"),
                    content: (record: any) =>
                        record?.id ? (
                            <PresupuestosDelCliente clienteId={record.id} />
                        ) : null,
                },
            ]}
        />
    );
};

export default clientePage;
