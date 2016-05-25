/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.CoursesView = Backbone.View.extend({

    events: {
        "click #btnCreateCourse": "createCourse",
        "click #newCourse": "getCourses",
        "click .deleteCourse": "confirmDelete",
        "submit #newPopUpCourse": "newCourse",
    },
    //Preenche a dd das escolas
    getCourses: function (e) {
        populateSchoolsDD();
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
                sucssesMsg($(".form"), "Escola apagada com sucesso.");
                setTimeout(function () {
                    document.location.reload(true);
                }, 1000);

            }, error: function (inst, response) {
                $("#newInstitutionModal").modal("hide");
                failMsg($(".form"), "Não foi possível apagar a escola.");
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
        console.log(this.data)
    },

    render: function () {
        var self = this;
        $(this.el).html(this.template({collection: self.data}));


        return this;
    }
});
