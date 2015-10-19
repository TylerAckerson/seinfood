Menu = React.createClass({
  category_items: function(category, menu_items){
    var items = menu_items.filter(function(menu_item) {
      return (menu_item.category === category);
    });
  },

  categorized: function(){
    var menu_items = this.props.restaurant.menu_items;
    var categorized = {};

    menu_items.forEach(function(item){
      if (categorized[item.category]) {
        categorized[item.category].concat(item);
      } else {
        categorized[item.category] = [item];
      }
    });

    return categorized;
  },

  render: function(){
    var categorized = this.categorized();

    return(
      <div className="container" d="restaurant-menu">{
        _.keys(categorized).map(function(category){
          return <MenuCategory category={category} key={category}
                               items={categorized[category]}/>;
        })
      }</div>
    );
  }
});
