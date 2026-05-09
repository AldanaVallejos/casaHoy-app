import { describe, expect, it } from "vitest"
import { PreguntaGuiada } from "../../entities/pregunta-guiada-entity"

describe("PreguntaGuiada", () => {

  describe("creación", () => {
    it("debería crear una pregunta de opción múltiple correctamente", () => {
      const pregunta = new PreguntaGuiada(
        "1",
        "¿Cuántas personas van a vivir en la casa?",
        "OPCION_MULTIPLE",
        "exp-1",
        ["1 persona", "2 a 3 personas", "4 o más personas"],
        1
      )

      expect(pregunta.texto).toBe("¿Cuántas personas van a vivir en la casa?")
      expect(pregunta.tipo).toBe("OPCION_MULTIPLE")
      expect(pregunta.opciones).toHaveLength(3)
      expect(pregunta.orden).toBe(1)
    })

    it("debería crear una pregunta abierta sin opciones", () => {
      const pregunta = new PreguntaGuiada(
        "2",
        "¿En qué barrio o zona te gustaría vivir?",
        "ABIERTA",
        "exp-1",
        [],
        2
      )

      expect(pregunta.esAbierta()).toBe(true)
      expect(pregunta.tieneOpciones()).toBe(false)
    })

    it("debería crear una pregunta de sí/no correctamente", () => {
      const pregunta = new PreguntaGuiada(
        "3",
        "¿Buscás tu primer hogar?",
        "SI_NO",
        "exp-1",
        [],
        3
      )

      expect(pregunta.tipo).toBe("SI_NO")
      expect(pregunta.texto).toBe("¿Buscás tu primer hogar?")
    })
  })

  describe("validarRespuesta", () => {
    it("debería aceptar una opción válida en pregunta múltiple", () => {
      const pregunta = new PreguntaGuiada(
        "4",
        "¿Querés algo cerca del centro?",
        "OPCION_MULTIPLE",
        "exp-1",
        ["Sí, zona céntrica", "Prefiero las afueras", "Me es indistinto"],
        1
      )

      expect(pregunta.validarRespuesta("Sí, zona céntrica")).toBe(true)
    })

    it("debería rechazar una opción que no existe", () => {
      const pregunta = new PreguntaGuiada(
        "5",
        "¿Querés algo cerca del centro?",
        "OPCION_MULTIPLE",
        "exp-1",
        ["Sí, zona céntrica", "Prefiero las afueras", "Me es indistinto"],
        1
      )

      expect(pregunta.validarRespuesta("Otra cosa")).toBe(false)
    })

    it("debería aceptar SI o NO en pregunta de sí/no", () => {
      const pregunta = new PreguntaGuiada(
        "6",
        "¿Tenés hijos o mascotas?",
        "SI_NO",
        "exp-1",
        [],
        2
      )

      expect(pregunta.validarRespuesta("SI")).toBe(true)
      expect(pregunta.validarRespuesta("no")).toBe(true)
      expect(pregunta.validarRespuesta("tal vez")).toBe(false)
    })

    it("debería aceptar cualquier texto no vacío en pregunta abierta", () => {
      const pregunta = new PreguntaGuiada(
        "7",
        "¿Qué es lo más importante para vos en una casa?",
        "ABIERTA",
        "exp-1",
        [],
        3
      )

      expect(pregunta.validarRespuesta("La luz natural y el jardín")).toBe(true)
      expect(pregunta.validarRespuesta("   ")).toBe(false) 
    })
  })
})