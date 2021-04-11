import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    Stations: [Stations]
    station(start: Int, limit: Int): [Stations]
    getById(id: ID): Stations
    getByCoordinates(bound: Bounds): [Stations]
    connectiontypes: [ConnectionTypes]
    currenttypes: [CurrentTypes]
    leveltypes: [Level]
  }

  input Bounds {
    _southWest: LatLng
    _northEast: LatLng
  }

  input LatLng {
    lat: Float
    lng: Float
  }

  input Coord {
    type: String = "Point"
    coordinates: [Float]
  }

  input Conn {
    ConnectionTypeID: ID
    CurrentTypeID: ID
    LevelID: ID
    Quantity: Int
  }

  input conn {
    id: ID!
    ConnectionTypeID: ID
    CurrentTypeID: ID
    LevelID: ID
    Quantity: Int
  }

  type Stations {
    id: ID
    Title: String
    Town: String
    AddressLine1: String
    StateOrProvince: String
    Postcode: String
    Location: Detail
    Connections: [Connections]
  }

  type Detail {
    type: String
    coordinates: [Float]
  }

  type ConnectionTypes {
    id: ID
    FormalName: String
    Title: String
  }

  type CurrentTypes {
    id: ID
    Description: String
    Title: String
  }

  type leveltype {
    id: ID
    Comments: String
    Title: String
    IsFastChargeCapable: Boolean
  }

  extend type Mutation {
    addStation(
      Title: String
      Postcode: String
      AddressLine1: String
      StateOrProvince: String
      Town: String
      Location: Coord
      Connections: [Conn]
    ): Stations

    modifyStation(
      id: ID
      Connections: [conn]
      Postcode: String
      Title: String
      AddressLine1: String
      StateOrProvince: String
      Town: String
    ): Stations

    deleteStation(id: ID): Stations
  }
`;
