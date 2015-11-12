Search = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState:function(){
    return { search: "129 West 81st St, New York, NY" };
  },

  handleFormSubmit: function(e){
    e.preventDefault();
    var searchString = this.state.search;
    this.props.history.pushState(null, "/restaurants", { search: searchString});
  },

  render: function(){
      return (
        <div className="splash-page">
        <form role="form" className="form-inline search-form" onSubmit={this.handleFormSubmit}>
          <div className="container-fluid">
            <div className="row">
              <h1>Order Food Delivery & Takeout</h1>
            </div>
            <div className="row">
              <h3>... from restaurants featured in the 90s sitcom Seinfeld</h3>
            </div>
            <div className="row ">
                  <input className="address-search col-xs-12 col-sm-12 col-md-9 col-lg-9"
                         type="text"
                         valueLink={this.linkState("search")}>
                    <span className="address-label">Enter an NYC address</span>
                  </input>
                  <input type="submit" className="search-button col-xs-6 col-sm-6 col-md-3 col-lg-3" value="Show Restaurants"/>
           </div>
          </div>
        </form>
        </div>
      );
  }
});
