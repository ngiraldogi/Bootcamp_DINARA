import { RepositorioCategoriaTablero } from "App/Dominio/Repositorios/RepositorioCategoriaTablero";
import { CategoriaTablero } from "../Entidades/CategoriaTablero";

export class ServicioCategoriaTablero {
    constructor(private repositorio: RepositorioCategoriaTablero) {
    }

    crearCategoriaTablero(CategoriaTablero: CategoriaTablero) {
        return this.repositorio.crearCategoriaTablero(CategoriaTablero)
    }

    obtenerCategoriaTablero(): Promise<CategoriaTablero[]> {
        return this.repositorio.obtenerCategoriasTablero()
    }

    obtenerCategoriaTodas(): Promise<CategoriaTablero[]> {
        return this.repositorio.obtenerCategoriaTodas()
    }


    obtenerCategoriaTableroPorId(id: Number): Promise<CategoriaTablero> {
        return this.repositorio.obtenerCategoriaTableroPorId(id)
    }


    actualizarCategoriaTablero(CategoriaTablero: CategoriaTablero, id: number): Promise<void> {
        return this.repositorio.actualizarCategoriaTablero(CategoriaTablero, id)
    }

}