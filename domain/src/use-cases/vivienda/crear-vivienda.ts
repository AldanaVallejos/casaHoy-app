import { Vivienda } from "../../entities/vivienda-entity"
import { ViviendaRepository } from "../../repositories/vivienda-repository"
import { v4 as uuidv4 } from "uuid"

interface CrearViviendaInput {
  titulo: string
  ubicacion: string
  tipo: "CASA" | "HABITACION" | "DUPLEX"
  cantidadAmbientes: number
  descripcion?: string
  precio?: number
}

export class CrearVivienda {
  constructor(private readonly viviendaRepo: ViviendaRepository) {}

  async execute(input: CrearViviendaInput): Promise<Vivienda> {


    if (input.cantidadAmbientes <= 0) {
      throw new Error("La cantidad de ambientes debe ser mayor a cero")
    }

    const vivienda = new Vivienda(
      uuidv4(),
      input.titulo,
      input.tipo,
      input.cantidadAmbientes,
      input.descripcion,
      input.precio,
      input.ubicacion,
    )

    await this.viviendaRepo.save(vivienda)

    return vivienda
  }
}