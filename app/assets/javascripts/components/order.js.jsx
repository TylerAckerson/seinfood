OrderItem = React.createClass({
  removeItem: function(e) {
    e.preventDefault();
    OrderActions.orderRemoveItem(this.props.orderItem.counter);
  },

  render: function() {
    price = this.props.orderItem.price.toFixed(2);

    return (
        <tr>
          <td>{this.props.orderItem.name}</td>
          <td>${price}</td>
          <td>
            <button type="submit"
                    className="btn btn-default full-width"
                    onClick={this.removeItem}>Remove</button></td>
        </tr>
      );
   }
});

Order = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function(){
    return { order: OrderStore.currentOrder() };
  },

  componentDidMount : function(){
    OrderStore.addChangeListener(this._orderChange);
  },

  componentWillUnmount: function() {
    OrderStore.removeChangeListener(this._orderChange);
  },

  _orderChange: function(){
    this.setState( { order : OrderStore.currentOrder()} );
  },

  handleOrder: function(){
    this.history.pushState(null, this.props.location.pathname + "/checkout", {order: this.state});
  },

  render: function(){
    var button;

    if (!this.props.location.pathname.includes("checkout")){
      button = <div className="footer">
                 <button type="submit"
                         disabled={_.isEmpty(this.state.order.items)}
                         className="btn btn-default full-width"
                         onClick={this.handleOrder}>Proceed to Checkout</button>
               </div>;
    }

    var subtotal = this.state.order.subtotal.toFixed(2);
    var tax = this.state.order.tax.toFixed(2);
    var total = this.state.order.total.toFixed(2);

    var tip, delivery;
    if (this.state.order.tipPercent !== null){
      var tipAmount = total * this.state.order.tipPercent.toFixed(2);

      tip = <tr>
                  <td>Tip</td>
                  <td>${tipAmount}</td>
                </tr>;
    } else {
      tip = "";
    }

    if (this.state.order.deliveryFee !== null) {
      if (this.state.order.deliveryFee !== 0){
        deliveryFee = "$" + this.state.order.deliveryFee.toFixed(2);
        delivery = <tr>
                    <td>Delivery</td>
                    <td>{deliveryFee}</td>
                   </tr>;
      } else {
        delivery = <tr>
                    <td>Delivery</td>
                    <td>Free</td>
                   </tr>;
      }
    }

    return (
      <div>
        <div className="col-xs-3 order">
         <div className="header">
           <h3>Your Order</h3>
         </div>

         <div className="order-body">
           <table className="table">
              <tr>
                <th>Item</th>
                <th>Price</th>
              </tr>
              <tbody>
              {
              _.mapObject(this.state.order.items, function(item, itemIdx){
                  return <OrderItem orderItem={item} key={itemIdx}/>;
                })
              }
            </tbody>
           </table>
           <table className="table">
              <tr>
                <th>Subtotal</th>
                <th>${subtotal}</th>
              </tr>
              <tbody>
                <tr>
                  <td>Tax</td>
                  <td>${tax}</td>
                </tr>
                  {delivery}
              </tbody>
              <th>Total</th>
              <th>${total} + tip</th>
           </table>
        </div>
        {button}
       </div>
       <div className="col-xs-2"></div>
      </div>
     );
  }
});
