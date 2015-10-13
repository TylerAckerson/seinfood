Search = React.createClass({
  render: function(){
      return (
        <form>
          <h3>Order Food Delivery & Takeout</h3>
          <h5>... from restaurants featured in the 90s sitcom Seinfeld</h5>
          <input className="address-search"
                 type="text"
                 placeholder="e.g 129 West 81st Street, Apartment 5A"/>

          <input type="submit" value="Find Restaurants"/>
        </form>
      );
  }
});
