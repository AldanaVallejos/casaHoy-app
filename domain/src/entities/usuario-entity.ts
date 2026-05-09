export class Usuario{
    constructor(
        public readonly id: string,
        public nombre: string,
        public email: string,
        public password: string,
        public rol: "ADMIN" = "ADMIN"
    ){}
}