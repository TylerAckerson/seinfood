RestaurantDetail = React.createClass({
  getInitialState: function() {
      return this.getStateFromStore();
    },

  getStateFromStore: function() {
    var id = parseInt(this.props.params.restaurantId);
    var targetRestaurant = RestaurantStore.retrieveRestaurant(id);
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
      <div>
        <div className="restaurant-detail-header">
          <div className="row">
            <div className="col-xs-1"></div>

            <div className="col-xs-7">
              <button type="button" className="btn btn-default"
                      onClick={this.goBack}>{"< Back to NYC Restaurants"}
              </button>

              <div className="row">
                <RestaurantDetailHeader restaurant={restaurant} />
              </div>

            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-8">
              <Menu restaurant={restaurant} />
            </div>
            <div className="col-xs-4">
              <Order restaurant={restaurant} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
