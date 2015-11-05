CompletedOrder = React.createClass({
  getInitialState: function(){
    return OrderStore.currentOrder();
  },

  componentDidMount: function(){
    this.setState(OrderStore.currentOrder());
  },

  render: function(){
    var order = this.state;

    var subtotal = parseInt(order.subtotal).toFixed(2);
    var tax = order.tax.toFixed(2);
    var delivery = parseInt(order.delivery_fee).toFixed(2);
    var tip = parseInt(order.tip).toFixed(2);
    var total = (order.total).toFixed(2);

    return(
      <div className="container completed-order" id="completed-order">
        <div className="row">
          <h2>Your {order.order_type} order from {order.restaurant.name} is in the works!</h2>
          <h3>Order Summary</h3>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-5 col-lg-4">
            <h4>Details</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="checkout-label">Subtotal: </span><span>${subtotal}</span></li>
                <li className="list-group-item">
                  <span className="checkout-label">Tax: </span><span>${tax}</span></li>
                <li className="list-group-item">
                  <span className="checkout-label">Delivery: </span><span>${delivery}</span></li>
                <li className="list-group-item">
                  <span className="checkout-label">Tip: </span><span>${tip}</span></li>
                <li className="list-group-item">
                  <span className="checkout-label">Total: </span><span>${total}</span></li>
              </ul>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-5 col-lg-4">
            <h4>Order List</h4>
            <ul className="list-group">{
              _.mapObject(order.items, function(item){
                return <li className="list-group-item">{item.name}</li>;
              })
            }
            </ul>
          </div>
      </div>
      <div className="row">
        <h3>Delivery estimate: 30-45 minutes.</h3>
      </div>
    </div>
        );
  }
});
