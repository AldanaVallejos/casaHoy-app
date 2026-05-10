import { ConsultaCliente } from "../entities/consulta-cliente-entity"

export interface ConsultaRepository {
  findAll(): Promise<ConsultaCliente[]>
  save(consulta: ConsultaCliente): Promise<void>
}