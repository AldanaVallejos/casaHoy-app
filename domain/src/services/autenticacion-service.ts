import bcrypt from "bcryptjs"
import { IAutenticacionService } from "./autenticacion-service-interface"

export class AutenticacionService implements IAutenticacionService {
  private readonly saltRounds = 10

  async hashearContrasena(contrasena: string): Promise<string> {
    return bcrypt.hash(contrasena, this.saltRounds)
  }

  async verificarContrasena(contrasena: string, hash: string): Promise<boolean> {
    return bcrypt.compare(contrasena, hash)
  }
}