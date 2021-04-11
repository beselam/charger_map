import CurrentType from "../models/currentType.js";

export default {
  Connections: {
    CurrentTypeID(parent) {
      console.log("CurrentType", parent.CurrentTypeID);
      return CurrentType.findById(parent.CurrentTypeID);
    },
  },
};
