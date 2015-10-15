RestaurantCardItem = React.createClass({
  handleDetailButton: function(){
    // debugger;
    // this.props.history.pushState(null, "/restaurants", { search: searchString});
    window.location = "/restaurants/" + this.props.restaurant.id;
  },

  render: function(){
    var deliveryFee = this.props.restaurant.delivery_fee === 0 ?
            "Free" : "$" + String(this.props.restaurant.delivery_fee);

    return (
      <div id="restaurant-card-item">
          <h4>{this.props.restaurant.name}</h4>
        <ul>
          <li>Cuisine: {this.props.restaurant.cuisine}</li>
          <li>Address: {this.props.restaurant.address}</li>
          <li>Delivery min: {this.props.restaurant.delivery_min}</li>
          <li>Delivery fee: {deliveryFee}</li>
          <input
             type="button"
             onClick={this.handleDetailButton}
             value="View Menu"
             className="btn navbar-button navbar-right sign-out"/>
        </ul>
      </div>
    );
  }
});
