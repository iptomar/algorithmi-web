/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.CoursesView = Backbone.View.extend({

    events: {
        "submit": "beforeSend",
        "click #newCourse": "newCoursePopup",
        "click #editCourse": "editCoursePopup",
        "click #deleteCourse": "deleteCoursePopup",
        "submit #newPopUpCourse": "newCourse",
    },

    beforeSend: function (e) {
        e.preventDefault();

        modem('POST', '/api/course/new',
            function (json) {
            },
            function (xhr, ajaxOptions, thrownError) {
            },
            encodeURI(JSON.stringify($("#newPopUpCourse").serializeObject()))
        );

    },
    
    newCoursePopup: function (e) {
        e.preventDefault();

        $("#newCourseModal").modal('show');

    },

    editCoursePopup: function (e) {
        e.preventDefault();

        $("#editCourseModal").modal('show');

    },

    deleteCoursePopup: function (e) {
        e.preventDefault();

        $("#deleteCourseModal").modal('show');

    },
    
    initialize: function () {
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});