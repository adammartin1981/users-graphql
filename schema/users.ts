import {GraphQLInt, GraphQLObjectType, GraphQLString} from 'graphql'
import axios from 'axios'
import {CompanyType} from './company'

export interface User {
  id: string
  firstName: string
  age: number,
  companyId: number
}

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString},
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt},
    company: {
      type: CompanyType,
      resolve(parentValue: User, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(resp => resp.data)
      }
    }
  })
})