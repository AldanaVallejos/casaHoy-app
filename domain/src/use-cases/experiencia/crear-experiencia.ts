import { ExperienciaBienvenida } from "../../entities/experiencia-bienvenida-entity"
import { ExperienciaRepository } from "../../repositories/experiencia-repository"
import { v4 as uuidv4 } from "uuid"

interface CrearExperienciaInput {
  titulo: string
  mensajePrincipal: string
  tono: "CALIDO" | "FORMAL" | "FAMILIAR"
}

export class CrearExperiencia {
  constructor(private readonly experienciaRepo: ExperienciaRepository) {}

  async execute(input: CrearExperienciaInput): Promise<ExperienciaBienvenida> {
    if (input.titulo.trim().length === 0) {
      throw new Error("El título no puede estar vacío")
    }

    if (input.mensajePrincipal.trim().length === 0) {
      throw new Error("El mensaje principal no puede estar vacío")
    }

    const experiencia = new ExperienciaBienvenida(
      uuidv4(),
      input.titulo,
      input.mensajePrincipal,
      input.tono
    )

    await this.experienciaRepo.save(experiencia)

    return experiencia
  }
}