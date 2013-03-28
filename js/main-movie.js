 /* <![CDATA[ */
      $(document).ready(function() {

	
	// Users
	var User = StackMob.Model.extend({
	    schemaName: "users"
	});

	var Users = StackMob.Collection.extend({
	    model: User
	});

	var users = new Users();
	

	// Movies
          var Movie = StackMob.Model.extend({
            schemaName: "movies"
          });
            
	var Movies = StackMob.Collection.extend({
            model: Movie,
	    comparator: function(item) {
		return -item.get('votes'); // negative so it returns in reverse order
	    }
	});

	var movies = new Movies();
         movies.fetch({async: true});

          var HomeView = Backbone.View.extend({
           
            el: 'body',

            initialize: function() {
              this.template = _.template($('#item-home').html());
              this.render();
            },

            render: function() {

              var el = this.$el

              el.empty();
              el.append(this.template());

              var listView = new ListView({collection:movies});
              $('.mainlist').append(listView.render().el);


              var userView = new UserView({});
              $('.userdiv').append(userView.render().el);
		

              return this;
            }
   
          });

	var UserView = Backbone.View.extend({
            className:"span8",
            tagName: "div",
            
	    render: function() {
		var template = this.template,
		el = this.$el;
		model = this.model;

		if (StackMob.isLoggedIn()){
		    el.append('<p>Welcome, ' + StackMob.getLoggedInUser() + '!</p>');
		    el.append('<a href="#logout">log out</a>');
		} else {
		   el.append('<p>You should <a href="#signin">sign in</a> or <a href="#signup">create an account!</a></p>');
		};

		return this;

	    },

	});	
	



          var ListView = Backbone.View.extend({
              
              tagName: 'ul',
              className : 'nav nav-list',


              initialize: function() {
                  this.collection.bind('all', this.render,this);
                  this.template = _.template($('#item-list').html());
              },

              render:function (eventName) {
                var template = this.template,
                          el = this.$el,
                  collection = this.collection;
                
                $(".span4 ul").empty();
               
 
                collection.each(function(movie){
                    el.append(template(movie.toJSON()));
                });

                el.append('<span id="addnew"><br><a href="#add">add new movie</a></span>');
                
                return this;
              },


          });
      
  
          var AddView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #saveBtn": "save",  
               "keypress .addName":  "onEnter"
            },

            initialize: function() {
              this.template = _.template($('#item-edit').html());
              this.collection = this.options.collection;
              this.render();
            },

            render: function() {
              $('.span8').remove();
              $(this.el).html(this.template());
              $('.row').append(this.el);
              return this;
            },

            onEnter: function(e) {
              if (e.keyCode == 13) {
                this.save(e); 
              }
            },

            save: function(e) {
              var collection = this.collection;
              e.preventDefault();

	      var movie = new Movie({
		name:$('#name').val(), 
		votes:1
	      });

              movie.create({
                success: function(model){
                    collection.add(model);
                }
              });  

              $('#name').val('');   
              
              return this;
            }

          });

          var UpdateView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #saveBtn": "save",  
               "keypress .addName":  "onEnter"
	    },

            initialize: function() {
              this.template = _.template($('#item-edit').html());
              this.model = this.options.model;
              this.render();
            },

            render: function() {
              $('.span8').remove();
              $(this.el).html(this.template(this.model.toJSON()));
              $('.row').append(this.el);
              return this;
            },

            onEnter: function(e) {
              if (e.keyCode == 13) {
                this.save(e); 
              }
            },

            save: function(e) {
              e.preventDefault();

              this.model.save({name:$('#name').val()},{
                success: function(model) {
                  
                }
              });
              
              return this;
            }

          });


          var SignupView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #saveBtn": "save",  
               "keypress .addName":  "onEnter"
            },

            initialize: function() {
              this.template = _.template($('#user-signup').html());
              this.collection = this.options.collection;
              this.render();
            },

            render: function() {
              $('.span8').remove();
              $(this.el).html(this.template());
              $('.row').append(this.el);
              return this;
            },

            onEnter: function(e) {
              if (e.keyCode == 13) {
                this.save(e); 
              }
            },

            save: function(e) {
              var collection = this.collection;
              e.preventDefault();

		user = new StackMob.User({ username:$('#name').val(), password: 'myfists' });
		user.create();
	      user.login(true);
        user.isLoggedIn({
          yes: function(){
            console.log("Logged in.");
          },
          no: function(){
            console.log("Not logged in.");
          }
        });

              $('#username').val('');   
              
              return this;
            }

          });

/*
        var SignupView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #saveBtn": "signup",
               "keypress .addName":  "onEnter"
            },

            initialize: function() {
              this.template = _.template($('#user-signin').html());
              this.collection = this.options.collection;
		this.render();
	     },

	    render: function() {
              $('.span8').remove();
              $(this.el).html(this.template());
              $('.row').append(this.el);
              return this;
            },

            onEnter: function(e) {
              if (e.keyCode == 13) {
                this.signup(e);
              }
            },

            signup: function(e) {
              e.preventDefault();

              var user = new StackMob.User({username:$('#username').val()});
		user.login(true);
              return this;
            }

          });
  */

  
        var SigninView = Backbone.View.extend({

            className:"span8",
            tagName: "div",

            events: {
               "click #saveBtn": "signin",
               "keypress .addName":  "onEnter"
            },

            initialize: function() {
              this.template = _.template($('#user-signin').html());
              this.model = this.options.model;
		this.render();
	     },

	    render: function() {
              $('.userdiv').remove();
            //  $(this.el).html(this.template());
            //  $('.userdiv').append(this.el);
              
		var template = this.template,
                el = this.$el;
		el.append(this.template())
	    return this;
            },


            onEnter: function(e) {
              if (e.keyCode == 13) {
                this.signin(e);
              }
            },

            signin: function(e) {
              e.preventDefault();

              var user = new StackMob.User({username:$('#username').val()});
		user.login(true);
              return this;
            }

          });



          AppRouter = Backbone.Router.extend({

            routes:{
                "":"home",
                "add":"add",
                "update/:id":"update",
        	"delete/:id":"delete", 
		"upvote/:id":"upvote",
		"downvote/:id":"downvote",
		"signin":"signin",
		"signup":"signup",
		"logout":"logout",
	    },

            home:function() {
              new HomeView();
            },

            add:function() {
              new AddView({collection:movies});
            },

            update:function(e) {
              model = movies.get(e);
              new UpdateView({model: model});
            },

	    delete:function(e){
		model = movies.get(e);
		model.destroy();
	    },

	    upvote:function(e) {
              model = movies.get(e);
                newvotes = model.get('votes')+1;
                model.save({votes: newvotes},{
                success: function(model) {}
              });
              return this;
            },

	    downvote:function(e) {
              model = movies.get(e);
                newvotes = model.get('votes')-1;
                model.save({votes: newvotes},{
                success: function(model) {}
              });
              return this;
            },

	    signin:function(){
		new SigninView();
	    },

	    signup:function(){
		new SignupView({collection:users}); 
	    },
 
	    logout: function(){
		user = new StackMob.User({username: StackMob.getLoggedInUser()});
		user.logout();
	    },	    
          });

        }(jQuery));

        $(document).ready(function () {
            movieApp = new AppRouter();
            Backbone.history.start();           
        });


