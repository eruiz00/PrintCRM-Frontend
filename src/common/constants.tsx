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