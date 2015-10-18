(function(root) {
  'use strict';

  var _restaurants = [];
  var RESTAURANTS_CHANGE_EVENT = "restaurantsChange";
  var RESTAURANT_DETAIL_CHANGE_EVENT = "restaurantDetailChange";

  var resetRestaurants = function(restaurants){
    _restaurants = restaurants;
  };

  var resetRestaurant = function(restaurant){
    var found = RestaurantStore.find(restaurant.id);

    if (found !== -1) {
       _restaurants[found] = restaurant;
       return _restaurants[found];
    } else {
      _restaurants.concat(restaurant);
      return _last(_restaurants);
    }

  };

  root.RestaurantStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _restaurants.slice();
    },

    retrieveRestaurant: function(restaurantId){
      var idx = RestaurantStore.find(restaurantId);

      if (idx !== -1) { return _restaurants[idx]; }
    },

    find: function(id) {
      var restaurant = -1;

      _restaurants.forEach(function(r, idx){
        if (id === r.extract.id) { restaurant = idx; }
      });

      return restaurant;
    },

    addIndexChangeListener: function(callback){
      root.RestaurantStore.on(RESTAURANTS_CHANGE_EVENT, callback);
    },

    removeIndexChangeListener: function(callback){
      root.RestaurantStore.removeListener(RESTAURANTS_CHANGE_EVENT, callback);
    },

    addDetailChangeListener: function(callback){
      root.RestaurantStore.on(RESTAURANT_DETAIL_CHANGE_EVENT, callback);
    },

    removeDetailChangeListener: function(callback){
      root.RestaurantStore.removeListener(RESTAURANT_DETAIL_CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case (RestaurantConstants.ALL_RESTAURANTS_RECEIVED):
          resetRestaurants(payload.restaurants);
          root.RestaurantStore.emit(RESTAURANTS_CHANGE_EVENT);
          break;
        case (RestaurantConstants.SINGLE_RESTAURANT_RECEIVED):
          resetRestaurant(payload.restaurant);
          root.RestaurantStore.emit(RESTAURANT_DETAIL_CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
