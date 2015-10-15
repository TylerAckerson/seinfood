window.DistanceUtil = {
  getDistance: function(origin, destination){
    base = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
    // origin = "origins=" + "1061+Market+St+San+Francisco+CA";
    // destination = "&destinations=" + "1595+Clay+St+San+Francisco+CA" ;
    origin = "origins=" + "San+Francisco+CA";
    destination = "&destinations=" + "Seattle+WA" ;
    options = "&units=imperial&key=AIzaSyD2gX_6Ud5ZYiD-7vKI3yxfKkmPpfJML4A";

    url = base + origin + destination + options;
    console.log(url);

    $.ajax({
      url: url,
      type: "GET",
      dataType: 'jsonp',
      cache: false,
      success: function(response){
        debugger
        console.log(response);
      },
      error: function(response){
        debugger
        console.log(response);
      }
    });
  }
};

window.URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR&key=AIzaSyD2gX_6Ud5ZYiD-7vKI3yxfKkmPpfJML4A';
