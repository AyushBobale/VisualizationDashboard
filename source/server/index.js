import "dotenv/config";

import connectDB from "./database/connection.js";
import express from "express";

const PORT = process.env.PORT || 5000;
connectDB();
const app = express();

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
