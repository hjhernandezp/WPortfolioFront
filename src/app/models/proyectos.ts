export class Proyectos {
    id?: number;
    nombre: string;
    descripcion: string;
    enlace: string;
    imagen: string;

    constructor(
        nombre: string, 
        descripcion: string,
        enlace: string, 
        imagen: string
    ) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.enlace = enlace;
        this.imagen = imagen;
    }
}
