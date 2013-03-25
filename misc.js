/* <![CDATA[ */
      // Initialize StackMob object
      // Copy your init data from here: https://dashboard.stackmob.com/sdks/js/config
      // Your other app information is here: https://dashboard.stackmob.com/settings
      StackMob.init({
        appName: 'checkcheck',
        clientSubdomain: 'tsmgracegmailcom',
        publicKey: '3b23062f-a93f-4cc5-8519-20beede78d4a',
        apiVersion : 0
      });
      /* ]]> */

		<!--
		*************************************
		StackMob JS SDK code that creates and saves a TestObject
		*************************************
		-->
      /* <![CDATA[ */
      $(document).ready(function() {


          var Movie = StackMob.Model.extend({
            schemaName: "movies"
          });
            
          var Movies = StackMob.Collection.extend({
              model: Movie
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
              $('.span4').append(listView.render().el);

              return this;
            }
   
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

                el.append('<li><a href="#add">add new movie</a></li>');
                
                return this;
              }
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

              var movie = new Movie({name:$('#name').val() });

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

          AppRouter = Backbone.Router.extend({

            routes:{
                "":"home",
                "add":"add",
                "update/:id":"update"
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
            }
          });

        }(jQuery));

        $(document).ready(function () {
            movieApp = new AppRouter();
            Backbone.history.start();           
        });

