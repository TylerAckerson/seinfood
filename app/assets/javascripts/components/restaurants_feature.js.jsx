RestaurantsFeature = React.createClass({
  mixins: [ReactRouter.History],

  componentDidMount: function(){
    FilterParamStore.resetFilters();
    ApiUtil.fetchRestaurants( {filterParams: FilterParamStore.params()} ) ;
  },

  shouldComponentUpdate: function() {
    return this.props.cards.length === 0;
  },

  handleDetailButton: function(restaurant){
    this.history.pushState(null, "/restaurants/" + restaurant.id);
  },

  render: function(){
    return (
      <div className="container-fluid">
        <div className="row text-center cards-container">
          <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"/>
        {
          this.props.cards.map(function(restaurant){
            boundClick = this.handleDetailButton.bind(this, restaurant);

            return <RestaurantCardItem restaurant={restaurant}
                                       onClick={boundClick}
                                       key={restaurant.id}/>;
          }.bind(this))
      }
        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"/>
      </div>
    </div>
    );
  }
});
