(function(root) {
  'use strict';

  var _items = [];
  var ORDER_CHANGE_EVENT = "change";

  root.OrderStore = $.extend({}, EventEmitter.prototype, {
    allItems: function(){
      return _items.slice();
    },

    addItem: function(item){
      _items.push(item);
    },

    removeItem: function(item){
      var idx = _items.indexOf(item);
      _items.splice(idx, 1);

    },

    addChangeListener: function(callback){
      this.on(ORDER_CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(ORDER_CHANGE_EVENT, callback);
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
        }
      })
  });
}(this));
