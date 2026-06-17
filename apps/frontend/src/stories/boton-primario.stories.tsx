import type { Meta, StoryObj } from '@storybook/react-vite'
import { BotonPrimario } from '../components/boton-primario/boton-primario'

const meta = {
  title: 'CasaHoy/Boton',
  component: BotonPrimario,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BotonPrimario>

export default meta
type Story = StoryObj<typeof meta>

export const Primario: Story = {
  args: {
    texto: 'Ver viviendas'
  }
}

export const Deshabilitado: Story = {
  args: {
    texto: 'No disponible',
    deshabilitado: true
  }
}

export const TextoLargo: Story = {
  args: {
    texto: 'Consultar disponibilidad y solicitar información'
  }
}

export const TextoCorto: Story = {
  args: {
    texto: 'OK'
  }
}