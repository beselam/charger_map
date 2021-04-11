import mongoose from "mongoose";

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  Quantity: Number,
  ConnectionTypeID: [{ type: mongoose.Types.ObjectId, ref: "ConnectionType" }],
  CurrentTypeID: [{ type: mongoose.Types.ObjectId, ref: "CurrentType" }],
  LevelID: [{ type: mongoose.Types.ObjectId, ref: "Level" }],
});

export default mongoose.model("Connections", connectionSchema);
