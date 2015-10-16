RestaurantCardItem = React.createClass({
  render: function(){
    var deliveryFee = this.props.restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(this.props.restaurant.delivery_fee);

    return (
      <div id="restaurant-card-item" className="col-4 ng-scope">
          <h4>{this.props.restaurant.name}</h4>
        <ul>
          <li>Cuisine: {this.props.restaurant.cuisine}</li>
          <li>Address: {this.props.restaurant.address}</li>
          <li>Delivery min: {this.props.restaurant.delivery_min}</li>
          <li>Delivery fee: {deliveryFee}</li>
          <li>Distance: {this.props.distance}</li>
          <input
             type="button"
             onClick={this.props.onClick}
             value="View Menu"
             className="btn navbar-button navbar-center"/>
        </ul>
      </div>
    );
  }
});
