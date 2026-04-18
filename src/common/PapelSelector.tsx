import { useEffect, useState } from "react";
import {
    useInput,
    useGetOne,
    ListBase,
    Datagrid,
    TextField,
    NumberField,
    Pagination,
    Labeled,
    useListContext,
    useTranslate,
} from "react-admin";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    TextField as MuiTextField,
    InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

/**
 * Input custom para seleccionar un "papel" (soporteid en lineapresrecogidadatos).
 *
 *  - Guarda el id del papel en el form.
 *  - Muestra como texto  "nombregrupo grupo color"  del grupopapel asociado.
 *  - Al hacer clic en "Seleccionar...", abre un modal con dos grids:
 *        izquierda: tabla grupopapel
 *        derecha:   tabla papel filtrada por el grupo seleccionado
 */
export const PapelSelector = (props: {
    source: string;
    label?: string;
    fullWidth?: boolean;
    "data-colspan"?: string;
}) => {
    const { field } = useInput({ source: props.source });
    const [open, setOpen] = useState(false);
    const translate = useTranslate();

    return (
        <Labeled label={props.label ?? "papel.label"} fullWidth>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    minHeight: 40,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    pl: 2,
                    pr: 1,
                    py: 0.5,
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <PapelDisplay papelId={field.value} />
                </Box>

                {field.value ? (
                    <IconButton
                        size="small"
                        onClick={() => field.onChange(null)}
                        title={translate("papel.remove_title")}
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                ) : null}

                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setOpen(true)}
                >
                    {translate("papel.select")}
                </Button>

                <PapelPickerDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    onSelect={(id) => {
                        field.onChange(id);
                        setOpen(false);
                    }}
                />
            </Box>
        </Labeled>
    );
};

/* -------------------------------------------------------------------------
   Display del papel actualmente seleccionado:
   papel.grupopapelid  ->  grupopapel  ->  nombregrupo + grupo + color
   ------------------------------------------------------------------------- */
const PapelDisplay = ({ papelId }: { papelId: any }) => {
    const id = papelId ? Number(papelId) : 0;
    const translate = useTranslate();

    const { data: papel, isLoading: lp } = useGetOne(
        "papel",
        { id },
        { enabled: !!id }
    );
    const grupoId = papel?.grupopapelid ?? 0;
    const { data: grupo, isLoading: lg } = useGetOne(
        "grupopapel",
        { id: grupoId },
        { enabled: !!grupoId }
    );

    if (!papelId) {
        return (
            <Typography variant="body2" color="text.secondary">
                {translate("papel.empty")}
            </Typography>
        );
    }
    if (lp || lg) {
        return (
            <Typography variant="body2" color="text.secondary">
                {translate("papel.loading")}
            </Typography>
        );
    }
    if (!grupo) {
        return (
            <Typography variant="body2">
                {translate("papel.fields.papel")} #{papelId}
                {papel?.papel ? ` - ${papel.papel}` : ""}
            </Typography>
        );
    }

    const display = [grupo.nombregrupo, grupo.grupo, grupo.color]
        .filter(Boolean)
        .join(" ");

    const extras: string[] = [];
    if (papel?.papel) extras.push(String(papel.papel));
    if (papel?.gramaje != null && papel.gramaje !== "")
        extras.push(`${papel.gramaje} g/m²`);
    if (papel?.ancho != null && papel?.alto != null)
        extras.push(`${papel.ancho}×${papel.alto}`);

    return (
        <Typography variant="body2">
            {display || `${translate("papel.fields.papel")} #${papelId}`}
            {extras.length ? ` · ${extras.join(" · ")}` : ""}
        </Typography>
    );
};

/* -------------------------------------------------------------------------
   MODAL: dos grids, grupopapel (izq) + papel (der, filtrado por grupo)
   ------------------------------------------------------------------------- */
