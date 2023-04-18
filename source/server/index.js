import "dotenv/config";

import { ApiRouter } from "./Routes/apiRouter.js";
import connectDB from "./database/connection.js";
import cors from "cors";
import errorHandler from "./Middlewares/errorHandlerMiddleware.js";
import errorLogger from "./Middlewares/errorLoggerMiddleware.js";
import express from "express";

const PORT = process.env.PORT || 5000;
connectDB();
//
const app = express();
app.use(
  cors({
    origin: [process.env.CORS_DOMAIN],
  })
);

// Routers
app.use("/api", ApiRouter);

// error logging and handling
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
