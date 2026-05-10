import { Router, Request, Response } from "express"
import { ConsultaRepositoryMemoria } from "../repositories/consulta-repository-memoria"
import { CrearConsulta } from "../../../../domain/src/use-cases/consulta/crear-consulta"
import { ListarConsultas } from "../../../../domain/src/use-cases/consulta/listar-consultas"

const router = Router()
const repo = new ConsultaRepositoryMemoria()

router.post("/", async (req: Request, res: Response) => {
  try {
    const useCase = new CrearConsulta(repo)
    const consulta = await useCase.execute(req.body)
    res.status(201).json(consulta)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/", async (_req: Request, res: Response) => {
  try {
    const useCase = new ListarConsultas(repo)
    const consultas = await useCase.execute()
    res.status(200).json(consultas)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export default router