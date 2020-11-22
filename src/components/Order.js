import React from 'react';
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Order extends React.Component {
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    const transitionOption = {
      classNames: "order",
      key: key,
      timeout: { enter: 500, exit: 500}
    }

    // Make sure fish is loaded before we continue
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOption}>
          <li key={key}>Sorry {fish ? fish.name : "fish"} is no longer available</li>
        </CSSTransition>)
    }
    return (
      <CSSTransition {...transitionOption}>
        <li key={key}>
          <span>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition {...transitionOption}>
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
            </span>
            gms {fish.name}
            <span> {formatPrice(count * fish.price)}</span>
            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    );
  }

  render() {
    const orderId = Object.keys(this.props.order)
    const total = orderId.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * fish.price)
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderId.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order;