const axios = require('axios');
const waitForUserInput = require('wait-for-user-input');

/**
 * Setted the constants of the client.
 */
const BASE_URL = 'http://localhost:3003';
const END_POINT = 'region';
const QUERY_PARAM = {
    1: 'region=atacama',
    2: 'region=antartida',
    3: 'region=saara'
}

/**
 * Call the cache server to get the choose region temperature
 */
async function main() {
  while (true) {
    const location = await waitForUserInput(
      'Escolha a localização que deseja saber a temperatura:\n (1) Atacama\n (2) Antartida\n (3) Saara \n\n'
    );

    let route = '';
    route = `${BASE_URL}/${END_POINT}?${QUERY_PARAM[location]}`;
    
    if (route != '') {
      try {
        res = await axios.get(route);
        console.log(
          `A temperatura em ${res.data.local} é de ${res.data.temperature}°C.\n\n`
        );
      } catch (error) {
        console.log(error);
        console.log('Error');
      }
    } else {
      console.log('localização inválida digite outra');
    }
  }
}

/**
 * call the main funcution
 */
main();
