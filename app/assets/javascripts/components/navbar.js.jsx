Navbar = React.createClass({
  handleLogOut: function(){
    ApiUtil.deleteSession();
  },
  render: function(){
    var navbar;
    var signOut = <input
       type="button"
       onClick={this.handleLogOut}
       value="Sign Out"
       className="btn navbar-button navbar-right sign-out"/>;

    if (window.CURRENT_USER_ID) {
      navbar =
        <ul className="nav nav-pills">
          <li><a href="#">Account</a></li>
          <li>{signOut}</li>
          <li><a href="/">Home</a></li>
        </ul>;
    } else {
      navbar =
        <ul className="nav nav-pills">
          <li><a href="users/new">Sign Up</a></li>
          <li><a href="session/new">Sign In</a></li>
          <li><a href="root_url">Home</a></li>
        </ul>;
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="container-fluid">
            {navbar}
          </div>
        </div>
      </nav>
    );
  }
});
