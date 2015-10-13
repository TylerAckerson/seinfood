ApiUtil = {
  fetchRestaurants: function(){
    $.ajax({
      url: 'api/restaurants',
      dataType: 'json',
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
