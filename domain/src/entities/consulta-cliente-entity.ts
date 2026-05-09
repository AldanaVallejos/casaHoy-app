export type EstadoConsulta = "PENDIENTE" | "CONTACTADO" | "CERRADO"

export class ConsultaCliente {
  constructor(
    public readonly id: string,
    public nombreCliente: string,
    public telefonoCliente: string,
    public mensaje: string,
    public estado: EstadoConsulta,
    public readonly creadoEn: Date,
    public readonly viviendaId?: string,
  ) {}

  estaPendiente(): boolean {
    return this.estado === "PENDIENTE"
  }

  fueContactado(): boolean {
    return this.estado === "CONTACTADO"
  }

  estaCerrado(): boolean {
    return this.estado === "CERRADO"
  }

  avanzarEstado(): void {
    if (this.estado === "PENDIENTE") {
      this.estado = "CONTACTADO"
      return
    }
    if (this.estado === "CONTACTADO") {
      this.estado = "CERRADO"
      return
    }
    throw new Error("La consulta ya está cerrada y no puede avanzar más")
  }

  puedeAvanzar(): boolean {
    return this.estado !== "CERRADO"
  }
}