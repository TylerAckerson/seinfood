(function(root) {
  'use strict';

  var _params = { cuisine: null,
                  sort: 'alphabetical',
                  offers: {delivery: true, takeout: true},
                  offersDisplay: {delivery: false, takeout: false },
                  features: {orderAhead: false, openOnTop: true},
                  search: ""};

  var defaultParams = { cuisine: null,
                        sort: 'alphabetical',
                        offers: {delivery: true, takeout: true},
                        offersDisplay: {delivery: false, takeout: false },
                        features: {orderAhead: false, openOnTop: true},
                        search: ""};

  var CHANGE_EVENT = "change";


  root.FilterParamStore = $.extend({}, EventEmitter.prototype, {

    params: function(){
      return $.extend({}, _params);
    },

    updateCuisine: function(cuisine){
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

    updateSearch: function(search){
      _params.search = search.search;
    },

    // resetFilters: function(search){
    //   if (typeof search === 'undefined') {
    //     var oldSearch = _params.search;
    //     _params = $.extend({}, defaultParams);
    //     _params.search = oldSearch;
    //   } else {
    //     debugger;
    //     _params = $.extend({}, defaultParams);
    //     _params.search = search.search;
    //   }
    // },

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
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.UPDATE_SORT:
          root.FilterParamStore.updateSort(payload.sort);
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.UPDATE_OFFERS:
          root.FilterParamStore.updateOffers( { offers: payload.offers.offers,
                                                offersDisplay: payload.offers.offersDisplay});
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.UPDATE_FEATURES:
          root.FilterParamStore.updateFeatures(payload.features);
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.UPDATE_SEARCH:
          root.FilterParamStore.updateFeatures(payload.search);
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        // case FilterConstants.RESET_FILTERS:
        //   root.FilterParamStore.resetFilters(payload.search);
        //   FilterParamStore.emit(CHANGE_EVENT);
        //   break;
      }
    })
  });

}(this));
