export class Experiencia {
    id?: number;
    empresa: string;
    lugar: string;
    cargo: string;

    constructor(
        empresa: string, 
        lugar: string, 
        cargo: string
    ) {
        this.empresa = empresa;
        this.lugar = lugar;
        this.cargo = cargo;
    }
}
