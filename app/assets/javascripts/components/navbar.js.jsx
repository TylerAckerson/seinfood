Navbar = React.createClass({
  mixins: [ReactRouter.History],

  handleLogOut: function(){
    ApiUtil.deleteSession();
  },

  handleAccount: function(){
    var userId = window.CURRENT_USER_ID;
    this.history.pushState(null, "/users/" + userId);
  },

  render: function(){
    var sign;

    var account =
      <input
       type="button"
       onClick={this.handleAccount}
       value="Account"
       className="sign-out"/>;

    var signOut =
      <input
       type="button"
       onClick={this.handleLogOut}
       value="Sign Out"
       className="sign-out"/>;

    if (window.CURRENT_USER_ID) {
      sign =  <li>
                <li>{signOut}</li>
                <li>{account}</li>
              </li>;
    } else {
      sign =  <li><a href="users/new">Sign In</a></li>;
    }

    return (
      <nav className="navbar navbar-default" id="app-navbar">
      <div className="container-fluid">
        <button type="button" className="navbar-toggle collapsed"
                data-toggles="collapse" data-target="collapse-menu"
                aria-expanded="false">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>
        <div className="navbar-header" id="header-logo">
          <a className="navbar-brand" href="/">
            <img src="https://dl.dropboxusercontent.com/u/4448887/seinfood/Seinfeld.png"
                 className="img" width="160" height="50"/>
          </a>
        </div>

        <div className="collapse navbar-collapse" id="collapse-menu">
          <ul className="nav navbar-nav pull-right">
            <li><a href="/">Home</a></li>
            {sign}
          </ul>
        </div>

      </nav>
    );
  }
});
