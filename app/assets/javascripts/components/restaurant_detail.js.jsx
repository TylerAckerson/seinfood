RestaurantDetail = React.createClass({
  getInitialState: function() {
      return {};
    },

  _getStateFromStore: function() {
    var id = parseInt(this.props.params.restaurantId);
    var targetRestaurant = RestaurantStore.retrieveRestaurant(id);

    this.setState({ restaurant: targetRestaurant });
  },

  componentDidMount: function() {
    RestaurantStore.addDetailChangeListener(this._getStateFromStore);
    var id = parseInt(this.props.params.restaurantId);

    ApiUtil.fetchSingleRestaurant(id);
  },

  componentWillUnmount: function() {
    RestaurantStore.removeDetailChangeListener(this._getStateFromStore);
  },

  goBackToRestaurants: function(){
    this.props.history.pushState(null, "/restaurants");
  },

  render: function() {
    var restaurant = this.state.restaurant;
    if (restaurant === undefined){
      return (<div className="restaurant-detail-page throbber-loader" id="loader">
                Loading…
              </div>);
    }

    return (
      <div>
        <div className="row restaurant-detail-page bottom-buffer">
          <div className="row">

            <div className="col-xs-8 col-xs-offset-1">
              <button type="button" className="btn btn-default"
                      onClick={this.goBackToRestaurants}>{"< Back to NYC Restaurants"}
              </button>

              <div className="row">
                <RestaurantDetailHeader restaurant={restaurant} />
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
});
