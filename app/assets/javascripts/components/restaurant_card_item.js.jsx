RestaurantCardItem = React.createClass({
  render: function(){
    var deliveryFee = this.props.restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(this.props.restaurant.delivery_fee);

    return (
      <div id="restaurant-card-item">
          <h4>{this.props.restaurant.name}</h4>
        <ul>
          <li>Cuisine: {this.props.restaurant.cuisine}</li>
          <li>Address: {this.props.restaurant.address}</li>
          <li>Delivery min: {this.props.restaurant.delivery_min}</li>
          <li>Delivery fee: {deliveryFee}</li>
          <li>Distance: {this.props.distance}</li>
        </ul>
      </div>
    );
  }
});
