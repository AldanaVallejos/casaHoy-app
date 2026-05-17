const BASE_URL = "http://localhost:3000"

export async function crearConsulta(datos: {
  viviendaId: string
  nombreCliente: string
  telefonoCliente: string
  mensaje: string
}) {
  const response = await fetch(`${BASE_URL}/consultas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : {}

  if (!response.ok) {
    throw new Error(data.error || "Error al enviar la consulta")
  }

  return data
}