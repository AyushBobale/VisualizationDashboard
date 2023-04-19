import { addInitialDataController } from "../Controllers/dataController.js";
import mongoose from "mongoose";
import data from "../jsondata.json" assert { type: "json" };

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // await addInitialDataController(data);
    console.log(`Mongo DB Conected ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
