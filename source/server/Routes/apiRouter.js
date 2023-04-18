import { DataRouter } from "./dataRouter.js";
import { Router } from "express";

const ApiRouter = Router();
ApiRouter.use("/data", DataRouter);

export { ApiRouter };
