import { RepositorioBuscador } from "App/Dominio/Repositorios/RepositorioBuscador";

export class ServicioBuscador{

    constructor(private repositorio: RepositorioBuscador){

    }

    buscar(texto:string){
       return this.repositorio.buscarHome(texto)
    }

}