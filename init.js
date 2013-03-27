
// Initialize StackMob object
// Copy your init data from here: https://dashboard.stackmob.com/sdks/js/config
// Your other app information is here: https://dashboard.stackmob.com/settings
StackMob.init({
    appName: 'checkcheck',
    clientSubdomain: 'tsmgracegmailcom',
    publicKey: '3b23062f-a93f-4cc5-8519-20beede78d4a',
    apiVersion : 0
});

// Facebook app init
/*
window.fbAsyncInit = function() {
  FB.init({
    appId      : '481440575256369'
    channelUrl : '//dev.checkcheck.tsmgracegmailcom.stackmobapp.com/index.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });
 
  // Additional initialization code here
};

// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = '//connect.facebook.net/en_US/all.js';
   d.getElementsByTagName('head')[0].appendChild(js);
 }(document));
*/
