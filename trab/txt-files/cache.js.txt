const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

/**
 * Setted the constants of the server.
 */
const PORT = 3003;
const SERVER_NAME = "CACHE";
const EMPTY_STRING = "EMPTY";
const CACHE_EXPIRATION_TIME = 30;
const SERVERS_URL_LIST = {
  atacama: "http://localhost:3000/",
  antartida: "http://localhost:3001/",
  saara: "http://localhost:3002/",
};

let cacheTable = {
  atacama: EMPTY_STRING,
  antartida: EMPTY_STRING,
  saara: EMPTY_STRING,
  default: "Opção inválida",
};

/**
 * returns the actual time in seconds.
 */
const getTimeInSecounds = () => new Date().getTime() / 1000;

/**
 * verify if the cache time has expired
 * @param choosedRegion region chose by the client.
 * @param actualTime actual time in seconds.
 */
const temperatureExpired = (choosedRegion, actualTime) => {
  let diffTime = actualTime - choosedRegion.timeInSeconds;
  const hasExpired = diffTime > CACHE_EXPIRATION_TIME;
  console.log(
    "ultima verificacao foi em " + diffTime.toFixed(0) + " segundos\n"
  );
  if (hasExpired) {
    console.log("Expirou\n");
  }
  return hasExpired;
};

/**
 * get the temperature of the chose region 
 * @param serverUrl url of the region chose by the client.
 */
async function getTemperature(serverUrl) {
  try {
    return await axios.get(serverUrl);
  } catch (error) {
    console.log("Error");
  }
}

/**
 * returns the express server with yours middlewares already setted.
 */
const configApi = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  return app;
};

/**
 * returns the route with the cache it gonna catch the choosen region temperature.
 * @param app express server
 */
const configAppRoute = (app) => {
  app.get("/region", async (req, res) => {
    const region = req.query.region;
    if (cacheTable[region] === cacheTable.default) res.send("Região Inválida");

    const actualTime = getTimeInSecounds();
    if (
      cacheTable[region] == EMPTY_STRING ||
      temperatureExpired(cacheTable[region], actualTime)
    ) {
      const choosedRegion = await getTemperature(SERVERS_URL_LIST[region]);
      cacheTable[region] = choosedRegion.data;
      console.log(
        `Nova temperatura em ${cacheTable[region].local} é de: ${cacheTable[region].temperature}°C.\n\n`
      );
    } else {
      console.log(
        `A temperatura em ${cacheTable[region].local} se mantem em: ${cacheTable[region].temperature}°C.\n\n`
      );
    }

    res.json(cacheTable[region]);
  });
};

/**
 * start the server (main function).
 */
const runServer = () => {
  const app = configApi();
  configAppRoute(app);

  app.listen(PORT, () =>
    console.log(`server ${SERVER_NAME} is running on port ${PORT}`)
  );
};

/**
 * call the main funcution
 */
runServer();
