import { describe, expect, it, vi } from "vitest"
import { AutenticarAdmin } from "./autenticar-admin"

describe("AutenticarAdmin", () => {

  const mockRepo = {
    findByEmail: vi.fn(),
    findById: vi.fn(),
    save: vi.fn()
  }

  const mockServicio = {
    hashearContrasena: vi.fn(),
    verificarContrasena: vi.fn()
  }

  it("debería autenticar un admin con credenciales correctas", async () => {
    mockRepo.findByEmail.mockResolvedValue({
      id: "1",
      nombre: "Aldana Vallejos",
      email: "aldana@casahoy.com",
      contrasena: "123456",
      rol: "ADMIN"
    })
    mockServicio.verificarContrasena.mockResolvedValue(true)

    const useCase = new AutenticarAdmin(mockRepo, mockServicio)

    const admin = await useCase.execute({
      email: "aldana@casahoy.com",
      contrasena: "password123"
    })

    expect(admin.email).toBe("aldana@casahoy.com")
    expect(admin.rol).toBe("ADMIN")
    expect(mockServicio.verificarContrasena).toHaveBeenCalledOnce()
  })

  it("debería lanzar error si el email no existe", async () => {
    mockRepo.findByEmail.mockResolvedValue(null)

    const useCase = new AutenticarAdmin(mockRepo, mockServicio)

    await expect(
      useCase.execute({
        email: "noexiste@casahoy.com",
        contrasena: "password123"
      })
    ).rejects.toThrowError("Credenciales inválidas")
  })

  it("debería lanzar error si la contraseña es incorrecta", async () => {
    mockRepo.findByEmail.mockResolvedValue({
      id: "1",
      nombre: "Aldana",
      email: "aldana@casahoy.com",
      contrasena: "123456",
      rol: "ADMIN"
    })
    mockServicio.verificarContrasena.mockResolvedValue(false)

    const useCase = new AutenticarAdmin(mockRepo, mockServicio)

    await expect(
      useCase.execute({
        email: "aldana@casahoy.com",
        contrasena: "passwordIncorrecta"
      })
    ).rejects.toThrowError("Credenciales inválidas")
  })

})