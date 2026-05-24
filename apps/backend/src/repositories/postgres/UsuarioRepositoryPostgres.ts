import { pool } from "../../database/conexion"
import { Usuario } from "../../../../../domain/src/entities/usuario-entity"
import { UsuarioRepository } from "../../../../../domain/src/repositories/user-repository"

export class UsuarioRepositoryPostgres implements UsuarioRepository {
  async findByEmail(email: string): Promise<Usuario | null> {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    )
    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return new Usuario(row.id, row.nombre, row.email, row.password, row.rol)
  }

  async save(usuario: Usuario): Promise<void> {
    await pool.query(
      "INSERT INTO usuarios (id, nombre, email, password, rol) VALUES ($1, $2, $3, $4, $5)",
      [usuario.id, usuario.nombre, usuario.email, usuario.password, usuario.rol]
    )
  }
}