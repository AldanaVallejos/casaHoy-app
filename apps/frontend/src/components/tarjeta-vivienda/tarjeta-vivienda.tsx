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
    <div className="border border-gray-200 rounded-xl p-6 w-80 shadow-md font-sans">
      <div className="bg-blue-50 rounded-lg p-3 mb-4 text-center text-5xl">
        🏠
      </div>

      <h3 className="m-0 mb-2 text-blue-900 text-lg">
        {titulo}
      </h3>

      <p className="m-0 mb-1 text-gray-500 text-sm">
        📍 {ubicacion}
      </p>

      <p className="m-0 mb-1 text-gray-500 text-sm">
        🏗️ {tipo} · {cantidadAmbientes} ambientes
      </p>

      <button
        onClick={onConsultar}
        className="w-full bg-blue-600 text-white p-3 border-none rounded-lg text-base cursor-pointer font-bold"
      >
        Me interesa
      </button>
    </div>
  )
}