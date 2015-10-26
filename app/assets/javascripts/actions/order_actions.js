OrderActions ={
  orderAddItem: function(itemInfo) {
    AppDispatcher.dispatch({
      actionType: OrderConstants.ORDER_ADD_ITEM,
      item: itemInfo
    });
  },

  orderRemoveItem: function(item){
    AppDispatcher.dispatch({
      actionType: OrderConstants.ORDER_REMOVE_ITEM,
      item: item
    });
  },

  orderUpdateTip: function(tip){
    AppDispatcher.dispatch({
      actionType: OrderConstants.ORDER_UPDATE_TIP,
      tip: tip
    });
  },

  orderUpdateOffer: function(offer){
    AppDispatcher.dispatch({
      actionType: OrderConstants.ORDER_UPDATE_OFFER,
      offer: offer
    });
  }
};
