import mongoose from "mongoose";

const Schema = mongoose.Schema;

const levelSchema = new Schema({
  Title: String,
  Comments: String,
  IsFastChargeCapable: Boolean,
});

export default mongoose.model("Level", levelSchema);
