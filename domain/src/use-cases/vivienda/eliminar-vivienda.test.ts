import { describe, expect, it, vi } from "vitest"
import { EliminarVivienda } from "./eliminar-vivienda"

describe("EliminarVivienda", () => {

  const mockRepo = {
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }

  it("debería eliminar una vivienda existente", async () => {
    mockRepo.findById.mockResolvedValue({ id: "1", titulo: "Casa Box" })
    mockRepo.delete.mockResolvedValue(undefined)

    const useCase = new EliminarVivienda(mockRepo)
    await useCase.execute("1")

    expect(mockRepo.delete).toHaveBeenCalledWith("1")
  })

  it("debería lanzar error si la vivienda no existe", async () => {
    mockRepo.findById.mockResolvedValue(null)

    const useCase = new EliminarVivienda(mockRepo)

    await expect(
      useCase.execute("id-inexistente")
    ).rejects.toThrowError("Vivienda no encontrada")
  })

})