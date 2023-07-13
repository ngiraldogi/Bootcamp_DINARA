const axios = require('axios');
import Env from "@ioc:Adonis/Core/Env";
export class RenderizarTableros {

    public async descargarInformacion() {
        let tablerosArray = new Array;
        let token;
        let tokenSuper = '';
        let validar= false;
        await this.obtenerToken().then(t => {
            token = t
        })
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }

        await this.tokenSuerapp().then(tt => {
            tokenSuper = tt
        })

        let encabezadoAdmin = {
            headers: {
                'Authorization': 'Bearer ' + tokenSuper
            }
        }

        
try {   

        await axios.get('dsdsd', config)
            .then(async (response) => {
              //  console.log(response.data)
                for await (const elemento of response.data) {

                    var t = {
                        id: elemento.id,
                        nombre: elemento.nombre,
                        descripcion: elemento.descripcion,
                        linktablero: elemento.linktablero,
                        iconoapp: elemento.icono_app,
                        categoria: elemento.categoria,
                        iconapp: elemento.icono_categoria
                    }
                    tablerosArray.push(elemento.nombre);
                    await axios.post(process.env.HOSTINGT + '/api/v1/tableros', t, encabezadoAdmin)
                        .then(function (response1: any) {
                            console.log(response1);
                        }).catch((err) => {
                            console.log(err)
                        });
                }
               validar = true;
                
            })
            .catch(function (error: any) {
                console.log("error al descargar informacion", error);
                validar = false;
                this.almacenarLog(false)
            })

        } catch (error) {
            console.log(error)
            validar = false;
            this.almacenarLog(false)
        }

        if(validar){
            this.almacenarLog(true)
            await this.compararDatos(tablerosArray);
        }




    }


    private compararDatos = async (tArray: any) => {

        if (tArray.length != 0) {

            const { TblTableros } = await import('App/Infrestructura/datos/entidades/Tableros')
            try {
                await TblTableros
                    .query()
                    .whereNotIn('tab_nombre', tArray)
                    .update({ tab_estado: 0 })
                   this.tablerosCache();
            } catch (error) {
                console.log(error.message)
            }
        } else {
            console.log("los tableros estan vacios")
        }
    }

    private obtenerToken = async () => {

        const usu = process.env.USU_TAB;
        const pas = process.env.PAS_TAB;

        let token = ''
        const json = { email: usu, password: pas }
try {
    await axios.post(process.env.URL_AUTH + 'login', json
    ).then((result) => {
        token = result.data.token
    }).catch((err) => {
        console.log(err)
    });

    return token
} catch (error) {
    console.log(error)
}
       
    }


    private tokenSuerapp = async () => {
        let token = ''
        const json = {
            usuario: process.env.USU_TOKEN,
            contrasena: process.env.PASS_TOKEN
        }
        //  console.log(process.env.URL_ADMINYLOG+'api/v1/token/generar')
        await axios.post(process.env.URL_ADMINYLOG + '/api/v1/token/generar', json
        ).then((result) => {
            // console.log(result)
            token = result.data.token
        }).catch((err) => {
            console.log(err)
        });
        return token
    }

    private tablerosCache = async ()=>{
        let tokenSuper;
        await this.tokenSuerapp().then(tt => {
            tokenSuper = tt
        })

        let config = {
            headers: {
                'Authorization': 'Bearer ' + tokenSuper
            }
        }
        console.log(config)
        try {
            axios.delete(Env.get("HOSTINGT")+ `/api/v1/tablero/cache`, config);
            axios.delete(Env.get("HOSTINGT")+ `/api/v1/categoria_tablero/cache`, config);
            axios.get(Env.get("HOSTINGT")+ `/api/v1/tablero/categorias_listar`, config);
            
       
        } catch (error) {
            console.log(error);
        }
      }

      private almacenarLog = async (control:boolean)=>{
        let token ="";
        await this.tokenSuerapp().then(t =>{
          token = t
      })
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      let data = {
        "endpoint":"Renderizado de tableros",
        "modulo":"Tableros",
        "jsonEnvio":"",
        "jsonRespuesta":JSON.stringify({"fecha":new Date(), "Exitoso":control}),
        "observacion":"",
        "usuarioLogueado":0,
        "codigoError": 0,  
        "directo": 0, 
        "exito": control
                         }                   
        try {
            axios.post(Env.get("URL_ADMINYLOG")+ `/api/v1/logs/crear`, data, config);
          
        } catch (error) {
            console.log(error);
        }
      }
      



}