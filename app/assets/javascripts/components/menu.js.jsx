MenuItem = React.createClass({
  handleClick: function () {
    OrderActions.orderAddItem(this.props.item);
  },

  render: function(){
    var item = this.props.item;
    var price = "$" + item.price;

    return (
      <div className="menu-item">
        <h4 className="menu-item-name">{item.name}</h4>
        <span className="menu-item-detail">{item.description}</span>
        <button type="button"
                onClick={this.handleClick}
                className="btn btn-default order-item-price">{price}</button>
      </div>
     );
     }
});

MenuCategory = React.createClass({
  mixins: [ReactRouter.History],

  handleClick: function(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: "row section"
      });
    }else{
      this.setState({
        open: true,
        class: "row section open"
      });
    }
  },
  getInitialState: function(){
     return ({
       open: false,
       class: "row section"
     });
   },

  render: function() {
    return (
        <div className="menu-category" onClick={this.handleClick}>{this.props.title}
            <h2>{this.props.category}</h2>{
              this.props.items.map(function(item) {
                return <MenuItem item={item} key={item.id} />;
              })
            }
      </div>
    );
  }
});

Menu = React.createClass({
  categorized: function(){
    var menu_items = this.state.restaurant.menu_items;
    var categorized = {};

    menu_items.forEach(function(item){
      if (categorized[item.category]) {
        categorized[item.category] = categorized[item.category].concat([item]);
      } else {
        categorized[item.category] = [item];
      }
    });

    return categorized;
  },

  getInitialState: function() {
      return this.getStateFromStore();
    },

  getStateFromStore: function() {
    var id = parseInt(this.props.params.restaurantId);
    ApiUtil.fetchSingleRestaurant(id);
    var targetRestaurant = RestaurantStore.retrieveRestaurant(id);
    return { restaurant: targetRestaurant };
  },

  render: function() {
    var categorized = this.categorized();

    return (
      <div>
        <div className="col-xs-2"></div>
        <div className="col-xs-5 menu-main" id="restaurant-menu">
          <div className="header">
            <h3>Menu</h3>
          </div>{
          _.keys(categorized).map(function(category){
            return <MenuCategory title={category}
                                 key={category}
                                 items={categorized[category]}/>;
          })
        }</div>
      </div>
    );
  }
});
