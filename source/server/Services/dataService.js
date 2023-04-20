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

const getSortedDataService = async (data, filter, rangeFilters) => {
  // console.log(filter);
  return DataModel.find({
    $and: [filter ? filter : {}, ...rangeFilters],
  }).sort(data);
};

const getDistinctElemService = async (filter) => {
  const uniqueValues = await DataModel.aggregate([
    {
      $group: {
        _id: null,
        end_year: { $addToSet: "$end_year" },
        start_year: { $addToSet: "$start_year" },
        topic: { $addToSet: "$topic" },
        sector: { $addToSet: "$sector" },
        region: { $addToSet: "$region" },
        pestle: { $addToSet: "$pestle" },
        source: { $addToSet: "$source" },
        country: { $addToSet: "$country" },
      },
    },
    {
      $project: {
        _id: 0,
        end_year: 1,
        start_year: 1,
        sector: 1,
        topic: 1,
        region: 1,
        pestle: 1,
        source: 1,
        country: 1,
      },
    },
  ]);

  console.log(uniqueValues?.[0]?.end_year?.sort());

  return {
    end_year: uniqueValues?.[0]?.end_year?.sort(),
    start_year: uniqueValues?.[0]?.start_year?.sort(),
    topic: uniqueValues?.[0]?.topic?.sort(),
    sector: uniqueValues?.[0]?.sector?.sort(),
    region: uniqueValues?.[0]?.region?.sort(),
    pestle: uniqueValues?.[0]?.pestle?.sort(),
    source: uniqueValues?.[0]?.source?.sort(),
    country: uniqueValues?.[0]?.country?.sort(),
  };
};

const getStatDetailsService = async (filter, rangeFilters, statFor) => {
  const aggDynamic = await DataModel.aggregate([
    {
      $match: {
        $and: [filter ? filter : {}, ...rangeFilters],
      },
    },
    {
      $group: {
        _id: `$${statFor}`,
        intensity: { $sum: "$intensity" },
        relevance: { $sum: "$relevance" },
        impact: { $sum: "$impact" },
        likelihood: { $sum: "$likelihood" },
      },
    },
  ]);

  // console.log(aggDynamic);

  return { result: aggDynamic };
};

export {
  getAllDataService,
  addInitialService,
  getSortedDataService,
  getDistinctElemService,
  getStatDetailsService,
};
