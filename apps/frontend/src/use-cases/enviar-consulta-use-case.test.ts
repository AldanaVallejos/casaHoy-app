import { describe, it, expect, vi, beforeEach } from "vitest"
import { enviarConsultaUseCase } from "./enviar-consulta-use-case"
import * as consultaService from "../services/consulta-service"

vi.mock("../services/consulta-service", () => ({
  crearConsulta: vi.fn()
}))

describe("EnviarConsultaUseCase", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("debe llamar al servicio de consultas", async () => {
    const mockCrearConsulta = vi.mocked(
      consultaService.crearConsulta
    )

    mockCrearConsulta.mockResolvedValue(undefined)

    const datos = {
      nombreCliente: "Aldana",
      telefonoCliente: "123456",
      mensaje: "Me interesa"
    }

    await enviarConsultaUseCase("vivienda-1", datos)

    expect(mockCrearConsulta).toHaveBeenCalledTimes(1)

    expect(mockCrearConsulta).toHaveBeenCalledWith({
      viviendaId: "vivienda-1",
      ...datos
    })
  })

  it("debe devolver success cuando el envío es correcto", async () => {
    const mockCrearConsulta = vi.mocked(
      consultaService.crearConsulta
    )

    mockCrearConsulta.mockResolvedValue(undefined)

    const resultado = await enviarConsultaUseCase(
      "vivienda-1",
      {
        nombreCliente: "Aldana",
        telefonoCliente: "123456",
        mensaje: "Me interesa"
      }
    )

    expect(resultado).toEqual({
      success: true,
      error: null
    })
  })

  it("debe devolver error cuando el servicio falla", async () => {
    const mockCrearConsulta = vi.mocked(
      consultaService.crearConsulta
    )

    mockCrearConsulta.mockRejectedValue(
      new Error("Error de red")
    )

    const resultado = await enviarConsultaUseCase(
      "vivienda-1",
      {
        nombreCliente: "Aldana",
        telefonoCliente: "123456",
        mensaje: "Me interesa"
      }
    )

    expect(resultado).toEqual({
      success: false,
      error: "Error de red"
    })

    expect(mockCrearConsulta).toHaveBeenCalledTimes(1)
  })
})