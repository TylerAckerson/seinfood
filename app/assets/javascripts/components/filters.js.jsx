Filters = React.createClass({
 updateCuisine: function(e){
   e.preventDefault();
   FilterActions.updateCuisine(e.target.value);
 },

 updateSort: function(e){
   e.preventDefault();
   FilterActions.updateSort(e.target.value);
 },

 updateOffers: function(e){
   e.preventDefault();
  $(e.currentTarget).toggleClass('active');

   FilterActions.updateOffers(this.getNewOffers(e));
 },

 updateFeatures: function(e){
   e.preventDefault();
   $(e.currentTarget).toggleClass('active');

   if (e.currentTarget.value === "order-ahead") {
     var newOrderAhead = this.props.filterParams.features.orderAhead ? false : true;
     newFeatures = $.extend({},
              { orderAhead: newOrderAhead,
                openOnTop: this.props.filterParams.features.openOnTop});

   } else {
     var newOpenOnTop = this.props.filterParams.features.openOnTop ? false : true;

     newFeatures = $.extend({},
              { orderAhead: this.props.filterParams.features.orderAhead,
                openOnTop: newOpenOnTop}) ;
   }

   FilterActions.updateFeatures(newFeatures);
 },

 resetFilters: function(e){
    e.preventDefault();
    FilterActions.resetFilters();

    $('.checks').removeClass('active');
    $('.open-on-top .checks').addClass('active');
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
     if (e.currentTarget.value === "delivery") {
      newOffers = { offers: {delivery: true, takeout: false},
                    offersDisplay: {delivery: true, takeout: false} };
     } else {
      newOffers = { offers: {delivery: false, takeout: true},
                   offersDisplay: {delivery: false, takeout: true} };

     }
    // handle cases where both delivery and takeout are checked
   } else if (this.bothBoxesChecked(e)) {
     if (e.currentTarget.value === "delivery") {
       newOffers = { offers: {delivery: false, takeout: true},
                     offersDisplay: {delivery: false, takeout: true} };

       return newOffers;
     } else {
       newOffers = { offers: {delivery: true, takeout: false},
                     offersDisplay: {delivery: true, takeout: false} };

     }

   } else {
    //  delivery box was changed
     if (e.currentTarget.value === "delivery") {
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
     <div className="row filters">
      <div className="header">
        <h3>Filters</h3>
      </div>

      <div className="filters-body">
         <form role="form">

         <div className="form-group">
          <h4 className="filters-label">What are you hungry for?</h4>
             <input type="text" id="hungry-for" className="form-control"
                    value={this.props.filterParams.cuisine}
                    placeholder="e.g. marble rye, big salad"
                    onChange={this.updateCuisine}/>
          </div>

          <div className="form-group">
           <h4 className="filters-label">Sort By</h4>
             <select name="sort" id="sort-by" onChange={this.updateSort}
                                              value={this.props.filterParams.sort}
                                              className="form-control">
              <option value="distance">Distance</option>
              <option value="alphabetical" >Alphabetical</option>
              <option value="delivery_min">Delivery Min</option>
              <option value="delivery_fee">Delivery Fee</option>
             </select>
          </div>

          <h4 className="filters-label">Offers</h4>
          <div className="row offers-form delivery">
            <div className="col-md-2 col-md-offset-1 align-center">
              <button type="button" className="btn btn-default checks"
                      value="delivery"
                      onClick={this.updateOffers}>
                        <span className="glyphicon"/>
                      </button>
            </div>
            <div className="col-md-9">
              <span className="pull-left">Delivery</span>
            </div>
          </div>
          <div className="row offers-form takeout">
            <div className="col-md-2 col-md-offset-1 align-center">
              <button type="button" className="btn btn-default checks"
                      value="takeout"
                      onClick={this.updateOffers}>
                        <span className="glyphicon"/>
                      </button>
            </div>
            <div className="col-md-9">
              <span className="pull-left">Takeout</span>
            </div>
          </div>

          <h4 className="filters-label">Features</h4>
          <div className="row features-form order-ahead">
            <div className="col-md-2 col-md-offset-1 align-center">
              <button type="button" className="btn btn-default checks"
                      value="order-ahead"
                      onClick={this.updateFeatures}>
                        <span className="glyphicon"/>
                      </button>
            </div>
            <div className="col-md-9">
              <span className="pull-left">Order Ahead</span>
            </div>
          </div>
          <div className="row features-form open-on-top">
            <div className="col-md-2 col-md-offset-1 align-center">
              <button type="button" className="btn btn-default checks active"
                      value="open-on-top"
                      id="open-on-top"
                      onClick={this.updateFeatures}>
                        <span className="glyphicon"/>
                      </button>
            </div>
            <div className="col-md-9">
              <span className="pull-left">Open On Top</span>
            </div>
          </div>
        </form>
      </div>
      <div className="footer">
        <button type="submit"
                className="btn btn-default full-width"
                onClick={this.resetFilters}>Reset Filters</button>
      </div>
    </div>
  );
 }
});
