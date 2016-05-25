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
                self.attributes = (json);
                after_fetch();
            },
            //Precisamos enviar para a Tabela escolas o id do professor.
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                error_launch(json.message);
            }
        );
    }
});

var Courses = Backbone.Collection.extend({
    model: Course,
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/courses',
            function (json) {
                for (i = 0; i < json.length; i++) {
                    self.models.push(new Course(json[i]));
                }
                after_fetch();
            },
            function () {
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