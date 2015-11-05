UserAccount = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function(){
    return { email: "",
             address: "",
             city: "",
             state: "",
             orders: []};
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._userChanged);
    ApiUtil.fetchUserInfo(window.CURRENT_USER_ID);
  },

  _userChanged: function() {
    this.setState( UserStore.user() );
  },

  handleUserUpdate: function(e){
    e.preventDefault();
    ApiUtil.updateUser( this.state );
  },

  render: function(){
    return (
      <div className="container">
        <div className="row top-row">
          <div className="col-xs-6 col-xs-offset-3 account">
            <div className="header">
              <h3>Account Info</h3>
            </div>
            <div className="account-body">
              <div className="form-group">
                <label>Email
                  <input type="text" className="form-control" id="email"
                                     valueLink={this.linkState("email")}/>
                </label>
              </div>

              <div className="form-group">
                <label>Address
                  <input type="text" className="form-control" id="address"
                                     valueLink={this.linkState("address")}/>
                </label>
              </div>
              <div className="form-group">
                <label>City
                  <input type="text" className="form-control" id="city"
                                     valueLink={this.linkState("city")}/>
                </label>
              </div>
              <div className="form-group">
                <label>State
                  <input type="text" className="form-control" id="state"
                                     valueLink={this.linkState("state")}/>
                </label>
              </div>
            </div>
            <div className="footer">
              <button type="submit"
                      className="btn btn-default half-width left"
                      onClick={this.props.history.goBack}>Back</button>
              <button type="submit"
                      className="btn btn-default half-width right"
                      onClick={this.handleUserUpdate}>Update</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
