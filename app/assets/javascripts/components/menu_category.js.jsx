MenuCategory = React.createClass({
  render: function(){

    return (
      <div className="row">
        <h2>{this.props.category}</h2>{
          this.props.items.map(function(item) {
            var price = "$" + item.price;
            return <ul className="list-group" key={item}>
                    Name: <li>{item.name}</li>
                    Description: <li>{item.description}</li>
                    Price: <li>{price}</li>
                  </ul>;
          })
        }
      </div>);
  }
});
