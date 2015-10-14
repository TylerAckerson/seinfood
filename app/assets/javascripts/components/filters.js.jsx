Filters = React.createClass({
 getInitialState: function() {
   return {cuisine: null,
           sort: 'alphabetical',
           offers: {delivery: true, takeout: true},
           features: {orderAhead: false, openOnTop: true}};
 },
 updateCuisine: function(e){
   this.setState( {cuisine: e.target.value} );
 },
 updateSort: function(e){
   this.setState( {sort: e.target.value} );
 },
 bothBoxesUnchecked: function(e) {
   if (this.state.offers.delivery &&
       this.state.offers.takeout &&
       e.target.checked) { return true; }

  return false;
 },
 bothBoxesChecked: function(e) {
   if (this.state.offers.delivery &&
       this.state.offers.takeout &&
       !e.target.checked) { return true; }

  return false;
 },
 updateOffers: function(e){
   if (this.bothBoxesUnchecked(e)) {
     if (e.target.value === "delivery") {
       this.setState( { offers: {delivery: true, takeout: false}} );
     } else {
       this.setState( { offers: {delivery: false, takeout: true}} );
     }
   } else if (this.bothBoxesChecked(e)) {
     if (e.target.value === "delivery") {
       this.setState( { offers: {delivery: false, takeout: true}} );
     } else {
       this.setState( { offers: {delivery: true, takeout: false}} );
     }
   } else  {
     if (e.target.value === "delivery") {
       var newDelivery = this.state.offers.delivery ? false : true;
       newOffers = $.extend(this.state.offers, {delivery: newDelivery});
       this.setState( {offers: newOffers} );
     } else {
       var newTakeout = this.state.offers.takeout ? false : true;
       newOffers = $.extend(this.state.offers, {takeout: newTakeout});
       this.setState( { offers: newOffers } );
     }
   }
 },
 updateFeatures: function(e){
   if (e.target.value === "order-ahead") {
     var newOrderAhead = this.state.features.orderAhead ? false : true;
     newFeatures = $.extend(this.state.features, {orderAhead: newOrderAhead});
     this.setState( {features: newFeatures} );
   } else {
     var newTakeout = this.state.features.openOnTop ? false : true;
     newFeatures = $.extend(this.state.features, {openOnTop: newTakeout});
     this.setState( { features: newFeatures } );
   }
 },

 resetFilters: function(){
   this.setState({ cuisine: null,
                   sort: 'alphabetical',
                   offers: {delivery: true, takeout: true},
                   features: {orderAhead: false, openOnTop: true} });
 },
 render: function(){
   return (
     <div id="filters">
     <h2>Filters</h2>

       <label> What are you hungry for? </label><br/>
         <input type="text"
                placeholder="e.g. muffin tops"
                onChange={this.updateCuisine}
                value={this.state.cuisine} /><br/>

       <label>Sort By</label><br/>
         <select name="sort" onChange={this.updateSort}>
                <option value="distance"
                        selected={this.state.sort === "distance"}>
                        Distance</option>
                <option value="alphabetical"
                        selected={this.state.sort === "alphabetical"}>
                        Alphabetical</option>
                <option value="rating"
                        selected={this.state.sort === "rating"}>
                        Rating</option>
                <option value="delivery_min"
                        selected={this.state.sort === "delivery_min"}>
                        Delivery Min</option>
                <option value="delivery_fee"
                        selected={this.state.sort === "delivery_fee"}>
                        Delivery Fee</option>
         </select><br/>

       <label>Offers</label><br/>
        <label>Delivery</label>
           <input type="checkbox"
                  checked={this.state.offers.delivery}
                  onChange={this.updateOffers}
                  value="delivery"/><br/>
        <label>Takeout</label>
           <input type="checkbox"
                  checked={this.state.offers.takeout}
                  onChange={this.updateOffers}
                  value="takeout"/><br/>

       <label>Features</label><br/>
        <label>Order Ahead</label>
           <input type="checkbox"
                  checked={this.state.features.orderAhead}
                  onChange={this.updateFeatures}
                  value="order-ahead"/><br/>
        <label>Open Restaurants on Top</label>
           <input type="checkbox" id="open-on-top"
                  checked={this.state.features.openOnTop}
                  onChange={this.updateFeatures}
                  value="open-on-top"/><br/>

      <input type="button"
             value="Reset Filters"
             onClick={this.resetFilters}/>
    </div>
  );
 }
});
