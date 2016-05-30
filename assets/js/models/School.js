var School = Backbone.Model.extend({
    urlRoot: 'api/schools',
    defaults: {},
    initialize: function (options) {

    },
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/schools/' + this.id,
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

var Schools = Backbone.Collection.extend({
    model: School,
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/schools',
            function (json) {
                for (i = 0; i < json.length; i++) {
                    self.models.push(new School(json[i]));
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