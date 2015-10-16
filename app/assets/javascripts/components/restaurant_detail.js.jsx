RestaurantDetail = React.createClass({
  getInitialState: function() {
      return this.getStateFromStore();
    },

  getStateFromStore: function() {
    var id = parseInt(this.props.params.restaurantId);
    return { restaurant: RestaurantStore.find(id) };
  },

  _onChange: function(){
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function() {
    RestaurantStore.addDetailChangeListener(this._onChange);
    var id = parseInt(this.props.params.restaurantId);
    ApiUtil.fetchSingleRestaurant(id);
  },

  componentWillUnmount: function() {
    RestaurantStore.removeDetailChangeListener(this._onChange);
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
