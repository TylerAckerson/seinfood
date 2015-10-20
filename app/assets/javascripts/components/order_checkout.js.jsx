
OrderCheckout = React.createClass({
  getInitialState: function(){
    return {};
  },

  handleBack: function(){
    this.history.pushState(null, "/restaurants/" + this.props.restaurant.id);
  },

  render: function(){
      return (
        <div className="row order">
        <h1>CHECKOUT</h1>
         <div className="header">
           <h3>Order Details Order</h3>
         </div>

         <div className="order-body">

        </div>

         <div className="footer">
           <button type="submit"
                   className="btn btn-default full-width"
                   onClick={this.handleOrder}>Continue Checkout</button>
         </div>
       </div>
     );
  }
});
