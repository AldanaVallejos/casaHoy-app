import { describe, expect, it, vi } from "vitest"
import { ObtenerExperiencia } from "./obtener-experiencia"

describe("ObtenerExperiencia", () => {

  const mockExperienciaRepo = {
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn()
  }

  const mockPreguntaRepo = {
    findByExperienciaId: vi.fn(),
    save: vi.fn()
  }

  it("debería retornar la experiencia con sus preguntas ordenadas", async () => {
    mockExperienciaRepo.findById.mockResolvedValue({
      id: "exp-1",
      titulo: "Bienvenido a CasaHoy",
      mensajePrincipal: "Te ayudamos a cumplir tu sueño",
      tono: "cálido"
    })

    mockPreguntaRepo.findByExperienciaId.mockResolvedValue([
      { id: "p2", texto: "¿Cuántos ambientes?", orden: 2, experienciaId: "exp-1" },
      { id: "p1", texto: "¿Buscás tu primer hogar?", orden: 1, experienciaId: "exp-1" },
      { id: "p3", texto: "¿Qué zona preferís?", orden: 3, experienciaId: "exp-1" }
    ])

    const useCase = new ObtenerExperiencia(mockExperienciaRepo, mockPreguntaRepo)
    const resultado = await useCase.execute("exp-1")

    expect(resultado.experiencia.titulo).toBe("Bienvenido a CasaHoy")
    expect(resultado.preguntas).toHaveLength(3)
    expect(resultado.preguntas[0].texto).toBe("¿Buscás tu primer hogar?")
    expect(resultado.preguntas[1].texto).toBe("¿Cuántos ambientes?")
    expect(resultado.preguntas[2].texto).toBe("¿Qué zona preferís?")
  })

  it("debería lanzar error si la experiencia no existe", async () => {
    mockExperienciaRepo.findById.mockResolvedValue(null)

    const useCase = new ObtenerExperiencia(mockExperienciaRepo, mockPreguntaRepo)

    await expect(
      useCase.execute("id-inexistente")
    ).rejects.toThrowError("Experiencia no encontrada")
  })

  it("debería retornar preguntas vacías si no tiene ninguna", async () => {
    mockExperienciaRepo.findById.mockResolvedValue({
      id: "exp-2",
      titulo: "Experiencia sin preguntas",
      mensajePrincipal: "Mensaje",
      tono: "formal"
    })
    mockPreguntaRepo.findByExperienciaId.mockResolvedValue([])

    const useCase = new ObtenerExperiencia(mockExperienciaRepo, mockPreguntaRepo)
    const resultado = await useCase.execute("exp-2")

    expect(resultado.preguntas).toHaveLength(0)
  })

})