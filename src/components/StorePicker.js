import React from 'react'
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = (event) => {
    // 1. Stops the form from submitting
    event.preventDefault()
    // 2. Get the text from the input
    console.log(this.myInput.current.value)
    const storeName  = this.myInput.current.value
    // 3. chang the store to whatever /store/store-was-entered
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text"
          required placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker;