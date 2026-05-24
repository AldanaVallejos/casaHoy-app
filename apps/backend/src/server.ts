import app from "./app"
import { crearTablas } from "./database/schema"

const PORT = 3000

async function main() {
  await crearTablas()
  app.listen(PORT, () => {
    console.log(`🏠 CasaHoy API corriendo en http://localhost:${PORT}`)
  })
}

main()