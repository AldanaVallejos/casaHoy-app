import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TarjetaVivienda } from './tarjeta-vivienda'

describe('Renderizado base', () => {
  const defaultProps = {
    titulo: 'CasaBox',
    ubicacion: 'Calle Falsa 123',
    tipo: 'Box',
    cantidadAmbientes: 3,
  }

  it('debe renderizar el título correctamente', () => {
    render(<TarjetaVivienda {...defaultProps} />)
    expect(screen.getByText('CasaBox')).toBeInTheDocument()
  })

  it('debe renderizar la ubicación correctamente', () => {
    render(<TarjetaVivienda {...defaultProps} />)
    expect(screen.getByText(/Calle Falsa 123/)).toBeInTheDocument()
  })

  it('debe renderizar el tipo y la cantidad de ambientes correctamente', () => {
    render(<TarjetaVivienda {...defaultProps} />)
    expect(screen.getByText(/Box · 3 ambientes/)).toBeInTheDocument()
  })

  it('debe mostrar el botón "Me interesa"', () => {
    render(<TarjetaVivienda {...defaultProps} />)
    const button = screen.getByRole('button', { name: /me interesa/i })
    expect(button).toBeInTheDocument()
  })

  it('debe llamar a onConsultar cuando se hace clic en el botón', () => {
    const handleConsultar = vi.fn()
    render(<TarjetaVivienda {...defaultProps} onConsultar={handleConsultar} />)
    const button = screen.getByRole('button', { name: /me interesa/i })
    fireEvent.click(button)
    expect(handleConsultar).toHaveBeenCalledTimes(1)
  })

  it('no debe romperse si onConsultar no está definido', () => {
    render(<TarjetaVivienda {...defaultProps} />)
    const button = screen.getByRole('button', { name: /me interesa/i })
    expect(() => fireEvent.click(button)).not.toThrow()
  })

  it('debe mostrar el emoji de casa', () => {
    render(<TarjetaVivienda {...defaultProps} />)
    expect(screen.getByText('🏠')).toBeInTheDocument()
  })
})