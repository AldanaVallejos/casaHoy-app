import { describe, expect, it, vi } from "vitest"
import { CrearVivienda } from "./crear-vivienda"

describe("CrearVivienda", () => {

  const mockRepo = {
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }

  it("debería crear una vivienda correctamente", async () => {
    mockRepo.save.mockResolvedValue(undefined)

    const useCase = new CrearVivienda(mockRepo)

    const vivienda = await useCase.execute({
      titulo: "Casa Box",
      descripcion: "2 ambientes con jardín",
      ubicacion: "Rosario",
      tipo: "CASA",
      cantidadAmbientes: 2
    })

    expect(vivienda.titulo).toBe("Casa Box")
    expect(vivienda.tipo).toBe("CASA")
    expect(mockRepo.save).toHaveBeenCalledOnce()
  })

  it("debería lanzar error si la cantidad de ambientes es menor o igual a cero", async () => {
    const useCase = new CrearVivienda(mockRepo)

    await expect(
      useCase.execute({
        titulo: "Casa Box",
        descripcion: "descripcion",
        ubicacion: "Capital",
        tipo: "CASA",
        cantidadAmbientes: 0
      })
    ).rejects.toThrowError("La cantidad de ambientes debe ser mayor a cero")
  })

})