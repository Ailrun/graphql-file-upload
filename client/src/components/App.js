import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { AppCore } from './App.core'

const queryUser = gql`
query {
  users {
    name
    age
  }
}
`

const App = (AppCore)

export {
  App
}
