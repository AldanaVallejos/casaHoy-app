import { Router, Request, Response } from "express"
import { ViviendaRepositoryMemoria } from "../repositories/vivienda-repository-memoria"
import { CrearVivienda } from "../../../../domain/src/use-cases/vivienda/crear-vivienda"
import { EliminarVivienda } from "../../../../domain/src/use-cases/vivienda/eliminar-vivienda"

const router = Router()
const repo = new ViviendaRepositoryMemoria()

router.post("/", async (req: Request, res: Response) => {
  try {
    const useCase = new CrearVivienda(repo)
    const vivienda = await useCase.execute(req.body)
    res.status(201).json(vivienda)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const useCase = new EliminarVivienda(repo)
    await useCase.execute(req.params.id)
    res.status(200).json({ mensaje: "Vivienda eliminada correctamente" })
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

export default router