import { RecursoVisual } from "../entities/recurso-visual-entity"

export interface RecursoVisualRepository {
  findById(id: string): Promise<RecursoVisual | null>
  findByViviendaId(viviendaId: string): Promise<RecursoVisual[]>
  save(recurso: RecursoVisual): Promise<void>
  delete(id: string): Promise<void>
}