FormValidation = React.createClass({
	componentWillReceiveProps: function(){
			if (typeof this.props.type === "undefined") {
				console.log("it's undefined");
			} else if (this.props.type == "delivery") {
				this.validateDeliveryFields();
			}

			this.validateFields();
	},

	validateFields: function(){
		console.log("validating fields" );
	},

	validateDeliveryFields: function(){
		console.log("checking extra fields" );
	},

	render: function(){
  	return(
			<div>
				<h4>Form being validated</h4>
			</div>
  	);
  }
});
