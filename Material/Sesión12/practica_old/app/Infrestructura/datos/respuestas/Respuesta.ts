
export class Respuesta {
    public estatus: number;
    public mansaje: string;

    constructor(modulo: any = null) {
        if (modulo != null) {
            this.estatus = 0;
            this.mansaje = "Error de carga en " + modulo;
        }else{
            this.estatus = 1;
            this.mansaje = "almacenado";
        }
    }
    
    public retorno(): Respuesta{
        return this
    }

    public exitente(): Respuesta{
        this.mansaje = "Ya se hizo el registro de este elemento"
        return this
    }

}