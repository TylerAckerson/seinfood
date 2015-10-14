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
   FilterActions.updateFeatures(e.target.value);
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
   if (this.offersInitial(e)) {
     if (e.target.value === "delivery") {
      newOffers = { offers: {delivery: true, takeout: false},
                    offersDisplay: {delivery: true, takeout: false} };

      // return newOffers;
     } else {
       newOffers = { offers: {delivery: false, takeout: true},
                     offersDisplay: {delivery: false, takeout: true} };

      //  return newOffers;
     }
   } else if (this.bothBoxesChecked(e)) {
     if (e.target.value === "delivery") {
       newOffers = { offers: {delivery: false, takeout: true},
                     offersDisplay: {delivery: false, takeout: true} };

       return newOffers;
     } else {
       newOffers = { offers: {delivery: false, takeout: true},
                     offersDisplay: {delivery: false, takeout: true} };

      //  return newOffers;
     }
   } else {
     if (e.target.value === "delivery") {
       var newDelivery = this.props.filterParams.offers.delivery ? false : true;

       newOffers = $.extend({}, {delivery: newDelivery,
                    takeout: this.props.filterParams.offers.takeout});

       newOffersDisplay = $.extend({}, {delivery: newDelivery,
                    takeout: this.props.filterParams.offersDisplay.takeout});

     } else {
       var newTakeout = this.props.filterParams.offers.takeout ? false : true;

       newOffers = $.extend({}, {takeout: newTakeout,
                    delivery: this.props.filterParams.offers.takeout});

       newOffersDisplay = $.extend({}, {takeout: newTakeout,
                    delivery: this.props.filterParams.offersDisplay.takeout});

     }

    newOffers = $.extend({}, {offers: newOffers, offersDisplay: newOffersDisplay});
   }

   return $.extend(this.props.filterParams, newOffers);
 },
 // updateFeatures: function(e){
 //   if (e.target.value === "order-ahead") {
 //     var newOrderAhead = this.state.features.orderAhead ? false : true;
 //     newFeatures = $.extend(this.state.features, {orderAhead: newOrderAhead});
 //     this.setState( {features: newFeatures} );
 //   } else {
 //     var newTakeout = this.state.features.openOnTop ? false : true;
 //     newFeatures = $.extend(this.state.features, {openOnTop: newTakeout});
 //     this.setState( { features: newFeatures } );
 //   }
 // },

 render: function(){
   return (
     <div id="filters">

     <h2>Filters</h2>

       <label> What are you hungry for? </label><br/>
         <input type="text" id="hungry-for"
                placeholder="e.g. muffin tops"
                onChange={this.updateCuisine}/><br/>

       <label>Sort By</label><br/>
         <select name="sort" id="sort-by" onChange={this.updateSort}>
                <option value="distance">
                        Distance</option>
                <option value="alphabetical">
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
                  onChange={this.updateFeatures}
                  value="order-ahead"/><br/>
        <label>Open Restaurants on Top</label>
           <input type="checkbox" id="open-on-top"
                  onChange={this.updateFeatures}
                  value="open-on-top"/><br/>

      <input type="button"
             value="Reset Filters"
             onClick={this.resetFilters}/>
    </div>
  );
 }
});
