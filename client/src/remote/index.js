import { ApolloClient } from 'apollo-client'
// import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { UploadLink } from './UploadLink'

const apolloClient = new ApolloClient({
  link: new UploadLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache()
})

export {
  apolloClient
}
