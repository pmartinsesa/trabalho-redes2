import express from "express";
import { Request, Response } from "express";

/**
 * Setted the constants of the server.
 */
const PORT = 3002;
const FIXED_TEMPERATURE = 45;
const RANDOM_DELTA = 10;
const SERVER_NAME = "SAARA";

/**
 * returns the actual time in seconds.
 */
const getTimeInSecounds = () => new Date().getTime() / 1000;

/**
 * returns the actual temperature in choosen region.
 */
const getRegionTemperature = (): string => {
  let delta: number = (Math.random() * 1000) % RANDOM_DELTA;
  const fixedTemperature: number = FIXED_TEMPERATURE;
  return (fixedTemperature + delta).toFixed(2);
};

/**
 * returns the express server with your middlewares already setted.
 */
const configApi = (): any => {
  const app = express();

  app.use(express.json());

  return app;
};

/**
 * returns the route with the cache it gonna catch the choosen region temperature.
 * @param app express server
 */
const configAppRoute = (app: any): any => {
  app.get("/", (_: Request, res: Response) => {
    const realTemperature = getRegionTemperature();
    console.log(`Minha temperatura atual é de: ${realTemperature}`);

    res.json({
      temperature: realTemperature,
      local: SERVER_NAME,
      timeInSeconds: getTimeInSecounds(),
    });
  });
};

/**
 * start the server (main function).
 */
const runServer = (): void => {
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
