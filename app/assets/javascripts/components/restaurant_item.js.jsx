RestaurantItem = React.createClass({
  render: function(){
    restaurant = this.props.restaurant;

    var deliveryFee = restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(restaurant.delivery_fee);

    var distance = String(Math.round(restaurant.distance * 10)/10) + " mi";
    return (
      <div className="row restaurant-item" onClick={this.props.onClick}>
        <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 align-center">
          <img src={restaurant.image_link}className="img-circle" width="75" height="75"/>
        </div>

        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <h3>{restaurant.name}</h3>
            <ul className="list-group restaurant-detail">
              <li className="list-group-item">
                  <span className="label">Cuisine: </span><span>{restaurant.cuisine}</span></li>
              <li className="list-group-item">
                  <span className="label">Address: </span><span>{restaurant.address}</span></li>
              <li className="list-group-item">
                  <span className="label">Minimum: </span><span>${restaurant.delivery_min}</span></li>
              <li className="list-group-item">
                  <span className="label">Delivery fee: </span><span>{deliveryFee}</span></li>
              <li className="list-group-item">
                  <span className="label">Distance: </span><span>{distance}</span></li>
            </ul>
        </div>

        <div className="view-button col-xs-12 col-sm-12 col-md-2 col-lg-2 align-center">
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
