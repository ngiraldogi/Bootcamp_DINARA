import { RepositorioTableros } from "App/Dominio/Repositorios/RepositorioTableros";
import { RepositorioCategoriaTableroDb } from "App/Infrestructura/Implementacion/BaseDatos/RepositorioCategoriaTableroDB";
import { CategoriaTablero } from "../Entidades/CategoriaTablero";
import { Tablero } from "../Entidades/Tablero";

export class ServicioTableros {
    constructor(private repositorio: RepositorioTableros,
        private repositorioCategoria: RepositorioCategoriaTableroDb) {
    }

    crearTablero(tablero: any) {
        return this.repositorio.crearTablero(tablero)
    }

    obtenerTableros(): Promise<Tablero[]> {
        return this.repositorio.obtenerTableros()
    }

    obtenerTableroPorId(id: Number): Promise<Tablero> {
        return this.repositorio.obtenerTableroPorId(id)
    }


    actualizarTablero(tablero: Tablero, id: number): Promise<void> {
        return this.repositorio.actualizarTablero(tablero, id)
    }

    buscarCategoriaTablero(id: number): Promise<CategoriaTablero> {
        return this.repositorioCategoria.obtenerCategoriaTableroPorId(id)
    }

    buscarTablerosPorCategoria(id: number): Promise<Tablero[]> {
        return this.repositorio.obtenerTablerosPorCategoriaId(id)
    }

    buscarTablerosPorCategoriaTodas(id: number): Promise<Tablero[]> {
        return this.repositorio.obtenerTablerosPorCategoriaIdTodas(id)
    }

    obtenerToken(id: number): Promise<String> {
        return this.repositorio.obtenerToken(id)
    }

}