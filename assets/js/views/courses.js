/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.CoursesView = Backbone.View.extend({

    events: {
        "change #filePicker": "convertPhoto",
        "click #btnCrop": "getFoto",
        "click #btnCreateCourse": "createCourse",
        "click .deleteCourse": "confirmDelete",
        "submit #newPopUpCourse": "newCourse",
    },
//Exibe o cropper
    convertPhoto: function (e) {
        var file = e.target.files[0];

        // Load the image
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var image = new Image();
            image.src = readerEvent.target.result;
            showCropper("#content > div", image, 150, 1);
        }
        reader.readAsDataURL(file);
    },

    createCourse: function (e) {
        e.preventDefault();
        // POST ("/api/courses")
        var coursesDetails = $("#newCourseForm").serializeObject();
        var courses = new Course(coursesDetails);

        courses.save(null, {
            success: function (inst, response) {

                $("#newCourseModal").modal("hide");
                sucssesMsg($(".form"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 1000);
            },
            error: function (inst, response) {
                $("#newCourseModal").modal("hide");
                failMsg($(".form"), response.text);
            },
        })
    },

    confirmDelete: function (e) {
        e.preventDefault();
        var id = $(e.currentTarget).attr("value");

        var course = new Course({id: id});
        course.destroy({
            success: function (scchool, response) {
                sucssesMsg($("body"), response.text);
                setTimeout(function () {
                    document.location.reload(true);
                }, 1000);

            }, error: function (xhr, ajaxOptions, thrownError) {
                var json = JSON.parse(ajaxOptions.responseText);
                failMsg($("body"), json.text);

            }
        })
    },

    checkAuth: function () {
        if (!sessionStorage.getItem('keyo')) {
            showLoginModal($(".form"));
        }
    },

    initialize: function () {
        this.data = this.collection.toJSON();
        populateInstitutionsDD();
    },

    render: function () {
        var self = this;
        $(this.el).html(this.template({collection: self.data}));


        return this;
    }
});
