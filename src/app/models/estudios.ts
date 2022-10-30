export class Estudios {
    id?: number;
    carrera: string;
    mencion: string;
    estado: string;
    instituto: string;
    lugar: string;

    constructor(
        carrera: string, 
        mencion: string, 
        estado: string,
        instituto: string,
        lugar: string
    ) {
        this.carrera = carrera;
        this.mencion = mencion;
        this.estado = estado;
        this.instituto = instituto;
        this.lugar = lugar;
    }
}
