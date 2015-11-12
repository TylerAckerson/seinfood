Search = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState:function(){
    return { search: "" };
  },

  handleFormSubmit: function(e){
    e.preventDefault();
    $('.search-button').removeClass("col-md-offset-4 col-lg-offset-4");
    $('.search-button').addClass("col-md-offset-8 col-lg-offset-8");
    $('.address-search').removeClass("hide");

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
              <h3>... from restaurants featured in the 90s sitcom Seinfeld</h3>
            </div>
            <div className="row">
              <h1>Order Food Delivery & Takeout</h1>
            </div>
            <div className="row ">
                  <input className="address-search col-xs-12 col-sm-12 col-md-8 col-lg-8 hide"
                         type="text"
                         valueLink={this.linkState("search")}>
                  </input>
                  <input type="submit" className="search-button col-xs-6 col-sm-6 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4" value="Show Restaurants"/>
           </div>
          </div>
        </form>
        </div>
      );
  }
});
