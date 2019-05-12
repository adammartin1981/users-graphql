import {GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLSchema} from 'graphql'
import * as _ from 'lodash'

interface User {
  id: string
  firstName: string
  age: number
}

const users: User[] = [
  {
    id: '23',
    firstName: 'Bill',
    age: 20
  },
  {
    age: 21,
    firstName: 'Samantha',
    id: '47'
  }
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString},
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt}
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args: { id: string }) {
        return _.find(users, { id: args.id })
      }
    }
  }
})

export const Schema = new GraphQLSchema({
  query: RootQuery
})