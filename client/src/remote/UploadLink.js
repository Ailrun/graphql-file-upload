import { ApolloLink, Observable } from 'apollo-link'
import extractFiles from 'extract-files'
import { print } from 'graphql/language/printer'

const defaultHttpOptions = {
  includeQuery: true,
  includeExtensions: false,
}

const createUploadLink = (linkOptions = {}) => {
  let {
    uri: linkUri,
    fetch: fetcher,
    includeExtensions,
    fetchOptions: linkFetchOptions = {},
    credentials: linkCredentials,
    headers: linkHeaders,
  } = linkOptions

  if (!fetcher && typeof fetch === 'undefined') {
    const library = 'isomorphic-fetch'

    throw new Error(
      `fetch is not found globally and no fetcher passed, to fix pass a fetch for
      your environment like https://www.npmjs.com/package/${library}.
      For example:
        import '${library}'
        import { createUploadLink } from 'apollo-link-upload'
        const link = createUploadLink({ uri: '/graphql' })
      `,
    )
  }

  if (fetcher && fetcher.use) {
    throw new Error(`
      It looks like you're using apollo-fetch! Apollo Link now uses native fetch
      implementation, so apollo-fetch is not needed. If you want to use your existing
      apollo-fetch middleware, please check this guide to upgrade:
        https://github.com/apollographql/apollo-link/blob/master/docs/implementation.md
    `)
  }

  if (!fetcher) {
    fetcher = fetch
  }
  if (!linkUri) {
    linkUri = '/graphql'
  }

  return new ApolloLink(operation => new Observable(observer => {
    const {
      headers: contextHeaders,
      credentials = linkCredentials,
      fetchOptions: contextFetchOptions = {},
      uri = linkUri,
      http: httpOptions = {},
    } = operation.getContext()
    const {
      operationName,
      extensions,
      variables,
      query,
    } = operation
    const http = {
      ...defaultHttpOptions,
      ...httpOptions,
    }
    const body = {
      operationName,
      variables,
    }

    if (includeExtensions || http.includeExtensions){
      body.extensions = extensions
    }
    if (http.includeQuery) {
      body.query = print(query)
    }

    const fetcherOptions = {
      method: 'POST',
      ...linkFetchOptions,
      ...contextFetchOptions,
      headers: {
        ...linkFetchOptions.headers,
        ...contextFetchOptions.headers,
        ...linkHeaders,
        ...contextHeaders,
        accept: '*/*',
      },
      credentials,
    }

    const files = extractFiles(body)
    const serializedBody =
      JSON.stringify(body)

    if (files.length) {
      const fileMap = files.reduce((map, { path }, index) => {
        return {
          ...map,
          [`${index}`]: path
        }
      }, {})
      const serializedFileMap =
        JSON.stringify(fileMap)

      fetcherOptions.body = new FormData()

      fetcherOptions.body
        .append('operations', serializedBody)
      fetcherOptions.body
        .append('map', serializedFileMap)
      files.forEach(({ file }, index) => {
        fetcherOptions.body
          .append(index, file)
      })
    } else {
      fetcherOptions.headers['content-type'] = 'application/json'
      fetcherOptions.body = serializedBody
    }

    let controller
    if (typeof AbortController !== 'undefined') {
      controller = new AbortController()
      fetcherOptions.signal = controller.signal
    }

    fetcher(uri, fetcherOptions)
      .then((response) => {
        operation.setContext({ response })
        return response
      })
      .then((response) => {
        return response.text()
          .then((bodyText) => {
            try {
              return JSON.parse(bodyText)
            } catch (error) {
              error.response = response
              error.statusCode = response.status
              error.bodyText = bodyText
              return Promise.reject(error)
            }
          })
          .then(result => {
            if (response.status >= 300) {
              const error = new Error(`Response not successful: Received status code ${response.status}`)
              error.response = response
              error.statusCode = response.status
              error.result = result

              throw error
            }

            const hasOwnProperty =
              Object.prototype.hasOwnProperty
            if (!hasOwnProperty.call(result, 'data') &&
                !hasOwnProperty.call(result, 'error')) {
              const error = new Error(`Server response was missing for query '${operationName}'.`)
              error.response = response
              error.statusCode = response.status
              error.result = result

              throw error
            }

            return result
          })
      })
      .then((result) => {
        observer.next(result)
        observer.complete()
        return result
      })
      .catch(error => {
        // fetch was cancelled so its already been cleaned up in the unsubscribe
        if (error.name === 'AbortError') {
          return
        }

        observer.error(error)
      })

    return () => {
      if (controller) {
        controller.abort()
      }
    }
  }))
}

class UploadLink extends ApolloLink {
  constructor(options) {
    super(createUploadLink(options).request)
  }
}
export {
  UploadLink,
}
