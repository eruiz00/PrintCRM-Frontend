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
  <TextInput label="users.fields.name" source="name" alwaysOn />,
  <TextInput label="users.fields.nif" source="nif" alwaysOn />,
  <TextInput label="users.fields.email" source="email" alwaysOn />,
  <TextInput label="users.fields.createdBy" source="createdBy" alwaysOn />,
];

export const UsersList = () => (
  <List resource="users" filters={UsersFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="users.fields.id" />
      <TextField source="name" label="users.fields.name" />
      <TextField source="nif" label="users.fields.nif" />
      <TextField source="email" label="users.fields.email" />
      <DateField source="createdAt" label="users.fields.createdAt" showTime />
      <TextField source="createdBy" label="users.fields.createdBy" />
      <EditButton />
    </Datagrid>
  </List>
);


export const UsersEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="users.fields.name" validate={[required()]} />
      <TextInput source="nif" label="users.fields.nif" validate={[required()]} />
      <TextInput source="phone" label="users.fields.phone" />
      <TextInput source="email" label="users.fields.email" />
      <TextInput source="address" label="users.fields.address" />
    </SimpleForm>
  </Edit>
);

export const UsersCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="users.fields.name" validate={[required()]} />
      <TextInput source="nif" label="users.fields.nif" validate={[required()]} />
      <TextInput source="phone" label="users.fields.phone" />
      <TextInput source="email" label="users.fields.email" />
      <TextInput source="address" label="users.fields.address" />
    </SimpleForm>
  </Create>
);
