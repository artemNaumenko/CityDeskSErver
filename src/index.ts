import app from './server';
import config from '../config.json';
import mongoose from "mongoose";


// Start the application by listening to specific port
const port = Number(process.env.PORT || config.PORT || 8080);


const startServer = async  () => {
  try {
    await  mongoose.connect(process.env.databaseURL as string);
    app.listen(port, () => {
      console.info('Express application started on port: ' + port);
    });

  } catch (e) {
    console.log("Error: " + e);
  }

}

startServer()