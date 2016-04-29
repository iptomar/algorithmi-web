/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.CoursesView = Backbone.View.extend({

    events: {

        "submit": "beforeSend",
        "click #newCourse": "newCoursePopup",
        "submit #newPopUpCourse": "newCourse",
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


    newCourse: function(){

        modem('POST', 'popupcourse',
            function (json) {
                $("#newCourseModal").modal('hide');
            },
            function (xhr, ajaxOptions, thrownError) {
                //Mandar Uma Mensgame Qualquer
            },
            encodeURI(JSON.stringify($("#newPopUpCourse").serializeObject()))
        );

    },

    newCoursePopup: function(e){
        e.preventDefault();

        $("#newCourseModal").modal('show');

    },



    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});