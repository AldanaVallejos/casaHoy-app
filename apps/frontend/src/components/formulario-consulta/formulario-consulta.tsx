import { useState } from "react"

interface FormularioConsultaProps {
  tituloVivienda: string
  mostrarEstadoEnviado?: boolean
  mostrarEstadoCargando?: boolean
  mensajeError?: string
  onEnviar?: (datos: {
    nombreCliente: string
    telefonoCliente: string
    mensaje: string
  }) => void
}

export function FormularioConsulta({
  tituloVivienda,
  mostrarEstadoEnviado = false,
  mostrarEstadoCargando = false,
  mensajeError,
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

  if (mostrarEstadoCargando) {
    return (
      <div className="text-center p-4 text-blue-600 font-semibold">
        <h3>Enviando consulta...</h3>
      </div>
    )
  }

  if (mostrarEstadoEnviado || enviado) {
    return (
      <div className="text-center p-10 font-sans">
        <div className="text-5xl">✅</div>
        <h3 className="text-blue-900">¡Consulta enviada!</h3>
        <p className="text-gray-500">
          Nos pondremos en contacto a la brevedad.
        </p>
      </div>
    )
  }

  return (
    <div className="border-none p-0 w-full font-sans">
      <h3 className="m-0 mb-1 text-blue-900">
        Me interesa esta vivienda
      </h3>
      <p className="m-0 mb-5 text-gray-500 text-sm">
        {tituloVivienda}
      </p>

      {mensajeError && (
        <p className="text-red-500 mb-4">
          {mensajeError}
        </p>
      )}

      <div className="mb-4">
        <label className="block mb-1.5 text-gray-700 text-sm">
          Tu nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Aldana Vallejos"
          className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1.5 text-gray-700 text-sm">
          Tu teléfono
        </label>
        <input
          type="text"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          placeholder="11-4567-8901"
          className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <div className="mb-5">
        <label className="block mb-1.5 text-gray-700 text-sm">
          Tu mensaje
        </label>
        <textarea
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          placeholder="Me interesa la casa de 3 ambientes..."
          rows={4}
          className="w-full p-2.5 border border-gray-300 rounded-lg text-sm resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-3 border-none rounded-lg text-base cursor-pointer font-bold hover:bg-blue-700 transition-colors"
      >
        Enviar consulta
      </button>
    </div>
  )
}