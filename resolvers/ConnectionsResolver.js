import Connections from "../models/connection.js";

export default {
  Stations: {
    Connections(parent) {
      try {
        console.log("Connections", parent);
        return Connections.find({ _id: { $in: parent.Connections } });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
