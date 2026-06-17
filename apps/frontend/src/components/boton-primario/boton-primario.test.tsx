import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BotonPrimario } from './boton-primario'

describe('Renderizado base', () => {

  it('debe renderizar el texto correctamente', () => {
    render(<BotonPrimario texto="Ver viviendas" />)
    expect(screen.getByText('Ver viviendas')).toBeInTheDocument()
  })

  it('debe llamar onClick cuando se hace clic', () => {
    const handleClick = vi.fn()
    render(<BotonPrimario texto="Ver viviendas" onClick={handleClick} />)
    fireEvent.click(screen.getByText('Ver viviendas'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('debe estar deshabilitado cuando deshabilitado es true', () => {
    render(<BotonPrimario texto="No disponible" deshabilitado={true} />)
    expect(screen.getByText('No disponible')).toBeDisabled()
  })

  it('no debe llamar onClick cuando está deshabilitado', () => {
    const handleClick = vi.fn()
    render(<BotonPrimario texto="No disponible" onClick={handleClick} deshabilitado={true} />)
    fireEvent.click(screen.getByText('No disponible'))
    expect(handleClick).not.toHaveBeenCalled()
  })

})