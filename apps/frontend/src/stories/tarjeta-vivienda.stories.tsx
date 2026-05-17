import type { Meta, StoryObj } from '@storybook/react-vite'
import { TarjetaVivienda } from '../components/tarjeta-vivienda/tarjeta-vivienda'

const meta = {
  title: 'CasaHoy/TarjetaVivienda',
  component: TarjetaVivienda,
  parameters: {
    layout: 'centered',
  },                 
  tags: ['autodocs'],
} satisfies Meta<typeof TarjetaVivienda>

export default meta
type Story = StoryObj<typeof meta>

export const Disponible: Story = {
  args: {
    titulo: "Casa Box",
    ubicacion: "Quilmes",
    tipo: "CASA",
    cantidadAmbientes: 3
  }
}

export const Habitacion: Story = {
  args: {
    titulo: "Habitacion",
    ubicacion: "Capital",
    tipo: "HABITACION",
    cantidadAmbientes: 2
  }
}

export const Duplex: Story = {
  args: {
    titulo: "Duplex amplio con jardín",
    ubicacion: "Rosario",
    tipo: "DUPLEX",
    cantidadAmbientes: 2
  }
}