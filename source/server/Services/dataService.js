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
  console.log(...rangeFilters);
  return DataModel.find({
    $and: [
      filter ? filter : {},
      ...rangeFilters,
      // { end_year: { $nin: ["", null] } },
      // { intensity: { $nin: ["", null] } },
      // { sector: { $nin: ["", null] } },
      // { topic: { $nin: ["", null] } },
      // { insight: { $nin: ["", null] } },
      // { url: { $nin: ["", null] } },
      // { region: { $nin: ["", null] } },
      // { start_year: { $nin: ["", null] } },
      // { impact: { $nin: ["", null] } },
      // { added: { $nin: ["", null] } },
      // { published: { $nin: ["", null] } },
      // { country: { $nin: ["", null] } },
      // { relevance: { $nin: ["", null] } },
      // { pestle: { $nin: ["", null] } },
      // { source: { $nin: ["", null] } },
      // { title: { $nin: ["", null] } },
      // { likelihood: { $nin: ["", null] } },
    ],
  }).sort(data);
};

const getDistinctElemService = async (data) => {
  const end_year = await DataModel.distinct(
    "end_year",
    { end_year: { $nin: [null, ""] } },
    { end_year: 1 }
  );

  const start_year = await DataModel.distinct(
    "start_year",
    { start_year: { $nin: [null, ""] } },
    { start_year: 1 }
  );

  const added = await DataModel.distinct(
    "added",
    { added: { $nin: [null, ""] } },
    { added: 1 }
  );

  const published = await DataModel.distinct(
    "published",
    { published: { $nin: [null, ""] } },
    { published: 1 }
  );

  const topic = await DataModel.distinct(
    "topic",
    { topic: { $nin: [null, ""] } },
    { topic: 1 }
  );

  const sector = await DataModel.distinct(
    "sector",
    { sector: { $nin: [null, ""] } },
    { sector: 1 }
  );

  const region = await DataModel.distinct(
    "region",
    { region: { $nin: [null, ""] } },
    { region: 1 }
  );

  const pestle = await DataModel.distinct(
    "pestle",
    { pestle: { $nin: [null, ""] } },
    { pestle: 1 }
  );

  const source = await DataModel.distinct(
    "source",
    { source: { $nin: [null, ""] } },
    { source: 1 }
  );

  const country = await DataModel.distinct(
    "country",
    { country: { $nin: [null, ""] } },
    { country: 1 }
  );

  return {
    end_year: end_year?.sort(),
    start_year: start_year?.sort(),
    // added: added?.sort(),
    // published: published?.sort(),
    topic: topic?.sort(),
    sector: sector?.sort(),
    region: region?.sort(),
    pestle: pestle?.sort(),
    source: source?.sort(),
    country: country?.sort(),
  };
};

export {
  getAllDataService,
  addInitialService,
  getSortedDataService,
  getDistinctElemService,
};
