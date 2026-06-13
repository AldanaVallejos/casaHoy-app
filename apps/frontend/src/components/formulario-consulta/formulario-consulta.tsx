import { useState } from "react"

interface FormularioConsultaProps {
  tituloVivienda: string
  onEnviar?: (datos: {
    nombreCliente: string
    telefonoCliente: string
    mensaje: string
  }) => void
}

export function FormularioConsulta({
  tituloVivienda,
  onEnviar
}: FormularioConsultaProps) {
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = () => {
    if (!nombre || !telefono || !mensaje) return

    onEnviar?.({
      nombreCliente: nombre,
      telefonoCliente: telefono,
      mensaje
    })

    setEnviado(true)
  }

  if (enviado) {
    return (
      <div style={{
        textAlign: "center",
        padding: "40px",
        fontFamily: "sans-serif"
      }}>
        <div style={{ fontSize: "48px" }}>✅</div>
        <h3 style={{ color: "#1e3a5f" }}>¡Consulta enviada!</h3>
        <p style={{ color: "#6b7280" }}>
          Nos pondremos en contacto a la brevedad.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      border: "none",
      padding: "0",
      width: "100%",
      fontFamily: "sans-serif"
    }}>
      <h3 style={{ margin: "0 0 4px", color: "#1e3a5f" }}>
        Me interesa esta vivienda
      </h3>
      <p style={{ margin: "0 0 20px", color: "#6b7280", fontSize: "14px" }}>
        {tituloVivienda}
      </p>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontSize: "14px" }}>
          Tu nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Aldana Vallejos"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "14px",
            boxSizing: "border-box"
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontSize: "14px" }}>
          Tu teléfono
        </label>
        <input
          type="text"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          placeholder="11-4567-8901"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "14px",
            boxSizing: "border-box"
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "6px", color: "#374151", fontSize: "14px" }}>
          Tu mensaje
        </label>
        <textarea
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          placeholder="Me interesa la casa de 3 ambientes..."
          rows={4}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "14px",
            boxSizing: "border-box",
            resize: "none"
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
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
        Enviar consulta
      </button>
    </div>
  )
}