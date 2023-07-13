import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export async function obtenerTokenAutorizacion():Promise<string>{
    let endpoint = "/api/login"
    let body = {
        correo: "ng@unal.co", 
        contrasena: "1234" 
    }
    let axiosResponse = await axios.post(`${Env.get("PATH_APP") + endpoint}`, body)
    return axiosResponse.data["token"]
}
