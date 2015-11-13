Search = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState:function(){
    return { search: "" };
  },

  handleFormSubmit: function(e){
    e.preventDefault();
    $('.address-search').removeClass("hide col-md-1 col-lg-1");
    $('.address-search').addClass("show col-md-9 col-lg-9");
    $('.address-label').addClass("show");
    $('.search-button').removeClass("col-md-offset-4 col-lg-offset-4");

    $(".address-search").typed({
        strings: ["129 West 81st St, New York, NY"],
        typeSpeed: 0
    });

    setTimeout(function() {
      var searchString = this.state.search;
      this.props.history.pushState(null, "/restaurants", { search: searchString});
    }.bind(this), 1800);
  },

  render: function(){
      return (
        <div className="splash-page">
        <form role="form" className="form-inline search-form" onSubmit={this.handleFormSubmit}>
          <div className="container-fluid">
            <div className="row">
              <h1>Order Food Delivery & Takeout</h1>
            </div>
            <div className="row search-detail">
              <h4>Seinfood features restaurants made famous by the 90s sitcom Seinfeld.</h4>
              <h4>Click 'Find Restaurants' to start browsing restaurants near Jerrys apartment!</h4>
            </div>
            <div className="row ">
                  <span className="address-label">Address:</span>
                  <input className="address-search col-xs-12 col-sm-12 col-md-1 col-lg-1"
                         type="text"
                         valueLink={this.linkState("search")}>
                  </input>
                  <input type="submit" className="search-button col-xs-6 col-sm-6 col-md-3 col-lg-3 col-md-offset-4 col-lg-offset-4" value="Find Restaurants"/>
           </div>
          </div>
        </form>
        </div>
      );
  }
});
