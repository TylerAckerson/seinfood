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
    order.user_id = parseInt(window.CURRENT_USER_ID);
    order.scheduled_for = new Date();

    ApiUtil.createOrder({order: order});
  },

  componentDidMount: function(){
    OrderStore.addCompletionChangeListener(this._orderCompleted);
    OrderStore.addOrderDetailChangeListener(this._orderChanged);
    UserStore.addChangeListener(this._userChanged);

    this.setState( OrderStore.currentOrder() );

    if (window.CURRENT_USER_ID){
      ApiUtil.fetchUserInfo(window.CURRENT_USER_ID);
    }
  },

  componentWillUnmount: function(){
    OrderStore.removeCompletionChangeListener(this._orderCompleted);
    OrderStore.removeOrderDetailChangeListener(this._orderChanged);
  },

  _orderCompleted: function(){
    completedOrder = OrderStore.currentOrder();
    this.props.history.pushState(null, "/orders/" + completedOrder.id);
  },

  _orderChanged: function(){
    var order = $.extend({}, this.state, OrderStore.currentOrder());
    this.setState(order);
  },

  _userChanged: function() {
    this.currentUser = UserStore.user();
    this.forceUpdate();
  },


  updateTip: function(e) {
    e.preventDefault();
    var percentage = parseInt(e.target.value)/100;

    $(".tip").removeClass('active');
    $(e.target).addClass('active');

    OrderActions.orderUpdateTip({tip: percentage});
  },

  getGuestLoginForm: function(){
    guestLoginForm =
      <div className="guest-login">
        <h4>It looks like you are not logged in</h4>
        <button type="submit"
                className="btn btn-default"
                onClick={this.getGuestUserInfo}>Pay as Guest</button>
      </div>;

    return guestLoginForm;
  },

  getGuestUserInfo: function(){
    var guestUser = { userEmail: "elaine@pendantpublishing.com",
                    userAddress: "16 W 75th St Apartment 2G",
                       userCity: "New York City",
                         userSt: "New York" };

    this.user = guestUser;
    this.setState( {guestUser: guestUser} );

    setTimeout(function() {
      $('.guest-login').addClass('hiddenform');
    }, 500);
  },

  getUserInfo: function(){
    var user = { userEmail: this.currentUser.email,
               userAddress: this.currentUser.address,
                  userCity: this.currentUser.city,
                    userSt: this.currentUser.state };

    return user;
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


    if (typeof this.state.tip_percent !== 'undefined' &&
                                      this.state.tip_percent !== 0 ){
      var tip = <span className="pull-left tip-label">
                {" Tip: $" + this.state.tip.toFixed(2)}
                </span>;
    }

    var guestLogin;
    if (this.currentUser){
      this.user = this.getUserInfo();
    } else if (typeof this.user === 'undefined' || _.isEmpty(this.user)) {
          this.user = {};
          guestLogin = this.getGuestLoginForm();
    } else {
      guestLogin = this.getGuestLoginForm();
    }

    var deliveryClasses;
    if (this.state.order_type === "delivery") {
      deliveryClasses = "delivery-form show";
    } else {
      deliveryClasses = "delivery-form";
    }

    var deliveryInfo =
        <div className={deliveryClasses}>
          <div className="form-group">
              <label>Address
                <input type="text" className="form-control" id="address"
                       value={this.user.userAddress}/>
              </label>
            </div>
            <div className="form-group">
              <label>City
                <input type="text" className="form-control" id="city"
                       value={this.user.userCity}/>
              </label>
            </div>
            <div className="form-group">
              <label>State
                <input type="text" className="form-control" id="state"
                       value={this.user.userSt}/>
              </label>
            </div>
        </div>;

    return (
      <div className={this.classes}>
        <div className="col-xs-5 col-xs-offset-2 checkout">
          <div className="header">
            <h3>Order Details</h3>
          </div>
          <div className="order-body">
              <h3>Contact Info</h3>

              {guestLogin}

            <form role="form" className="form">
              <div className="form-group">
                <label>Email
                  <input type="text" className="form-control" id="email"
                         value={this.user.userEmail}/>
                </label>
              </div>

              {deliveryInfo}

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
                          onClick={this.updateTip}>30%</button>
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
                          onClick={this.updateTip}>20%</button>
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
                          onClick={this.updateTip}>10%</button>
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
