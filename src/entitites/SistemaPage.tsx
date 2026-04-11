import { BooleanInput, NumberInput, required, TextField, TextInput } from "react-admin";
import { SimpleCrudView } from "../views/SimpleCrudView";
import { Typography } from "@mui/material";

export const sistemaPage = () => (
  <SimpleCrudView
    resource="sistema"
    title="Sistemas"

    columns={[
      <TextField source="empresa" label="Empresa" />,
      <TextField source="cif" label="NIF" />,
      <TextField source="localidad" label="Localidad" />,
      <TextField source="provincia" label="Provincia" />,
      <TextField source="pais" label="Pais" />,
    ]}
    form={[
      <Typography color="primary" data-colspan='12'>Datos de empresa</Typography>,
      <TextInput source="empresa" label="Empresa" fullWidth data-colspan='8' validate={[required()]} />,
      <TextInput source="cif" label="CIF" fullWidth data-colspan='4' validate={[required()]} />,
      <TextInput source="domicilio" label="Domicilio" fullWidth data-colspan='8' />,
      <TextInput source="localidad" label="Localidad" fullWidth data-colspan='4' />,
      <TextInput source="provincia" label="Provincia" fullWidth data-colspan='4' />,
      <TextInput source="pais" label="Pais" fullWidth data-colspan='4' />,
      <TextInput source="codigopostal" label="Código Postal" fullWidth data-colspan='4' />,
      
      <Typography color="primary" data-colspan='12'>Datos de contacto</Typography>,
      <TextInput source="telefono" label="Teléfono" fullWidth data-colspan='6' />,
      <TextInput source="fax" label="Fax" fullWidth data-colspan='6' />,
      <TextInput source="correoelectronico" label="Correo electrónico" fullWidth data-colspan='6' />,
      <TextInput source="web" label="Web" fullWidth data-colspan='6' />,

      <Typography color="primary" data-colspan='12'>Datos bancarios</Typography>,
      <TextInput source="banco" label="Banco" fullWidth data-colspan='6' />,
      <Typography data-colspan="6" />,
      <TextInput source="bancoentidad" label="Entidad" fullWidth data-colspan='2' />,
      <TextInput source="bancosucursal" label="Sucursal" fullWidth data-colspan='2' />,
      <TextInput source="bancodigitocontrol" label="Control" fullWidth data-colspan='2' />,
      <TextInput source="bancoiban" label="IBAN" fullWidth data-colspan='2' />,
      <TextInput source="bancocuenta" label="Cuenta" fullWidth data-colspan='4' />,
      

      <Typography color="primary" data-colspan='12'>Emails por departamento</Typography>,
      <TextInput source="emailprincipal" label="Email principal" fullWidth data-colspan='6' />,
      <Typography data-colspan="6" />,
      <TextInput source="emailproduccion" label="Email produccion" fullWidth data-colspan='3' />,
      <TextInput source="emailadministracion" label="Email administracion" fullWidth data-colspan='3' />,
      <TextInput source="emailcompras" label="Email compras" fullWidth data-colspan='3' />,
      <TextInput source="emailpresupuesto" label="Email presupuestos" fullWidth data-colspan='3' />,

      <Typography color="primary" data-colspan='12'>Configuraciones varias</Typography>,
      <NumberInput source="iva" label="IVA" fullWidth data-colspan='3' />,
      <NumberInput source="retencion" label="Retención" fullWidth data-colspan='3' />,
      <NumberInput source="diascaducidadpresupuesto" label="Dias caducidad presupuesto" fullWidth data-colspan='3' />,
      <NumberInput source="maxejemplarespresupuesto" label="Max ejemplares presupuesto" fullWidth data-colspan='3' />,
      <BooleanInput source="avisarriesgo" label="Avisar riesgo" fullWidth data-colspan='3' />,
      <BooleanInput source="visible" label="Visible" fullWidth data-colspan='3' />,
    ]}
  />
);
