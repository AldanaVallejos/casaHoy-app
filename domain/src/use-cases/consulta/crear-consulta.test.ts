import { describe, expect, it, vi, beforeEach } from "vitest"
import { CrearConsulta } from "./crear-consulta"
import { ConsultaRepository } from "../../repositories/consulta-repository"

describe("CrearConsulta", () => {
  
  const mockRepo = {
    findById: vi.fn(),
    findAll: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
  } as unknown as ConsultaRepository

  it("debería crear una consulta correctamente", async () => {
    
    vi.mocked(mockRepo.save).mockResolvedValue(undefined)

    const useCase = new CrearConsulta(mockRepo)

    const input = {
      nombreCliente: "Aldana Vallejos",
      telefonoCliente: "11-4567-8901",
      mensaje: "Quiero tener mi casa. Como puedo hacer?",
      viviendaId: "house-123" 
    }

    const consulta = await useCase.execute(input)

    expect(consulta.nombreCliente).toBe("Aldana Vallejos")
    expect(consulta.telefonoCliente).toBe("11-4567-8901")
    expect(consulta.mensaje).toBe(input.mensaje)
    
    expect(consulta.estado).toBe("PENDIENTE")
    expect(consulta.creadoEn).toBeInstanceOf(Date)
    expect(consulta.viviendaId).toBe("house-123")
    
    expect(mockRepo.save).toHaveBeenCalledOnce()
    expect(mockRepo.save).toHaveBeenCalledWith(consulta)
  })

  it("debería lanzar error si el mensaje está vacío", async () => {
    const useCase = new CrearConsulta(mockRepo)

    await expect(
      useCase.execute({
        nombreCliente: "Aldana",
        telefonoCliente: "11-4567-8901",
        mensaje: "   "
      })
    ).rejects.toThrowError("El mensaje no puede estar vacío")
    
    expect(mockRepo.save).not.toHaveBeenCalled()
  })

  it("debería lanzar error si el nombre está vacío", async () => {
    const useCase = new CrearConsulta(mockRepo)

    await expect(
      useCase.execute({
        nombreCliente: "   ",
        telefonoCliente: "11-4567-8901",
        mensaje: "Me interesa saber de Casa Hoy"
      })
    ).rejects.toThrowError("El nombre no puede estar vacío")

    expect(mockRepo.save).not.toHaveBeenCalled()
  })
})