OrderItem = React.createClass({
  removeItem: function(e) {
    e.preventDefault();
    OrderActions.orderRemoveItem(this.props.item.counter);
  },

  render: function() {
    return (
        <tr>
          <td>{this.props.item.name}</td>
          <td>{this.props.item.price}</td>
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
    return { order: OrderStore.currentOrder()};
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
                         disabled={this.state.order.items.isEmpty}
                         className="btn btn-default full-width"
                         onClick={this.handleOrder}>Proceed to Checkout</button>
               </div>;
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
                <th></th>
              </tr>
              <tbody>
              {
              _.mapObject(this.state.order.items, function(item){
                  return <OrderItem item={item} key={item.counter}/>;
                })
              }
            </tbody>
           </table>
        </div>
        {button}
       </div>
       <div className="col-xs-2"></div>
      </div>
     );
  }
});
