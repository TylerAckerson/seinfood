RestaurantsFeature = React.createClass({
  mixins: [ReactRouter.History],

  shouldComponentUpdate: function() {
    return this.props.cards.length === 0;
  },

  handleDetailButton: function(restaurant){
    this.history.pushState(null, "/restaurants/" + restaurant.id);
  },

  render: function(){
    return (
      <div className="row restaurants-feature-bg">
        <div className="col-sm-1">
        </div>

        <div className="col-sm-10">
          <div className="row" id="features">
          {
            this.props.cards.map(function(restaurant){
              boundClick = this.handleDetailButton.bind(this, restaurant);

              return <RestaurantCardItem restaurant={restaurant}
                                         onClick={boundClick}
                                         key={restaurant.id}/>;
            }.bind(this))
        }
        </div>
      </div>

      <div className="col-sm-1">
      </div>
    </div>
    );
  }
});
