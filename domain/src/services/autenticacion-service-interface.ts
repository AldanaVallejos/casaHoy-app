export interface IAutenticacionService {
  hashearContrasena(contrasena: string): Promise<string>
  verificarContrasena(contrasena: string, hash: string): Promise<boolean>
}