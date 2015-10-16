Seinfood = (function() {
  'use strict';

  var root = document.getElementById('application');
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({
    render: function(){
      return (
        <div>
          <Navbar />
          <div id="container" className="container">
            {this.props.children}
          </div>
        </div>
      );
    }
  });

  var routes = (
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Search} />
        <Route path="/restaurants" component={Restaurants}/>
        <Route path="/restaurants/:restaurantId" component={RestaurantDetail}/>
          <Route path="/menu" component={Menu}/>
      </Route>
    </Router>
  );

  React.render(routes, root);
});
