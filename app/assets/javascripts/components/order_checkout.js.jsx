OrderCheckout = React.createClass({
  getInitialState: function(){
    return {};
  },

  handleBack: function(){
    this.props.history.goBack();
  },
    render: function(){
      return (
        <div>
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
              </form>
            </div>

           <div className="footer">
             <button type="submit"
                     className="btn btn-default half-width left"
                     onClick={this.handleBack}>Back to Menu</button>
             <button type="submit"
                     className="btn btn-default half-width right"
                     onClick={this.handleOrder}>Continue Checkout</button>
           </div>
         </div>
       </div>
     );
  }
});
