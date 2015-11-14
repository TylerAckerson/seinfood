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
      return { restaurants: _getAllRestaurants(),
                    search: "",
              filterParams: _getFilterParams() };
    },

    _restaurantsChanged: function(){
      this.setState( { restaurants: RestaurantStore.all() } );
    },

    _filtersChanged: function(){
      var newParams = _getFilterParams();
      this.setState( { filterParams: newParams } );
      ApiUtil.fetchRestaurants( {filterParams: newParams} );
    },

    componentDidMount: function(){
      RestaurantStore.addIndexChangeListener(this._restaurantsChanged);
      FilterParamStore.addChangeListener(this._filtersChanged);

      FilterActions.resetFilters({search: this.props.location.query.search});
    },

    componentWillUnmount: function(){
      RestaurantStore.removeIndexChangeListener(this._restaurantsChanged);
    },

    handleDetailButton: function(restaurant){
      this.props.history.pushState(null, "/restaurants/" + restaurant.id);
    },

    render: function(){
      var restaurantsIndex;
      if (this.state.restaurants.length === 0){
        restaurantsIndex = <div className="row restaurant-index">
                              <span className= "throbber-loader" id="loader">
                                Loading…
                              </span>
                          </div>;
      } else {
        restaurantsIndex =
          <div className="row restaurant-index">{
            this.state.restaurants.map(function(restaurant){
            var boundClick = this.handleDetailButton.bind(this, restaurant);

            return <RestaurantItem
                       restaurant={restaurant} key={restaurant.id}
                       search={this.props.location.query.search}
                       onClick={boundClick}/>;
          }.bind(this)) }
        </div>;
      }

      return (
      <div className="restaurants">
        <div className="container-fluid" id="restaurants-feature">
            <RestaurantsFeature/>
        </div>

        <div className="container top-buffer">

          <div className="row">
            <div className="col-sm-8" id="restaurants-index">
              <RestaurantSearch search={this.props.location.query.search}
                                count={this.state.restaurants.length}/>
                {restaurantsIndex}
            </div>

            <div className="col-sm-3 filters" id="filters">
              <Filters filterParams={this.state.filterParams}/>
            </div>

          </div>
        </div>

    </div>
      );
    }
  });
})(this);
