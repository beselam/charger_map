import ConnectionTypes from "../models/connectionType.js";

export default {
  Connections: {
    ConnectionTypeID(parent) {
      console.log("ConnectionType");
      return ConnectionTypes.findById(parent.ConnectionTypeID);
    },
  },
};
