(function(root) {
  'use strict';

  var _restaurants = [];
  var CHANGE_EVENT = "change";

  var resetRestaurants = function(restaurants){
    _restaurants = restaurants;
  };

  root.RestaurantStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _restaurants.slice();
    },

    addChangeListener: function(callback){
      root.RestaurantStore.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      root.RestaurantStore.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case (RestaurantConstants.ALL_RESTAURANTS_RECEIVED):
          resetRestaurants(payload.restaurants);
          root.RestaurantStore.emit(CHANGE_EVENT);
          break;
        // case RestaurantConstants.SINGLE_RESTAURANT_RECEIVED):
      }
    })
  });
}(this));
