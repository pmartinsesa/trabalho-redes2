const axios = require("axios");
const waitForUserInput = require("wait-for-user-input");

const ATACAMA_ROUTE     = 'http://localhost:3003/region?region=atacama'
const ANTARTIDA_ROUTE   = 'http://localhost:3003/region?region=antartida'
const SAARA_ROUTE       = 'http://localhost:3003/region?region=saara'
async function main() {
    while(true) {
        const location = await waitForUserInput("Escolha a localização que deseja saber a temperatura\n (1) Atacama\n (2) Antartida\n (3) Saara \n", "\n")

        var route = ''
        if(location == 1) route = ATACAMA_ROUTE
        if(location == 2) route = ANTARTIDA_ROUTE
        if(location == 3) route = SAARA_ROUTE
        
        if(route != '') {
            try {
                 res = await axios.get(route);
                 console.log('A temperatura em',res.data.local,'é' ,res.data.temperature)
              } catch (error) {
                console.log(error)
                console.log("Error");
              }
        } else {
            console.log('localização inválida digite outra')
        }
    }
    
}

main();