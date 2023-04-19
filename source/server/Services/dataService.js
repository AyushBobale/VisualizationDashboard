import DataModel from "../Models/dataModel.js";
import mongoose from "mongoose";

const getAllDataService = async () => {
  return await DataModel.find({});
};

const addInitialService = async (data) => {
  // const drop = mongoose.connection.db.dropCollection("datas");
  const session = await mongoose.startSession();
  try {
    await mongoose.connection.db.dropCollection("datas");
    await DataModel.create(data);
    await session.endSession();
    return true;
  } catch (error) {
    await session.abortTransaction();
    return false;
  }
};

const getSortedDataService = async (data) => {
  return DataModel.find({}).sort(data);
};

const getDistinctElemService = async (data) => {
  const end_year = await DataModel.distinct(
    "end_year",
    { end_year: { $ne: null } },
    { end_year: 1 }
  );
  return { end_year: end_year?.sort() };
};

export {
  getAllDataService,
  addInitialService,
  getSortedDataService,
  getDistinctElemService,
};
