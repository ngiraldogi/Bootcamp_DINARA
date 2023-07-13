const axios = require('axios');

export class RenderizarTableros {
    public descargarInformacion() {
        axios.post(process.env.URL_TABLEROS)
            .then(async (response) => {
                for (const key in response.data) {
                    var elemento = response.data[key]
                    await axios.post(process.env.HOSTINGT + '/api/v1/tableros', elemento)
                        .then(function (response: any) {
                            console.log(response);
                        })
                }

            })
            .catch(function (error: any) {
                console.log("error al descargar informacion", error);
            })
    }
}