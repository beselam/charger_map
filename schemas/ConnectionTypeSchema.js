import { gql } from "apollo-server-express";

export default gql`
  type ConnectionType {
    id: ID
    FormalName: String
    Title: String
  }
`;
