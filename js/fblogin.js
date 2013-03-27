  function login() {
    //Login with Facebook
    FB.login(function(response) {
      if (response.authResponse) {
        var accessToken = response.authResponse.accessToken;

        FB.api('/me', function(response) {
          var user = new StackMob.User({ username: response.email });
          user.createUserWithFacebook(accessToken, {
            success: function(model) {
              console.debug(model);
            },
            error: function(model, response) {
              console.debug(model);
              console.debug(response);
            }
          });
        });

      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'email'});
  }

  $('#login').click(function() {
    login();
  });

