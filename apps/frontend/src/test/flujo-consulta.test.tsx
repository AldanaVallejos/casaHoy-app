import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TarjetaVivienda } from '../components/tarjeta-vivienda/tarjeta-vivienda'
import { FormularioConsulta } from '../components/formulario-consulta/formulario-consulta'
import * as consultaService from "../services/consulta-service"

vi.mock('../services/consulta-service', () => ({
  crearConsulta: vi.fn(),
}))

type ConsultaData = {
  nombreCliente: string
  telefonoCliente: string
  mensaje: string
}

const PaginaVivienda = () => {
  const [mostrarFormulario, setMostrarFormulario] = React.useState(false)
  const [titulo] = React.useState('Casa en Palermo')
  const [mensajeExito, setMensajeExito] = React.useState(false)

  const handleConsultar = () => {
    setMostrarFormulario(true)
  }

  const handleEnviar = async (datos : ConsultaData) => {
    await consultaService.crearConsulta({ ...datos, viviendaId: titulo })
    setMensajeExito(true)
  }

  return (
    <div>
      {!mostrarFormulario ? (
        <TarjetaVivienda
          titulo={titulo}
          ubicacion="Calle Falsa 123"
          tipo="Casa"
          cantidadAmbientes={3}
          onConsultar={handleConsultar}
        />
      ) : (
        <FormularioConsulta
          tituloVivienda={titulo}
          onEnviar={handleEnviar}
        />
      )}
      {mensajeExito && <p data-testid="exito">¡Consulta enviada con éxito!</p>}
    </div>
  )
}

describe('Flujo de consulta (integración)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe permitir al usuario consultar una vivienda y enviar el formulario', async () => {
    const mockCrearConsulta = vi.mocked(consultaService.crearConsulta)
    mockCrearConsulta.mockResolvedValue({ id: 1 })

    render(<PaginaVivienda />)

    expect(screen.getByText('Casa en Palermo')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Me interesa'))

    expect(screen.getByText('Me interesa esta vivienda')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Aldana Vallejos')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Aldana Vallejos'), {
      target: { value: 'Juan Pérez' },
    })
    fireEvent.change(screen.getByPlaceholderText('11-4567-8901'), {
      target: { value: '11-2222-3333' },
    })
    fireEvent.change(screen.getByPlaceholderText('Me interesa la casa de 3 ambientes...'), {
      target: { value: 'Quiero visitarla' },
    })

    fireEvent.click(screen.getByText('Enviar consulta'))

    await waitFor(() => {
      expect(mockCrearConsulta).toHaveBeenCalledTimes(1)
      expect(mockCrearConsulta).toHaveBeenCalledWith({
        nombreCliente: 'Juan Pérez',
        telefonoCliente: '11-2222-3333',
        mensaje: 'Quiero visitarla',
        viviendaId: 'Casa en Palermo',
      })
    })

    expect(screen.getByTestId('exito')).toHaveTextContent('¡Consulta enviada con éxito!')
  })
})