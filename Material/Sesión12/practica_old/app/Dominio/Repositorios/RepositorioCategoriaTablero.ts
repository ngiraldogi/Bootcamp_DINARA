import { CategoriaTablero } from "../Datos/Entidades/CategoriaTablero";

export interface RepositorioCategoriaTablero {
    crearCategoriaTablero(categoriaTablero: CategoriaTablero): Promise<Number>
    obtenerCategoriasTablero(): Promise<CategoriaTablero[]>
    obtenerCategoriaTableroPorId(id: Number): Promise<CategoriaTablero>
    actualizarCategoriaTablero(categoriaTablero: CategoriaTablero, id:number): Promise<void>
}