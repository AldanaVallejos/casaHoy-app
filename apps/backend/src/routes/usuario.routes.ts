import { Router, Request, Response } from "express"
import { UsuarioRepositoryPostgres } from "../repositories/postgres/UsuarioRepositoryPostgres"
import { AutenticacionService } from "../../../../domain/src/services/autenticacion-service"
import { RegistrarAdmin } from "../../../../domain/src/use-cases/usuario/registrar-admin"
import { AutenticarAdmin } from "../../../../domain/src/use-cases/usuario/autenticar-admin"

const router = Router()
const repo = new UsuarioRepositoryPostgres()
const servicio = new AutenticacionService()

router.post("/registrar", async (req: Request, res: Response) => {
  try {
    const useCase = new RegistrarAdmin(repo, servicio)
    const admin = await useCase.execute(req.body)
    res.status(201).json(admin)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/autenticar", async (req: Request, res: Response) => {
  try {
    const useCase = new AutenticarAdmin(repo, servicio)
    const admin = await useCase.execute(req.body)
    res.status(200).json(admin)
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
})

export default router