import { ArrayInput, required, SelectInput, SimpleFormIterator, TextField, TextInput } from "react-admin";
import { SimpleCrudView } from "../views/SimpleCrudView";
import { Box } from "@mui/material";
import { TIPOLINEAS_CHOICES } from "../common/constants";

export const tipoTrabajoPage = () => (
  <SimpleCrudView
    resource="tipotrabajo"
    title="Tipos de Trabajo"
    columns={[
      <TextField source="tipotrabajo" label="Nombre" />,
    ]}
    form={[
      <TextInput source="name" label="Nombre" data-colspan="4" validate={[required()]}/>,
      <ArrayInput source="lineas" label="" data-colspan="8">
        <SimpleFormIterator>
          <Box display="flex" gap={2} width="100%">
            <TextInput validate={[required()]}  source="name" label="Línea" fullWidth />
            <SelectInput
              source="tipo"
              label="Tipo"
              fullWidth
              validate={[required()]} 
              choices={TIPOLINEAS_CHOICES}
            />
          </Box>
        </SimpleFormIterator>
      </ArrayInput>
    ]}
  />
);
