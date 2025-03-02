import {ApolloServer} from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';

import test_categories from './config/testdata.js'

import {typedef} from './schema.js'

const resolvers = {
    Query:{
       categories(){
         return test_categories
      }
    }
  }
  


const apolloServer  = new ApolloServer({
    typeDefs,
    resolvers
  
  })
  
  const {url} = await startStandaloneServer(server,{
    listen:{port:4000}
  })



