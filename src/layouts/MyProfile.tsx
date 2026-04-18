import { useState } from "react";
import { useGetIdentity, useGetOne, useTranslate } from "react-admin";
import {
    Box,
    Paper,
    Typography,
    Avatar,
    Chip,
    Skeleton,
    Alert,
    Tabs,
    Tab,
    Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import BadgeIcon from "@mui/icons-material/Badge";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import {
    ESTADO_CIVIL_MAP,
    SEXO_MAP,
    AREA_EMPLEADO_MAP,
} from "../common/constants";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const formatDate = (value: any): string => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString();
};

const formatDateTime = (value: any): string => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleString();
};

const imageSrc = (raw: any): string | undefined => {
    if (!raw) return undefined;
    const s = String(raw);
    if (s.startsWith("data:")) return s;
    // El backend suele devolver LONGBLOB como base64
    return `data:image/*;base64,${s}`;
};

/* ------------------------------------------------------------------ */
/*  Field helper                                                       */
/* ------------------------------------------------------------------ */
const Field = ({
    label,
    value,
    colSpan = 4,
}: {
    label: string;
    value?: any;
    colSpan?: number;
}) => {
    const hasValue =
        value !== null &&
        value !== undefined &&
        String(value) !== "" &&
        String(value) !== "null";
    return (
        <Box sx={{ gridColumn: { xs: "span 12", md: `span ${colSpan}` }, mb: 1 }}>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    fontWeight: 600,
                    display: "block",
                }}
            >
                {label}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: hasValue ? "text.primary" : "text.disabled",
                    fontStyle: hasValue ? "normal" : "italic",
                    wordBreak: "break-word",
                }}
            >
                {hasValue ? String(value) : "—"}
            </Typography>
        </Box>
    );
};

const BoolField = ({
    label,
    value,
    yesLabel,
    noLabel,
    colSpan = 4,
}: {
    label: string;
    value?: any;
    yesLabel: string;
    noLabel: string;
    colSpan?: number;
}) => {
    const active = value === true || value === 1 || value === "1";
    return (
        <Box sx={{ gridColumn: { xs: "span 12", md: `span ${colSpan}` }, mb: 1 }}>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    fontWeight: 600,
                    display: "block",
                    mb: 0.5,
                }}
            >
                {label}
            </Typography>
            <Chip
                size="small"
                label={active ? yesLabel : noLabel}
                color={active ? "success" : "default"}
                variant={active ? "filled" : "outlined"}
            />
        </Box>
    );
};

const Section = ({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            mb: 3,
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                color: "primary.main",
            }}
        >
            {icon}
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {title}
            </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                columnGap: 3,
                rowGap: 1,
            }}
        >
            {children}
        </Box>
    </Paper>
);

