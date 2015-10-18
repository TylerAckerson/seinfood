RestaurantDetailHeader = React.createClass({

  render: function(){
    var restaurant = this.props.restaurant;
    var source = "assets/" + String(restaurant.id) + ".jpg";

    var deliveryFee = restaurant.delivery_fee === 0 ? "Free" :
                        "$" + String(restaurant.delivery_fee);

    if (restaurant.takeout_only) {
      listing = <ul className="list-group">
                  <li className="list-group-item">
                    <h5>{restaurant.cuisine}</h5>
                  </li>
                  <li className="list-group-item">{restaurant.address + " " +restaurant.city + ", " + restaurant.state}</li>
                  <li className="list-group-item">Takeout Only</li>
                </ul>;

    } else {
      listing = <ul className="list-group">
        <li className="list-group-item">
          <h5>{restaurant.cuisine}</h5>
        </li>
        <li className="list-group-item">{restaurant.address + " " +restaurant.city + ", " + restaurant.state}</li>
        <li className="list-group-item">{"Delivery Min: " + restaurant.delivery_min +
               "  Delivery Fee: " + deliveryFee}</li>
      </ul>;
    }
    
    return(
      <div className="row">
        <div className="col-12">
          <img src={source}className="img-circle" width="75" height="75"/>
        </div>

        <div className="row">
          <h2 className="list-group-item-heading">{restaurant.name}</h2>
          {listing}
        </div>
      </div>
    );
  }
});
