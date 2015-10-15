Filters = React.createClass({
 updateCuisine: function(e){
   FilterActions.updateCuisine(e.target.value);
 },
 updateSort: function(e){
   FilterActions.updateSort(e.target.value);
 },

 updateOffers: function(e){
   newOffers = this.getNewOffers(e);
   FilterActions.updateOffers(newOffers);
 },

 updateFeatures: function(e){
   if (e.target.value === "order-ahead") {
     var newOrderAhead = this.props.filterParams.features.orderAhead ?
                                                          false : true;
     newFeatures = $.extend({},
              { orderAhead: newOrderAhead,
                openOnTop: this.props.filterParams.features.openOnTop}) ;

   } else {
     var newOpenOnTop = this.props.filterParams.features.openOnTop ?
                                                          false : true;

     newFeatures = $.extend({},
              { orderAhead: this.props.filterParams.features.orderAhead,
                openOnTop: newOpenOnTop}) ;
   }

   FilterActions.updateFeatures(newFeatures);
 },

 resetFilters: function(e){
    FilterActions.resetFilters();
 },

 offersInitial: function(e) {
   if (!this.props.filterParams.offersDisplay.delivery &&
       !this.props.filterParams.offersDisplay.takeout &&
       this.props.filterParams.offers.delivery &&
       this.props.filterParams.offers.takeout) { return true; }

  return false;
 },

 bothBoxesChecked: function(e) {
   if (this.props.filterParams.offers.delivery &&
       this.props.filterParams.offers.takeout) { return true; }

  return false;
 },

 getNewOffers: function(e){
   //handle cases where nothing is checked (but delivery AND takeout are implied)
   if (this.offersInitial(e)) {
     if (e.target.value === "delivery") {
      newOffers = { offers: {delivery: true, takeout: false},
                    offersDisplay: {delivery: true, takeout: false} };
     } else {
      newOffers = { offers: {delivery: false, takeout: true},
                   offersDisplay: {delivery: false, takeout: true} };

     }
    // handle cases where both delivery and takeout are checked
   } else if (this.bothBoxesChecked(e)) {
     if (e.target.value === "delivery") {
       newOffers = { offers: {delivery: false, takeout: true},
                     offersDisplay: {delivery: false, takeout: true} };

       return newOffers;
     } else {
       newOffers = { offers: {delivery: true, takeout: false},
                     offersDisplay: {delivery: true, takeout: false} };

     }
   //  Need to handle cases where only one of the boxes is checked, then
   //  is unchecked. So both are unchecked but need to be "true"
   } else {
    //  delivery box was changed
     if (e.target.value === "delivery") {
       var newDelivery = this.props.filterParams.offers.delivery ? false : true;

       newOffers = { offers: {delivery: newDelivery,
                    takeout: this.props.filterParams.offers.takeout}};

       newOffersDisplay = { offersDisplay: {delivery: newDelivery,
                    takeout: this.props.filterParams.offersDisplay.takeout}};

    // takeout box was changed
     } else {
       var newTakeout = this.props.filterParams.offers.takeout ? false : true;

       newOffers = { offers: {delivery: this.props.filterParams.offers.delivery,
                    takeout: newTakeout } };

       newOffersDisplay = { offersDisplay: {delivery: this.props.filterParams.offers.delivery,
                    takeout: newTakeout } };
     }
    newOffers = $.extend({}, newOffers, newOffersDisplay);
   }

   return $.extend(this.props.filterParams, newOffers);
 },

 render: function(){
   return (
     <div id="filters">
     <h2>Filters</h2>
       <label> What are you hungry for? </label><br/>
         <input type="text" id="hungry-for"
                placeholder="e.g. muffin tops"
                onChange={this.updateCuisine}/><br/>

       <label>Sort By</label><br/>
         <select name="sort" id="sort-by" onChange={this.updateSort}
                                          defaultValue='alphabetical'>
                <option value="distance">
                        Distance</option>
                <option value="alphabetical" >
                        Alphabetical</option>
                <option value="rating">
                        Rating</option>
                <option value="delivery_min">
                        Delivery Min</option>
                <option value="delivery_fee">
                        Delivery Fee</option>
         </select><br/>

       <label>Offers</label><br/>
        <label>Delivery</label>
           <input type="checkbox"
                  onChange={this.updateOffers}
                  value="delivery"/><br/>
        <label>Takeout</label>
           <input type="checkbox"
                  onChange={this.updateOffers}
                  value="takeout"/><br/>

       <label>Features</label><br/>
        <label>Order Ahead</label>
           <input type="checkbox"
                  checked={this.props.filterParams.features.orderAhead}
                  onChange={this.updateFeatures}
                  value="order-ahead"/><br/>
        <label>Open Restaurants on Top</label>
           <input type="checkbox" id="open-on-top"
                  checked={this.props.filterParams.features.openOnTop}
                  onChange={this.updateFeatures}
                  value="open-on-top"/><br/>

      <input type="button"
             value="Reset Filters"
             onClick={this.resetFilters}/>
    </div>
  );
 }
});
