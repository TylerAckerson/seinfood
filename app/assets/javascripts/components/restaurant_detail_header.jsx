RestaurantDetailHeader = React.createClass({

  render: function(){
    var fees, hours;
    var restaurant = this.props.restaurant;
    var source = "assets/" + String(restaurant.id) + ".jpg";

    var deliveryFee = restaurant.delivery_fee === 0 ? "Free" :
                                  "$" + String(restaurant.delivery_fee);

    var fullAaddress = restaurant.address + " " +restaurant.city +
                                                ", " + restaurant.state;

    var nowHours = new Date().getHours() * 100;
    if (restaurant.opens_at <= nowHours && restaurant.closes_at > nowHours) {
      hours = "Open Today: " + restaurant.opens_at + " - " + restaurant.closes_at;
    } else {
      hours = "Closed Now";
    }

    if (restaurant.takeout_only) {
      fees = "Takeout Only";
    } else {
      fees = "Delivery Min: " + restaurant.delivery_min +
                                      "  Delivery Fee: " + deliveryFee;
    }

    return(
      <div className="row top-buffer">
        <div className="col-xs-2">
          <img src={source}className="img-circle" />
        </div>

        <div className="col-xs-10">
          <h2>{restaurant.name}</h2>
          <article>{fullAaddress}</article>
          <article>{fees}</article>
          <article>{hours}</article>
        </div>
      </div>
    );
  }
});
