(function(root) {
  'use strict';

  var _currentOrder = { items: {},
                        subtotal: 0,
                        tax: 0,
                        total: 0,
                        delivery_fee: null,
                        tip_percent: 0,
                        tip: null,
                        restaurant: null,
                        restaurant_id: null,
                        order_type: 'delivery'};

  var itemsCounter = 0;

  var ORDER_CHANGE_EVENT = "changeOrder";
  var COMPLETE_ORDER_EVENT = "completeOrder";
  var RECEIVE_ORDER_EVENT = "receiveOrder";

  root.OrderStore = $.extend({}, EventEmitter.prototype, {
    currentOrder: function(){
      return $.extend({}, _currentOrder);
    },

    addItem: function(itemInfo){
      var added = $.extend({counter: itemsCounter}, itemInfo.item);

      _currentOrder.items[itemsCounter] = added;
      itemsCounter++;

      if (_currentOrder.restaurant === null) {
        _currentOrder.restaurant = itemInfo.item.restaurant;
        _currentOrder.restaurant_id = itemInfo.item.restaurant.id;
      }

      this.calculateTotals();
    },

    calculateTotals: function(){
      if (_.isEmpty(_currentOrder.items)) {
        this.resetTotals();
        return;
      }

      var prices = _.mapObject(_currentOrder.items, function(item) {
        return item.price;
      });

      _currentOrder.subtotal = _.values(prices).reduce(function(price, total){
        return total + price;
      });

      _currentOrder.tax = _currentOrder.subtotal * 0.075;
      _currentOrder.delivery_fee = _currentOrder.restaurant.delivery_fee;

      _currentOrder.tip = _currentOrder.tip_percent * (_currentOrder.subtotal +
                                                      _currentOrder.tax +
                                                      _currentOrder.delivery_fee);

      _currentOrder.total = _currentOrder.subtotal +
                            _currentOrder.tax +
                            _currentOrder.delivery_fee +
                            _currentOrder.tip;

    },

    resetTotals: function(){
      _currentOrder.subtotal = 0;
      _currentOrder.tax = 0;
      _currentOrder.delivery_fee = null;
      _currentOrder.total = 0;
      _currentOrder.tip_percent = 0;
    },

    removeItem: function(itemIdx){
      delete _currentOrder.items[itemIdx];
      this.calculateTotals();
    },

    updateTip: function(tip){
      _currentOrder.tip_percent = tip.tip;
      this.calculateTotals();
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
      this.on(ORDER_CHANGE_EVENT, callback);
    },

    removeOrderDetailChangeListener: function(callback){
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
        case (OrderConstants.ORDER_UPDATE_TIP):
          root.OrderStore.updateTip(payload.tip);
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
