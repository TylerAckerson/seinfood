RestaurantCardItem = React.createClass({
  render: function(){
    restaurant = this.props.restaurant;
    var deliveryFee = restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(restaurant.delivery_fee);
    var deliveryMin = "$" + String(restaurant.delivery_fee);
    var button = <button
                   type="button"
                   onClick={this.props.onClick}
                   value="View Menu"
                   className="btn btn-default menu-button">Menu</button>;

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
      <div className="text-center col-xs-8 col-sm-6 col-md-3 col-lg-3">
       <div className="row">
        <div className="card-outline">
          <div id="restaurant-card-item" onClick={this.props.onClick}
              className="col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">

            <div className="card-item-header"/>
            <img src={restaurant.image_link}className="img-circle"/>
            {listItems}
          </div>
        </div>
      </div>
    </div>
    );
  }
});
