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
  const end_year = await DataModel.distinct(
    "end_year",
    { $and: [{ end_year: { $nin: [null, ""] } }, filter ? filter : {}] },
    { end_year: 1 }
  );

  const start_year = await DataModel.distinct(
    "start_year",
    { $and: [{ start_year: { $nin: [null, ""] } }, filter ? filter : {}] },
    { start_year: 1 }
  );

  const added = await DataModel.distinct(
    "added",
    { $and: [{ added: { $nin: [null, ""] } }, filter ? filter : {}] },
    { added: 1 }
  );

  const published = await DataModel.distinct(
    "published",
    { $and: [{ published: { $nin: [null, ""] } }, filter ? filter : {}] },
    { published: 1 }
  );

  const topic = await DataModel.distinct(
    "topic",
    { $and: [{ topic: { $nin: [null, ""] } }, filter ? filter : {}] },
    { topic: 1 }
  );

  const sector = await DataModel.distinct(
    "sector",
    { $and: [{ sector: { $nin: [null, ""] } }, filter ? filter : {}] },
    { sector: 1 }
  );

  const region = await DataModel.distinct(
    "region",
    { $and: [{ region: { $nin: [null, ""] } }, filter ? filter : {}] },
    { region: 1 }
  );

  const pestle = await DataModel.distinct(
    "pestle",
    { $and: [{ pestle: { $nin: [null, ""] } }, filter ? filter : {}] },
    { pestle: 1 }
  );

  const source = await DataModel.distinct(
    "source",
    { $and: [{ source: { $nin: [null, ""] } }, filter ? filter : {}] },
    { source: 1 }
  );

  const country = await DataModel.distinct(
    "country",
    { $and: [{ country: { $nin: [null, ""] } }, filter ? filter : {}] },
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
