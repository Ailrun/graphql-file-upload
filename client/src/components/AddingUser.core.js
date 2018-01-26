import React from 'react'

class AddingUserCore extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    let variables = {}

    for (const element of event.target.elements) {
      if (element.type === 'file') {
        variables[element.name] = element.files
      } else {
        variables[element.name] = element.value
      }
    }

    this.props.mutate({ variables })
      .then(function () { console.log(arguments) })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label style={{ display: 'block' }}>
          name
          <input name='name' type='text' />
        </label>
        <label style={{ display: 'block' }}>
          age
          <input name='age' type='number' />
        </label>
        <label style={{ display: 'block' }}>
          profile
          <input name='profile' type='file' />
        </label>
        <button>
          Submit
        </button>
      </form>
    )
  }
}
export {
  AddingUserCore,
}
