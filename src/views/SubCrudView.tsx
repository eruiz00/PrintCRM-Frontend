import { useState } from "react";
import {
    List,
    Datagrid,
    SimpleForm,
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
 * CRUD de entidades hijas.
 *
 * Filtra el listado por {parentField}_eq = parentId (exact match via treeql)
 * y al crear inyecta automáticamente {parentField: parentId} en los datos.
 *
 * Pensado para usarse dentro de una pestaña (por ejemplo: líneas de un
 * presupuesto).
 */
export const SubCrudView = ({
    resource,
    parentField,
    parentId,
    columns,
    form,
    title,
    transform,
}: {
    resource: string;
    parentField: string;
    parentId: number | string;
    columns: any;
    form: any;
    title?: string;
    /**
     * Transformación opcional aplicada a los valores antes del
     * submit (tanto en create como en update).  Útil para inyectar
     * campos calculados como `fechamodificacion`.
     */
    transform?: (data: any, mode: "create" | "update") => any;
}) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const refresh = useRefresh();
    const notify = useNotify();
    const translate = useTranslate();

    const getErrorMessage = (error: any): string => {
        if (!error) return translate("common.unknown_error");
        if (error.body?.message) return error.body.message;
        if (error.body?.error?.message) return error.body.error.message;
        if (error.message) return error.message;
        return translate("common.unknown_error");
    };

    const { data: record } = useGetOne(
        resource,
        { id: selectedId as any },
        { enabled: !!selectedId }
    );

    const [create] = useCreate();
    const [update] = useUpdate();
    const [deleteOne] = useDelete();

    /* ---------------------------------------------------------
       SUBMIT  (siempre fuerza parentField = parentId)
       --------------------------------------------------------- */
    const handleSubmit = (values: any) => {
        const base = { ...values, [parentField]: parentId };
        const isUpdate = !!(selectedId && selectedId !== 0);
        const data = transform ? transform(base, isUpdate ? "update" : "create") : base;

        if (isUpdate) {
            return update(
                resource,
                { id: selectedId, data, previousData: record },
                {
                    onSuccess: () => {
                        refresh();
                        setSelectedId(null);
                    },
                    onError: (e: any) =>
                        notify(getErrorMessage(e), { type: "error" }),
                }
            );
        } else {
            return create(
                resource,
                { data },
                {
                    onSuccess: () => {
                        refresh();
                        setSelectedId(null);
                    },
                    onError: (e: any) =>
                        notify(getErrorMessage(e), { type: "error" }),
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
                onError: (e: any) =>
                    notify(getErrorMessage(e), { type: "error" }),
            }
        );
    };

    /* ---------------------------------------------------------
       TOOLBARS
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
            {/* LISTA hija */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                {title && (
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {title}
                    </Typography>
                )}

                <List
                    resource={resource}
                    filter={{ [`${parentField}_eq`]: parentId }}
                    actions={<ListActions />}
                    disableSyncWithLocation
                    exporter={false}
                    storeKey={`sub.${resource}.${parentField}.${parentId}`}
                    empty={false}
                >
                    <Datagrid
                        bulkActionButtons={false}
                        rowClick={(id: any) => {
                            setSelectedId(id);
                            return false;
                        }}
                    >
                        {columns.map((col: any, i: number) => (
                            <col.type key={i} {...col.props} />
                        ))}
                    </Datagrid>
                </List>
            </Paper>

            {/* FORM hijo */}
            {selectedId !== null && (
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {selectedId === 0
                            ? translate("crud.new_line")
                            : translate("crud.edit_line")}
                    </Typography>

                    <SimpleForm
                        key={selectedId}
                        record={record}
                        onSubmit={handleSubmit}
                        toolbar={<CustomToolbar />}
                        sx={{ maxWidth: "none", width: "100%", padding: "0" }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(12, 1fr)",
                                rowGap: 0,
                                columnGap: 2,
                                width: "100%",
                            }}
                        >
                            {form.map((field: any, index: number) => {
                                const colSpan =
                                    field.props?.["data-colspan"] || 4;
                                return (
                                    <Box
                                        key={index}
                                        sx={{ gridColumn: `span ${colSpan}` }}
                                    >
                                        {field}
                                    </Box>
                                );
                            })}
                        </Box>
                    </SimpleForm>
                </Paper>
            )}
        </Box>
    );
};
