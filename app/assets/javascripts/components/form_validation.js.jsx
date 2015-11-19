FormValidation = React.createClass({
	getInitialState: function (){
		return { checks: {"email": null, "address": null, "city": null, "state": null} };
	},

	componentWillReceiveProps: function(){
		// console.log("receiving props");
			if (typeof this.props.type === "undefined") {
				// console.log("it's undefined");
			} else if (this.props.type == "delivery") {
				this.validateDeliveryFields();
			}

			this.validateEmail();
	},

	validateEmail: function(){
		if (typeof this.props.user.email == "undefined") {
			newChecks = $.extend(this.state.checks, { "email": "Email cannot be blank" });
			this.setState( { checks: newChecks } );
		}
	},

	validateDeliveryFields: function(){
		for (var check in this.state.checks) {
			newChecks = $.extend({}, this.state.checks);
			if (check != "email") {
				// console.log(this.props.user[check]);
				if (!this.props.user[check]){
					newChecks[check] = check + " cannot be blank";
				}
			}
		}

		// console.log(newChecks);
		this.setState( { checks: newChecks });
	},

	render: function(){
  	return(
			<div>
				<h4>Form being validated</h4>
			</div>
  	);
  }
});
