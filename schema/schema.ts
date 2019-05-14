import {GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLNonNull} from 'graphql'
import axios from 'axios'
import {User, UserType} from './users'
import {CompanyType} from './company'

const dbPath = 'http://localhost:3000'

const usersPath = `${dbPath}/users`
const companyPath = `${dbPath}/companies`

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
        return axios.get(`${usersPath}/${args.id}`)
          .then(resp => resp.data)
      }
    },
    company: {
      type: CompanyType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args: { id: string}) {
        return axios.get(`${companyPath}/${args.id}`)
          .then(resp => resp.data)
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age:{
          type: new GraphQLNonNull(GraphQLInt)
        },
        companyId: {
          type: GraphQLString
        }
      },
      resolve(parentValue, {firstName, age}: User){
        return axios.post(`http://localhost:3000/users`, {
          firstName,
          age
        })
          .then(resp => resp.data)
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parentValue, {id}: User) {
        let tempUser: User

        // Get the user first and then return it?
        return axios.get<User>(`${usersPath}/${id}`)
          .then((userData) => tempUser = userData.data)
          .then(() => axios.delete(`${usersPath}/${id}`))
          .then(resp => tempUser)

        // return axios.delete(`${usersPath}/${id}`)
        //   .then(resp => resp.data)
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        },
        company: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        return axios.patch(`${usersPath}/${args.id}`, args)
          .then(resp => resp.data)
      }
    }
  }
})

export const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation
})