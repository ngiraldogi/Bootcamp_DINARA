
export class PreguntaEncuesta {
    id: number;
    encuesta_id: number;
    nombre: string;
    tipo: string;
    tipodato: string;
    valorminimo: number;
    valormaximo: number;
    obligatorio: boolean;
    listavalores: Valor[];
}

export class Valor {
    id: number;
    nombre: string;
}