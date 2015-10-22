(function(root) {
  'use strict';

  var _currentOrder = { items: {} };

  var itemsCounter = 0;
  var ORDER_CHANGE_EVENT = "changeOrder";
  var COMPLETE_ORDER_EVENT = "completeOrder";
  var RECEIVE_ORDER_EVENT = "receiveOrder";

  root.OrderStore = $.extend({}, EventEmitter.prototype, {
    currentOrder: function(){
      return $.extend({}, _currentOrder);
    },

    addItem: function(item){
      var added = $.extend({counter: itemsCounter}, item);
      itemsCounter++;
      _currentOrder.items[itemsCounter] = added;
    },

    removeItem: function(itemIdx){
      delete _currentOrder.items[itemIdx];
    },

    completeOrder: function(order){
      _currentOrder = $.extend(_currentOrder, order);
    },

    receiveOrder: function(order){
      _currentOrder = $.extend({}, order);
    },

    addChangeListener: function(callback){
      this.on(ORDER_CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(ORDER_CHANGE_EVENT, callback);
    },

    addCompletionChangeListener: function(callback){
      this.on(COMPLETE_ORDER_EVENT, callback);
    },

    removeCompletionChangeListener: function(callback){
      this.removeListener(COMPLETE_ORDER_EVENT, callback);
    },

    addOrderDetailChangeListener: function(callback){
      this.on(RECEIVE_ORDER_EVENT, callback);
    },

    removeOrderDetailChangeListener: function(callback){
      this.removeListener(RECEIVE_ORDER_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case (OrderConstants.ORDER_ADD_ITEM):
          root.OrderStore.addItem(payload.item);
          root.OrderStore.emit(ORDER_CHANGE_EVENT);
          break;
        case (OrderConstants.ORDER_REMOVE_ITEM):
          root.OrderStore.removeItem(payload.item);
          root.OrderStore.emit(ORDER_CHANGE_EVENT);
          break;
        case (OrderConstants.COMPLETE_ORDER):
          root.OrderStore.completeOrder(payload.order);
          root.OrderStore.emit(COMPLETE_ORDER_EVENT);
          break;
        case (OrderConstants.RECEIVE_ORDER):
          root.OrderStore.receiveOrder(payload.order);
          root.OrderStore.emit(RECEIVE_ORDER_EVENT);
          break;
        }
      })
  });
}(this));
