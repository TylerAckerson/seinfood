MenuItem = React.createClass({
  render: function(){
    var item = this.props.item;
    var price = "$" + item.price;

    return (
      <div className="row menu-item">
        <div className="col-xs-2"></div>
        <div className="col-xs-6">
          <h4>{item.name}</h4>
          <span>{item.description}</span>
          <button type="button"
                  onClick={this.props.onClick}
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

  orderItem: function(e){
    console.log("clicked");
  },

  render: function() {
    return (
      <div className={this.state.class}>
        <div className="row top-buffer sectionhead" onClick={this.handleClick}>{this.props.title}</div>
        <button type="button" className="btn btn-default" id="menu-category-btn">
            <span className="glyphicon glyphicon-chevron-down"></span>
        </button>
        <div className="category-wrap col-sm-8">
          <div className="category row">
            <h1>{this.props.category}</h1>{
              this.props.items.map(function(item) {
                return <MenuItem item={item} onClick={this.orderItem}/>;
              }.bind(this))
            }
          </div>
        </div>
      </div>
    );
  }
});

Menu = React.createClass({
  categorized: function(){
    var menu_items = this.props.restaurant.menu_items;
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
    var categorized = this.categorized();

    return (
      <div className="container menu-main" id="restaurant-menu">{
        _.keys(categorized).map(function(category){
          return <MenuCategory title={category}
                               key={category}
                               items={categorized[category]}/>;
        })
      }</div>
    );
  }
});
