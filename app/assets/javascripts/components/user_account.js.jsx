UserAccount = React.createClass({
  getInitialState: function(){
    return { user: {  email: "",
                    address: "",
                       city: "",
                      state: "" } };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._userChanged);
    ApiUtil.fetchUserInfo(window.CURRENT_USER_ID);
  },

  _userChanged: function() {
    this.setState( { user: UserStore.user() } );
  },

  render: function(){
    var user = this.state.user;

    return (
      <div className="container">
        <h3>Account Info</h3>
        <div className="form-group">
          <label>Email
            <input type="text" className="form-control" id="email"
                   value={user.email}/>
          </label>
        </div>

        <div className="form-group">
          <label>Address
            <input type="text" className="form-control" id="address"
                   value={user.address}/>
          </label>
        </div>
        <div className="form-group">
          <label>City
            <input type="text" className="form-control" id="city"
                   value={user.city}/>
          </label>
        </div>
        <div className="form-group">
          <label>State
            <input type="text" className="form-control" id="state"
                   value={user.state}/>
          </label>
        </div>
      </div>
    );
  }
});
