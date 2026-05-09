import { describe, expect, it } from "vitest";
import { Usuario } from "../../entities/usuario-entity";

describe("Usuario", () => {
    it ("debería crear un usuario correctamente", () => {
        const user = new Usuario(
            "1",
            "Aldana",
            "aldi@gmail.com",
            "123123",
            "ADMIN"
        );

        expect(user.nombre).toBe("Aldana");
        expect(user.rol).toBe("ADMIN");
    });
});