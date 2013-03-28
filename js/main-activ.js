 /* <![CDATA[ */
      $(document).ready(function() {


          var Activ = StackMob.Model.extend({
            schemaName: "activs"
          });
            
	var Activs = StackMob.Collection.extend({
            model: Activ,
	    comparator: function(item) {
		return -item.get('votes');
	    }
	});

	var activs = new Activs();
         activs.fetch({async: true});

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

              var listView = new ListView({collection:activs});
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
               
 
                collection.each(function(activ){
                    el.append(template(activ.toJSON()));
                });

                el.append('<span id="addnew"><br><a href="#add">add new suggestion</a></span>');
                
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

	      var activ = new Activ({
		name:$('#name').val(), 
		votes:1
	      });

              activ.create({
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
                "update/:id":"update",
        	"delete/:id":"delete", 
		"upvote/:id":"upvote",
		"downvote/:id":"downvote"
	   },

            home:function() {
              new HomeView();
            },

            add:function() {
              new AddView({collection:activs});
            },

            update:function(e) {
              model = activs.get(e);
              new UpdateView({model: model});
            },

	    delete:function(e){
		model = activs.get(e);
		model.destroy();
	    },

	    upvote:function(e) {
              model = activs.get(e);
                newvotes = model.get('votes')+1;
                model.save({votes: newvotes},{
                success: function(model) {}
              });
              return this;
            },

	    downvote:function(e) {
              model = activs.get(e);
                newvotes = model.get('votes')-1;
                model.save({votes: newvotes},{
                success: function(model) {}
              });
              return this;
            },
 
          });

        }(jQuery));

        $(document).ready(function () {
            activApp = new AppRouter();
            Backbone.history.start();           
        });


