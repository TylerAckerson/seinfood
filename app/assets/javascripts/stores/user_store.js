(function(root) {
  'use strict';

  var _currentUser = [];
  var USER_CHANGE_EVENT = "change";

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    user: function() {
      return _currentUser[0];
    },

    resetUser: function(user){
      _currentUser = [user];
    },

    addChangeListener: function(callback){
      root.RestaurantStore.on(USER_CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      root.RestaurantStore.removeListener(USER_CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case (UserConstants.RECEIVE_USER):
          root.UserStore.resetUser(payload.user);
          root.UserStore.emit(USER_CHANGE_EVENT);
          break;
      }
    })
  });
}(this));
