import { ExperienciaBienvenida } from "../../../../domain/src/entities/experiencia-bienvenida-entity"
import { PreguntaGuiada } from "../../../../domain/src/entities/pregunta-guiada-entity"
import { ExperienciaRepository, IPreguntaRepository } from "../../../../domain/src/repositories/experiencia-repository"

export class ExperienciaRepositoryMemoria implements ExperienciaRepository {
  private experiencias: ExperienciaBienvenida[] = []

  async findById(id: string): Promise<ExperienciaBienvenida | null> {
    return this.experiencias.find(e => e.id === id) ?? null
  }

  async save(experiencia: ExperienciaBienvenida): Promise<void> {
    this.experiencias.push(experiencia)
  }
}

export class PreguntaRepositoryMemoria implements IPreguntaRepository {
  private preguntas: PreguntaGuiada[] = []

  async findByExperienciaId(experienciaId: string): Promise<PreguntaGuiada[]> {
    return this.preguntas.filter(p => p.experienciaId === experienciaId)
  }

  async save(pregunta: PreguntaGuiada): Promise<void> {
    this.preguntas.push(pregunta)
  }
}