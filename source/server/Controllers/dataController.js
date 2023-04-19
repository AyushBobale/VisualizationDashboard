import {
  addInitialService,
  getAllDataService,
  getDistinctElemService,
  getSortedDataService,
} from "../Services/dataService.js";

import DataModel from "../Models/dataModel.js";
import { STATUS } from "../config.js";

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

const addInitialDataController = async (data) => {
  try {
    let formattedData = data.map((elm) => {
      return {
        ...elm,
        added: elm.added ? new Date(elm.added) : null,
        published: elm.published ? new Date(elm.published) : null,
      };
    });
    const result = await addInitialService(formattedData);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAllSortedDataController = async (req, res, next) => {
  try {
    let filter = {};
    if (req.body?.sortParam) {
      filter[req.body?.sortParam] = req.body?.sortValue;
    }
    const data = await getSortedDataService(filter);
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

const getDistinctElemController = async (req, res, next) => {
  try {
    const data = await getDistinctElemService();
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

export {
  getAllDataController,
  addInitialDataController,
  getAllSortedDataController,
  getDistinctElemController,
};
