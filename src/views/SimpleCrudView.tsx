import { useState } from "react";
import {
  List,
  Datagrid,
  SimpleForm,
  TabbedForm,
  useGetOne,
  useCreate,
  useUpdate,
  useRefresh,
  useDelete,
  TopToolbar,
  CreateButton,
  Toolbar,
  SaveButton,
  useNotify,
  useTranslate,
} from "react-admin";
import { Box, Button, Paper, Typography } from "@mui/material";

/**
 * Renderiza un array de inputs dentro de un grid de 12 columnas,
 * respetando la prop `data-colspan` de cada uno.
 */
const FormGrid = ({ fields }: { fields: any[] }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      rowGap: 0,
      columnGap: 2,
      maxWidth: "none",
      width: "100%",
    }}
  >
    {fields.map((field: any, index: number) => {
      const colSpan = field.props?.["data-colspan"] || 4;
      return (
        <Box key={index} sx={{ gridColumn: `span ${colSpan}` }}>
          {field}
        </Box>
      );
    })}
  </Box>
);

export const SimpleCrudView = ({
  resource,
  filters,
  columns,
  form,
  formTabs,
  title,
}: any) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const refresh = useRefresh();
  const notify = useNotify();
  const translate = useTranslate();

  const { data: record } = useGetOne(
    resource,
    { id: selectedId },
    { enabled: !!selectedId }
  );

  const [create] = useCreate();
  const [update] = useUpdate();
  const [deleteOne] = useDelete();

  /* ---------------------------------------------------------
     SUBMIT (DEVUELVE LA PROMESA → RA VALIDA LA RESPUESTA)
     --------------------------------------------------------- */
  const handleSubmit = (values: any) => {
    if (selectedId && selectedId > 0) {
      return update(
        resource,
        { id: selectedId, data: values, previousData: record },
        {
          onSuccess: () => {
            refresh();
            setSelectedId(null);
          },
          onError: (error: any) => {
            notify(error.message || translate("crud.error_update"), { type: "error" });
          },
        }
      );
    } else {
      return create(
        resource,
        { data: values },
        {
          onSuccess: () => {
            refresh();
            setSelectedId(null);
          },
          onError: (error: any) => {
            notify(error.message || translate("crud.error_create"), { type: "error" });
          },
        }
      );
    }
  };

  /* ---------------------------------------------------------
     DELETE
     --------------------------------------------------------- */
  const handleDelete = () => {
    if (!record) return;

    return deleteOne(
      resource,
      { id: record.id, previousData: record },
      {
        onSuccess: () => {
          refresh();
          setSelectedId(null);
        },
        onError: (error: any) => {
          notify(error.message || translate("crud.error_delete"), { type: "error" });
        },
      }
    );
  };

  /* ---------------------------------------------------------
     LIST ACTIONS
     --------------------------------------------------------- */
  const ListActions = () => (
    <TopToolbar>
      <CreateButton
        onClick={(e: any) => {
          e.preventDefault();
          setSelectedId(0);
        }}
      />
    </TopToolbar>
  );

  /* ---------------------------------------------------------
     TOOLBAR DEL FORMULARIO
     --------------------------------------------------------- */
  const CustomToolbar = () => (
    <Toolbar sx={{ p: 2 }}>
      <SaveButton />

      {selectedId !== 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ ml: 2 }}
        >
          {translate("common.delete")}
        </Button>
      )}

      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setSelectedId(null)}
        sx={{ ml: 2 }}
      >
        {translate("common.cancel")}
      </Button>
    </Toolbar>
  );

  /* ---------------------------------------------------------
     RENDER
     --------------------------------------------------------- */
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* LISTA */}
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        {title && (
          <Typography variant="h6" sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}

        <List resource={resource} filters={filters} actions={<ListActions />}>
          <Datagrid
            bulkActionButtons={false}
            rowClick={(id: any) => {
              setSelectedId(id);
              return false;
            }}
          >
            {columns}
          </Datagrid>
        </List>
      </Paper>

      {/* FORMULARIO */}
      {selectedId !== null && (
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          {title && (
            <Typography variant="h6" sx={{ mb: 2 }}>
              {selectedId === 0
                ? translate("crud.create_item")
                : translate("crud.edit_item")}
            </Typography>
          )}

          {formTabs ? (
            <TabbedForm
              key={selectedId}
              record={record}
              onSubmit={handleSubmit}
              toolbar={<CustomToolbar />}
              syncWithLocation={false}
              sx={{ maxWidth: "none", width: "100%", padding: "0" }}
            >
              {formTabs.map((tab: { label: string; fields: any[] }) => (
                <TabbedForm.Tab key={tab.label} label={tab.label}>
                  <FormGrid fields={tab.fields} />
                </TabbedForm.Tab>
              ))}
            </TabbedForm>
          ) : (
            <SimpleForm
              key={selectedId}
              record={record}
              onSubmit={handleSubmit}
              toolbar={<CustomToolbar />}
              sx={{ maxWidth: "none", width: "100%", padding: "0" }}
            >
              <FormGrid fields={form} />
            </SimpleForm>
          )}
        </Paper>
      )}
    </Box>
  );
};
