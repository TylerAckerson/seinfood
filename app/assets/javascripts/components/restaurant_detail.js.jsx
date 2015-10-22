RestaurantDetail = React.createClass({
  getInitialState: function() {
      return this.getStateFromStore();
    },

  getStateFromStore: function() {
    var id = parseInt(this.props.params.restaurantId);
    ApiUtil.fetchSingleRestaurant(id);
    // var id = parseInt(this.props.params.restaurantId);
    var targetRestaurant = RestaurantStore.retrieveRestaurant(id);
    return { restaurant: targetRestaurant };
  },

  // componentWillMount: function() {
  //   id = parseInt(this.props.params.restaurantId);
  //   ApiUtil.fetchSingleRestaurant(id);
  // },

  goBackToRestaurants: function(){
    this.props.history.pushState(null, "/restaurants");
  },

  render: function() {
    var restaurant = this.state.restaurant;

    if (restaurant === undefined){
      return (<div></div>);
    }

    return (
      <div>
        <div className="row restaurant-detail-page bottom-buffer">
          <div className="row">
            <div className="col-xs-1"></div>

            <div className="col-xs-7">
              <button type="button" className="btn btn-default"
                      onClick={this.goBackToRestaurants}>{"< Back to NYC Restaurants"}
              </button>

              <div className="row">
                <RestaurantDetailHeader restaurant={restaurant} />
              </div>

            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});
