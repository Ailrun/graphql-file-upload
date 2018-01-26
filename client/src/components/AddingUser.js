import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { AddingUserCore } from './AddingUser.core'

const addUser = gql`
mutation($name: String, $age: Int, $profile: [File]) {
  addUser(name: $name, age: $age, profile: $profile) {
    name,
    age,
    profile,
  }
}
`;

const AddingUser = graphql(addUser)(AddingUserCore)

export {
  AddingUser,
}
