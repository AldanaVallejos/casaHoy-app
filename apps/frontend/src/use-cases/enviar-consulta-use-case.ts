import { crearConsulta } from "../services/consulta-service"

export interface DatosConsulta {
  nombreCliente: string
  telefonoCliente: string
  mensaje: string
}

export interface ResultadoConsulta {
  success: boolean
  error: string | null
}

export async function enviarConsultaUseCase(
  viviendaId: string | null,
  datos: DatosConsulta
): Promise<ResultadoConsulta> {
  try {
    await crearConsulta({
      viviendaId: viviendaId || "vivienda-1",
      ...datos
    })

    return {
      success: true,
      error: null
    }
  } catch (e: any) {
    return {
      success: false,
      error: e.message ?? "Error al enviar la consulta"
    }
  }
}