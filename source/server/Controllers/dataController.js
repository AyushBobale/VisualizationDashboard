import DataModel from "../Models/dataModel.js";
import { STATUS } from "../config.js";
import { getAllDataService } from "../Services/dataService.js";

const getAllDataController = async (req, res, next) => {
  try {
    const data = await getAllDataService();
    if (data) {
      res.status(200).json({
        type: STATUS.SUCCESS,
        message: "Fetched data sucessfully",
        data: data,
      });
    }
    if (!data) {
      res.status(200).json({
        type: STATUS.FAILURE,
        message: "Could not fetch data",
        data: [],
      });
    }
  } catch (error) {
    next(error);
  }
};

export { getAllDataController };
