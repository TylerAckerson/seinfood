RestaurantDetailHeader = React.createClass({

  render: function(){
    var restaurant = this.props.restaurant;
    var source = "assets/" + String(restaurant.id) + ".jpg";

    return(

      <div className="row">
        <div className="col-2">
          <img src={source}className="img-circle" width="75" height="75"/>
        </div>

        <div className="col-10">
          <h2>The Dream Cafe Menu</h2>
          <h5>{restaurant.cuisine}</h5>
          <span>{restaurant.address + " " +restaurant.city + ", " + restaurant.state}</span>
        </div>
      </div>
    );
  }
});
