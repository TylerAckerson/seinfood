OrderItem = React.createClass({
  removeItem: function(e) {
    e.preventDefault();
    OrderActions.orderRemoveItem(this.props.item);
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
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function(){
    return { items: OrderStore.allItems() };
  },

  componentDidMount : function(){
    OrderStore.addChangeListener(this._orderChange);
  },

  componentWillUnmount: function() {
    OrderStore.removeChangeListener(this._orderChange);
  },

  _orderChange: function(){
    this.setState( {items: OrderStore.allItems()} );
  },

  render: function(){
      return (
        <div className="row order">
         <div className="header">
           <h3>Your Order</h3>
         </div>

         <div className="order-body">

           <table className="table">
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
            {
              this.state.items.map(function(item){
                return <OrderItem item={item} />;
              })
            }
           </table>

        </div>

         <div className="footer">
           <button type="submit"
                   className="btn btn-default full-width"
                   onClick={this.handleOrder}>Proceed to Checkout</button>
         </div>
       </div>
     );
  }
});
