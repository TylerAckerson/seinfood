RestaurantSearch = React.createClass({
  render: function() {
    if (this.props.search !== "") {
      searchQuery = this.props.search;
    } else {
      searchQuery = "all of New York... in the 90s... from Seinfeld";
    }

    return (
      <div>
        <span>Results for {searchQuery}</span>
      </div>
    );
  }
});
