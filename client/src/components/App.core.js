import React from 'react'

import { AddingUser } from './AddingUser'

const AppCore = (props) => {
  // const { loading, error, users } = props.data

  // if (loading) {
  //   return (
  //     <div>
  //       now loading...
  //     </div>
  //   )
  // }

  // if (error) {
  //   console.log(error)

  //   return (
  //     <div>
  //       Error occurs
  //       <div>
  //         {error.toString()}
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div>
      {/*JSON.stringify(users)*/}
      <AddingUser />
    </div>
  )
}
export {
  AppCore
}
