export const TIPOLINEAS = [
  { id: "Impreso", name: "Impreso" },
  { id: "Plegado", name: "Plegado" },
  { id: "Carpeta", name: "Carpeta" },
  { id: "Cubierta", name: "Cubierta" },
  { id: "Interior", name: "Interior" },
  { id: "Packaging", name: "Packaging" },
  { id: "Etiqueta", name: "Etiqueta" },
] as const;
export const TIPOLINEAS_CHOICES = [...TIPOLINEAS];

/////////////////////////////////////////////////////////////
// ESTADOS DE PRESUPUESTO
// (presupuesto.estado es bigint; ajustar los ids cuando sepamos
//  los valores reales que usa el backend)
export const ESTADO_PRESUPUESTO = [
  { id: 0, name: "Pendiente" },
  { id: 1, name: "Enviado" },
  { id: 2, name: "Aceptado" },
  { id: 3, name: "Rechazado" },
  { id: 4, name: "Anulado" },
  { id: 5, name: "Cerrado" },
] as const;
export const ESTADO_PRESUPUESTO_CHOICES = [...ESTADO_PRESUPUESTO];

export const ESTADO_PRESUPUESTO_MAP: Record<number, string> =
  Object.fromEntries(ESTADO_PRESUPUESTO.map((e) => [e.id, e.name]));

/////////////////////////////////////////////////////////////
// PARTE DE TRABAJO
// Mapea el enum ParteTrabajo (empieza en 0)
export const PARTE_TRABAJO = [
  { id: 0, name: "No definido" },
  { id: 1, name: "Carpeta" },
  { id: 2, name: "Sobrecubierta" },
  { id: 3, name: "Cubierta" },
  { id: 4, name: "Forro" },
  { id: 5, name: "Tapa" },
  { id: 6, name: "Guarda" },
  { id: 7, name: "Interior" },
  { id: 8, name: "Impreso" },
  { id: 9, name: "Sobre" },
  { id: 10, name: "Original" },
  { id: 11, name: "Copia" },
  { id: 12, name: "Postimpresión papel" },
  { id: 13, name: "Postimpresión sobre" },
  { id: 14, name: "Block" },
  { id: 15, name: "Embalaje" },
  { id: 16, name: "Embalaje detallado" },
] as const;
export const PARTE_TRABAJO_CHOICES = [...PARTE_TRABAJO];

export const PARTE_TRABAJO_MAP: Record<number, string> =
  Object.fromEntries(PARTE_TRABAJO.map((p) => [p.id, p.name]));