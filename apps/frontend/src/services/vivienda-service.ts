const BASE_URL = "http://localhost:3000"

export async function crearVivienda(datos: {
  titulo: string
  descripcion: string
  precio: number
  ubicacion: string
  tipo: string
  cantidadAmbientes: number
}) {
  const response = await fetch(`${BASE_URL}/viviendas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  return response.json()
}