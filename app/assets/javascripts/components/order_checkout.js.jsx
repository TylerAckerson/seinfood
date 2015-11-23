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

    this.handleChecks(order);
  },

  handleChecks: function(order){
    if (this.state.order_type == "delivery"){
      emailChecks = this.validateEmail();
      deliveryChecks = this.validateDeliveryFields();

      if (emailChecks && deliveryChecks){
        ApiUtil.createOrder({order: order});
      }

    } else if (this.state.order_type == "takeout"){

      if (this.validateEmail()) {
        ApiUtil.createOrder({order: order});

      }
    }
  },

  validateEmail: function(){
    email = this.state.email;

    if ( typeof email === "undefined" || !(this.isEmail(email)) ) {
      $("#email").addClass("invalid");
      $("#email").removeClass("valid");
      return false;
    } else {
      $("#email").addClass("valid");
      $("#email").removeClass("invalid");
      return true;
    }

  },

  isEmail: function(str){
    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (str.match(pattern)){
      return str.match(pattern)[0] === str;
    } else {
      return false;
    }
  },

  validateDeliveryFields: function(){
    checksPassed = true;




    return checksPassed;
  },

  validateAddress: function(){
    address = this.state.address;

    if (typeof address === "undefined" || address === "" || address === " ") {
      $("#address").addClass("invalid");
      $("#address").removeClass("valid");
      return false;
    } else {
      $("#address").addClass("valid");
      $("#address").removeClass("invalid");
      return true;
    }
  },

  validateState: function(){
    state = this.state.state;

    if (typeof state === "undefined" || state === "" || state === " ") {
      $("#state").addClass("invalid");
      $("#state").removeClass("valid");
      return false;
    } else {
      $("#state").addClass("valid");
      $("#state").removeClass("invalid");
      return true;
    }
  },

  validateCity: function(){
    city = this.state.city;
    
    if (typeof city === "undefined" || city === "" || city === " ") {
      $("#city").addClass("invalid");
      $("#city").removeClass("valid");
      return false;
    } else {
      $("#city").addClass("valid");
      $("#city").removeClass("invalid");
      return true;
    }
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
    this.setState( { user: UserStore.user() } );
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
    var guestUser = {   email: "elaine@pendantpublishing.com",
                      address: "16 W 75th St Apartment 2G",
                         city: "New York City",
                        state: "New York" };

   this.setState( guestUser );

    setTimeout(function() {
      $('.guest-login').addClass('hiddenform');
    }, 500);
  },

  updateEmail: function(e){
    e.preventDefault();
    newState = $.extend({}, this.state);
    newState.email = e.currentTarget.value;

    this.setState( newState );
    this.validateEmail();
  },

  updateAddress: function(e){
    e.preventDefault();
    newState = $.extend({}, this.state);
    newState.address = e.currentTarget.value;

    this.setState( newState );
    this.validateAddress();
  },

  updateState: function(e){
    e.preventDefault();
    newState = $.extend({}, this.state);
    newState.state = e.currentTarget.value;

    this.setState( newState );
    this.validateState();
  },

  updateCity: function(e){
    e.preventDefault();
    newState = $.extend({}, this.state);
    newState.city = e.currentTarget.value;

    this.setState( newState );
    this.validateCity();
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
    } else if (typeof this.user === 'undefined' || _.isEmpty(this.user)) {
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

    var deliveryInfo, userEmail;
    if ( this.state.email){
      userEmail = this.state.email;
      deliveryInfo =
        <div className={deliveryClasses}>
          <div className="form-group">
              <label>Address
                <input type="text" className="form-control" id="address"
                       onChange={this.updateAddress}
                       value={ this.state.address }/>
              </label>
            </div>
            <div className="form-group">
              <label>City
                <input type="text" className="form-control" id="city"
                       onChange={this.updateCity}
                       value={this.state.city}/>
              </label>
            </div>
            <div className="form-group">
              <label>State
                <input type="text" className="form-control" id="state"
                       onChange={this.updateState}
                       value={this.state.state}/>
              </label>
            </div>
        </div>;


    } else {
      userEmail = "";
      deliveryInfo =
          <div className={deliveryClasses}>
            <div className="form-group">
                <label>Address
                  <input type="text" className="form-control" id="address"/>
                </label>
              </div>
              <div className="form-group">
                <label>City
                  <input type="text" className="form-control" id="city"/>
                </label>
              </div>
              <div className="form-group">
                <label>State
                  <input type="text" className="form-control" id="state"/>
                </label>
              </div>
          </div>;
    }

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
                         onChange={this.updateEmail}
                         value={userEmail}/>
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
