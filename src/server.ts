import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './app/config';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.MONGODB_URL as string);
    server = app.listen(config.PORT, () => {
      console.log(`App is listening at PORT : ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

// unhandledRejection for async code:
process.on('unhandledRejection', () => {
  console.log(`UnhandledRejection is Detected, Sutting Down...`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaughtException for sync code
process.on('uncaughtException', () => {
  console.log(`UncaughtException is Detected, Sutting Down...`);
  process.exit(1);
});
