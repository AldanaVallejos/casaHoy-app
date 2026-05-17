import { TarjetaVivienda } from "../components/tarjeta-vivienda/tarjeta-vivienda"
import { useState } from "react"

const viviendas = [
  {
    id: "vivienda-1",
    titulo: "Casa Box",
    ubicacion: "Quilmes",
    tipo: "CASA",
    cantidadAmbientes: 2
  },
  {
    id: "vivienda-2",
    titulo: "Casa Box",
    ubicacion: "Capital",
    tipo: "HABITACION",
    cantidadAmbientes: 1
  },
  {
    id: "vivienda-3",
    titulo: "Duplex amplio con jardín",
    ubicacion: "Rosario",
    tipo: "DUPLEX",
    cantidadAmbientes: 2
  }
]

export function PaginaVivienda() {
  const [seleccionada, setSeleccionada] = useState<string | null>(null)

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      padding: "40px 20px",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ textAlign: "center", color: "#1e3a5f", marginBottom: "8px" }}>
        🏠 CasaHoy
      </h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "40px" }}>
        Encontrá tu hogar ideal
      </p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        justifyContent: "center"
      }}>
        {viviendas.map(v => (
          <TarjetaVivienda
            key={v.id}
            titulo={v.titulo}
            ubicacion={v.ubicacion}
            tipo={v.tipo}
            cantidadAmbientes={v.cantidadAmbientes}
            onConsultar={() => setSeleccionada(v.id)}
          />
        ))}
      </div>

      {seleccionada && (
        <p style={{ textAlign: "center", marginTop: "32px", color: "#2563eb" }}>
          ✅ Consulta iniciada para {viviendas.find(v => v.id === seleccionada)?.titulo}
        </p>
      )}
    </div>
  )
}