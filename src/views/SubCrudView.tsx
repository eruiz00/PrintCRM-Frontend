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
import { Box, Button, Paper, Tab, Tabs, Typography } from "@mui/material";

type FormTab = {
    label: string;
    fields?: any[];
    /**
     * Contenido libre que se renderiza FUERA del <SimpleForm>.
     * Cuando una pestaña es "content", la toolbar del formulario
     * se oculta — no estamos editando el registro principal.
     */
    content?: (record: any) => any;
};

interface SubCrudViewProps {
    resource: string;
    parentField: string;
    parentId: number | string;
    columns: any[];
    /** Si no se pasa `formTabs`, se usa `form` en un grid único. */
    form?: any[];
    /** Si se pasa, se renderiza un juego de sub-pestañas encima del form. */
    formTabs?: FormTab[];
    title?: string;
    /**
     * Transformación opcional aplicada a los valores antes del submit
     * (create y update).  Útil para inyectar campos calculados.
     */
    transform?: (data: any, mode: "create" | "update") => any;
}

/**
 * Grid 12-columnas reutilizable.
 */
const FormGrid = ({ fields }: { fields: any[] }) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            rowGap: 0,
            columnGap: 2,
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

/**
 * CRUD de entidades hijas.
 *
 * Filtra el listado por {parentField}_eq = parentId (exact match via treeql)
 * y al crear inyecta automáticamente {parentField: parentId} en los datos.
 *
 * Soporta dos modos de formulario:
 *   - `form` (plano): un único grid de inputs.
 *   - `formTabs` (sub-pestañas): permite organizar el formulario por
 *     secciones e incluso tener una pestaña de "contenido" (p.ej. un
 *     sub-sub-CRUD anidado, como postimpresión dentro de una línea).
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
    formTabs,
    title,
    transform,
}: SubCrudViewProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [activeSubTab, setActiveSubTab] = useState(0);
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
                        setActiveSubTab(0);
                    },
                    onError: (e: any) => {
                        const msg = getErrorMessage(e);
                        notify(msg, {
                            type: "error",
                            messageArgs: { _: msg },
                        });
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
                        setActiveSubTab(0);
                    },
                    onError: (e: any) => {
                        const msg = getErrorMessage(e);
                        notify(msg, {
                            type: "error",
                            messageArgs: { _: msg },
                        });
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
                    setActiveSubTab(0);
                },
                onError: (e: any) => {
                    const msg = getErrorMessage(e);
                    notify(msg, {
                        type: "error",
                        messageArgs: { _: msg },
                    });
                },
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
                    setActiveSubTab(0);
                }}
            />
        </TopToolbar>
    );

    /**
     * Cuando `hide` es true, no se renderiza la toolbar — se usa para
     * ocultar los botones de guardar/borrar/cancelar cuando la
     * sub-pestaña activa es una pestaña de "contenido" (p. ej. el
     * sub-CRUD de postimpresión dentro de una línea), donde no se
     * está editando el registro principal.
     */
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
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

            {/* FORM hijo */}
            {selectedId !== null && (
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {selectedId === 0
                            ? translate("crud.new_line")
                            : translate("crud.edit_line")}
                    </Typography>

                    {formTabs ? (() => {
                        const safeIndex =
                            activeSubTab < formTabs.length ? activeSubTab : 0;
                        const currentTab = formTabs[safeIndex];
                        const isContentTab =
                            typeof currentTab?.content === "function";

                        return (
                            <>
                                {/* Sub-pestañas.  Las de tipo "content" se
                                    deshabilitan cuando todavía no se ha
                                    guardado el registro (selectedId === 0)
                                    porque necesitan un record.id real. */}
                                <Tabs
                                    value={safeIndex}
                                    onChange={(_e, v) => setActiveSubTab(v)}
                                    variant="scrollable"
                                    sx={{ mb: 2 }}
                                >
                                    {formTabs.map((t, i) => {
                                        const disabled =
                                            typeof t.content === "function" &&
                                            (selectedId === 0 || !record);
                                        return (
                                            <Tab
                                                key={i}
                                                label={t.label}
                                                disabled={disabled}
                                            />
                                        );
                                    })}
                                </Tabs>

                                {/* SimpleForm siempre montado (display toggle)
                                    para no perder el estado al cambiar de
                                    sub-pestaña.  Se oculta cuando estamos
                                    en una pestaña de "contenido" y así la
                                    toolbar tampoco aparece. */}
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
                                        {formTabs.map((tab, i) =>
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
                                {isContentTab && record && (
                                    <Box sx={{ width: "100%" }}>
                                        {currentTab.content!(record)}
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
                            <FormGrid fields={form ?? []} />
                        </SimpleForm>
                    )}
                </Paper>
            )}
        </Box>
    );
};
