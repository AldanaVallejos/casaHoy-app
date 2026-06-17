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

export const Enviado: Story = {
  args: {
    tituloVivienda: 'Casa Box',
    mostrarEstadoEnviado: true
  }
}

export const TituloLargo: Story = {
  args: {
    tituloVivienda:
      'Casa de 4 ambientes con jardín, quincho y cochera'
  }
}

export const Cargando = {
  args: {
    tituloVivienda: "Casa Box",
    mostrarEstadoCargando: true
  }
}

export const Error = {
  args: {
    tituloVivienda: "Casa Box",
    mensajeError: "No se pudo enviar la consulta"
  }
}