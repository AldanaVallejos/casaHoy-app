import { pool } from "../../database/conexion"
import { Vivienda } from "../../../../../domain/src/entities/vivienda-entity"
import { ViviendaRepository } from "../../../../../domain/src/repositories/vivienda-repository"

export class ViviendaRepositoryPostgres implements ViviendaRepository {
  async findById(id: string): Promise<Vivienda | null> {
    const result = await pool.query(
      "SELECT * FROM viviendas WHERE id = $1",
      [id]
    )
    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return new Vivienda(
      row.id, row.titulo, row.descripcion,
      row.precio, row.ubicacion, row.tipo,
      row.cantidad_ambientes
    )
  }

  async save(vivienda: Vivienda): Promise<void> {
    await pool.query(
      `INSERT INTO viviendas 
       (id, titulo, descripcion, precio, ubicacion, tipo, cantidad_ambientes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        vivienda.id, vivienda.titulo, vivienda.descripcion,
        vivienda.precio, vivienda.ubicacion, vivienda.tipo,
        vivienda.cantidadAmbientes
      ]
    )
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM viviendas WHERE id = $1", [id])
  }
}