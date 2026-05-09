export type Tono = "CALIDO" | "FORMAL" | "FAMILIAR"

export class ExperienciaBienvenida {
    constructor(
        public readonly id: string,
        public titulo: string,
        public mensajePrincipal: string,
        public tono: Tono
    ){}
}