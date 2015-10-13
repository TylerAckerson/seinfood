$(function() {
  'use strict';

  var root = document.getElementById('application');
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({
    render: function(){
      return (
        <div id="container">
          {this.props.children}
        </div>
      );
    }
  });

  var routes = (
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Search} />
      </Route>
      <Route path="/restaurants" component={Restaurants}/>
      <Route path="/restaurants/:restaurantId" component={RestaurantDetail}/>
    </Router>
  );

  React.render(routes, root);
});