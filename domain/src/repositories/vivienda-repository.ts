import { Vivienda } from "../entities/vivienda-entity"

export interface ViviendaRepository {
  findById(id: string): Promise<Vivienda | null>
  findAll(): Promise<Vivienda[]>
  save(vivienda: Vivienda): Promise<void>
  update(vivienda: Vivienda): Promise<void>
  delete(id: string): Promise<void>
}