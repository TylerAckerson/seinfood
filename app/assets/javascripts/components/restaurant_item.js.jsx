RestaurantItem = React.createClass({
  render: function(){
    var delivery = this.props.restaurant.delivery_min === 0 ?
                  "Free" : "$" + String(this.props.restaurant);

    return (
      <div id="restaurant-item">
          <h4>Name: {this.props.restaurant.name}</h4>
        <ul>
          <li>Cuisine: {this.props.restaurant.cuisine}</li>
          <li>Address: {this.props.restaurant.address}</li>
          <li>Delivery: {delivery}</li>
        </ul>
      </div>
    );
  }
});
