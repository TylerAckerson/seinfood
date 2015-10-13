Restaurants = React.createClass({
  getInitialState: function(){
    return { restaurants: [] };
  },

  _onChange: function(){
    this.setState( { restaurants: RestaurantStore.all() } );
  },

  componentDidMount: function(){
    ApiUtil.fetchRestaurants();
    RestaurantStore.addIndexChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    RestaurantStore.removeIndexChangeListener(this._onChange);
  },

  render: function(){
    return (
      <div id="restaurants-index">
        <h2>Restaurants</h2> {
          this.state.restaurants.map(function(restaurant){
            return <RestaurantItem restaurant={restaurant}
            key={restaurant.id}/>;
          })
        }
      </div>
    );
  }
});
