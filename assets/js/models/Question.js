var Question = Backbone.Model.extend({
    initialize: function (options) {
        this.id = options.id;
    },
    fetch: function (after_fetch) {
        var self = this;

        modem('GET', '/api/question/' + this.id,
            function (json) {
                console.log(json);
                self.set("titulo", json.titulo);
                self.set("descricao", json.descricao);
                self.set("categoria", json.categoria);
                after_fetch();
            },
            function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(xhr.responseText);
                error_launch(json.message);
            }
        );
    }
});
