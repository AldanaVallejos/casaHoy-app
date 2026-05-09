export type TipoRecurso = "IMAGEN" | "VIDEO"

export class RecursoVisual {
  constructor(
    public readonly id: string,
    public tipo: TipoRecurso,
    public rutaArchivo: string,
    public viviendaId: string,
    public titulo: string,
    public orden: number
  ) {}

  esImagen(): boolean {
    return this.tipo === "IMAGEN"
  }

  esVideo(): boolean {
    return this.tipo === "VIDEO"
  }

  esRutaValida(): boolean {
    return this.rutaArchivo.trim().length > 0
  }
}