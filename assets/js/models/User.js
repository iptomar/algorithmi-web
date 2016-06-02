var User = Backbone.Model.extend({
    urlRoot: 'user',
    defaults: {},
    initialize: function (options) {

    },
    fetch: function (after_fetch) {
        var self = this;
        modem('GET', '/api/me',
            function (json) {
                console.log("My data")
                console.log(json)
                self.attributes = (json);
                self.attributes.logged = true;
                after_fetch();
            },
            //Precisamos enviar para a Tabela escolas o id do professor.
            function (xhr, ajaxOptions, thrownError) {
                console.log("ups")
                var json = JSON.parse(xhr.responseText);
                error_launch(json.message);
            }
        );
    }
});
