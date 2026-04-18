import { useRecordContext, useTranslate } from "react-admin";

/**
 * Renderiza el valor de `source` en el record actual resolviéndolo
 * contra un diccionario `map` que devuelve CLAVES i18n, y las
 * traduce con el idioma activo.
 *
 * Se usa con TabbedCrudView:
 *   { type: EnumField, props: { source: "estado", map: ESTADO_PRESUPUESTO_MAP, label: "..." } }
 */
export const EnumField = (props: {
    source: string;
    map: Record<string | number, string>;
    label?: string;
}) => {
    const record = useRecordContext();
    const translate = useTranslate();
    if (!record) return null;
    const value = (record as any)[props.source];
    if (value == null) return null;
    const key = props.map[value];
    return <span>{key ? translate(key) : String(value)}</span>;
};
