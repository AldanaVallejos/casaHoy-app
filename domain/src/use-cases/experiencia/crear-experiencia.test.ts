import { describe, expect, it, vi } from "vitest"
import { CrearExperiencia } from "./crear-experiencia"

describe("CrearExperiencia", () => {

  const mockRepo = {
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn()
  }

  it("debería crear una experiencia correctamente", async () => {
    mockRepo.save.mockResolvedValue(undefined)

    const useCase = new CrearExperiencia(mockRepo)

    const experiencia = await useCase.execute({
      titulo: "Bienvenido a CasaHoy",
      mensajePrincipal: "Te ayudamos a realizar tu sueño",
      tono: "CALIDO"
    })

    expect(experiencia.titulo).toBe("Bienvenido a CasaHoy")
    expect(experiencia.tono).toBe("CALIDO")
    expect(mockRepo.save).toHaveBeenCalledOnce()
  })

  it("debería lanzar error si el título está vacío", async () => {
    const useCase = new CrearExperiencia(mockRepo)

    await expect(
      useCase.execute({
        titulo: "   ",
        mensajePrincipal: "Te ayudamos",
        tono: "FORMAL"
      })
    ).rejects.toThrowError("El título no puede estar vacío")
  })

  it("debería lanzar error si el mensaje principal está vacío", async () => {
    const useCase = new CrearExperiencia(mockRepo)

    await expect(
      useCase.execute({
        titulo: "Bienvenido",
        mensajePrincipal: "   ",
        tono: "FAMILIAR"
      })
    ).rejects.toThrowError("El mensaje principal no puede estar vacío")
  })

})