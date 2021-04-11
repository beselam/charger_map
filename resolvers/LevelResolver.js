import Level from "../models/level.js";

export default {
  Connections: {
    LevelID(parent) {
      return Level.findById(parent.LevelID);
    },
  },
};
