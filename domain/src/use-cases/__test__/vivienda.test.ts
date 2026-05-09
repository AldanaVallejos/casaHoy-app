import { describe, expect, it } from "vitest"
import { Vivienda } from "../../entities/vivienda-entity"

describe("Vivienda", () => {
  it("debería crear una casa correctamente", () => {
    const vivienda = new Vivienda (
      "1",
      "Casa Box",
      "CASA",
      2,
      "2 ambientes con jardín",
    )

    expect(vivienda.titulo).toBe("Casa Box")
    expect(vivienda.tipo).toBe("CASA")
    expect(vivienda.cantidadAmbientes).toBe(2)
  })
})