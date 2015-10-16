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

  render: function() {
    return (
      <div className="restaurant-detail">
        <h2>The Dream Cafe Menu</h2>
        <li>Cuisine: {this.state.restaurant.cuisine}</li>
        <li>Address: {this.state.restaurant.address}</li>
      </div>
    );
  }
});
