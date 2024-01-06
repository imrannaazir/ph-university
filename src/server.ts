/* eslint-disable no-console */

import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import colors from 'colors';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(colors.green.bold(`App is listing on port: ${config.port}`));
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// handle unhandledRejection
process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//handle uncaughtException
process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
