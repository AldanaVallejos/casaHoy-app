export type TipoVivienda = "CASA" | "HABITACION" | "DUPLEX"

export class Vivienda {
    constructor(
        public readonly id: string,
        public titulo: string,
        public tipo: TipoVivienda,
        public cantidadAmbientes: number,
        public descripcion?: string,
        public precio?: number,
        public ubicacion?: string,
    ){}
}