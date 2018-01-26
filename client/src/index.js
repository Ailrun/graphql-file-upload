import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'

import { App } from './components/App'
import { apolloClient } from './remote'

class AppWrapper extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <AppWrapper />,
    document.getElementById('react-root'),
  )
}

render()
