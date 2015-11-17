RestaurantSearch = React.createClass({
  render: function() {
    var count = " (" + this.props.count + ")";

    if (this.props.search !== "") {
      searchQuery = this.props.search;
    } else {
      searchQuery = "129 West 81st St, New York, NY";
    }

    return (
      <div className="row search-results">
        <h4 className="bottom-buffer">
          Results for {searchQuery} {count}
        </h4>
      </div>
    );
  }
});
