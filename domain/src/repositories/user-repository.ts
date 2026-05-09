import { Usuario } from "../entities/usuario-entity"

export interface UsuarioRepository {
  findById(id: string): Promise<Usuario | null>
  findByEmail(email: string): Promise<Usuario | null>
  save(usuario: Usuario): Promise<void>
}