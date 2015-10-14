RestaurantSearch = React.createClass({
  render: function() {
    return (
      <div>
        <span>Results for </span>
        <span>{this.props.search}</span>
      </div>
    );
  }
});
