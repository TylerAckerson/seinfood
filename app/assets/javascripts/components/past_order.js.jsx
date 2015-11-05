PastOrderItem = React.createClass({
  render: function() {
    price = this.props.orderItem.price.toFixed(2);

    return (
        <tr>
          <td>{this.props.orderItem.name}</td>
          <td>${price}</td>
        </tr>
      );
   }
});

PastOrder = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getTotals: function(){
    totals = {};

    totals.subtotal = parseInt(this.props.order.subtotal).toFixed(2);
    totals.tax = parseInt((this.props.order.subtotal) * 0.075).toFixed(2);

    if (this.props.order.delivery_fee !== null) {
      totals.delivery = parseInt(this.props.order.delivery_fee).toFixed(2);
    } else {
      totals.delivery = 0;
    }

    if (this.props.order.tip !== null) {
      totals.tip = parseInt(this.props.order.tip).toFixed(2);
    } else {
      totals.tip = 0;
    }

    totals.total = ( parseInt(this.props.order.subtotal) +
                     parseInt(this.props.order.tax) +
                     parseInt(this.props.order.delivery_fee) +
                     parseInt(this.props.order.tip)
                   );

    return totals;
  },

  render: function(){
    var totals = this.getTotals();
    var restaurant = this.props.order.restaurant;

    return (
      <div>
        <div className="col-xs-3 order">
         <div className="header">
           <h3>Order</h3>
         </div>

         <div className="order-body">
           <table className="table">
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th/>
              </tr>
              <tbody>
              {
              _.mapObject(this.props.order.items, function(item, itemIdx){
                  return <PastOrderItem orderItem={item} key={itemIdx}/>;
                })
              }
            </tbody>
           </table>
           <table className="table">
              <tr>
                <th/>
                <th>Subtotal</th>
                <th>${totals.subtotal}</th>
                <th width="80"/>
              </tr>
              <tbody>
                <tr>
                  <td/>
                  <td>Tax</td>
                  <td>${totals.tax}</td>
                  <td width="80"/>
                </tr>
                <tr>
                  <td/>
                  <td>Delivery</td>
                  <td>${totals.delivery}</td>
                  <td width="80"/>
                </tr>
              </tbody>
              <th/>
              <th>Total</th>
              <th>${totals.total}</th>
           </table>
        </div>
       </div>
       <div className="col-xs-2"></div>
      </div>
     );
  }
});
