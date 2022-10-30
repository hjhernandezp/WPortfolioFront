export class Cursos {
    id?: number;
    nombre: string;
    instituto: string;
    lugar: string;
    horas: number;

    constructor(
        nombre: string, 
        instituto: string,
        lugar: string, 
        horas: number
    ) {
        this.nombre = nombre;
        this.instituto = instituto;
        this.lugar = lugar;
        this.horas = horas;
    }
}
