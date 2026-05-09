import { ExperienciaBienvenida } from "../entities/experiencia-bienvenida-entity"

export interface ExperienciaRepository {
  findById(id: string): Promise<ExperienciaBienvenida | null>
  findAll(): Promise<ExperienciaBienvenida[]>
  save(experiencia: ExperienciaBienvenida): Promise<void>
  update(experiencia: ExperienciaBienvenida): Promise<void>
}