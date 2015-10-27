FilterActions = {
  updateCuisine: function(cuisine){
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_CUISINE,
      cuisine: cuisine
    });
  },
  updateSort: function(sort){
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_SORT,
      sort: sort
    });
  },
  updateOffers: function(offers) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_OFFERS,
      offers: offers
    });
  },
  updateFeatures: function(features){
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_FEATURES,
      features: features
    });
  },

  updateSearch: function(search){
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_SEARCH,
      search: search
    });
  },

  resetFilters: function(search){
    AppDispatcher.dispatch({
      actionType: FilterConstants.RESET_FILTERS,
      search: search
    });
  }
};
