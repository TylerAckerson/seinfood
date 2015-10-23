OrderCheckout = React.createClass({
  getInitialState: function(){
    return { order: {} };
  },

  handleBack: function(){
    this.props.history.goBack();
  },

  handleOrder: function(e){
    e.preventDefault();
    var orderItems = $.extend({}, OrderStore.currentOrder());
    var order = {items: orderItems,
                 userId: parseInt(window.CURRENT_USER_ID),
                 restaurantId: this.props.params.restaurantId};

    this.setState({order: order});
    ApiUtil.createOrder(order);
  },

  componentDidMount: function(){
    OrderStore.addCompletionChangeListener(this._orderCompleted);
    // OrderStore.addOrderDetailChangeListener(this._orderChanged);
    this.setState({ order: OrderStore.currentOrder() });
  },

  componentWillUnmount: function(){
    OrderStore.removeCompletionChangeListener(this._orderCompleted);
    // OrderStore.removeOrderDetailChangeListener(this._orderChanged);
  },

  _orderCompleted: function(){
    completedOrder = OrderStore.currentOrder();
    this.props.history.pushState(null, "/orders/" + completedOrder.id, {tip: this.state.tipPercent});
  },

  addTip: function(e) {
    e.preventDefault();
    var percentage = parseInt(e.target.value)/100;

    var newOrder = $.extend(this.state.order, {tipPercent: percentage} );
    this.setState(newOrder);
  },

  render: function(){
    var userId = window.CURRENT_USER_ID;
    if (userId) {
      userInfo = ApiUtil.fetchUserInfo(parseInt(userId));
      //need to add fluxiness for this to work
    }

    if (this.state.order.tipPercent !== null && this.state.order.tipPercent !== undefined){
      var tip = <div className="col-xs-2">
                {" Tip: $" + (this.state.order.tipPercent * this.state.order.total).toFixed(2)}
                </div>;
    }

    return (
      <div>
        <div className="col-xs-2"></div>
        <div className="col-xs-5 checkout">
          <div className="header">
            <h3>Order Details</h3>
          </div>

          <div className="order-body">
            <form role="form" className="form-inline">
              <h3>Contact Info</h3>
              <div className="form-group">
                <label>First Name
                  <input type="text" className="form-control" id="first-name"/>
                </label>
              </div>
              <div className="form-group">
                <label>Last Name
                  <input type="text" className="form-control" id="last-name"/>
                </label>
              </div>
              <div className="form-group">
                <label>Phone
                  <input type="text" className="form-control" id="phone"/>
                </label>
              </div>

              <h3>Order Notes & Requests</h3>
              <div className="form-group">
                  <textarea className="form-control"
                            id="order-notes"
                            rows="8" cols="80"></textarea>
              </div>

              <h3>Payment Info</h3>
              <div className="row">
              <div className="btn-group col-xs-5" role="group">
                <label>Add a tip?
                <button type="button" className="btn btn-default"
                        value="10"
                        onClick={this.addTip}>10%</button>
                <button type="button" className="btn btn-default"
                        value="20"
                        onClick={this.addTip}>20%</button>
                <button type="button" className="btn btn-default"
                        value="30"
                        onClick={this.addTip}>30%</button>
                </label>
              </div>
              {tip}
              </div>
            </form>
          </div>

         <div className="footer">
           <button type="submit"
                   className="btn btn-default half-width left"
                   onClick={this.handleBack}>Back to Menu</button>
           <button type="submit"
                   className="btn btn-default half-width right"
                   onClick={this.handleOrder}>Place Order</button>
         </div>
       </div>
     </div>
   );
  }
});
