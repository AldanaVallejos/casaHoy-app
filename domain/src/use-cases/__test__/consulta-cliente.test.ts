import { describe, expect, it } from "vitest"
import { ConsultaCliente } from "../../entities/consulta-cliente-entity"

describe("ConsultaCliente", () => {

  const crearConsulta = (estado: "PENDIENTE" | "CONTACTADO" | "CERRADO" = "PENDIENTE") => {
    return new ConsultaCliente(
      "1",
      "Aldana Vallejos",
      "11-3456-8776",
      "Me gustaría saber más acerca de la empresa",
      estado,
      new Date("2024-01-15")
    )
  }

  describe("creación", () => {
    it("debería crear una consulta correctamente", () => {
      const consulta = crearConsulta()

      expect(consulta.mensaje).toBe("Me gustaría saber más acerca de la empresa")
      expect(consulta.estado).toBe("PENDIENTE")
      expect(consulta.nombreCliente).toBe("Aldana Vallejos")
      expect(consulta.telefonoCliente).toBe("11-3456-8776")

    })

    it("debería nacer siempre en estado PENDIENTE", () => {
      const consulta = crearConsulta()

      expect(consulta.estaPendiente()).toBe(true)
      expect(consulta.fueContactado()).toBe(false)
      expect(consulta.estaCerrado()).toBe(false)
    })
  })

  describe("avanzarEstado", () => {
    it("debería pasar de PENDIENTE a CONTACTADO", () => {
      const consulta = crearConsulta("PENDIENTE")

      consulta.avanzarEstado()

      expect(consulta.estado).toBe("CONTACTADO")
      expect(consulta.fueContactado()).toBe(true)
    })

    it("debería pasar de CONTACTADO a CERRADO", () => {
      const consulta = crearConsulta("CONTACTADO")

      consulta.avanzarEstado()

      expect(consulta.estado).toBe("CERRADO")
      expect(consulta.estaCerrado()).toBe(true)
    })

    it("debería lanzar un error si se intenta avanzar una consulta CERRADA", () => {
      const consulta = crearConsulta("CERRADO")

      expect(() => consulta.avanzarEstado()).toThrowError(
        "La consulta ya está cerrada y no puede avanzar más"
      )
    })
  })

  describe("puedeAvanzar", () => {
    it("debería retornar true si está PENDIENTE", () => {
      const consulta = crearConsulta("PENDIENTE")
      expect(consulta.puedeAvanzar()).toBe(true)
    })

    it("debería retornar true si está CONTACTADO", () => {
      const consulta = crearConsulta("CONTACTADO")
      expect(consulta.puedeAvanzar()).toBe(true)
    })

    it("debería retornar false si está CERRADO", () => {
      const consulta = crearConsulta("CERRADO")
      expect(consulta.puedeAvanzar()).toBe(false)
    })
  })
})