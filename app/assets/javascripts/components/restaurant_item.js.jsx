RestaurantItem = React.createClass({
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
          <li>Minimum: {restaurant.delivery_min}</li>
          <li>Delivery fee: {deliveryFee}</li>
          <li>Distance: {this.props.distance}</li>
          <input
             type="button"
             onClick={this.props.onClick}
             value="View Menu"
             className="btn navbar-button navbar-right sign-out"/>
        </ul>
      </div>
    );
  }
});
