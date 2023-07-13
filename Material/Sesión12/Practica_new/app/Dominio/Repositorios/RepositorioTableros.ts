import { Tablero } from "../Datos/Entidades/Tablero";

export interface RepositorioTableros {
    crearTablero(tablero: any): Promise<Number>
    obtenerTableros(): Promise<Tablero[]>
    obtenerTableroPorId(id: Number): Promise<Tablero>
    obtenerTablerosPorCategoriaId(id: number): Promise<Tablero[]>
    obtenerTablerosPorCategoriaIdTodas(id: number): Promise<Tablero[]>
    actualizarTablero(tablero: Tablero, id:number): Promise<void>
    obtenerToken(id: Number): Promise<String>
}