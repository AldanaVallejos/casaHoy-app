import { ConsultaCliente } from "../../../../domain/src/entities/consulta-cliente-entity"
import { ConsultaRepository } from "../../../../domain/src/repositories/consulta-repository"

export class ConsultaRepositoryMemoria implements ConsultaRepository {
  private consultas: ConsultaCliente[] = []

  async findAll(): Promise<ConsultaCliente[]> {
    return this.consultas
  }

  async save(consulta: ConsultaCliente): Promise<void> {
    this.consultas.push(consulta)
  }
}