window.ApiUtil = {
  fetchRestaurants: function(filterData){
    $.ajax({
      url: 'api/restaurants',
      dataType: 'json',
      data: filterData,
      success: function(restaurants){
        ApiActions.receiveAllRestaurants(restaurants);
      },
      error: function(resp){
        console.log(resp);
      }
    });
  },

  fetchSingleRestaurant: function(restaurantId){
    $.ajax({
      url: 'api/restaurants/' + restaurantId,
      success: function(restaurant){
        ApiActions.receiveSingleRestaurant(restaurant);
      },
      error: function(resp){
        console.log(resp);
      }
    });
  },

  deleteSession: function() {
    $.ajax({
      url: '/session',
      type: 'delete',
      success: function(restaurant){
        window.location = "/";
      },
      error: function(resp){
        console.log(resp);
      }
    });
  },

  fetchOrder: function(data) {
    $.ajax({
      url: 'api/orders',
      data: data,
      success: function(restaurant){
        window.location = "/";
      },
      error: function(resp){
        console.log(resp);
      }
    });
  },

  createOrder: function(order) {
    $.ajax({
      url: 'api/orders/',
      data: order,
      success: function(order){
        window.location = "/";
      },
      error: function(resp){
        console.log(resp);
      }
    });
  }
};
