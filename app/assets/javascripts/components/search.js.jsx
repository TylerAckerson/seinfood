Search = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState:function(){
    return { search: "" };
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
            <div className="row">
                <input className="address-search"
                       type="text"
                       placeholder="  e.g 129 West 81st Street, Apartment 5A"
                       valueLink={this.linkState("search")}>
                  <span className="address-label">Enter an NYC address</span>
                </input>
                <input type="submit" className="search-button" value="Find Restaurants"/>
           </div>
          </div>
        </form>
        </div>
      );
  }
});
