window.TestsView = Backbone.View.extend({
    events: {
        "click #btnCriarInst": "adicionarPergunta"
    },

    // adicionarPergunta: function () {
    //     .append()



    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});
