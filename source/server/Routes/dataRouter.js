import {
  getAllDataController,
  getAllSortedDataController,
} from "../Controllers/dataController.js";

import { Router } from "express";

const DataRouter = Router();
DataRouter.post("/sort", getAllSortedDataController);
DataRouter.get("/", getAllDataController);

export { DataRouter };
