ApiActions = {
  receiveAllRestaurants: function(restaurants){
    AppDispatcher.dispatch({
      actionType: RestaurantConstants.ALL_RESTAURANTS_RECEIVED,
      restaurants: restaurants
    });
  },

  receiveSingleRestaurant: function(restaurant){
    AppDispatcher.dispatch({
      actionType: RestaurantConstants.SINGLE_RESTAURANT_RECEIVED,
      restaurant: restaurant
    });
  },

  completeOrder: function(order){
    AppDispatcher.dispatch({
      actionType: OrderConstants.COMPLETE_ORDER,
      order: order
    });
  },

  receiveOrder: function(order){
    AppDispatcher.dispatch({
      actionType: OrderConstants.RECEIVE_ORDER,
      order: order
    });
  }
};
