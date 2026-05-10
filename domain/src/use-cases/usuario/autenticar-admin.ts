import { Usuario } from "../../entities/usuario-entity"
import { UsuarioRepository } from "../../repositories/user-repository"
import { IAutenticacionService } from "../../services/autenticacion-service-interface"

interface AutenticarAdminInput {
  email: string
  contrasena: string
}

export class AutenticarAdmin {
  constructor(
    private readonly usuarioRepo: UsuarioRepository,
    private readonly autenticacion: IAutenticacionService
  ) {}

  async execute(input: AutenticarAdminInput): Promise<Usuario> {
    const admin = await this.usuarioRepo.findByEmail(input.email)
    if (!admin) {
      throw new Error("Credenciales inválidas")
    }

    const contrasenaValida = await this.autenticacion.verificarContrasena(
      input.contrasena,
      admin.password
    )
    if (!contrasenaValida) {
      throw new Error("Credenciales inválidas")
    }

    return admin
  }
}