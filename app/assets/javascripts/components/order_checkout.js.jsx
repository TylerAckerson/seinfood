OrderCheckout = React.createClass({
  getInitialState: function(){
    return { renderCount: 0 };
  },

  handleBack: function(){
    this.props.history.goBack();
  },

  handleOrder: function(e){
    e.preventDefault();
    var order = $.extend({}, OrderStore.currentOrder());
    order.userId = parseInt(window.CURRENT_USER_ID);
    order.restaurantId = this.props.params.restaurantId;

    this.setState(order);
    ApiUtil.createOrder(order);
  },

  componentDidMount: function(){
    OrderStore.addCompletionChangeListener(this._orderCompleted);
    OrderStore.addOrderDetailChangeListener(this._orderChanged);
    UserStore.addChangeListener(this._userChanged);

    this.setState( OrderStore.currentOrder() );
    ApiUtil.fetchUserInfo(window.CURRENT_USER_ID);
  },

  _userChanged: function() {
    this.currentUser = UserStore.user();
    this.forceUpdate();
  },

  componentWillUnmount: function(){
    OrderStore.removeCompletionChangeListener(this._orderCompleted);
    OrderStore.removeOrderDetailChangeListener(this._orderChanged);
  },

  _orderCompleted: function(){
    completedOrder = OrderStore.currentOrder();
    this.props.history.pushState(null, "/orders/" + completedOrder.id, {tip: this.state.tipPercent});
  },

  _orderChanged: function(){
    var order = $.extend({}, this.state, OrderStore.currentOrder());
    order.tipPercent = this.state.tipPercent;

    this.setState(order);
  },

  addTip: function(e) {
    e.preventDefault();
    var percentage = parseInt(e.target.value)/100;
    var newOrder = $.extend({}, this.state);
    newOrder.tipPercent = percentage;

    $(".tip").removeClass('active');
    $(e.target).addClass('active');

    this.setState(newOrder);
  },

  render: function(){
    if (this.state.renderCount === 0){
      this.classes="checkout-main";

      setTimeout(function() {
        this.classes ="checkout-main show";
        this.forceUpdate();
      }.bind(this), 300);

      this.state.renderCount++;
    }

    if (this.state.tipPercent !== null && this.state.tipPercent !== undefined){
      var tip = <span className="pull-left tip-label">
                {" Tip: $" + (this.state.tipPercent *
                              this.state.total).toFixed(2)}
                </span>;
    }

    return (
      <div className={this.classes}>
        <div> {this.currentUser}</div>
        <div className="col-xs-2"></div>
        <div className="col-xs-5 checkout">
          <div className="header">
            <h3>Order Details</h3>
          </div>

          <div className="order-body">
            <form role="form" className="form">
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
                <div className="col-xs-3 col-sm-3 col-md-3 align-center">

                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 align-center">
                  <button type="button" className="btn btn-default tip"
                          value="30"
                          onClick={this.addTip}>30%</button>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 align-center">

                </div>
              </div>
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 align-center">
                    <span className="pull-right tip-label">Add a tip?</span>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 align-center">
                  <button type="button" className="btn btn-default tip"
                          value="20"
                          onClick={this.addTip}>20%</button>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 align-center">
                  {tip}
                </div>
              </div>
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 align-center">

                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 align-center align-center">
                  <button type="button" className="btn btn-default tip"
                          value="10"
                          onClick={this.addTip}>10%</button>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 align-center">

                </div>
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
