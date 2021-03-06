MenuItem = React.createClass({
  mixins: [ReactRouter.History],

  handleClick: function () {
    OrderActions.orderAddItem({item: this.props.item});
  },

  render: function(){

    var item = this.props.item;
    var price = "$" + item.price.toFixed(2);

    return (
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1  col-lg-10 col-lg-offset-1 menu-item">
          <h4 className="row menu-item-name">{item.name}</h4>
          <div className="row menu-item-detail">
            {item.description}
          </div>
          <button type="button"
                  onClick={this.handleClick}
                  className="btn btn-default order-item-price">{price}</button>
        </div>
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
        <div className="row menu-category" onClick={this.handleClick}>
          <div className="col-xs-10 col-xs-offset-1">
            <h3>{this.props.title}</h3>
                {
                this.props.items.map(function(item) {
                  return <MenuItem item={item} key={item.id} />;
                })
             }
          </div>
      </div>
    );
  }
});

Menu = React.createClass({
  getInitialState: function(){
      return {restaurant: RestaurantStore.retrieveRestaurant(this.props.params.restaurantId)};
  },

  componentDidMount: function(){
    var id = parseInt(this.props.params.restaurantId);
    ApiUtil.fetchSingleRestaurant(id);
    RestaurantStore.addDetailChangeListener(this._getStateFromStore);
  },

  componentWillUnmount: function(){
    RestaurantStore.removeDetailChangeListener(this._getStateFromStore);
  },

  _getStateFromStore: function() {
    var id = parseInt(this.props.params.restaurantId);

    var targetRestaurant = RestaurantStore.retrieveRestaurant(id);
    this.setState({ restaurant: targetRestaurant });
  },

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

  render: function() {
    if (this.state.restaurant === undefined){
        return (<div className="throbber-loader" id="loader">
                  Loading…
                </div>);
      }

    var categorized = this.categorized();

    return (
      <div>
        <div className="col-xs-6 col-xs-offset-1 menu-main bottom-buffer" id="restaurant-menu">
          <div className="header">
            <h3>Menu</h3>
          </div>{
          _.keys(categorized).map(function(category){
            return <MenuCategory title={category}
                                 key={category}
                                 items={categorized[category]}/>;
          })
        }
        </div>
      </div>
    );
  }
});
