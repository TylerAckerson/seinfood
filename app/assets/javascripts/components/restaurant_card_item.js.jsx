RestaurantCardItem = React.createClass({
  render: function(){
    restaurant = this.props.restaurant;
    var deliveryFee = restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(restaurant.delivery_fee);
    var source = "assets/" + String(restaurant.id) + ".jpg";
    var button = <button
                   type="button"
                   onClick={this.props.onClick}
                   value="View Menu"
                   className="btn btn-default">Menu</button>;

    if (restaurant.takeout_only) {
      listItems =
        <ul className="list-group">
          <li className="list-group-item">{restaurant.address + " " +restaurant.city + ", " + restaurant.state}</li>
          <li className="list-group-item">Takeout Only</li>
          {button}
        </ul>;
    } else {
      listItems =
        <ul className="list-group">
          <li className="list-group-item">{restaurant.address + " " +restaurant.city + ", " + restaurant.state}</li>
          <li className="list-group-item">Delivery min: {restaurant.delivery_min}</li>
          <li className="list-group-item">Delivery fee: {deliveryFee}</li>
          {button}
        </ul>;
    }

    return (
      <div>
        <div id="restaurant-card-item" className="col-4' text-center">
          <img src={source}className="img-circle" width="75" height="75"/>
          <h4>{this.props.restaurant.name}</h4>
          {listItems}
        </div>
      </div>
    );
  }
});
