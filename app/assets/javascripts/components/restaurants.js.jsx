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
      console.log(this.state.restaurants.length);
      
      return (
        <div>
          <div id="restaurants-index">
            <RestaurantSearch search={this.props.location.query.search}/>
            <div>{
              this.state.restaurants.map(function(restaurant){
                return <RestaurantItem restaurant={restaurant}
                key={restaurant.id}/>;
              })
            }
            </div>
          </div>
        <Filters filterParams={_getFilterParams()}/>
      </div>
      );
    }
  });
})(this);
