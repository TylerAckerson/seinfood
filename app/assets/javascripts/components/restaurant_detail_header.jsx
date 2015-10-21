RestaurantDetailHeader = React.createClass({
  getHours: function() {
    var restaurant = this.props.restaurant;
    var opens = this.convertTo12Hour(restaurant.opens_at);
    var closes = this.convertTo12Hour(restaurant.closes_at);

    return opens + " - " + closes;
  },

  convertTo12Hour: function(militaryTime){
    if (militaryTime / 1200 < 1) {
      return String(militaryTime / 100) + ":00 am";
    } else if (militaryTime === 1200) {
      return "Noon";
    } else if (militaryTime === 2400) {
      return "Midnigh";
    } else {
      return String((militaryTime / 100 ) % 12) + ":00 pm";
    }
  },

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
      hours = "Open Today: "+ this.getHours();
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
      <div className="row top-bottom-buffer">
        <div className="col-xs-4">
          <img src={source}className="img-circle" />
        </div>

        <div className="col-xs-8">
          <h2>{restaurant.name}</h2>
          <article>{fullAaddress}</article>
          <article>{fees}</article>
          <article>{hours}</article>
        </div>
      </div>
    );
  }
});
