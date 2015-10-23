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
  }
};
