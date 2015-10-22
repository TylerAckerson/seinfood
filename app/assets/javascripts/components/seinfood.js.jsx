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
          <div id="container">
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
        <Route path="/restaurants/:restaurantId">
          <IndexRoute components={{detail: RestaurantDetail,
                                     menu: Menu,
                                    order: Order}} />
          <Route path="checkout" components={{detail: RestaurantDetail,
                                            checkout: OrderCheckout,
                                               order: Order}} />
        </Route>
        <Route path="/orders/:orderId" component={CompletedOrder}/>
      </Route>
    </Router>
  );

  React.render(routes, root);
});
