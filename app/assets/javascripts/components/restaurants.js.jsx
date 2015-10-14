Restaurants = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function(){
    return { restaurants: [], search: "" };
  },

  _onChange: function(){
    this.setState( { restaurants: RestaurantStore.all() } );
  },

  componentWillMount: function(){
    ApiUtil.fetchRestaurants();
    RestaurantStore.addIndexChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    RestaurantStore.removeIndexChangeListener(this._onChange);
  },

  render: function(){
    return (
      <div id="restaurants-index">
        <div>
          <RestaurantSearch search={this.props.location.query.search}/>
        </div> {
          this.state.restaurants.map(function(restaurant){
            return <RestaurantItem restaurant={restaurant}
            key={restaurant.id}/>;
          })
        }
      </div>
    );
  }
});