const PapelPickerDialog = ({
    open,
    onClose,
    onSelect,
}: {
    open: boolean;
    onClose: () => void;
    onSelect: (papelId: number) => void;
}) => {
    const [grupoId, setGrupoId] = useState<number | null>(null);
    const translate = useTranslate();

    // Reset al abrir
    useEffect(() => {
        if (open) setGrupoId(null);
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            scroll="paper"
        >
            <DialogTitle>{translate("papel.dialog_title")}</DialogTitle>
            <DialogContent dividers sx={{ p: 0 }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.3fr",
                        gap: 0,
                        minHeight: "60vh",
                    }}
                >
                    {/* Grupos */}
                    <Box
                        sx={{
                            borderRight: 1,
                            borderColor: "divider",
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0,
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            {translate("papel.groups_title")}
                        </Typography>
                        <GrupoPapelList
                            selectedId={grupoId}
                            onSelect={setGrupoId}
                        />
                    </Box>

                    {/* Papeles */}
                    <Box
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0,
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            {translate("papel.papers_title")}
                        </Typography>
                        {grupoId ? (
                            <PapelList
                                grupoId={grupoId}
                                onSelect={onSelect}
                            />
                        ) : (
                            <Box
                                sx={{
                                    p: 3,
                                    color: "text.secondary",
                                    fontStyle: "italic",
                                }}
                            >
                                {translate("papel.pick_group_first")}
                            </Box>
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{translate("common.cancel")}</Button>
            </DialogActions>
        </Dialog>
    );
};

/* -------------------------------------------------------------------------
   Grid de grupopapel
   ------------------------------------------------------------------------- */
const GrupoPapelList = ({
    selectedId,
    onSelect,
}: {
    selectedId: number | null;
    onSelect: (id: number) => void;
}) => {
    const translate = useTranslate();
    return (
    <ListBase
        resource="grupopapel"
        perPage={25}
        disableSyncWithLocation
        sort={{ field: "nombregrupo", order: "ASC" }}
        storeKey="papel-selector.grupopapel"
    >
        <SearchBar placeholder={translate("papel.search_group")} />
        <Datagrid
            bulkActionButtons={false}
            rowClick={(id: any) => {
                onSelect(Number(id));
                return false;
            }}
            rowSx={(record: any) =>
                record.id === selectedId
                    ? { backgroundColor: "action.selected" }
                    : {}
            }
            sx={{ "& .RaDatagrid-rowCell": { py: 0.5 } }}
        >
            <TextField source="nombregrupo" label="papel.fields.nombregrupo" />
            <TextField source="grupo" label="papel.fields.grupo" />
            <TextField source="color" label="papel.fields.color" />
        </Datagrid>
        <Pagination rowsPerPageOptions={[25, 50, 100]} />
    </ListBase>
    );
};

/* -------------------------------------------------------------------------
   Grid de papel (filtrado por grupopapelid)
   ------------------------------------------------------------------------- */
const PapelList = ({
    grupoId,
    onSelect,
}: {
    grupoId: number;
    onSelect: (papelId: number) => void;
}) => {
    const translate = useTranslate();
    return (
    <ListBase
        resource="papel"
        filter={{ grupopapelid_eq: grupoId }}
        perPage={25}
        disableSyncWithLocation
        sort={{ field: "gramaje", order: "ASC" }}
        storeKey={`papel-selector.papel.${grupoId}`}
    >
        <SearchBar placeholder={translate("papel.search_paper")} sourceField="papel" />
        <Datagrid
            bulkActionButtons={false}
            rowClick={(id: any) => {
                onSelect(Number(id));
                return false;
            }}
            sx={{ "& .RaDatagrid-rowCell": { py: 0.5 } }}
        >
            <TextField source="papel" label="papel.fields.papel" />
            <NumberField source="gramaje" label="papel.fields.gramaje" />
            <NumberField source="ancho" label="papel.fields.ancho" />
            <NumberField source="alto" label="papel.fields.alto" />
        </Datagrid>
        <Pagination rowsPerPageOptions={[25, 50, 100]} />
    </ListBase>
    );
};

/* -------------------------------------------------------------------------
   Barra de búsqueda con estado local + debounce.
   Evita el remount del Form de react-admin que provocaba pérdida de foco.
   ------------------------------------------------------------------------- */
const SearchBar = ({
    placeholder,
    sourceField = "nombregrupo",
}: {
    placeholder?: string;
    sourceField?: string;
}) => {
    const { setFilters, filterValues } = useListContext();
    const translate = useTranslate();
    const [value, setValue] = useState<string>(
        (filterValues?.[sourceField] as string) ?? ""
    );

    // Debounce: aplica el filtro 250ms después del último cambio.
    useEffect(() => {
        const handle = setTimeout(() => {
            const current = (filterValues?.[sourceField] as string) ?? "";
            if (value === current) return;
            if (value) {
                setFilters(
                    { ...filterValues, [sourceField]: value },
                    {},
                    false
                );
            } else {
                setFilters(
                    Object.fromEntries(
                        Object.entries(filterValues ?? {}).filter(
                            ([k]) => k !== sourceField
                        )
                    ),
                    {},
                    false
                );
            }
        }, 250);
        return () => clearTimeout(handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
            }}
        >
            <MuiTextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder ?? translate("papel.search_default")}
                size="small"
                variant="outlined"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                    endAdornment: value ? (
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                onClick={() => setValue("")}
                                edge="end"
                            >
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
                }}
            />
        </Box>
    );
};
