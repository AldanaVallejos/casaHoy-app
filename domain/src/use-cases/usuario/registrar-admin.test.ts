import { describe, expect, it, vi } from "vitest"
import { RegistrarAdmin } from "./registrar-admin"

describe("RegistrarAdmin", () => {

  const mockRepo = {
    findByEmail: vi.fn(),
    findById: vi.fn(),
    save: vi.fn()
  }

  const mockServicio = {
    hashearContrasena: vi.fn(),
    verificarContrasena: vi.fn()
  }

  it("debería registrar un admin correctamente", async () => {
    mockRepo.findByEmail.mockResolvedValue(null)  
    mockServicio.hashearContrasena.mockResolvedValue("hash-seguro")

    const useCase = new RegistrarAdmin(mockRepo, mockServicio)

    const admin = await useCase.execute({
      nombre: "Aldana Vallejos",
      email: "aldana@casahoy.com",
      password: "password123"
    })

    expect(admin.nombre).toBe("Aldana Vallejos")
    expect(admin.email).toBe("aldana@casahoy.com")
    expect(admin.password).toBe("hash-seguro")
    expect(admin.rol).toBe("ADMIN")
    expect(mockRepo.save).toHaveBeenCalledOnce()
  })

  it("debería lanzar error si el email ya existe", async () => {
    mockRepo.findByEmail.mockResolvedValue({
      id: "1",
      email: "aldana@casahoy.com"
    })

    const useCase = new RegistrarAdmin(mockRepo, mockServicio)

    await expect(
      useCase.execute({
        nombre: "Aldana",
        email: "aldana@casahoy.com",
        password: "password123"
      })
    ).rejects.toThrowError("Ya existe un usuario con ese email")
  })

})