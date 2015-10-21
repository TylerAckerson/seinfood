RestaurantSearch = React.createClass({
  render: function() {
    if (this.props.search !== "") {
      searchQuery = this.props.search;
    } else {
      searchQuery = "all of New York, yada yada yada Seinfeld";
    }

    return (
      <div className="row search-results">
        <div className="col-8">
          <blockquote>
            Results for {searchQuery}
          </blockquote>
        </div>
      </div>
    );
  }
});
