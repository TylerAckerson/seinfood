FormValidation = React.createClass({
	getInitialState: function (){
		return { checks: {   "email": null,
											 "address": null,
											    "city": null,
										  	 "state": null  } };
	},

	componentWillReceiveProps: function(){
			// if (this.props.type == "delivery" && typeof this.props.user != "undefined" ) {
			if (this.props.order.order_type == "delivery" && typeof this.props.order.email != "undefined" ) {
				this.validateDeliveryFields();
				this.validateEmail();
			// } else if (typeof this.props.user != "undefined"){
			} else if (typeof this.props.email != "undefined"){
				this.validateEmail();
			}

	},

	validateEmail: function(){
		console.log("validating email");
		// var email = this.props.user.email;
		var email = this.props.email;
		if (typeof email === "undefined" || email === "" || email === " ") {
			newChecks = $.extend(this.state.checks, { "email": "Email cannot be blank" });
			this.setState( { checks: newChecks } );
		}
	},

	validateDeliveryFields: function(){
		// console.log("validating delivery");
		// for (var check in this.state.checks) {
		// 	newChecks = $.extend({}, this.state.checks);
		// 	if (check != "email") {
		// 		// console.log(this.props.user[check]);
		// 		// if (!this.props.user[check]){
		// 		// 	newChecks[check] = check + " cannot be blank";
		// 		// }
		// 	}
		// }

		// this.setState( { checks: newChecks });
	},

	render: function(){
		// console.log("state: " + this.state);
		// console.log("props: " + this.props);
  	return(
			<div>
				<h4>Form being validated</h4>
			</div>
  	);
  }
});
