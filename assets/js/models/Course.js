var Course = Backbone.Model.extend({
    urlRoot: 'api/courses',
    defaults: {},
    initialize: function (options) {

    },
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/courses/' + this.id,
            function (json) {
                console.log(json)
                //Gets image as b64
                getDataUri("../images/" + json.image, function (dataUri) {
                    self.attributes = (json);
                    self.attributes.b64 = dataUri;
                    after_fetch();
                });
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

var Courses = Backbone.Collection.extend({
    model: Course,
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/courses',
            function (json) {
                for (i = 0; i < json.length; i++) {
                    self.models.push(new Course(json[i]));
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