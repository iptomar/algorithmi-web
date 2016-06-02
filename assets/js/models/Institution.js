var Institution = Backbone.Model.extend({
    urlRoot: 'api/institutions',
    defaults: {},
    initialize: function (options) {

    },
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/institutions/' + this.id,
            function (json) {
                console.log(json)

                //Gets image as b64
                getDataUri("../images/" + json.image, function (dataUri) {
                    self.attributes = (json);
                    self.attributes.b64 = dataUri;
                    after_fetch();
                });

            },
            //Precisamos enviar para a Tabela escolas o id do professor.
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                error_launch(json.message);
            }
        );
    }
});

var Institutions = Backbone.Collection.extend({
    model: Institution,
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/institutions',
            function (json) {
                for (i = 0; i < json.length; i++) {
                    self.models.push(new Institution(json[i]));
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