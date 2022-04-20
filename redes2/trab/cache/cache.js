const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const PORT = 3003;
const SERVER_NAME = "CACHE";
const EMPTY_STRING = "EMPTY";

let cacheTable = {
  atacama: EMPTY_STRING,
  antartida: EMPTY_STRING,
  saara: EMPTY_STRING,
  default: "Opção inválida",
};

const serversUrlList = {
  atacama: "http://localhost:3000/",
  antartida: "http://localhost:3001/",
  saara: "http://localhost:3002/"
};

const getTimeInSecounds = () => new Date().getTime() / 1000;

const temperatureExpired = (choosedRegion, actualTime) => {
  let diffTime = actualTime - choosedRegion.timeInSeconds;

  console.log("ultima verificacao foi em " + diffTime.toFixed(0) + " segundos");
  return diffTime > 30;
};

const configApi = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  return app;
};

async function getTemperature(serverUrl) {
  try {
    return await axios.get(serverUrl);
  } catch (error) {
    console.log("Error");
  }
}

const configAppRoute = (app) => {
  app.get("/region", async (req, res) => {
    const region = req.query.region;
    if (cacheTable[region] === cacheTable.default)
      res.send("Região Inválida");

    const actualTime = getTimeInSecounds();
    if (
      cacheTable[region] == EMPTY_STRING ||
      temperatureExpired(cacheTable[region], actualTime)
    ) {
      console.log("expirado");
      const choosedRegion = await getTemperature(serversUrlList[region]);
      cacheTable[region] = choosedRegion.data;
      console.log(cacheTable)
    }

    res.json(cacheTable[region]);
  });
};

const runServer = () => {
  const app = configApi();
  configAppRoute(app);

  app.listen(PORT, () =>
    console.log(`server ${SERVER_NAME} is running on port ${PORT}`)
  );
};

runServer();
