import { ConsultaCliente } from "../../entities/consulta-cliente-entity"
import { ConsultaRepository } from "../../repositories/consulta-repository"
import { v4 as uuidv4 } from "uuid"

interface CrearConsultaInput {
  nombreCliente: string
  telefonoCliente: string
  mensaje: string
  viviendaId?: string
}

export class CrearConsulta {
  constructor(private readonly consultaRepo: ConsultaRepository) {}

  async execute(input: CrearConsultaInput): Promise<ConsultaCliente> {
    if (input.nombreCliente.trim().length === 0) {
      throw new Error("El nombre no puede estar vacío")
    }

    if (input.mensaje.trim().length === 0) {
      throw new Error("El mensaje no puede estar vacío")
    }

    const consulta = new ConsultaCliente(
      uuidv4(),            
      input.nombreCliente,   
      input.telefonoCliente, 
      input.mensaje,       
      "PENDIENTE",
      new Date(),       
      input.viviendaId 
    )

    await this.consultaRepo.save(consulta)

    return consulta
  }
}