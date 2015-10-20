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

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeChangeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType) {
        case FilterConstants.UPDATE_CUISINE:
          _params.cuisine = payload.cuisine;
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.UPDATE_SORT:
          _params.sort = payload.sort;
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.UPDATE_OFFERS:
          _params.offers = payload.offers.offers;
          _params.offersDisplay = payload.offers.offersDisplay;
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.UPDATE_FEATURES:
          _params.features = payload.features;
          FilterParamStore.emit(CHANGE_EVENT);
          break;
        case FilterConstants.RESET_FILTERS:
          _params = defaultParams;
          FilterParamStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

}(this));
