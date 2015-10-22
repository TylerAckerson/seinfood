CompletedOrder = React.createClass({
  getInitialState: function(){
    return OrderStore.currentOrder();
  },

  componentDidMount: function(){
    OrderStore.addOrderDetailChangeListener(this._onChange);
    orderId = parseInt(this.props.params.orderId);
    ApiUtil.fetchOrder(orderId);
  },

  componentWillUnmount: function(){
    OrderStore.removeOrderDetailChangeListener(this._onChange);
  },

  _onChange: function(){
    orderId = parseInt(this.props.params.orderId);
    ApiUtil.fetchOrder(orderId);

    this.setState(OrderStore.currentOrder());
  },

  render: function(){
    return(<div className="container">
              <div className="row">
                <h1>ORDER COMPLETE</h1>
              </div>
                <h3>Order Summary</h3>
                <ul className="list-group">{
                  _.mapObject(this.state, function(value, key){
                    return <li className="list-group-item">{key}: {value}</li>;
                  })
                }
                </ul>
          </div>
        );
  }
});
