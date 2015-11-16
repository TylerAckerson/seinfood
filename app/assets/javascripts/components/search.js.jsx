Search = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState:function(){
    return { search: "" };
  },

  handleFormSubmit: function(e){
    e.preventDefault();
    $('.address-search').removeClass("hide col-xs-1 col-sm-1 col-md-1 col-lg-1");
    $('.address-label').addClass("show");
    $('.address-search').addClass("show col-xs-6 col-sm-8 col-md-8 col-lg-8");
    $('.search-button').removeClass("col-xs-offset-2 col-sm-offset-3 col-md-offset-3 col-lg-offset-3");

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
        <div className="row splash-page">
          <div className="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-lg-offset-3">

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
                  <input className="address-search col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         type="text"
                         valueLink={this.linkState("search")}>
                  </input>
                  <input className="search-button col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xs-offset-2 col-sm-offset-3 col-md-offset-3 col-lg-offset-3"
                         type="submit"
                         value="Find Restaurants"/>
           </div>
          </div>
        </form>

          </div>
        </div>
      );
  }
});
