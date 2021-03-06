OrderItem = React.createClass({
  removeItem: function(e) {
    e.preventDefault();

    setTimeout(function() {
      OrderActions.orderRemoveItem(this.props.orderItem.counter);
    }.bind(this), 500 );
  },

  render: function() {
    price = this.props.orderItem.price.toFixed(2);

    return (
        <tr>
          <td>{this.props.orderItem.name}</td>
          <td>${price}</td>
          <td>
            <button type="submit"
                    className="btn btn-default full-width remove"
                    onClick={this.removeItem}>
                      <span className="glyphicon glyphicon-minus"/>
                    </button></td>
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

  updateOrderOffer: function(e){
    $('.order-offers').removeClass('active');
    $(e.currentTarget).addClass('active');

    OrderActions.orderUpdateOffer( {offer: e.currentTarget.value} );
  },

  handleOrder: function(){
    this.history.pushState(null, this.props.location.pathname + "/checkout", {order: this.state});
  },

  render: function(){
    var footer;

    if (!(this.props.location.pathname.includes("checkout") ||
                                  _.isEmpty(this.state.order.items))){
      classes = "footer show";
    } else {
      classes = "footer";
    }

    footer = <div className={classes}>
               <button type="submit"
                       disabled={_.isEmpty(this.state.order.items)}
                       className="btn btn-default full-width"
                       onClick={this.handleOrder}>Proceed to Checkout</button>
             </div>;

    var subtotal = this.state.order.subtotal.toFixed(2);
    var tax = this.state.order.tax.toFixed(2);
    var total = this.state.order.total.toFixed(2);

    var tip, delivery;
    if (this.state.order.tipPercent !== null && typeof this.state.order.tipPercent !== 'undefined'){
      var tipAmount = total * this.state.order.tipPercent.toFixed(2);

      tip = <tr>
              <td>Tip</td>
              <td>${tipAmount}</td>
            </tr>;
    } else {
      tip = "";
    }

    if (this.state.order.delivery_fee !== null) {
      if (this.state.order.delivery_fee !== 0){
        delivery_fee = "$" + this.state.order.delivery_fee.toFixed(2);
        delivery = <tr>
                    <td />
                    <td>Delivery</td>
                    <td>{delivery_fee}</td>
                    <td width="80"/>
                   </tr>;
      } else {
        delivery = <tr>
                    <td>Delivery</td>
                    <td>Free</td>
                   </tr>;
      }
    }

    var restaurant = this.state.order.restaurant, orderType;
    if (restaurant !== null) {
      if (restaurant.takeout_only){
        orderType =
          <div className="row align-center">
            <div className="col-xs-4 col-sm-4 col-md-4"/>
            <div className="col-xs-4 col-sm-4 col-md-4">
                  <button type="submit"
                          value="takeout"
                          className="btn order-offers pull-left active"
                          onClick={this.updateOrderOffer}>
                    <p>Takeout</p>
                    <span className="glyphicon glyphicon-upload offer-icon"/>
                  </button>
                </div>
              <div className="col-xs-4 col-sm-4 col-md-4"/>
            </div>;
      } else {
        orderType =
          <div className="row align-center">
              <div className="col-xs-6">
                <button type="submit" className="btn order-offers pull-right active"
                        value="delivery"
                        onClick={this.updateOrderOffer}>
                  <p>Delivery</p>
                  <span className="glyphicon glyphicon-download offer-icon"/>
                </button>
              </div>
              <div className="col-xs-6">
                <button type="submit"
                        value="takeout"
                        className="btn order-offers pull-left"
                        onClick={this.updateOrderOffer}>
                  <p>Takeout</p>
                  <span className="glyphicon glyphicon-upload offer-icon"/>
                </button>
              </div>
            </div>;
      }
    }

    return (

      <div>
        <div className="col-xs-3 col-xs-offset-1 col-sm-3 col-sm-offset-1 col-md-3 col-md-offset-1 col-lg-3 col-lg-offset-1 order">
         <div className="header">
           <h3>Your Order</h3>
         </div>

         <div className="order-body">
           <table className="table">
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th/>
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
                <th/>
                <th>Subtotal</th>
                <th>${subtotal}</th>
                <th width="80"/>
              </tr>
              <tbody>
                <tr>
                  <td/>
                  <td>Tax</td>
                  <td>${tax}</td>
                  <td width="80"/>
                </tr>
                  {delivery}
              </tbody>
              <th/>
              <th>Total</th>
              <th>${total}</th>
           </table>
        </div>
        {orderType}
        {footer}
       </div>
       <div className="col-xs-2"></div>
      </div>
     );
  }
});
