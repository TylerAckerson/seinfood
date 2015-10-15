RestaurantItem = React.createClass({
  handleDetailButton: function(){
    // debugger;
    // this.props.history.pushState(null, "/restaurants", { search: searchString});
    window.location = "/restaurants/" + this.props.restaurant.id;
  },

  render: function(){
    restaurant = this.props.restaurant;

    var deliveryFee = restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(restaurant.delivery_fee);

    return (
      <div id="restaurant-item">
          <h4>{restaurant.name}</h4>
        <ul>
          <li>Cuisine: {restaurant.cuisine}</li>
          <li>Address: {restaurant.address}</li>
          <li>Delivery min: {restaurant.delivery_min}</li>
          <li>Delivery fee: {deliveryFee}</li>
          <li>Distance: {this.props.distance}</li>
          <input
             type="button"
             onClick={this.handleDetailButton}
             value="View Menu"
             className="btn navbar-button navbar-right sign-out"/>
        </ul>
      </div>
    );
  }
});
