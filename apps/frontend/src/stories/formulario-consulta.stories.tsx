import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormularioConsulta } from '../components/formulario-consulta/formulario-consulta'

const meta = {
  title: 'CasaHoy/FormularioConsulta',
  component: FormularioConsulta,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormularioConsulta>

export default meta
type Story = StoryObj<typeof meta>

export const Vacio: Story = {
  args: {
    tituloVivienda: "Casa Box"
  }
}

export const ConDatos: Story = {
  args: {
    tituloVivienda: "Casa Box",
  }
}