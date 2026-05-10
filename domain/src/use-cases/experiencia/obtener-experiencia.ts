import { ExperienciaBienvenida } from "../../entities/experiencia-bienvenida-entity"
import { PreguntaGuiada } from "../../entities/pregunta-guiada-entity"
import { ExperienciaRepository, IPreguntaRepository } from "../../repositories/experiencia-repository"

interface ObtenerExperienciaOutput {
  experiencia: ExperienciaBienvenida
  preguntas: PreguntaGuiada[]
}

export class ObtenerExperiencia {
  constructor(
    private readonly experienciaRepo: ExperienciaRepository,
    private readonly preguntaRepo: IPreguntaRepository
  ) {}

  async execute(id: string): Promise<ObtenerExperienciaOutput> {
    const experiencia = await this.experienciaRepo.findById(id)
    if (!experiencia) {
      throw new Error("Experiencia no encontrada")
    }

    const preguntas = await this.preguntaRepo.findByExperienciaId(id)

    const preguntasOrdenadas = preguntas.sort((a, b) => a.orden - b.orden)

    return {
      experiencia,
      preguntas: preguntasOrdenadas
    }
  }
}