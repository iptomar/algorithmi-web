/**
 * Created by Fábio Cruz on 23/04/2016.
 */

window.PopUpInstitutionView = Backbone.View.extend({
    events: {
        "submit": "beforeSend",

    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', 'popupinstitution',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newPopUpInstitution").serializeObject()))
        );

    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});
