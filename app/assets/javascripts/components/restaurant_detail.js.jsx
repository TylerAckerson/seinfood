RestaurantDetail = React.createClass({
  getInitialState: function() {
      return this.getStateFromStore();
    },

  getStateFromStore: function() {
    var id = parseInt(this.props.params.restaurantId);
    var targetRestaurant = RestaurantStore.retrieveRestaurant(id).extract;
    return { restaurant: targetRestaurant };
  },

  componentWillMount: function() {
    ApiUtil.fetchSingleRestaurant(this.state.restaurant.id);
  },

  goBack: function(){
    this.props.history.pushState(null, "/restaurants");
  },

  render: function() {
    var restaurant = this.state.restaurant;

    return (
      <div className="container restaurant-detail">
        <div className="row">
          <button type="button" className="btn btn-default"
                  onClick={this.goBack}>{"< Back to NYC Restaurants"}
          </button>
        </div>

        <div className="row">
          <RestaurantDetailHeader restaurant={restaurant} />
        </div>

        {this.props.children}
      </div>
    );
  }
});
