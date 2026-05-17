const express = require("express")
const { Router } = require("express")
const  corsModule  = require("cors")
const cors = corsModule.default || corsModule
import { Request, Response } from "express"
import usuarioRoutes from "./routes/usuario.routes"
import viviendaRoutes from "./routes/vivienda.routes"
import consultaRoutes from "./routes/consulta.routes"
import experienciaRoutes from "./routes/experiencia.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/usuarios", usuarioRoutes)
app.use("/viviendas", viviendaRoutes)
app.use("/consultas", consultaRoutes)
app.use("/experiencias", experienciaRoutes)

app.get("/", (_req: Request, res: Response) => {
  res.json({ mensaje: "🏠 CasaHoy API funcionando correctamente" })
})

export default app