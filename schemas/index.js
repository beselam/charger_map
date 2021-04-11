import { gql } from "apollo-server-express";
import ConnectionTypeSchema from "./ConnectionTypeSchema.js";
import CurrentTypeSchema from "./CurrentTypeSchema.js";
import LevelsSchema from "./LevelsSchema.js";
import ConnectionsSchema from "./ConnectionsSchema.js";
import StationsSchema from "./StationsSchema.js";
import userSchema from "./userSchema.js";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
  linkSchema,
  ConnectionTypeSchema,
  CurrentTypeSchema,
  LevelsSchema,
  ConnectionsSchema,
  StationsSchema,
  userSchema,
];
