window.ApiUtil = {
  fetchRestaurants: function(){
    $.ajax({
      url: 'api/restaurants',
      success: function(restaurants){
        ApiActions.receiveAllRestaurants(restaurants);
      },
      error: function(resp){
        console.log(resp);
      }
    });
  },
  fetchSingleRestuarant: function(restaurant){

  }
};
