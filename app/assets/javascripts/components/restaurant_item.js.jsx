RestaurantItem = React.createClass({
  render: function(){
    restaurant = this.props.restaurant;

    var deliveryFee = restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(restaurant.delivery_fee);

    var source = "assets/" + String(restaurant.id) + ".jpg";

    var distance = String(Math.round(restaurant.distance * 10)/10) + " mi";
    return (
      <div className="row restaurant-item">
        <div className="col-xs-2 align-center">
          <img src={source}className="img-circle" width="75" height="75"/>
        </div>

        <div className="col-xs-8">
            <h4 className="list-group-item-heading">{restaurant.name}</h4>
            <ul className="list-group restaurant-detail">
              <li className="list-group-item">Cuisine: {restaurant.cuisine}</li>
              <li className="list-group-item">Address: {restaurant.address}</li>
              <li className="list-group-item">Minimum: {restaurant.delivery_min}</li>
              <li className="list-group-item">Delivery fee: {deliveryFee}</li>
              <li className="list-group-item">Distance: {distance}</li>
            </ul>
        </div>

        <div className="col-xs-2">
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
