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
      className={`
        px-6 py-3 rounded-full font-bold text-base transition-all duration-300
        ${deshabilitado
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-[#2563eb] text-white hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 cursor-pointer"
        }
      `}
    >
      {texto}
    </button>
  )
}