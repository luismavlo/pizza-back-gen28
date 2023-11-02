import { envs } from "./../src/config/envs";
import { Server } from './../src/server';

export const testServer = new Server({
  port: envs.PORT,
})