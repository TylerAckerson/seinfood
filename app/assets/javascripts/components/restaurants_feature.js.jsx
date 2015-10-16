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
      <section className="hero-unit hero-unit--rest-list hero-unit--cover-photo ng-scope">
        <div className="container">
            <div className="row">{
              this.props.cards.map(function(restaurant){
                var rest = restaurant.extract;
                boundClick = this.handleDetailButton.bind(this, rest);

                return <RestaurantCardItem className="col-3 ng-scope"
                                           restaurant={restaurant.extract}
                                           onClick={boundClick}
                                           key={restaurant.extract.id}/>;
              }.bind(this))
          }
          </div>
        </div>
      </section>
    );
  }
});
