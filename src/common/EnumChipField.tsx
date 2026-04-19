import { useRecordContext, useTranslate } from "react-admin";
import { Chip } from "@mui/material";

/**
 * Devuelve blanco o negro según el color de fondo, eligiendo el que
 * ofrezca mejor contraste (fórmula YIQ estándar).  Así la etiqueta
 * del chip se lee bien sobre cualquier tono de la paleta.
 */
const contrastText = (hex: string): string => {
    const c = hex.replace("#", "");
    if (c.length !== 3 && c.length !== 6) return "#fff";
    const full =
        c.length === 3
            ? c.split("").map((ch) => ch + ch).join("")
            : c;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 160 ? "#212121" : "#ffffff";
};

/**
 * Como EnumField, pero renderiza el valor como un <Chip> coloreado.
 * `colorMap` indica el color de fondo por cada valor; si no hay
 * entrada para ese valor se usa el color neutral por defecto.
 *
 * Se usa con TabbedCrudView:
 *   {
 *     type: EnumChipField,
 *     props: {
 *       source: "estado",
 *       map: ESTADO_PRESUPUESTO_MAP,
 *       colorMap: ESTADO_PRESUPUESTO_COLORS,
 *       label: "presupuesto.fields.estado",
 *     }
 *   }
 */
export const EnumChipField = (props: {
    source: string;
    map: Record<string | number, string>;
    colorMap: Record<string | number, string>;
    label?: string;
    defaultColor?: string;
}) => {
    const record = useRecordContext();
    const translate = useTranslate();
    if (!record) return null;
    const value = (record as any)[props.source];
    if (value == null) return null;

    const key = props.map[value];
    const bg = props.colorMap[value] ?? props.defaultColor ?? "#9e9e9e";
    const fg = contrastText(bg);

    return (
        <Chip
            size="small"
            label={key ? translate(key) : String(value)}
            sx={{
                backgroundColor: bg,
                color: fg,
                fontWeight: 500,
                borderRadius: "12px",
            }}
        />
    );
};
