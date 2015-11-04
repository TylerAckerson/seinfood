UserAccount = React.createClass({
  getInitialState: function(){
    return { user: UserStore.user() };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._userChanged);
    ApiUtil.fetchUserInfo(window.CURRENT_USER_ID);
  },

  _userChanged: function() {
    this.setState( { user: UserStore.user() } );
  },

  render: function(){
    debugger;

    return (
      <div>user account</div>
    );
  }
});
