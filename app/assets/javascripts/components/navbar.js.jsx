Navbar = React.createClass({
  render: function(){
    var current;
    if (window.CURRENT_USER_ID) {
      current = "Account";
    } else {
      current = "Sign In";
    }

    return(
      <ul>
        <li>{current}</li>
      </ul>
    );
  }
});

// <% if current_user %>
// Logged in as <%= current_user.email %><br>
//              <%= button_to "Sign Out", session_url, method: :delete %>
// <% else %>
//   <%= link_to "Sign Up", new_user_url %>
//   <%= link_to "Sign In", new_session_url %>
// <% end %>
// <%= link_to "Home", root_url %>
