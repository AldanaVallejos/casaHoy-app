import { describe, expect, it } from "vitest"
import { RecursoVisual } from "../../entities/recurso-visual-entity"

describe("RecursoVisual", () => {

  describe("creación", () => {
    it("debería crear un recurso de tipo IMAGEN correctamente", () => {
      const recurso = new RecursoVisual(
        "1",
        "IMAGEN",
        "/uploads/casas/frente-casa-quilmes.jpg",
        "vivienda-1",
        "Frente de la casa",
        1
      )

      expect(recurso.tipo).toBe("IMAGEN")
      expect(recurso.titulo).toBe("Frente de la casa")
      expect(recurso.viviendaId).toBe("vivienda-1")
      expect(recurso.orden).toBe(1)
    })

    it("debería crear un recurso de tipo VIDEO correctamente", () => {
      const recurso = new RecursoVisual(
        "2",
        "VIDEO",
        "/uploads/videos/recorrido-virtual-casa.mp4",
        "vivienda-1",
        "Recorrido virtual",
        2
      )

      expect(recurso.tipo).toBe("VIDEO")
      expect(recurso.rutaArchivo).toBe("/uploads/videos/recorrido-virtual-casa.mp4")
    })

    it("no debería permitir cambiar el id", () => {
      const recurso = new RecursoVisual(
        "3",
        "IMAGEN",
        "/uploads/casas/jardin.jpg",
        "vivienda-2",
        "Jardín trasero",
        1
      )

      // @ts-expect-error
      expect(() => { recurso.id = "otro-id" }).toThrow()
    })
  })

  describe("métodos helper", () => {
    it("debería identificar correctamente una IMAGEN", () => {
      const recurso = new RecursoVisual(
        "4",
        "IMAGEN",
        "/uploads/casas/cocina.jpg",
        "vivienda-3",
        "Cocina equipada",
        1
      )

      expect(recurso.esImagen()).toBe(true)
      expect(recurso.esVideo()).toBe(false)
    })

    it("debería identificar correctamente un VIDEO", () => {
      const recurso = new RecursoVisual(
        "5",
        "VIDEO",
        "/uploads/videos/exterior.mp4",
        "vivienda-3",
        "Vista exterior",
        2
      )

      expect(recurso.esVideo()).toBe(true)
      expect(recurso.esImagen()).toBe(false)
    })
  })

  describe("esRutaValida", () => {
    it("debería aceptar una ruta con contenido", () => {
      const recurso = new RecursoVisual(
        "6",
        "IMAGEN",
        "/uploads/casas/living.jpg",
        "vivienda-4",
        "Living",
        1
      )

      expect(recurso.esRutaValida()).toBe(true)
    })

    it("debería rechazar una ruta vacía", () => {
      const recurso = new RecursoVisual(
        "7",
        "IMAGEN",
        "   ",
        "vivienda-4",
        "Sin ruta",
        1
      )

      expect(recurso.esRutaValida()).toBe(false)
    })
  })
})