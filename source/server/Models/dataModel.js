import data from "./jsondata.json";
import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  end_year: {
    type: Number,
  },
  intensity: {
    type: Number,
  },
  sector: {
    type: String,
  },
  topic: {
    type: String,
  },
  insight: {
    type: String,
  },
  url: {
    type: String,
  },
  region: {
    type: String,
  },
  start_year: {
    type: Number,
  },
  impact: {
    type: Number,
  },
  added: {
    type: Date,
  },
  published: {
    type: Date,
  },
  country: {
    type: String,
  },
  relevance: {
    type: Number,
  },
  pestle: {
    type: String,
  },
  source: {
    type: String,
  },
  title: {
    type: String,
  },
  likelihood: {
    type: Number,
  },
});

const DataModel = mongoose.model("Data", DataSchema);
try {
  const count = await DataModel.countDocuments({});

  if (count > 0) {
    // const delOK = await DataModel.drop();
    console.log("Collection exists");
  } else {
    const createMany = await DataModel.create(data);
    console.log("Collection does not exist");
    if (createMany) console.log("Collection created");
  }
} catch (err) {
  console.error(err);
}

export default DataModel;
