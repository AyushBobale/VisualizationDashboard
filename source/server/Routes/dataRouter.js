import {
  getAllDataController,
  getAllSortedDataController,
  getDistinctElemController,
} from "../Controllers/dataController.js";

import { Router } from "express";

const DataRouter = Router();
DataRouter.post("/sort", getAllSortedDataController);
DataRouter.get("/distinct", getDistinctElemController);
DataRouter.get("/", getAllDataController);

export { DataRouter };
