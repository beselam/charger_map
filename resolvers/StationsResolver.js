import Stations from "../models/station.js";
import Connections from "../models/connection.js";
import connectiontype from "../models/connectionType.js";
import currenttypes from "../models/currentType.js";
import leveltype from "../models/level.js";
import { AuthenticationError } from "apollo-server-express";

const rectangleBounds = (topRight, bottomLeft) => ({
  type: "Polygon",
  coordinates: [
    [
      [bottomLeft.lng, bottomLeft.lat],
      [bottomLeft.lng, topRight.lat],
      [topRight.lng, topRight.lat],
      [topRight.lng, bottomLeft.lat],
      [bottomLeft.lng, bottomLeft.lat],
    ],
  ],
});

export default {
  Query: {
    Stations: (parent, args) => {
      return Stations.find().limit(10);
    },
    station: (parent, args) => {
      return Stations.find().skip(args.start).limit(args.limit);
    },
    getById: (parent, args) => {
      return Stations.findById(args.id);
    },
    getByCoordinates: async (parent, args) => {
      const frameOfsearch = rectangleBounds(
        args.bound._northEast,
        args.bound._southWest
      );
      return Stations.find({
        Location: {
          $geoWithin: {
            $geometry: {
              type: frameOfsearch.type,
              coordinates: frameOfsearch.coordinates,
            },
          },
        },
      });
    },
    connectiontypes: (parent, args) => {
      return connectiontype.find().limit(10);
    },
    currenttypes: (parent, args) => {
      return currenttypes.find().limit(10);
    },
    leveltypes: (parent, args) => {
      return leveltype.find().limit(10);
    },
  },

  Mutation: {
    addStation: async (parent, args, { user }) => {
      console.log(args);

      console.log("animalResolver, addAnimal", args, user);

      try {
        if (!user) {
          throw new AuthenticationError("you are not authenticated!!");
        }
        const connection = await Promise.all(
          args.Connections.map(async (conn) => {
            let newconn = new Connections(conn);
            const result = await newconn.save();
            return result.id;
          })
        );

        let newStations = new Stations({
          ...args,
          Connections: connection,
        });
        return newStations.save();
      } catch (e) {
        console.log(e);
      }
    },

    modifyStation: async (parent, args) => {
      try {
        if (!user) {
          throw new AuthenticationError("you are not authenticated!!");
        }
        if (args.Connections) {
          const conn = await Promise.all(
            args.Connections.map(async (conn) => {
              const result = await Connections.findByIdAndUpdate(
                conn.id,
                conn,
                {
                  new: true,
                }
              );
              return result;
            })
          );
        }

        let newStation = {
          Title: args.Title,
          AddressLine1: args.AddressLine1,
          Town: args.Town,
          StateOrProvince: args.StateOrProvince,
          Postcode: args.Postcode,
        };
        return await Stations.findByIdAndUpdate(args.id, newStation, {
          new: true,
        });
      } catch (e) {
        console.log(e);
      }
    },

    deleteStation: async (parent, args) => {
      try {
        if (!user) {
          throw new AuthenticationError("you are not authenticated!!");
        }
        console.log(args.id);
        return await Stations.findByIdAndDelete({ _id: args.id });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
