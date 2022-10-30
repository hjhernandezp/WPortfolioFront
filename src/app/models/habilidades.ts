export class Habilidades {
    id?: number;
    nombre: string;
    nivel: number;
    
    constructor(
        nombre: string,
        nivel: number
    ) {
        this.nombre = nombre;
        this.nivel = nivel;
    }
}
