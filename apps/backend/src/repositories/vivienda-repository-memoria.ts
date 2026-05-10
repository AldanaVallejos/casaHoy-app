import { Vivienda } from "../../../../domain/src/entities/vivienda-entity"
import { ViviendaRepository } from "../../../../domain/src/repositories/vivienda-repository"

export class ViviendaRepositoryMemoria implements ViviendaRepository {
  private viviendas: Vivienda[] = []

  async findById(id: string): Promise<Vivienda | null> {
    return this.viviendas.find(v => v.id === id) ?? null
  }

  async save(vivienda: Vivienda): Promise<void> {
    this.viviendas.push(vivienda)
  }

  async delete(id: string): Promise<void> {
    this.viviendas = this.viviendas.filter(v => v.id !== id)
  }
}