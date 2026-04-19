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
// Espejo del enum TSI RSConstDBEstadoPresupuesto:
//   0 "No Definido", 1 Elaboración, 2 Recepción,
//   3 "Pendiente Información", 4 Terminado, 5 Enviado,
//   6 Aceptado, 7 "No Aceptado", 8 "O.T. Emitida",
//   9 Anulado, 10 Caducado, 11 Bloqueado.
export const ESTADO_PRESUPUESTO = [
  { id: 0, name: "enums.estado_presupuesto.no_definido" },
  { id: 1, name: "enums.estado_presupuesto.elaboracion" },
  { id: 2, name: "enums.estado_presupuesto.recepcion" },
  { id: 3, name: "enums.estado_presupuesto.pendiente_informacion" },
  { id: 4, name: "enums.estado_presupuesto.terminado" },
  { id: 5, name: "enums.estado_presupuesto.enviado" },
  { id: 6, name: "enums.estado_presupuesto.aceptado" },
  { id: 7, name: "enums.estado_presupuesto.no_aceptado" },
  { id: 8, name: "enums.estado_presupuesto.ot_emitida" },
  { id: 9, name: "enums.estado_presupuesto.anulado" },
  { id: 10, name: "enums.estado_presupuesto.caducado" },
  { id: 11, name: "enums.estado_presupuesto.bloqueado" },
] as const;
export const ESTADO_PRESUPUESTO_CHOICES = [...ESTADO_PRESUPUESTO];

// El MAP devuelve la CLAVE i18n; quien lo use debe pasarla por
// useTranslate() para obtener el nombre en el idioma activo.
export const ESTADO_PRESUPUESTO_MAP: Record<number, string> =
  Object.fromEntries(ESTADO_PRESUPUESTO.map((e) => [e.id, e.name]));

/**
 * Paleta de colores para el "chip" del estado del presupuesto.
 * Los hex son legibles tanto sobre blanco como sobre oscuro gracias
 * al texto contrastado que calcula EnumChipField.
 */
export const ESTADO_PRESUPUESTO_COLORS: Record<number, string> = {
  0: "#9e9e9e",   // No definido  — gris
  1: "#2196f3",   // Elaboración  — azul
  2: "#03a9f4",   // Recepción    — azul claro
  3: "#ff9800",   // Pendiente info — naranja
  4: "#00bcd4",   // Terminado    — cian
  5: "#673ab7",   // Enviado      — púrpura
  6: "#4caf50",   // Aceptado     — verde
  7: "#f44336",   // No aceptado  — rojo
  8: "#009688",   // O.T. emitida — verde azulado
  9: "#616161",   // Anulado      — gris oscuro
  10: "#795548",  // Caducado     — marrón
  11: "#212121",  // Bloqueado    — casi negro
};

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

/////////////////////////////////////////////////////////////
// ESTADO CIVIL
// (empleado.estadocivil es int; ids asumidos — ajustar si
//  el backend usa valores distintos)
export const ESTADO_CIVIL = [
  { id: 0, name: "enums.estado_civil.no_definido" },
  { id: 1, name: "enums.estado_civil.soltero" },
  { id: 2, name: "enums.estado_civil.casado" },
  { id: 3, name: "enums.estado_civil.divorciado" },
  { id: 4, name: "enums.estado_civil.viudo" },
  { id: 5, name: "enums.estado_civil.pareja_hecho" },
] as const;
export const ESTADO_CIVIL_MAP: Record<number, string> =
  Object.fromEntries(ESTADO_CIVIL.map((e) => [e.id, e.name]));

/////////////////////////////////////////////////////////////
// SEXO
// (empleado.sexo es int; ids asumidos)
export const SEXO = [
  { id: 0, name: "enums.sexo.no_definido" },
  { id: 1, name: "enums.sexo.hombre" },
  { id: 2, name: "enums.sexo.mujer" },
  { id: 3, name: "enums.sexo.otro" },
] as const;
export const SEXO_MAP: Record<number, string> =
  Object.fromEntries(SEXO.map((s) => [s.id, s.name]));

/////////////////////////////////////////////////////////////
// ÁREA EMPLEADO
// Mapea el enum TSI RSConstDBAreaEmpleado (índices 0..14):
//   0 vacío, 1 Administración, 2 Atención Cliente, 3 Recepción,
//   4 Limpieza, 5 Vigilancia, 6 Impresión, 7 Pre-Impresión,
//   8 Post-Impresión, 9 Mantenimiento, 10 Informática,
//   11 Transportes, 12 Almacén, 13 Producción, 14 Otros.
export const AREA_EMPLEADO = [
  { id: 0, name: "enums.area_empleado.no_definido" },
  { id: 1, name: "enums.area_empleado.administracion" },
  { id: 2, name: "enums.area_empleado.atencion_cliente" },
  { id: 3, name: "enums.area_empleado.recepcion" },
  { id: 4, name: "enums.area_empleado.limpieza" },
  { id: 5, name: "enums.area_empleado.vigilancia" },
  { id: 6, name: "enums.area_empleado.impresion" },
  { id: 7, name: "enums.area_empleado.preimpresion" },
  { id: 8, name: "enums.area_empleado.postimpresion" },
  { id: 9, name: "enums.area_empleado.mantenimiento" },
  { id: 10, name: "enums.area_empleado.informatica" },
  { id: 11, name: "enums.area_empleado.transportes" },
  { id: 12, name: "enums.area_empleado.almacen" },
  { id: 13, name: "enums.area_empleado.produccion" },
  { id: 14, name: "enums.area_empleado.otros" },
] as const;
export const AREA_EMPLEADO_MAP: Record<number, string> =
  Object.fromEntries(AREA_EMPLEADO.map((a) => [a.id, a.name]));

/////////////////////////////////////////////////////////////
// TIPO PROCESO PLANTA
// Espejo parcial del enum TSI RSConstDBTipoProcesoPlanta.
// Para "postimpresión" sólo interesan los valores 20-23:
//    20 tppImpresionPostProceso
//    21 tppPostImpGuillotinaPrep
//    22 tppPostImpEnvioExterno
//    23 tppPostImpProceso
// Se usa para filtrar postimpresionclase en el sub-CRUD de
// líneas de postimpresión de cada línea del presupuesto.
export const TIPO_PROCESO_PLANTA_POSTIMP_IDS = [20, 21, 22, 23] as const;

export const TIPO_PROCESO_PLANTA_POSTIMP = [
  { id: 20, name: "enums.tipo_proceso_planta.impresion_post_proceso" },
  { id: 21, name: "enums.tipo_proceso_planta.postimp_guillotina_prep" },
  { id: 22, name: "enums.tipo_proceso_planta.postimp_envio_externo" },
  { id: 23, name: "enums.tipo_proceso_planta.postimp_proceso" },
] as const;

export const TIPO_PROCESO_PLANTA_POSTIMP_MAP: Record<number, string> =
  Object.fromEntries(TIPO_PROCESO_PLANTA_POSTIMP.map((t) => [t.id, t.name]));
