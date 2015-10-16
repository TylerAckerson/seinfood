RestaurantCardItem = React.createClass({
  render: function(){
    var deliveryFee = this.props.restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(this.props.restaurant.delivery_fee);
    var source = "assets/" + String(this.props.restaurant.id) + ".jpg";

    return (
      <div>
        <div id="restaurant-card-item" className="col-2 text-center">
            <img src={source}className="img-circle" width="75" height="75"/>
          <h4>{this.props.restaurant.name}</h4>
          <ul className="list-group">
            <li className="list-group-item">Delivery min: {this.props.restaurant.delivery_min}</li>
            <li className="list-group-item">Delivery fee: {deliveryFee}</li>
            <button
               type="button"
               onClick={this.props.onClick}
               value="View Menu"
               className="btn btn-default">Menu</button>
          </ul>
        </div>
        <div className="col-1">
        </div>
      </div>
    );
  }
});
