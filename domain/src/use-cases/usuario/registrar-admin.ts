import { Usuario } from "../../entities/usuario-entity"
import { UsuarioRepository } from "../../repositories/user-repository"
import { IAutenticacionService } from "../../services/autenticacion-service-interface"
import { v4 as uuidv4 } from "uuid"

interface RegistrarAdminInput {
  nombre: string
  email: string
  password: string
}

export class RegistrarAdmin {
  constructor(
    private readonly usuarioRepo: UsuarioRepository,
    private readonly autenticacion: IAutenticacionService
  ) {}

  async execute(input: RegistrarAdminInput): Promise<Usuario> {
    const existente = await this.usuarioRepo.findByEmail(input.email)
    if (existente) {
      throw new Error("Ya existe un usuario con ese email")
    }

    const contrasenaHasheada = await this.autenticacion.hashearContrasena(input.password)

    const admin = new Usuario(
      uuidv4(),
      input.nombre,
      input.email,
      contrasenaHasheada,
      "ADMIN"
    )

    await this.usuarioRepo.save(admin)

    return admin
  }
}