(function(root) {
  'use strict';

  function _getAllRestaurants() {
    return RestaurantStore.all();
  }

  function _getFilterParams(){
    return FilterParamStore.params();
  }

  root.Restaurants = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function(){
      return { restaurants: [], search: "", filterParams: _getFilterParams() };
    },

    _restaurantsChanged: function(){
      this.setState( { restaurants: RestaurantStore.all() } );
    },

    _filtersChanged: function(){
      var newParams = _getFilterParams();
      this.setState( {filterParams: newParams } );
      ApiUtil.fetchRestaurants( {filterParams: newParams} );
    },

    componentDidMount: function(){
      RestaurantStore.addIndexChangeListener(this._restaurantsChanged);
      FilterParamStore.addChangeListener(this._filtersChanged);
      ApiUtil.fetchRestaurants( {filterParams: _getFilterParams()} );
    },
    componentWillUnmount: function(){
      RestaurantStore.removeIndexChangeListener(this._restaurantsChanged);
    },

    handleDetailButton: function(restaurant){
      this.props.history.pushState(null, "/restaurants/" + restaurant.id );
    },

    render: function(){
      var cards = _.sample(this.state.restaurants, 4);

      return (
        <div>
          <div id="restaurant-hero" className="group">{
            cards.map(function(restaurant) {
              var rest = restaurant.extract;

              return <RestaurantCardItem restaurant={rest}
                                         distance={restaurant.distance}
                                         key={rest.id}/>;
            })
          }
          </div>
          <div id="restaurants-index" className="group">
            <RestaurantSearch search={this.props.location.query.search}/>
            <div>{
              this.state.restaurants.map(function(restaurant){
                var rest = restaurant.extract;
                var boundClick = this.handleDetailButton.bind(this, rest);

                return <RestaurantItem restaurant={rest}
                           key={rest.id}
                           distance={restaurant.distance}
                           search={this.props.location.query.search}
                           onClick={boundClick}/>;
              }.bind(this))
            }
            </div>
          </div>
        <Filters filterParams={_getFilterParams()}/>
      </div>
      );
    }
  });
})(this);
