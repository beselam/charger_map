import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Title: String,
  Town: String,
  AddressLine1: String,
  StateOrProvince: String,
  Postcode: String,
  Location: {
    type: { type: String, enum: ["Point"], required: false },
    coordinates: { type: [Number], required: true },
  },
  Connections: [{ type: mongoose.Types.ObjectId, ref: "Connections" }],
});

stationSchema.indexes({ Location: "2dsphere" });

export default mongoose.model("Stations", stationSchema);