/* ------------------------------------------------------------------ */
/*  Vista principal                                                    */
/* ------------------------------------------------------------------ */
export const MyProfile = () => {
    const translate = useTranslate();
    const [tab, setTab] = useState(0);
    const { data: identity, isLoading: identityLoading } = useGetIdentity();

    const empleadoId = identity?.id;
    const validId =
        empleadoId !== undefined &&
        empleadoId !== null &&
        empleadoId !== "user" &&
        String(empleadoId) !== "";

    const { data: empleado, isLoading: empleadoLoading, error } = useGetOne(
        "empleado",
        { id: empleadoId as any },
        { enabled: validId }
    );

    /* ---------- Loading ---------- */
    if (identityLoading || (validId && empleadoLoading)) {
        return (
            <Box sx={{ maxWidth: 1100, mx: "auto", p: 3 }}>
                <Skeleton
                    variant="rectangular"
                    height={180}
                    sx={{ borderRadius: 3, mb: 3 }}
                />
                <Skeleton
                    variant="rectangular"
                    height={420}
                    sx={{ borderRadius: 3 }}
                />
            </Box>
        );
    }

    const e: any = empleado ?? {};

    const displayName =
        [e.nombre, e.apellidos].filter(Boolean).join(" ") ||
        identity?.fullName ||
        translate("profile.default_user");

    const initials = (displayName || "U")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((p: string) => p[0]?.toUpperCase())
        .join("");

    const yesLabel = translate("profile.yes");
    const noLabel = translate("profile.no");

    const estadoCivilKey = ESTADO_CIVIL_MAP[e.estadocivil];
    const sexoKey = SEXO_MAP[e.sexo];
    const areaKey = AREA_EMPLEADO_MAP[e.areaempleado];

    return (
        <Box
            sx={{
                maxWidth: 1100,
                mx: "auto",
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {/* HEADER */}
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    background: (t) =>
                        `linear-gradient(135deg, ${t.palette.primary.main}18, transparent)`,
                }}
            >
                <Avatar
                    src={imageSrc(e.imagen)}
                    sx={{
                        width: 104,
                        height: 104,
                        bgcolor: "primary.main",
                        fontSize: 36,
                        fontWeight: 700,
                    }}
                >
                    {initials || "U"}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, lineHeight: 1.1 }}
                        noWrap
                    >
                        {displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {[e.cargo, e.categoriaprofesional].filter(Boolean).join(" · ")}
                    </Typography>
                    <Box sx={{ mt: 1.5, display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {e.numero && (
                            <Chip
                                icon={<BadgeIcon />}
                                label={"#" + e.numero}
                                variant="outlined"
                                size="small"
                            />
                        )}
                        {(identity?.username || e.usuario) && (
                            <Chip
                                icon={<PersonIcon />}
                                label={"@" + (identity?.username ?? e.usuario)}
                                variant="outlined"
                                size="small"
                            />
                        )}
                        {e.correoelectronico && (
                            <Chip
                                icon={<EmailIcon />}
                                label={e.correoelectronico}
                                variant="outlined"
                                size="small"
                            />
                        )}
                        <Chip
                            size="small"
                            icon={e.esactivo ? <CheckCircleIcon /> : <BlockIcon />}
                            label={
                                e.esactivo
                                    ? translate("profile.active")
                                    : translate("profile.blocked")
                            }
                            color={e.esactivo ? "success" : "default"}
                        />
                        {e.bloqueado ? (
                            <Chip
                                size="small"
                                icon={<BlockIcon />}
                                label={translate("profile.blocked")}
                                color="error"
                            />
                        ) : null}
                    </Box>
                </Box>
            </Paper>

            {error && (
                <Alert severity="warning">
                    {translate("profile.loading_error")}
                </Alert>
            )}

            {/* TABS */}
            <Paper elevation={2} sx={{ borderRadius: 3 }}>
                <Tabs
                    value={tab}
                    onChange={(_e, v) => setTab(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                    <Tab
                        icon={<PersonIcon />}
                        iconPosition="start"
                        label={translate("profile.personal")}
                    />
                    <Tab
                        icon={<HomeIcon />}
                        iconPosition="start"
                        label={translate("profile.address_section")}
                    />
                    <Tab
                        icon={<WorkIcon />}
                        iconPosition="start"
                        label={translate("profile.work")}
                    />
                    <Tab
                        icon={<FamilyRestroomIcon />}
                        iconPosition="start"
                        label={translate("profile.family")}
                    />
                    <Tab
                        icon={<AccountBalanceIcon />}
                        iconPosition="start"
                        label={translate("profile.bank")}
                    />
                    <Tab
                        icon={<CheckroomIcon />}
                        iconPosition="start"
                        label={translate("profile.sizes")}
                    />
                    <Tab
                        icon={<NotificationsIcon />}
                        iconPosition="start"
                        label={translate("profile.notifications")}
                    />
                </Tabs>

                <Box sx={{ p: 3 }}>
                    {/* TAB 0: Datos personales + contacto */}
                    {tab === 0 && (
                        <>
                            <Section
                                icon={<PersonIcon />}
                                title={translate("profile.personal")}
                            >
                                <Field
                                    label={translate("profile.numero")}
                                    value={e.numero}
                                    colSpan={3}
                                />
                                <Field
                                    label={translate("profile.name")}
                                    value={e.nombre}
                                    colSpan={4}
                                />
                                <Field
                                    label={translate("profile.last_name")}
                                    value={e.apellidos}
                                    colSpan={5}
                                />
                                <Field
                                    label={translate("profile.nif")}
                                    value={e.cif}
                                    colSpan={3}
                                />
                                <Field
                                    label={translate("profile.birth_date")}
                                    value={formatDate(e.fechanacimiento)}
                                    colSpan={3}
                                />
                                <Field
                                    label={translate("profile.nationality")}
                                    value={e.nacionalidad}
                                    colSpan={3}
                                />
                                <Field
                                    label={translate("profile.gender")}
                                    value={sexoKey ? translate(sexoKey) : e.sexo}
                                    colSpan={3}
                                />
                                <Field
                                    label={translate("profile.marital_status")}
                                    value={
                                        estadoCivilKey
                                            ? translate(estadoCivilKey)
                                            : e.estadocivil
                                    }
                                    colSpan={4}
                                />
                                <Field
                                    label={translate("profile.studies")}
                                    value={e.estudios}
                                    colSpan={8}
                                />
                            </Section>

                            <Section
                                icon={<EmailIcon />}
                                title={translate("profile.contact")}
                            >
                                <Field
                                    label={translate("profile.email")}
                                    value={e.correoelectronico}
                                    colSpan={6}
                                />
                                <Field
                                    label={translate("profile.phone1")}
                                    value={e.telefono1}
                                    colSpan={3}
                                />
                                <Field
                                    label={translate("profile.phone2")}
                                    value={e.telefono2}
                                    colSpan={3}
                                />
                                <Field
                                    label={translate("profile.fax")}
                                    value={e.fax}
                                    colSpan={3}
                                />
                            </Section>
                        </>
                    )}

                    {/* TAB 1: Dirección */}
                    {tab === 1 && (
                        <Section
                            icon={<HomeIcon />}
                            title={translate("profile.address_section")}
                        >
                            <Field
                                label={translate("profile.address")}
                                value={e.domicilio}
                                colSpan={8}
                            />
                            <Field
                                label={translate("profile.postal_code")}
                                value={e.codigopostal}
                                colSpan={4}
                            />
                            <Field
                                label={translate("profile.city")}
                                value={e.localidad}
                                colSpan={6}
                            />
                            <Field
                                label={translate("profile.province")}
                                value={e.provincia}
                                colSpan={6}
                            />
                        </Section>
                    )}

                    {/* TAB 2: Laboral */}
                    {tab === 2 && (
                        <Section
                            icon={<WorkIcon />}
                            title={translate("profile.work")}
                        >
                            <Field
                                label={translate("profile.position")}
                                value={e.cargo}
                                colSpan={4}
                            />
                            <Field
                                label={translate("profile.category")}
                                value={e.categoriaprofesional}
                                colSpan={4}
                            />
                            <Field
                                label={translate("profile.area")}
                                value={areaKey ? translate(areaKey) : e.areaempleado}
                                colSpan={4}
                            />
                            <Field
                                label={translate("profile.contract_type")}
                                value={e.tipocontrato}
                                colSpan={4}
                            />
                            <Field
                                label={translate("profile.contract_end")}
                                value={formatDate(e.fechafincontrato)}
                                colSpan={4}
                            />
                            <Field
                                label={translate("profile.last_access")}
                                value={formatDateTime(e.fechaacceso)}
                                colSpan={4}
                            />
                            <BoolField
                                label={translate("profile.active")}
                                value={e.esactivo}
                                yesLabel={yesLabel}
                                noLabel={noLabel}
                                colSpan={3}
                            />
                            <BoolField
                                label={translate("profile.blocked")}
                                value={e.bloqueado}
                                yesLabel={yesLabel}
                                noLabel={noLabel}
                                colSpan={3}
                            />
                        </Section>
                    )}

                    {/* TAB 3: Familia */}
                    {tab === 3 && (
                        <Section
                            icon={<FamilyRestroomIcon />}
                            title={translate("profile.family")}
                        >
                            <Field
                                label={translate("profile.spouse_name")}
                                value={e.nombreesposa}
                                colSpan={6}
                            />
                            <Field
                                label={translate("profile.spouse_nif")}
                                value={e.nifesposa}
                                colSpan={3}
                            />
                            <Field
                                label={translate("profile.spouse_birth_date")}
                                value={formatDate(e.fechanacimientoesposa)}
                                colSpan={3}
                            />
                        </Section>
                    )}

                    {/* TAB 4: Banco */}
                    {tab === 4 && (
                        <Section
                            icon={<AccountBalanceIcon />}
                            title={translate("profile.bank")}
                        >
                            <Field
                                label={translate("profile.bank_name")}
                                value={e.banco}
                                colSpan={6}
                            />
                            <Field
                                label={translate("profile.bank_address")}
                                value={e.bancodomicilio}
                                colSpan={6}
                            />
                            <Field
                                label={translate("profile.bank_iban")}
                                value={e.bancoiban}
                                colSpan={12}
                            />
                            <Field
                                label={translate("profile.bank_entity")}
                                value={e.bancoentidad}
                                colSpan={3}
                            />
                            <Field
                                label={translate("profile.bank_branch")}
                                value={e.bancosucursal}
                                colSpan={3}
                            />
                            <Field
                                label={translate("profile.bank_dc")}
                                value={e.bancodigitocontrol}
                                colSpan={2}
                            />
                            <Field
                                label={translate("profile.bank_account")}
                                value={e.bancocuenta}
                                colSpan={4}
                            />
                        </Section>
                    )}

                    {/* TAB 5: Tallas */}
                    {tab === 5 && (
                        <Section
                            icon={<CheckroomIcon />}
                            title={translate("profile.sizes")}
                        >
                            <Field
                                label={translate("profile.pants_size")}
                                value={e.tallapantalon}
                                colSpan={4}
                            />
                            <Field
                                label={translate("profile.shirt_size")}
                                value={e.tallacamisa}
                                colSpan={4}
                            />
                            <Field
                                label={translate("profile.shoe_size")}
                                value={e.tallacalzado}
                                colSpan={4}
                            />
                        </Section>
                    )}

                    {/* TAB 6: Notificaciones */}
                    {tab === 6 && (
                        <Section
                            icon={<NotificationsIcon />}
                            title={translate("profile.notifications")}
                        >
                            <BoolField
                                label={translate("profile.mail_quotes")}
                                value={e.usamailpresupuesto}
                                yesLabel={yesLabel}
                                noLabel={noLabel}
                                colSpan={3}
                            />
                            <BoolField
                                label={translate("profile.mail_admin")}
                                value={e.usamailadministracion}
                                yesLabel={yesLabel}
                                noLabel={noLabel}
                                colSpan={3}
                            />
                            <BoolField
                                label={translate("profile.mail_production")}
                                value={e.usamailproduccion}
                                yesLabel={yesLabel}
                                noLabel={noLabel}
                                colSpan={3}
                            />
                            <BoolField
                                label={translate("profile.mail_purchasing")}
                                value={e.usamailcompras}
                                yesLabel={yesLabel}
                                noLabel={noLabel}
                                colSpan={3}
                            />
                        </Section>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};
