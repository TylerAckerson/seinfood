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

    render: function(){
      var cards = _.sample(this.state.restaurants, 4);

      return (
        <div>
          <div id="restaurant-hero" className="group">{
            cards.map(function(restaurant, idx) {
              return <RestaurantCardItem restaurant={restaurant.extract}
                                         distance={restaurant.ditance}
                                         key={restaurant.id}/>;
            })
          }
          </div>
          <div id="restaurants-index" className="group">
            <RestaurantSearch search={this.props.location.query.search}/>
            <div>{
              this.state.restaurants.map(function(restaurant){
                var rest = restaurant.extract;

                return <RestaurantItem restaurant={rest}
                           key={rest.id}
                           distance={rest.distance}
                           search={this.props.location.query.search}/>;
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
