RestaurantsFeature = React.createClass({
  mixins: [ReactRouter.History],

  shouldComponentUpdate: function() {
    return this.props.cards.length !== 4;
  },

  handleDetailButton: function(restaurant){
    this.history.pushState(null, "/restaurants/" + restaurant.id + "/menu");
  },

  render: function(){


    return (
      <div className="row">
        <div className="col-sm-1">
        </div>

        <div className="col-sm-10">
          <div className="row" id="features">
          {
            this.props.cards.map(function(restaurant){
              var rest = restaurant.extract;
              boundClick = this.handleDetailButton.bind(this, rest);

              return <RestaurantCardItem restaurant={restaurant.extract}
                                         onClick={boundClick}
                                         key={restaurant.extract.id}/>;
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
