import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  EditButton,
  DateField,
  required,
} from "react-admin";

const UsersFilters = [
  <TextInput label="Nombre" source="name" alwaysOn />,
  <TextInput label="Nif" source="nif" alwaysOn />,
  <TextInput label="Email" source="email" alwaysOn />,
  <TextInput label="Autor" source="createdBy" alwaysOn />,
];

export const UsersList = () => (
  <List resource="users" filters={UsersFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Nombre" />
      <TextField source="nif" label="Nif" />
      <TextField source="email" label="Email" />
      <DateField source="createdAt" label="Creado el" showTime />
      <TextField source="createdBy" label="Autor" />
      <EditButton />
    </Datagrid>
  </List>
);


export const UsersEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      <TextInput source="nif" validate={[required()]} />
      <TextInput source="phone"  />
      <TextInput source="email" />
      <TextInput source="address"  />
    </SimpleForm>
  </Edit>
);

export const UsersCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="nif" />
      <TextInput source="phone"  />
      <TextInput source="email" />
      <TextInput source="address"  />
    </SimpleForm>
  </Create>
);
