import {
  addInitialService,
  getAllDataService,
  getDistinctElemService,
  getSortedDataService,
} from "../Services/dataService.js";

import DataModel from "../Models/dataModel.js";
import { STATUS } from "../config.js";

/**
 * This function is deprecated and should not be used anymore.
 * @deprecated
 */
const getAllDataController = async (req, res, next) => {
  console.warn(
    "getAllDataController() function is deprecated. Use getAllSortedDataController() instead."
  );
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
    let sorting = {};
    let filter = [];
    let orAndFilter = {};

    // Settig sort param
    let data;
    if (req.body?.sortParam) {
      sorting[req.body?.sortParam] = parseInt(req.body?.sortValue || "1");
    }
    if (req.body?.sortParam) {
      sorting[req.body?.sortParam] = req.body?.sortValue;
    }

    // setting from to filter
    // make checks here for date
    if (req.body?.from_data) {
      let oneFilter = {};
      oneFilter[req.body?.sortParam] = { $gte: parseInt(req.body?.from_data) };
      filter.push(oneFilter);
    }
    if (req.body?.to_data) {
      let oneFilter = {};
      oneFilter[req.body?.sortParam] = { $lte: parseInt(req.body?.to_data) };
      filter.push(oneFilter);
    }

    // setting up or and filter
    if (parseInt(req.body?.orAndFilter)) {
      orAndFilter["$or"] = [];
      for (const key of Object.keys(req.body?.filter)) {
        let onFilter = { [key]: req.body?.filter?.[key] };
        orAndFilter["$or"].push(onFilter);
      }
      if (!orAndFilter["$or"]?.length) {
        delete orAndFilter["$or"];
      }
    } else {
      orAndFilter["$and"] = [];
      for (const key of Object.keys(req.body?.filter)) {
        let onFilter = { [key]: req.body?.filter?.[key] };
        orAndFilter["$and"].push(onFilter);
      }
      if (!orAndFilter["$and"]?.length) {
        delete orAndFilter["$and"];
      }
    }

    data = await getSortedDataService(sorting, orAndFilter, filter);

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
    const data = await getDistinctElemService(undefined);
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
