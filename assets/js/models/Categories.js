var Category = Backbone.Model.extend({
    urlRoot: 'api/categories',
    defaults: {},
    initialize: function (options) {

    },
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/categories/' + this.id,
            function (json) {
                console.log(json)

                self.attributes = (json);

                after_fetch();
            },
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                failMsg($("body"), json.text);
                setTimeout(function () {
                    app.navigate('/home', {
                        trigger: true
                    });
                }, json.text.length * 35);
            }
        );
    }
});

var Categories = Backbone.Collection.extend({
    model: Category,
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/categories',
            function (json) {
                for (i = 0; i < json.length; i++) {
                    self.models.push(new Category(json[i]));
                }
                after_fetch();
            },
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                failMsg($("body"), json.text);
                setTimeout(function () {
                    app.navigate('/home', {
                        trigger: true
                    });
                }, json.text.length * 45);
            }
        );
    },
    //Gets specific item from collection
    getByID: function (id) {
        var self = this;
        console.log(self.models);
        return (
            self.models.find(function (model) {
                return model.get('id') === id;
            }).attributes
        )
    }
});