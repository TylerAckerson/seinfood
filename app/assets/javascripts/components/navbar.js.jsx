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
              <a className="navbar-brand" href="/">Seinfood</a>
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
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
          <div className="collapse navbar-collapse" id="collapse-menu">
            {navbar}
          </div>
          </div>

        </div>
      </nav>
    );
  }
});
