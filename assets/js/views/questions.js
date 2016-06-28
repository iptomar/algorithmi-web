window.QuestionsView = Backbone.View.extend({

    events: {
        "click .deleteQuestion": "confirmDelete",

    },
    confirmDelete: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("value");

        var quest = new Question({id: id});
        quest.destroy({
            success: function (scchool, response) {
                sucssesMsg($(".form"), "Pergunta apagada com sucesso.");
                setTimeout(function () {
                    document.location.reload(true);
                }, "Pergunta apagada com sucesso.".length * 45);

            }, error: function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(ajaxOptions.responseText);
                failMsg($("body"), json.text);

            }
        })
    },

    initialize: function () {
        this.data = this.collection.toJSON();
        console.log(this.data)
    }
    ,

    render: function () {
        var self = this;
        $(this.el).html(this.template({collection: self.data}));
        return this;
    }

})
;


