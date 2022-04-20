import express from "express";
import { Request, Response } from "express";

const PORT = 3000;
const FIXED_TEMPERATURE = 40;
const RANDOM_DELTA = 10;
const SERVER_NAME = "ATACAMA";

const getTimeInSecounds = () => new Date().getTime() / 1000;

const configApi = (): any => {
  const app = express();

  app.use(express.json());

  return app;
};

const configAppRoute = (app: any): any => {
  app.get("/", (_: Request, res: Response) => {
    let delta: number = (Math.random() * 1000) % RANDOM_DELTA;
    const fixedTemperature: number = FIXED_TEMPERATURE;
    const realTemperature = (fixedTemperature + delta).toFixed(2);

    console.log(`Minha temperatura atual é de: ${realTemperature}`);

    res.json({
      temperature: realTemperature,
      local: SERVER_NAME,
      timeInSeconds: getTimeInSecounds(),
    });
  });
};

const runServer = (): void => {
  const app = configApi();
  configAppRoute(app);

  app.listen(PORT, () => console.log(`server ${SERVER_NAME} is running on port ${PORT}`));
};

runServer();
