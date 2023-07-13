import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { CategoriaEncuesta } from 'App/Dominio/Datos/Entidades/CategoriaEncuesta';



export class TblCategoriasEncuestas extends BaseModel {
    public static table = 'tbl_categorias_encuestas'

    @column({ isPrimary: true })
    public id: number

    @column({columnName:'cat_nombre'})
    public nombre: string;

    @column({columnName:'cat_iconapp'})
    public iconapp: string;

    @column({columnName:'cat_estado'})
    public estado: boolean;

    setCategoriaEncuestaDbFromCategoriaEncuesta(categoriaEncuesta: CategoriaEncuesta) {
        this.id = categoriaEncuesta.id
        this.nombre = categoriaEncuesta.nombre
        this.estado = categoriaEncuesta.estado
        this.iconapp = categoriaEncuesta.iconapp
        return this
    }

    setCategoriaEncuestaFromCategoriaEncuestaDb(){
        let categoria = new CategoriaEncuesta()
        categoria.id = this.id
        categoria.nombre = this.nombre
        categoria.estado = this.estado
        categoria.iconapp = this.iconapp
        return categoria
    }
}