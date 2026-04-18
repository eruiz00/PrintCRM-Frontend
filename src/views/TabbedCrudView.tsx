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
import { Box, Button, Paper, Typography, Tabs, Tab } from "@mui/material";

/**
 * Helper: dado un array de elementos React que traigan la prop
 * `data-colspan`, los coloca en un grid de 12 columnas.
 */
const FormGrid = ({ fields }: { fields: any[] }) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 2,
            maxWidth: "none",
            width: "100%",
        }}
    >
        {fields.map((field: any, index: number) => {
            const colSpan = field?.props?.["data-colspan"] || 4;
            return (
                <Box key={index} sx={{ gridColumn: `span ${colSpan}` }}>
                    {field}
                </Box>
            );
        })}
    </Box>
);

export const TabbedCrudView = ({
    resource,
    filters,
    columns,
    form,
    formTabs,
    title,
    tabs = [],
    transform,
}: any) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [activeSubTab, setActiveSubTab] = useState(0);
    const refresh = useRefresh();
    const notify = useNotify();
    const translate = useTranslate();

    /* ---------------------------------------------------------
       EXTRACTOR DE ERRORES (BACKEND / SQL / RA / RED)
       --------------------------------------------------------- */
    const getErrorMessage = (error: any): string => {
        if (!error) return translate("common.unknown_error");

        if (error.body?.message) return error.body.message;
        if (error.body?.error?.message) return error.body.error.message;
        if (error.message) return error.message;

        return translate("common.unknown_error");
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
        const isEdit = !!(selectedId && selectedId !== 0);
        const data = typeof transform === "function"
            ? transform(values, { previousData: record, isEdit })
            : values;

        if (isEdit) {
            return update(
                resource,
                { id: selectedId, data, previousData: record },
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
                { data },
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
                    setActiveSubTab(0);
                }}
            />
        </TopToolbar>
    );

    /* ---------------------------------------------------------
       TOOLBAR DEL FORMULARIO
       Si `hide` es true, no renderiza nada — se usa para ocultar
       los botones de guardar/borrar/cancelar del registro cuando
       la sub-pestaña activa muestra contenido auxiliar (ej. líneas
       del presupuesto, imágenes del tipo de trabajo…) donde no se
       está editando el registro principal.
       --------------------------------------------------------- */
    const CustomToolbar = ({ hide }: { hide?: boolean } = {}) => {
        if (hide) return null;
        return (
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
                    onClick={() => {
                        setSelectedId(null);
                        setActiveTab(0);
                        setActiveSubTab(0);
                    }}
                    sx={{ ml: 2 }}
                >
                    {translate("common.cancel")}
                </Button>
            </Toolbar>
        );
    };

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
                    <Tab label={translate("crud.list")} />
                    <Tab label={translate("crud.form")} disabled={selectedId === null} />
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
                                setActiveSubTab(0);
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
                        {selectedId === 0
                            ? translate("crud.create_item")
                            : translate("crud.edit_item")}
                    </Typography>

                    {formTabs ? (() => {
                        /* Saneamos el índice por si cambió el nº de pestañas */
                        const safeIndex =
                            activeSubTab < formTabs.length ? activeSubTab : 0;
                        const currentTab = formTabs[safeIndex];
                        const isContentTab =
                            typeof currentTab?.content === "function";

                        return (
                            <>
                                {/* Sub-pestañas del formulario */}
                                <Tabs
                                    value={safeIndex}
                                    onChange={(_e, v) => setActiveSubTab(v)}
                                    variant="scrollable"
                                    sx={{ mb: 2 }}
                                >
                                    {formTabs.map(
                                        (t: { label: string }, i: number) => (
                                            <Tab key={i} label={t.label} />
                                        )
                                    )}
                                </Tabs>

                                {/* Formulario: siempre montado para no perder
                                    el estado al cambiar de sub-pestaña.
                                    Se oculta (display:none) cuando estamos en
                                    una sub-pestaña de contenido, así la
                                    toolbar de guardar/borrar tampoco aparece. */}
                                <Box
                                    sx={{
                                        display: isContentTab ? "none" : "block",
                                        width: "100%",
                                    }}
                                >
                                    <SimpleForm
                                        key={selectedId}
                                        record={record}
                                        onSubmit={handleSubmit}
                                        toolbar={<CustomToolbar />}
                                        sx={{
                                            maxWidth: "none",
                                            width: "100%",
                                            padding: "0",
                                        }}
                                    >
                                        {formTabs.map(
                                            (
                                                tab: {
                                                    label: string;
                                                    fields?: any[];
                                                    content?: (record: any) => any;
                                                },
                                                i: number
                                            ) =>
                                                typeof tab.content === "function" ? null : (
                                                    <Box
                                                        key={i}
                                                        sx={{
                                                            display:
                                                                safeIndex === i
                                                                    ? "block"
                                                                    : "none",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <FormGrid fields={tab.fields ?? []} />
                                                    </Box>
                                                )
                                        )}
                                    </SimpleForm>
                                </Box>

                                {/* Sub-pestaña de contenido: fuera del form */}
                                {isContentTab && (
                                    <Box sx={{ width: "100%" }}>
                                        {currentTab.content(record)}
                                    </Box>
                                )}
                            </>
                        );
                    })() : (
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

            {/* TABS PERSONALIZADAS
                Cada tab puede traer `content` (función) o `render`
                (alias legacy) que recibe el record actual. */}
            {tabs.map((t: any, i: number) => {
                if (activeTab !== i + 2 || !record) return null;
                const renderer = t.content ?? t.render;
                return (
                    <Paper key={i} elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                        {typeof renderer === "function" ? renderer(record) : null}
                    </Paper>
                );
            })}
        </Box>
    );
};
