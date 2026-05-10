import { ConsultaCliente } from "../../entities/consulta-cliente-entity"
import { ConsultaRepository } from "../../repositories/consulta-repository"

export class ListarConsultas {
  constructor(private readonly consultaRepo: ConsultaRepository) {}

  async execute(): Promise<ConsultaCliente[]> {
    return this.consultaRepo.findAll()
  }
}