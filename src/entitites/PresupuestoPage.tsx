import { TextField, NumberField, DateField, TextInput, NumberInput, DateInput, SelectInput } from "react-admin";
import { TabbedCrudView } from "../views/TabbedCrudView";

/////////////////////////////////////////////////////////////
// COLUMNS

export const presupuestoColumns = [
    { type: TextField, props: { source: "numero", label: "Número" } },
    { type: TextField, props: { source: "cliente", label: "Cliente" } },
    { type: NumberField, props: { source: "importe", label: "Importe" } },
    { type: DateField, props: { source: "fecha", label: "Fecha" } },
    { type: TextField, props: { source: "estado", label: "Estado" } },
];

/////////////////////////////////////////////////////////////
// FILTERS
export const presupuestoFilters = [
    /*
  <ReferenceInput source="sistemaId" reference="sistemas" label="Sistema" alwaysOn>
    <SelectInput optionText="name" />
  </ReferenceInput>,

  <ReferenceInput source="tipoTrabajoId" reference="tipotrabajos" label="Tipo de Trabajo" alwaysOn>
    <SelectInput optionText="name" />
  </ReferenceInput>,

  <ReferenceInput source="clienteId" reference="clientes" label="Cliente" alwaysOn>
    <SelectInput optionText="name" />
  </ReferenceInput>,
*/
  <TextInput label="Número" source="numero" alwaysOn />,
/*
  <DateInput source="createdAt_gte" label="Creado desde" alwaysOn />,
  <DateInput source="createdAt_lte" label="Creado hasta" alwaysOn />,
  */
];

/////////////////////////////////////////////////////////////
// FORM
export const presupuestoForm = [
    <TextInput source="cliente" label="Cliente" />,
    <NumberInput source="importe" label="Importe" />,
    <DateInput source="fecha" label="Fecha" />,
    <SelectInput
        source="estado"
        label="Estado"
        choices={[
            { id: "pendiente", name: "Pendiente" },
            { id: "aceptado", name: "Aceptado" },
            { id: "rechazado", name: "Rechazado" },
        ]}
    />,
    <TextInput source="descripcion" label="Descripción" multiline />,
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
                label: "Detalles",
                content: (record:any) => (
                    <div>
                        <h3>Detalles del presupuesto</h3>
                        <pre>{JSON.stringify(record, null, 2)}</pre>
                    </div>
                ),
            },
        ]}
    />
);
