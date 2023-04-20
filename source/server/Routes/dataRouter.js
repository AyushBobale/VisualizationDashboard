import {
  getAllDataController,
  getAllSortedDataController,
  getDistinctElemController,
  getStatDetailsController,
} from "../Controllers/dataController.js";

import { Router } from "express";

const DataRouter = Router();
DataRouter.post("/sort", getAllSortedDataController);
DataRouter.get("/distinct", getDistinctElemController);
DataRouter.post("/distinct", getDistinctElemController);
DataRouter.post("/stat_details", getStatDetailsController);
DataRouter.get("/", getAllDataController);

export { DataRouter };
