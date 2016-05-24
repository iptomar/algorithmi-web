var Student = Backbone.Model.extend({
    urlRoot: 'api/students',
    defaults: {},
    initialize: function (options) {

    },
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/students/' + this.id,
            function (json) {
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

var Students = Backbone.Collection.extend({
    model: Student,
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/students',
            function (json) {
                for (i = 0; i < json.length; i++) {
                    self.models.push(new Student(json[i]));
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
        return (
            self.models.find(function (model) {
                return model.get('id') === id;
            }).attributes
        )
    }
});