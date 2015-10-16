RestaurantItem = React.createClass({
  render: function(){
    restaurant = this.props.restaurant;

    var deliveryFee = restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(restaurant.delivery_fee);

    var source = "assets/" + String(restaurant.id) + ".jpg";
    
    return (
      <div className="row">
        <div className="col-1">
          <img src={source}className="img-circle" width="100" height="100"/>
        </div>

        <div className="col-9">
            <h4 className="list-group-item-heading">{restaurant.name}</h4>
            <ul className="list-group">
              <li className="list-group-item">Cuisine: {restaurant.cuisine}</li>
              <li className="list-group-item">Address: {restaurant.address}</li>
              <li className="list-group-item">Minimum: {restaurant.delivery_min}</li>
              <li className="list-group-item">Delivery fee: {deliveryFee}</li>
              <li className="list-group-item">Distance: {this.props.distance}</li>
            </ul>
        </div>

        <div className="col-2">
          <input
             type="button"
             onClick={this.props.onClick}
             value="View Menu"
             className="btn btn-default"/>
        </div>
      </div>
    );
  }
});
