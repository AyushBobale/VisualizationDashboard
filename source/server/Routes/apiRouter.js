import { Router } from "express";
import { getAllDataController } from "../Controllers/dataController.js";

const ApiRouter = Router();
ApiRouter.use("/data", getAllDataController);

export { ApiRouter };
