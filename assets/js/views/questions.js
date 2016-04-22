window.QuestionsView = Backbone.View.extend({

    events: {

        "submit": "beforeSend",

    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', 'question/new',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newQuestion").serializeObject()))
        );

    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});