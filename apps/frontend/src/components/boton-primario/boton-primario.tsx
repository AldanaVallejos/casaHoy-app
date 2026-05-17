interface BotonPrimarioProps {
  texto: string
  onClick?: () => void
  deshabilitado?: boolean
}

export function BotonPrimario({ texto, onClick, deshabilitado = false }: BotonPrimarioProps) {
  return (
    <button
      onClick={onClick}
      disabled={deshabilitado}
      style={{
        backgroundColor: deshabilitado ? "#ccc" : "#2563eb",
        color: "white",
        padding: "12px 24px",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: deshabilitado ? "not-allowed" : "pointer",
        fontWeight: "bold"
      }}
    >
      {texto}
    </button>
  )
}