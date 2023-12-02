/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import colors from 'colors';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(colors.green.bold(`App is listing on port: ${config.port}`));
    });
  } catch (error) {
    console.log(error);
  }
}

main();
