import { Usuario } from "../../../../domain/src/entities/usuario-entity"
import { UsuarioRepository } from "../../../../domain/src/repositories/user-repository"

export class UsuarioRepositoryMemoria implements UsuarioRepository {
  private usuarios: Usuario[] = []

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarios.find(u => u.email === email) ?? null
  }

  async save(usuario: Usuario): Promise<void> {
    this.usuarios.push(usuario)
  }
}