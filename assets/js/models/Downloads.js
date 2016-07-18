var Download = Backbone.Model.extend({
    urlRoot: 'api/downloads',
    defaults: {},
    initialize: function (options) {

    },
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/downloads/' + this.id,
            function (json) {
                console.log(json)

                self.attributes = (json);


            },
            //Precisamos enviar para a Tabela escolas o id do professor.
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
    }
});

var Downloads = Backbone.Collection.extend({
    model: Download,
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', 'api/downloads',
            function (json) {
                console.log(json)
                for (i = 0; i < json.length; i++) {
                    self.models.push(new Download(json[i]));
                }
                after_fetch();
            },
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(ajaxOptions.responseText);
                failMsg($("body"), json.text);
                setTimeout(function () {
                    document.location.reload(true);
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
                return model.get('id') == id;
            }).attributes
        )
    }
});