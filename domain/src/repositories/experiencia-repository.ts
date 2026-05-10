import { ExperienciaBienvenida } from "../entities/experiencia-bienvenida-entity"
import { PreguntaGuiada } from "../entities/pregunta-guiada-entity"

export interface ExperienciaRepository {
  findById(id: string): Promise<ExperienciaBienvenida | null>
  save(experiencia: ExperienciaBienvenida): Promise<void>
}

export interface IPreguntaRepository {
  findByExperienciaId(experienciaId: string): Promise<PreguntaGuiada[]>
  save(pregunta: PreguntaGuiada): Promise<void>
}