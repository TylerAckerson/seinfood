RestaurantsFeature = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function(){
    return {restaurants: []};
  },

  componentDidMount: function(){
    this.setState( {restaurants: _.sample(RestaurantStore.all(), 4)});
    RestaurantStore.addIndexChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    RestaurantStore.removeIndexChangeListener(this._onChange);
  },

  _onChange: function(){
    if (_.isEmpty(this.state.restaurants)) {
      cards = _.sample(RestaurantStore.all(), 4);
      this.setState({restaurants: cards});
    }
  },

  handleDetailButton: function(restaurant){
    this.history.pushState(null, "/restaurants/" + restaurant.id);
  },

  render: function(){
    return (
      <div className="container">
        <div className="row">
            {
              this.state.restaurants.map(function(restaurant){
                boundClick = this.handleDetailButton.bind(this, restaurant);

                return <RestaurantCardItem restaurant={restaurant}
                                           onClick={boundClick}
                                           key={restaurant.id}/>;
              }.bind(this))
          }
      </div>
    </div>
    );
  }
});
