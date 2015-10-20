OrderActions ={
  orderAddItem: function(item) {
    AppDispatcher.dispatch({
      actionType: OrderConstants.ORDER_ADD_ITEM,
      item: item
    });
  },

  orderRemoveItem: function(item){
    AppDispatcher.dispatch({
      actionType: OrderConstants.ORDER_REMOVE_ITEM,
      item: item
    });
  }
};
