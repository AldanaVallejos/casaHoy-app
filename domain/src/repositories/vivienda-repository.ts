import { Vivienda } from "../entities/vivienda-entity"

export interface ViviendaRepository {
  findById(id: string): Promise<Vivienda | null>
  save(vivienda: Vivienda): Promise<void>
  delete(id: string): Promise<void>
}