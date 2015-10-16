RestaurantsFeature = React.createClass({
  mixins: [ReactRouter.History],

  shouldComponentUpdate: function() {
    return this.props.cards.length !== 4;
  },

  handleDetailButton: function(restaurant){
    this.history.pushState(null, "/restaurants/" + restaurant.id );
  },

  render: function(){


    return (
        <div className="row" id="restaurants-feature">{
          this.props.cards.map(function(restaurant){
            var rest = restaurant.extract;
            boundClick = this.handleDetailButton.bind(this, rest);

            return <RestaurantCardItem restaurant={restaurant.extract}
                                       onClick={boundClick}
                                       key={restaurant.extract.id}/>;
          }.bind(this))
      }
      </div>
    );
  }
});
