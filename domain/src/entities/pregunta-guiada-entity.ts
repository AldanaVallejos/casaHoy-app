export type TipoPregunta = "OPCION_MULTIPLE" | "ABIERTA" | "SI_NO"

export class PreguntaGuiada {
  constructor(
    public readonly id: string,
    public texto: string,
    public tipo: TipoPregunta,
    public experienciaId: string,
    public opciones: string[],
    public orden: number
  ) {}

  esAbierta(): boolean {
    return this.tipo === "ABIERTA"
  }

  tieneOpciones(): boolean {
    return this.opciones.length > 0
  }

  validarRespuesta(respuesta: string): boolean {
    if (this.tipo === "ABIERTA") return respuesta.trim().length > 0
    if (this.tipo === "SI_NO") return ["SI", "NO"].includes(respuesta.toUpperCase())
    return this.opciones.includes(respuesta)
  }
}