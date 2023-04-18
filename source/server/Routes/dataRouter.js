import { Router } from "express";
import { getAllDataController } from "../Controllers/dataController";

const DataRouter = Router();
DataRouter.get("/", getAllDataController);

export { DataRouter };
