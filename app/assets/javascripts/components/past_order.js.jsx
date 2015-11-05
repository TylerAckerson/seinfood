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


  render: function(){
    var subtotal = 0;
    var tax = 0;
    var total = 0;
    // var subtotal = this.props.subtotal.toFixed(2);
    // var tax = this.props.tax.toFixed(2);
    // var total = this.props.total.toFixed(2);
    // var tipAmount = total * this.state.order.tipPercent.toFixed(2);

    // tip = <tr>
    //         <td>Tip</td>
    //         <td>${tipAmount}</td>
    //       </tr>;
    //
    //
    // if (this.state.order.delivery_fee !== null) {
    //   if (this.state.order.delivery_fee !== 0){
    //     delivery_fee = "$" + this.state.order.delivery_fee.toFixed(2);
    //     delivery = <tr>
    //                 <td />
    //                 <td>Delivery</td>
    //                 <td>{delivery_fee}</td>
    //                 <td width="80"/>
    //                </tr>;
    //   } else {
    //     delivery = <tr>
    //                 <td>Delivery</td>
    //                 <td>Free</td>
    //                </tr>;
    //   }
    // }

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
                <th>${subtotal}</th>
                <th width="80"/>
              </tr>
              <tbody>
                <tr>
                  <td/>
                  <td>Tax</td>
                  <td>${tax}</td>
                  <td width="80"/>
                </tr>
              </tbody>
              <th/>
              <th>Total</th>
              <th>${total}</th>
           </table>
        </div>
       </div>
       <div className="col-xs-2"></div>
      </div>
     );
  }
});
