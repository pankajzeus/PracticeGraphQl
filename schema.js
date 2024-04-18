export const typeDefs = `#graphql
 type Game {
    id:ID!
    title:String!
    platform:[String!]
    reviews: [Review!]
 }
 type Review {
    id:ID!
    rating:Int!
    content:String!
    game:Game!
    auther:Auther!
 }
 type Auther {
    id:ID!
    name:String!
    verfied:Boolean!
    reviews: [Review!]
 }
 type Query {
    reviews:[Review]
    review(id:ID!):Review
    games:[Game]
    game(id:ID!):Game
    authors:[Auther]
    auther(id:ID!):Auther
 }
 type Mutation{
   addGame(game: AddGameInput!):Game
   deleteGame(id:ID!):[Game]
   updateGame(id:ID!,edits: EditGameInput) : Game
 }

 input AddGameInput {
   title:String!,
    platform:[String!]
 }
 input EditGameInput {
    title:String,
    platform:[String!]
 }
`