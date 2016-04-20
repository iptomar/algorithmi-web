/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.InstitutionsView = Backbone.View.extend({
    events: {
        "submit": "beforeSend"
    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', 'institution/new',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            $("#newInstituicao").serializeArray()
        );

    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});
