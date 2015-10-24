(function(root) {
  'use strict';

  var _params = { cuisine: null,
                        sort: 'alphabetical',
                        offers: {delivery: true, takeout: true},
                        offersDisplay: {delivery: false, takeout: false },
                        features: {orderAhead: false, openOnTop: true}};

  var defaultParams = { cuisine: null,
                        sort: 'alphabetical',
                        offers: {delivery: true, takeout: true},
                        offersDisplay: {delivery: false, takeout: false },
                        features: {orderAhead: false, openOnTop: true}};

  var CHANGE_EVENT = "change";

  root.FilterParamStore = $.extend({}, EventEmitter.prototype, {
    params: function(){
      return $.extend({}, _params);
    },

    updateCuisine: function(cusine){
      _params.cuisine = cuisine;
    },

    updateSort: function(sort) {
      _params.sort = sort;
    },

    updateOffers: function(offers){
      _params.offers = offers.offers;
      _params.offersDisplay = offers.offersDisplay;
    },

    updateFeatures: function(features){
      _params.features = features;
    },

    resetFilters: function(){
      _params = $.extend({}, defaultParams);
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeChangeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType) {
        case FilterConstants.UPDATE_CUISINE:
          root.FilterParamStore.updateCuisine(payload.cuisine);
          // _params.cuisine = payload.cuisine;
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.UPDATE_SORT:
          oot.FilterParamStore.updateSort(payload.sort);
          // _params.sort = payload.sort;
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.UPDATE_OFFERS:
          root.FilterParamStore.updateOffers( { offers: payload.offers.offers,
                                                offersDisplay: payload.offers.offersDisplay});
          // _params.offers = payload.offers.offers;
          // _params.offersDisplay = payload.offers.offersDisplay;
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.UPDATE_FEATURES:
          root.FilterParamStore.updateFeatures(payload.features);
          // _params.features = payload.features;
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.RESET_FILTERS:
          root.FilterParamStore.resetFilters();
          // _params = $.extend({}, defaultParams);
          FilterParamStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

}(this));
