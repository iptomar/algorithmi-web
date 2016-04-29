/**
 * Created by Fábio Cruz on 23/04/2016.
 */
window.PopUpCourseView = Backbone.View.extend({
    events: {
        "submit": "beforeSend",

    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', '/api/popupcourse',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newPopUpCourse").serializeObject()))
        );

    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});