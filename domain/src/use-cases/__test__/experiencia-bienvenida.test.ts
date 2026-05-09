import { describe, expect, it } from "vitest"
import { ExperienciaBienvenida } from "../../entities/experiencia-bienvenida-entity"

describe("ExperienciaBienvenida", () => {
    it ("debería crear una experiencia de bienvenida correctamente", () => {
        const experienciabienvenida = new ExperienciaBienvenida(
            "1",
            "Podes tener tu casa hoy",
            "Vviviendas prefabricadas de hormigón",
            "CALIDO",
        );

        expect(experienciabienvenida.titulo).toBe("Podes tener tu casa hoy");
        expect(experienciabienvenida.tono).toBe("CALIDO");
    });
});