Order = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  render: function(){
      return (
        <div className="row order">
         <div className="header">
           <h3>Your Order</h3>
         </div>

         <div className="order-body">
          <article>content</article>
          <article>content</article>
          <article>content</article>
          <article>content</article>
         </div>

         <div className="footer">
           <button type="submit"
                   className="btn btn-default full-width"
                   onClick={this.handleOrder}>Proceed to Checkout</button>
         </div>
       </div>
     );
  }
});
