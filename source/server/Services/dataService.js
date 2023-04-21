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
        added: { $addToSet: "$added" },
        published: { $addToSet: "$published" },
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
        added: 1,
        published: 1,
      },
    },
  ]);

  return {
    end_year: uniqueValues?.[0]?.end_year?.sort(),
    start_year: uniqueValues?.[0]?.start_year?.sort(),
    topic: uniqueValues?.[0]?.topic?.sort(),
    sector: uniqueValues?.[0]?.sector?.sort(),
    region: uniqueValues?.[0]?.region?.sort(),
    pestle: uniqueValues?.[0]?.pestle?.sort(),
    source: uniqueValues?.[0]?.source?.sort(),
    country: uniqueValues?.[0]?.country?.sort(),
    added: uniqueValues?.[0]?.added?.sort(),
    published: uniqueValues?.[0]?.published?.sort(),
  };
};

const getStatDetailsService = async (filter, rangeFilters, statFor) => {
  console.log({
    $and: [filter ? filter : {}, ...rangeFilters],
  });
  const aggAll = await DataModel.aggregate([
    {
      $match: {
        $and: [filter ? filter : {}, ...rangeFilters],
      },
    },
    {
      $facet: {
        region: [
          {
            $group: {
              _id: `$region`,
              intensity: { $sum: "$intensity" },
              relevance: { $sum: "$relevance" },
              impact: { $sum: "$impact" },
              likelihood: { $sum: "$likelihood" },
            },
          },
        ],
        country: [
          {
            $group: {
              _id: `$country`,
              intensity: { $sum: "$intensity" },
              relevance: { $sum: "$relevance" },
              impact: { $sum: "$impact" },
              likelihood: { $sum: "$likelihood" },
            },
          },
        ],
        source: [
          {
            $group: {
              _id: `$source`,
              intensity: { $sum: "$intensity" },
              relevance: { $sum: "$relevance" },
              impact: { $sum: "$impact" },
              likelihood: { $sum: "$likelihood" },
            },
          },
        ],
        pestle: [
          {
            $group: {
              _id: `$pestle`,
              intensity: { $sum: "$intensity" },
              relevance: { $sum: "$relevance" },
              impact: { $sum: "$impact" },
              likelihood: { $sum: "$likelihood" },
            },
          },
        ],
        sector: [
          {
            $group: {
              _id: `$sector`,
              intensity: { $sum: "$intensity" },
              relevance: { $sum: "$relevance" },
              impact: { $sum: "$impact" },
              likelihood: { $sum: "$likelihood" },
            },
          },
        ],
        topic: [
          {
            $group: {
              _id: `$topic`,
              intensity: { $sum: "$intensity" },
              relevance: { $sum: "$relevance" },
              impact: { $sum: "$impact" },
              likelihood: { $sum: "$likelihood" },
            },
          },
        ],
        start_year: [
          {
            $group: {
              _id: `$start_year`,
              intensity: { $sum: "$intensity" },
              relevance: { $sum: "$relevance" },
              impact: { $sum: "$impact" },
              likelihood: { $sum: "$likelihood" },
            },
          },
          { $sort: { _id: 1 } },
        ],
        end_year: [
          {
            $group: {
              _id: `$end_year`,
              intensity: { $sum: "$intensity" },
              relevance: { $sum: "$relevance" },
              impact: { $sum: "$impact" },
              likelihood: { $sum: "$likelihood" },
            },
          },
          { $sort: { _id: 1 } },
        ],
      },
    },
  ]);

  const data = {
    region: aggAll?.[0]?.region,
    country: aggAll?.[0]?.country,
    source: aggAll?.[0]?.source,
    pestle: aggAll?.[0]?.pestle,
    sector: aggAll?.[0]?.sector,
    topic: aggAll?.[0]?.topic,
    start_year: aggAll?.[0]?.start_year,
    end_year: aggAll?.[0]?.end_year,
  };

  return aggAll?.[0] || {};
};

export {
  getAllDataService,
  addInitialService,
  getSortedDataService,
  getDistinctElemService,
  getStatDetailsService,
};
