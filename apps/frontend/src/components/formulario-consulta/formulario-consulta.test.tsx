import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FormularioConsulta } from './formulario-consulta'

describe('Renderizado base', () => {
  const PLACEHOLDER_NOMBRE = 'Aldana Vallejos'
  const PLACEHOLDER_TELEFONO = '11-4567-8901'
  const PLACEHOLDER_MENSAJE = 'Me interesa la casa de 3 ambientes...'
  const TEXTO_BOTON = /Enviar consulta/i
  const MENSAJE_EXITO = '¡Consulta enviada!'
  const MENSAJE_CONTACTO = 'Nos pondremos en contacto a la brevedad.'

  const defaultProps = {
    tituloVivienda: 'CasaBox en Rosario',
  }

  const fillForm = (
    nombre = 'Aldana',
    telefono = '11-4567-8901',
    mensaje = 'Me interesa'
  ) => {
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_NOMBRE), {
      target: { value: nombre },
    })
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_TELEFONO), {
      target: { value: telefono },
    })
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_MENSAJE), {
      target: { value: mensaje },
    })
  }

  it('debe mostrar el título de la vivienda', () => {
    render(<FormularioConsulta {...defaultProps} />)
    expect(screen.getByText('CasaBox en Rosario')).toBeInTheDocument()
  })

  it('debe mostrar los campos de entrada y el botón de envío', () => {
    render(<FormularioConsulta {...defaultProps} />)
    expect(screen.getByPlaceholderText(PLACEHOLDER_NOMBRE)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(PLACEHOLDER_TELEFONO)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(PLACEHOLDER_MENSAJE)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: TEXTO_BOTON })).toBeInTheDocument()
  })

  it('debe actualizar los campos al escribir', () => {
    render(<FormularioConsulta {...defaultProps} />)
    const nombreInput = screen.getByPlaceholderText(PLACEHOLDER_NOMBRE)
    const telefonoInput = screen.getByPlaceholderText(PLACEHOLDER_TELEFONO)
    const mensajeInput = screen.getByPlaceholderText(PLACEHOLDER_MENSAJE)

    fireEvent.change(nombreInput, { target: { value: 'Juan' } })
    fireEvent.change(telefonoInput, { target: { value: '15-1234-5678' } })
    fireEvent.change(mensajeInput, { target: { value: 'Quiero más info' } })

    expect(nombreInput).toHaveValue('Juan')
    expect(telefonoInput).toHaveValue('15-1234-5678')
    expect(mensajeInput).toHaveValue('Quiero más info')
  })

  it('debe llamar a onEnviar con los datos correctos al enviar el formulario completo', () => {
    const onEnviarMock = vi.fn()
    render(<FormularioConsulta {...defaultProps} onEnviar={onEnviarMock} />)

    fillForm('Carlos', '11-2222-3333', 'Hola, me gustaria ponerme en contacto')
    fireEvent.click(screen.getByRole('button', { name: TEXTO_BOTON }))

    expect(onEnviarMock).toHaveBeenCalledTimes(1)
    expect(onEnviarMock).toHaveBeenCalledWith({
      nombreCliente: 'Carlos',
      telefonoCliente: '11-2222-3333',
      mensaje: 'Hola, me gustaria ponerme en contacto',
    })
  })

  it('debe mostrar el mensaje de éxito después de enviar', () => {
    const onEnviarMock = vi.fn()
    render(<FormularioConsulta {...defaultProps} onEnviar={onEnviarMock} />)

    fillForm()
    fireEvent.click(screen.getByRole('button', { name: TEXTO_BOTON }))

    expect(screen.getByText(MENSAJE_EXITO)).toBeInTheDocument()
    expect(screen.getByText(MENSAJE_CONTACTO)).toBeInTheDocument()
    expect(screen.queryByPlaceholderText(PLACEHOLDER_NOMBRE)).not.toBeInTheDocument()
  })

  it('no debe llamar a onEnviar si algún campo está vacío', () => {
    const onEnviarMock = vi.fn()
    render(<FormularioConsulta {...defaultProps} onEnviar={onEnviarMock} />)

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_TELEFONO), {
      target: { value: '123' },
    })
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER_MENSAJE), {
      target: { value: 'Mensaje' },
    })
    fireEvent.click(screen.getByRole('button', { name: TEXTO_BOTON }))

    expect(onEnviarMock).not.toHaveBeenCalled()
  })

  it('no debe romperse si onEnviar no está definido', () => {
    render(<FormularioConsulta {...defaultProps} />)
    fillForm()
    expect(() =>
      fireEvent.click(screen.getByRole('button', { name: TEXTO_BOTON }))
    ).not.toThrow()
    expect(screen.getByText(MENSAJE_EXITO)).toBeInTheDocument()
  })

  it('debe coincidir con el snapshot en estado inicial', () => {
    const { container } = render(<FormularioConsulta {...defaultProps} />)
    expect(container).toMatchSnapshot()
  })
})