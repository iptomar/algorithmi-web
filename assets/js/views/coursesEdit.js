/**
 * Created by Fábio Cruz on 10/04/2016.
 */
window.CoursesEditView = Backbone.View.extend({
    events: {
        "change #filePicker": "convertPhoto",
        "click #btnCrop": "getFoto",
        "submit": "editCourse"
    },
    //Convert Photo To Base64 String
    convertPhoto: function (e) {
        var file = e.target.files[0];

        // Load the image
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var image = new Image();
            image.src = readerEvent.target.result;
            showCropper(".form", image, 150, 1);
        }
        reader.readAsDataURL(file);
    },

    //Recorta a foto
    getFoto: function (e) {
        e.preventDefault();
        var canvas = $("#preview")[0];
        var dataUrl = canvas.toDataURL('image/jpeg');
        $("#base64textarea").val(dataUrl);
        $("#imagePrev").attr('src', dataUrl);
        console.log(dataUrl);
        $(".cropBG").remove();
    },

    editCourse: function (e) {
        e.preventDefault();
        var id = parseInt($(e.currentTarget).attr("value"));


        var courseDetails = $('#editCourse').serializeObject();
        console.log(courseDetails)
        var course = new Course({id: this.data.id});
        course.save(courseDetails, {
            success: function (user) {
                $("#newCourseModal").modal("hide");
                sucssesMsg($(".form"), "Curso alterada com sucesso!");
                setTimeout(function () {
                    app.navigate('/courses', {
                        trigger: true
                    });
                }, 1000);
            }
        })

    },


    checkAuth: function () {
        if (!sessionStorage.getItem('keyo')) {
            showLoginModal($("#someParent"));
        }
    },


    initialize: function () {
        this.data = this.model.toJSON();
    },

    render: function () {
        var self = this;
        $(this.el).html(this.template({model: self.data}));
        populateSchoolsDD(self.data.school);
        return this;
    }
});
