Search = React.createClass({
  getInitialState:function(){
    return { search: "" };
  },

  handleFormSubmit: function(e){
    e.preventDefault();
    var searchString = this.state.search;
    this.props.history.pushState(null, "/restaurants", { search: searchString});
  },

  updateSearch: function() {
    this.setState( { search: event.target.value });
  },

  render: function(){
      return (
        <form className="search-form" onSubmit={this.handleFormSubmit}>
          <h1>Order Food Delivery & Takeout</h1>
          <h3>... from restaurants featured in the 90s sitcom Seinfeld</h3>
          <input className="address-search"
                 type="text"
                 placeholder="  e.g 129 West 81st Street, Apartment 5A"
                 onChange={this.updateSearch}/>

          <input type="submit" value="Find Restaurants"/>
        </form>
      );
  }
});
