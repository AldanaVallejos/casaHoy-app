import { ConsultaCliente } from "../entities/consulta-cliente-entity"

export interface ConsultaRepository {
  findById(id: string): Promise<ConsultaCliente | null>
  findAll(): Promise<ConsultaCliente[]>
  findByViviendaId(viviendaId: string): Promise<ConsultaCliente[]>
  save(consulta: ConsultaCliente): Promise<void>
  update(consulta: ConsultaCliente): Promise<void>
}