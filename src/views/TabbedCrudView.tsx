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
} from "react-admin";
import { Box, Button, Paper, Typography, Tabs, Tab } from "@mui/material";

export const TabbedCrudView = ({
    resource,
    filters,
    columns,
    form,
    title,
    tabs = [],
}: any) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const refresh = useRefresh();
    const notify = useNotify();

    /* ---------------------------------------------------------
       EXTRACTOR DE ERRORES (BACKEND / SQL / RA / RED)
       --------------------------------------------------------- */
    const getErrorMessage = (error: any): string => {
        if (!error) return "Error desconocido";

        if (error.body?.message) return error.body.message;
        if (error.body?.error?.message) return error.body.error.message;
        if (error.message) return error.message;

        return "Error desconocido";
    };

    const { data: record } = useGetOne(
        resource,
        { id: selectedId },
        { enabled: !!selectedId }
    );

    const [create] = useCreate();
    const [update] = useUpdate();
    const [deleteOne] = useDelete();

    /* ---------------------------------------------------------
       SUBMIT (CREATE / UPDATE)
       --------------------------------------------------------- */
    const handleSubmit = (values: any) => {
        if (selectedId && selectedId !== 0) {
            return update(
                resource,
                { id: selectedId, data: values, previousData: record },
                {
                    onSuccess: () => {
                        refresh();
                        setSelectedId(null);
                        setActiveTab(0);
                    },
                    onError: (error: any) => {
                        notify(getErrorMessage(error), { type: "error" });
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
                        setActiveTab(0);
                    },
                    onError: (error: any) => {
                        notify(getErrorMessage(error), { type: "error" });
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
                    setActiveTab(0);
                },
                onError: (error: any) => {
                    notify(getErrorMessage(error), { type: "error" });
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
                    setActiveTab(1);
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
                    Borrar
                </Button>
            )}

            <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                    setSelectedId(null);
                    setActiveTab(0);
                }}
                sx={{ ml: 2 }}
            >
                Cancelar
            </Button>
        </Toolbar>
    );

    /* ---------------------------------------------------------
       RENDER
       --------------------------------------------------------- */
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* TABS */}
            <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
                <Tabs
                    value={activeTab}
                    onChange={(_e, v) => setActiveTab(v)}
                    variant="scrollable"
                >
                    <Tab label="Lista" />
                    <Tab label="Formulario" disabled={selectedId === null} />
                    {tabs.map((t: any, i: number) => (
                        <Tab key={i} label={t.label} disabled={!record} />
                    ))}
                </Tabs>
            </Paper>

            {/* TAB 0: LISTA */}
            {activeTab === 0 && (
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
                                setActiveTab(1);
                                return false;
                            }}
                        >
                            {columns.map((col: any, i: number) => (
                                <col.type key={i} {...col.props} />
                            ))}
                        </Datagrid>
                    </List>
                </Paper>
            )}

            {/* TAB 1: FORMULARIO */}
            {activeTab === 1 && selectedId !== null && (
                <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {selectedId === 0 ? "Crear elemento" : "Editar elemento"}
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
                                gap: 2,
                                maxWidth: "none",
                                width: "100%",
                            }}
                        >
                            {form.map((field: any, index: number) => {
                                const colSpan = field.props?.["data-colspan"] || 4;

                                return (
                                    <Box key={index} sx={{ gridColumn: `span ${colSpan}` }}>
                                        {field}
                                    </Box>
                                );
                            })}
                        </Box>
                    </SimpleForm>
                </Paper>
            )}

            {/* TABS PERSONALIZADAS */}
            {tabs.map((t: any, i: number) =>
                activeTab === i + 2 ? (
                    <Paper key={i} elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                        {t.content(record)}
                    </Paper>
                ) : null
            )}
        </Box>
    );
};
