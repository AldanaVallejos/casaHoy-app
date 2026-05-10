import { Router, Request, Response } from "express"
import { ExperienciaRepositoryMemoria, PreguntaRepositoryMemoria } from "../repositories/experiencia-repository-memoria"
import { CrearExperiencia } from "../../../../domain/src/use-cases/experiencia/crear-experiencia"
import { ObtenerExperiencia } from "../../../../domain/src/use-cases/experiencia/obtener-experiencia"

const router = Router()
const experienciaRepo = new ExperienciaRepositoryMemoria()
const preguntaRepo = new PreguntaRepositoryMemoria()

router.post("/", async (req: Request, res: Response) => {
  try {
    const useCase = new CrearExperiencia(experienciaRepo)
    const experiencia = await useCase.execute(req.body)
    res.status(201).json(experiencia)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const useCase = new ObtenerExperiencia(experienciaRepo, preguntaRepo)
    const resultado = await useCase.execute(req.params.id as string)
    res.status(200).json(resultado)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

export default router