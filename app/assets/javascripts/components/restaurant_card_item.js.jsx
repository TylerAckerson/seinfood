RestaurantCardItem = React.createClass({
  render: function(){
    restaurant = this.props.restaurant;
    var deliveryFee = restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(restaurant.delivery_fee);
    var deliveryMin = "$" + String(restaurant.delivery_fee);
    var source = "assets/" + String(restaurant.id) + ".jpg";
    var button = <button
                   type="button"
                   onClick={this.props.onClick}
                   value="View Menu"
                   className="btn btn-default">Menu</button>;

    if (restaurant.takeout_only) {
      listItems =
        <ul className="list-group restaurant-detail">
          {this.props.restaurant.name}
          <li className="list-group-item takeout">Takeout Only</li>
          {button}
        </ul>;
    } else {
      listItems =
        <ul className="list-group restaurant-detail">
          {this.props.restaurant.name}
          <li className="list-group-item">Delivery min: {deliveryMin}</li>
          <li className="list-group-item">Delivery fee: {deliveryFee}</li>
          {button}
        </ul>;
    }

    return (
      <div id="restaurant-card-item" className="col-sm-3 card text-center">
        <div className="card-item-header">
        </div>
        <img src={source}className="img-circle" width="75" height="75"/>
        {listItems}
      </div>
    );
  }
});
