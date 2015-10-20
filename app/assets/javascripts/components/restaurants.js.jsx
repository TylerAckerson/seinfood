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
      this.props.history.pushState(null, "/restaurants/" + restaurant.id);
    },

    render: function(){
      var cards = _.sample(this.state.restaurants, 4);

      return (
      <div>
        <div className="jumbotron" id="restaurants-feature">
            <RestaurantsFeature cards={cards}/>
        </div>

        <div className="container">

          <div className="row">
            <div className="col-sm-8" id="restaurants-index">
              <RestaurantSearch search={this.props.location.query.search}/>
              <div>{
                this.state.restaurants.map(function(restaurant){
                  var boundClick = this.handleDetailButton.bind(this, restaurant);

                  return <RestaurantItem
                             restaurant={restaurant} key={restaurant.id}
                             distance={restaurant.distance}
                             search={this.props.location.query.search}
                             onClick={boundClick}/>;
                }.bind(this))
              }
              </div>
            </div>

            <div className="col-sm-3" id="filters">
              <Filters filterParams={_getFilterParams()}/>
            </div>

          </div>
        </div>

    </div>
      );
    }
  });
})(this);
