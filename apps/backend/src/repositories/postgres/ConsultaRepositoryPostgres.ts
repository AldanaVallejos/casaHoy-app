import { pool } from "../../database/conexion"
import { ConsultaCliente } from "../../../../../domain/src/entities/consulta-cliente-entity"
import { ConsultaRepository } from "../../../../../domain/src/repositories/consulta-repository"

export class ConsultaRepositoryPostgres implements ConsultaRepository {
  async findAll(): Promise<ConsultaCliente[]> {
    const result = await pool.query(
      "SELECT * FROM consultas ORDER BY creado_en DESC"
    )
    return result.rows.map(row => new ConsultaCliente(
      row.id, row.vivienda_id, row.nombre_cliente,
      row.telefono_cliente, row.mensaje, row.estado,
      row.creado_en
    ))
  }

  async save(consulta: ConsultaCliente): Promise<void> {
    await pool.query(
      `INSERT INTO consultas 
       (id, vivienda_id, nombre_cliente, telefono_cliente, mensaje, estado)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        consulta.id, consulta.viviendaId, consulta.nombreCliente,
        consulta.telefonoCliente, consulta.mensaje, consulta.estado
      ]
    )
  }
}