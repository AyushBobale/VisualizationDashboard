import DataModel from "../Models/dataModel.js";

const getAllDataService = async () => {
  return await DataModel.find({});
};

export { getAllDataService };
