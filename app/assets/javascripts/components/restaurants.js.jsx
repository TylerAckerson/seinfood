Restaurants = React.createClass({
  getInitialState: function(){
    return {restuarants: []};
  },
  componentDidMount: function(){
    this.setState( { restuarants: RestaurantStore.all() } );
  },
  render: function(){
    return (
      <div>
        HellllloOoOo
        <RestaurantItem/>
      </div>

    );
  }
});
