export const TIPOLINEAS = [
  { id: "Impreso", name: "enums.tipolinea.impreso" },
  { id: "Plegado", name: "enums.tipolinea.plegado" },
  { id: "Carpeta", name: "enums.tipolinea.carpeta" },
  { id: "Cubierta", name: "enums.tipolinea.cubierta" },
  { id: "Interior", name: "enums.tipolinea.interior" },
  { id: "Packaging", name: "enums.tipolinea.packaging" },
  { id: "Etiqueta", name: "enums.tipolinea.etiqueta" },
] as const;
export const TIPOLINEAS_CHOICES = [...TIPOLINEAS];

/////////////////////////////////////////////////////////////
// ESTADOS DE PRESUPUESTO
// (presupuesto.estado es bigint; ajustar los ids cuando sepamos
//  los valores reales que usa el backend)
export const ESTADO_PRESUPUESTO = [
  { id: 0, name: "enums.estado_presupuesto.pendiente" },
  { id: 1, name: "enums.estado_presupuesto.enviado" },
  { id: 2, name: "enums.estado_presupuesto.aceptado" },
  { id: 3, name: "enums.estado_presupuesto.rechazado" },
  { id: 4, name: "enums.estado_presupuesto.anulado" },
  { id: 5, name: "enums.estado_presupuesto.cerrado" },
] as const;
export const ESTADO_PRESUPUESTO_CHOICES = [...ESTADO_PRESUPUESTO];

// El MAP devuelve la CLAVE i18n; quien lo use debe pasarla por
// useTranslate() para obtener el nombre en el idioma activo.
export const ESTADO_PRESUPUESTO_MAP: Record<number, string> =
  Object.fromEntries(ESTADO_PRESUPUESTO.map((e) => [e.id, e.name]));

/////////////////////////////////////////////////////////////
// PARTE DE TRABAJO
// Mapea el enum ParteTrabajo (empieza en 0)
export const PARTE_TRABAJO = [
  { id: 0, name: "enums.parte_trabajo.no_definido" },
  { id: 1, name: "enums.parte_trabajo.carpeta" },
  { id: 2, name: "enums.parte_trabajo.sobrecubierta" },
  { id: 3, name: "enums.parte_trabajo.cubierta" },
  { id: 4, name: "enums.parte_trabajo.forro" },
  { id: 5, name: "enums.parte_trabajo.tapa" },
  { id: 6, name: "enums.parte_trabajo.guarda" },
  { id: 7, name: "enums.parte_trabajo.interior" },
  { id: 8, name: "enums.parte_trabajo.impreso" },
  { id: 9, name: "enums.parte_trabajo.sobre" },
  { id: 10, name: "enums.parte_trabajo.original" },
  { id: 11, name: "enums.parte_trabajo.copia" },
  { id: 12, name: "enums.parte_trabajo.postimpresion_papel" },
  { id: 13, name: "enums.parte_trabajo.postimpresion_sobre" },
  { id: 14, name: "enums.parte_trabajo.block" },
  { id: 15, name: "enums.parte_trabajo.embalaje" },
  { id: 16, name: "enums.parte_trabajo.embalaje_detallado" },
] as const;
export const PARTE_TRABAJO_CHOICES = [...PARTE_TRABAJO];

export const PARTE_TRABAJO_MAP: Record<number, string> =
  Object.fromEntries(PARTE_TRABAJO.map((p) => [p.id, p.name]));

/////////////////////////////////////////////////////////////
// TIPO ASISTENTE PRESUPUESTO
// Mapea el enum Pascal TTipoAsistentePresupuesto
//   (tapNoDefinido, tapImpreso, tapCarpeta, tapEncuadernado,
//    tapLibro, tapSobre, tapTalonario, tapPostImpresion,
//    tapPreImpresion, tapPackaging, tapPackaging2, tapCarteleria)
// Los ids empiezan en 0.
export const TIPO_ASISTENTE_PRESUPUESTO = [
  { id: 0, name: "enums.tipo_asistente.no_definido" },
  { id: 1, name: "enums.tipo_asistente.impreso" },
  { id: 2, name: "enums.tipo_asistente.carpeta" },
  { id: 3, name: "enums.tipo_asistente.encuadernado" },
  { id: 4, name: "enums.tipo_asistente.libro" },
  { id: 5, name: "enums.tipo_asistente.sobre" },
  { id: 6, name: "enums.tipo_asistente.talonario" },
  { id: 7, name: "enums.tipo_asistente.postimpresion" },
  { id: 8, name: "enums.tipo_asistente.preimpresion" },
  { id: 9, name: "enums.tipo_asistente.packaging" },
  { id: 10, name: "enums.tipo_asistente.packaging2" },
  { id: 11, name: "enums.tipo_asistente.carteleria" },
] as const;
export const TIPO_ASISTENTE_PRESUPUESTO_CHOICES = [...TIPO_ASISTENTE_PRESUPUESTO];

export const TIPO_ASISTENTE_PRESUPUESTO_MAP: Record<number, string> =
  Object.fromEntries(TIPO_ASISTENTE_PRESUPUESTO.map((a) => [a.id, a.name]));
