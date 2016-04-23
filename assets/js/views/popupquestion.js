
window.PopUpQuestionView = Backbone.View.extend({
    events: {
        "submit": "beforeSend",

    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', 'popupquestion',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newPopUpQuestion").serializeObject()))
        );

    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});
