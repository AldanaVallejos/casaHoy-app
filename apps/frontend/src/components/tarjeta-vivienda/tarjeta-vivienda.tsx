interface TarjetaViviendaProps {
  titulo: string
  ubicacion: string
  tipo: string
  cantidadAmbientes: number
  onConsultar?: () => void
}

export function TarjetaVivienda({
  titulo,
  ubicacion,
  tipo,
  cantidadAmbientes,
  onConsultar
}: TarjetaViviendaProps) {
  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "24px",
      width: "320px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        backgroundColor: "#eff6ff",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "16px",
        textAlign: "center",
        fontSize: "48px"
      }}>
        🏠
      </div>

      <h3 style={{ margin: "0 0 8px", color: "#1e3a5f", fontSize: "18px" }}>
        {titulo}
      </h3>

      <p style={{ margin: "0 0 4px", color: "#6b7280", fontSize: "14px" }}>
        📍 {ubicacion}
      </p>

      <p style={{ margin: "0 0 4px", color: "#6b7280", fontSize: "14px" }}>
        🏗️ {tipo} · {cantidadAmbientes} ambientes
      </p>

      <p style={{
        margin: "16px 0",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#2563eb"
      }}>

      </p>

      <button
        onClick={onConsultar}
        style={{
          width: "100%",
          backgroundColor: "#2563eb",
          color: "white",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Me interesa
      </button>
    </div>
  )
}