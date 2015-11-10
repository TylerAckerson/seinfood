Footer = React.createClass({
	render: function(){
  	return(
			<div id="footer">
				<div className="container">
					<div className="text-muted align-center">
						<article>Creator:
							<a target="_blank" href="http://tylerackerson.com"> Tyler Ackerson</a>
						</article>
						<article>
						Contact:
						<a href="mailto:tyler.a.ackerson@gmail.com"> E-mail</a> |
						<a target="_blank" href="https://github.com/tylerackerson"> Github</a> |
						<a target="_blank" href="https://www.linkedin.com/in/tylerackerson"> Linkedin</a>
						</article>
					<span>&copy; Seinfood 2015</span>
					</div>
				</div>
			</div>
  	);
  }
});
