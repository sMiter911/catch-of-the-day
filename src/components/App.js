import React from 'react';
import PropTypes from 'prop-types'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };


  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match;
    // Reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeid)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeid}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeid, JSON.stringify(this.state.order))
  }


  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to the fishes variables
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes
    });
  };
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update the state
    fishes[key] = updatedFish;
    // 3. Set the state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // 1. Take a copy of state
    const fishes = { ...this.state.fishes }
    // 2. update the state
    fishes[key] = null;
    // 3. Update state
    this.setState({ fishes })
  };

  addToOrder = (key) => {
    // 1. Take a copy of the state
    const order = { ...this.state.order };
    // 2. Either add to the order or update the order
    order[key] = order[key] + 1 || 1;
    // 3. Call the state to update the state object
    this.setState(
      { order }
    );
  }

  removeFromOrder = (key) => {
    // 1. Take a copy of the state
    const order = { ...this.state.order };
    // 2. Remove the order
    delete order[key]
    // 3. Call the state to update the state object
    this.setState(
      { order }
    );
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"></Header>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder} />))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}></Order>
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeid={this.props.match.params.storeid}></Inventory>
      </div>)
  }
}

export default App;