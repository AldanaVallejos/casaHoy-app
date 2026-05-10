import { ViviendaRepository } from "../../repositories/vivienda-repository"

export class EliminarVivienda {
  constructor(private readonly viviendaRepo: ViviendaRepository) {}

  async execute(id: string): Promise<void> {
    const vivienda = await this.viviendaRepo.findById(id)
    if (!vivienda) {
      throw new Error("Vivienda no encontrada")
    }
    await this.viviendaRepo.delete(id)
  }
}