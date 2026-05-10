import { describe, expect, it, vi } from "vitest"
import { ListarConsultas } from "./listar-consultas"

describe("ListarConsultas", () => {

  const mockRepo = {
    findById: vi.fn(),
    findAll: vi.fn(),
    findByViviendaId: vi.fn(),
    save: vi.fn(),
    update: vi.fn()
  }

  it("debería retornar todas las consultas", async () => {
    mockRepo.findAll.mockResolvedValue([
      {
        id: "1",
        nombreCliente: "Aldana",
        mensaje: "Me interesa",
        estado: "PENDIENTE"
      },
      {
        id: "2",
        nombreCliente: "Pepe",
        mensaje: "Quiero más info",
        estado: "CONTACTADO"
      }
    ])

    const useCase = new ListarConsultas(mockRepo)
    const consultas = await useCase.execute()

    expect(consultas).toHaveLength(2)
    expect(consultas[0].nombreCliente).toBe("Aldana")
    expect(consultas[1].estado).toBe("CONTACTADO")
  })

  it("debería retornar lista vacía si no hay consultas", async () => {
    mockRepo.findAll.mockResolvedValue([])

    const useCase = new ListarConsultas(mockRepo)
    const consultas = await useCase.execute()

    expect(consultas).toHaveLength(0)
  })

})