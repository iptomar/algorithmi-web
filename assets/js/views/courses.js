/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.CoursesView = Backbone.View.extend({

    events: {

        "submit": "beforeSend",

    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', 'course/new',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newCourse").serializeObject()))
        );

    },

    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});