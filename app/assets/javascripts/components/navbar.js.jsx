Navbar = React.createClass({
  handleLogOut: function(){
    ApiUtil.deleteSession();
  },
  render: function(){
    var navbar;
    var signOut =
      <input
       type="button"
       onClick={this.handleLogOut}
       value="Sign Out"
       className="btn btn-defatul"/>;

    if (window.CURRENT_USER_ID) {
      navbar =
        <ul className="nav navbar-nav pull-right">
          <li id="header-logo">
              <a className="navbar-brand" href="/">
                <img src="assets/Seinfeld.png" className="img" width="160" height="50"/>
              </a>
          </li>
          <li><a href="/">Home</a></li>
          <li><a href="#">Account</a></li>
          <li>{signOut}</li>
        </ul>;
    } else {
      navbar =
        <ul className="nav navbar-nav pull-right">
          <li id="header-logo">
              <a className="navbar-brand" href="/">Seinfood</a>
          </li>
          <li><a href="/">Home</a></li>
          <li><a href="users/new">Sign Up</a></li>
          <li><a href="session/new">Sign In</a></li>
        </ul>;
    }

    return (
      <nav className="navbar navbar-default" id="app-navbar">
          <div className="navbar-header">
            {navbar}
        </div>
      </nav>
    );
  }
});
