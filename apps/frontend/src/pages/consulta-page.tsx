import { useState } from "react"
import { FormularioConsulta } from "../components/formulario-consulta/formulario-consulta"
import { crearConsulta } from "../services/consulta-service"

export function PaginaConsulta() {
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  const handleEnviar = async (datos: {
    nombreCliente: string
    telefonoCliente: string
    mensaje: string
  }) => {
    setCargando(true)
    setError(null)
    try {
      await crearConsulta({
        viviendaId: "vivienda-1",
        ...datos
      })
    } catch (e: any) {
      setError(e.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif"
    }}>
      <div>
        <h1 style={{ textAlign: "center", color: "#1e3a5f", marginBottom: "24px" }}>
          🏠 CasaHoy
        </h1>
        {cargando && <p style={{ textAlign: "center", color: "#6b7280" }}>Enviando...</p>}
        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
        <FormularioConsulta
          tituloVivienda="Casa luminosa en Quilmes"
          onEnviar={handleEnviar}
        />
      </div>
    </div>
  )
}